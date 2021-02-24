const any = {};
const female = "female";
const male = "male";

class Controller {

	static currentTests = null;
	static questionIndices = null;

	static begin() {
		// Skapa dropdown-listan med länder
		const countrySwitch = document.getElementById("country");
		const countryOptions = [];
		for (const c of Object.keys(Country).sort()) {
			let name = Country[c].hasOwnProperty("se") ? Country[c].se : c;
			const o = document.createElement("option");
			o.value = c;
			o.text = name;
			countryOptions.push(o);

			if (Country[c].hasOwnProperty("alt")) {
				const o2 = document.createElement("option");
				o2.value = c;
				o2.text = Country[c].alt;
				countryOptions.push(o2);
			}
		}
		// Sortera och sätt in i HTMLen
		countryOptions.sort((a, b) => a.text.localeCompare(b.text)).forEach(option => {
			countrySwitch.appendChild(option);
		});

		document.getElementById("submitButton").addEventListener("click", _ => {
			Controller.showTests();
			Controller.currentTests = null;
			Controller.questionIndices = null;

			let age = Math.round(document.getElementById("age").value * 1);
			document.getElementById("age").value = age;

			let gender = document.getElementById("male").checked ? male : (document.getElementById("female").checked ? female : any);

			let country = document.getElementById("country").value;
			if (!country)
				country = any;
			else
				country = Country[country];

			let tbc_risk = document.getElementById("risk_yes").checked ? true : (document.getElementById("risk_no").checked ? false : any);

			Controller.showAdditionalQuestions(Controller.findTests(age, gender, country, tbc_risk));
		});

		document.getElementById("submitQuestions").addEventListener("click", _ => {
			const additionalQuestionsDiv = document.getElementById("additionalQuestions");

			let tests = Controller.currentTests.map((test, test_index) => {
				if (Controller.questionIndices[test_index] === null)
					return test;
				else {
					// + 1 på grund av templaten som göms först
					const qDiv = additionalQuestionsDiv.getElementsByClassName("question")
						.item(Controller.questionIndices[test_index] + 1);
					const aInputs = qDiv.getElementsByTagName("input");
					for (let ai = 0; ai < aInputs.length; ai++) {
						if (aInputs.item(ai).checked)
							return test[Controller.getAnswerKeys(test)[ai]];
					}

					// No option checked
					return null;
				}
			});
			let undecidedTestInd = tests.findIndex(t => t === null);
			if (undecidedTestInd !== -1) {
				const qText = additionalQuestionsDiv.getElementsByClassName("question")
					.item(Controller.questionIndices[undecidedTestInd] + 1)
					.textContent;
				alert(`Du har inte svarat på frågan "${qText}"`)
			}
			else {
				// Filtrera ut tomma element
				tests = tests.filter(t => JSON.stringify(t) !== JSON.stringify({}));
				// Filtrera ut dubletter
				tests = tests.filter((t1, i) => i === tests.findIndex(t2 => JSON.stringify(t1) === JSON.stringify(t2)));
				Controller.showTests(tests);
			}
		});
	}

	static findTests(age, gender, country, tbc_risk) {
		return test_conditions.filter(tc => {
			if (tc.age !== any) {
				if ((tc.age[0] !== any && age < tc.age[0]) || (tc.age[1] !== any && age > tc.age[1]))
					return false;
			}
			if (tc.gender !== any && gender !== any && (tc.gender !== gender))
				return false;
			if (tc.country !== any && country !== any) {
				if (tc.country instanceof Array) {
					if (!tc.country.some(c => c === country))
						return false;
				}
				else if (tc.country !== country)
					return false;
			}
			if (tc.hasOwnProperty("tbc_risk") && tc.tbc_risk !== any && tbc_risk !== any) {
				if (tc.tbc_risk !== tbc_risk)
					return false;
			}

			return true;
		});
	}

	static showAdditionalQuestions(tests) {
		const additionalQuestionsDiv = document.getElementById("additionalQuestions");
		Controller.currentTests = tests;
		Controller.questionIndices = [];

		let questions = [];
		for (const test of tests) {
			if (test.hasOwnProperty("question")) {
				let question = {
					prompt: test.question.trim(),
					answers: [],
					answerResults: []
				};

				if (test.hasOwnProperty("question-info"))
					question.info = test["question-info"].trim();

				for (const answer of Controller.getAnswerKeys(test)) {
					question.answers.push(answer.trim());

					let res = test[answer];
					for (const key of Object.keys(res))
						res[key] = res[key].trim();

					question.answerResults.push(res);
				}

				let questionIndex = questions.findIndex(
					q => q.prompt === question.prompt
						 && q.answers.every((v, i) => v === question.answers[i])
						 && q.answerResults.every((v, i) => JSON.stringify(v) === JSON.stringify(question.answerResults[i]))
				);
				if (questionIndex === -1) {
					Controller.questionIndices.push(questions.length);
					questions.push(question);
				} else
					Controller.questionIndices.push(questionIndex);
			}
			else
				Controller.questionIndices.push(null);
		}
		
		const submitQuestionsButton = document.getElementById("submitQuestions");
		const questionDivs = additionalQuestionsDiv.getElementsByClassName("question");
		const questionTemplate = questionDivs.item(0);

		// Ta bort alla frågedivs utom templaten (som ligger först)
		while (questionDivs.length > 1)
			additionalQuestionsDiv.removeChild(questionDivs.item(1));
			
		if (questions.length === 0) {
			additionalQuestionsDiv.style = "display: none;";
			submitQuestionsButton.click();
		}
		else {
			questions.forEach((q, qi) => {
				const qDiv = questionTemplate.cloneNode(true);
				qDiv.style = "";
				qDiv.id = `q_${qi}`;
				
				qDiv.getElementsByClassName("prompt").item(0).textContent = q.prompt;
				if (q.hasOwnProperty("info"))
					Controller.formatTextBody(q.info, qDiv.getElementsByClassName("info").item(0));
				else
					qDiv.getElementsByClassName("info").item(0).style = "display: none;";
				
				const qAnswersDiv = qDiv.getElementsByClassName("answers").item(0);
				while (qAnswersDiv.children.length < q.answers.length)
					qAnswersDiv.appendChild(qAnswersDiv.children.item(0).cloneNode(true));
				
				q.answers.forEach((a, ai) => {
					const aDiv = qAnswersDiv.children.item(ai);
					const aInput = aDiv.getElementsByTagName("input").item(0);
					aInput.name = `q_${qi}`;
					aInput.id = `q_${qi}_a_${ai}`;
					aInput.value = `a_${ai}`;
					const aLabel = aDiv.getElementsByTagName("label").item(0);
					aLabel.for = `q_${qi}_a_${ai}`;
					aLabel.textContent = a;
				});
				
				additionalQuestionsDiv.insertBefore(qDiv, submitQuestionsButton);
			});

			additionalQuestionsDiv.style = "";
		}
	}

	static PREDEFINED_FIELDS = ["age", "gender", "country", "tbc_risk", "alert", "name", "purpose", "question", "question-info"];
	static getAnswerKeys(test) {
		return Object.keys(test).filter(key => !this.PREDEFINED_FIELDS.includes(key));
	}

	static showTests(tests = null) {
		const testsDiv = document.getElementById("tests");
		const testDivs = testsDiv.getElementsByClassName("test");
		const testTemplate = testDivs.item(0);

		while (testDivs.length > 1)
			testsDiv.removeChild(testDivs.item(1));

		if (tests && tests.length > 0)
			for (const test of tests) {
				const tDiv = testTemplate.cloneNode(true);
				tDiv.style = "";

				if (test.hasOwnProperty("alert")) {
					tDiv.classList.add("alert");
					tDiv.getElementsByClassName("name").item(0).textContent = "Observera!";
					Controller.formatTextBody(test.alert, tDiv.getElementsByClassName("purpose").item(0));
				} else {
					tDiv.getElementsByClassName("name").item(0).textContent = test.name;
					Controller.formatTextBody(test.purpose, tDiv.getElementsByClassName("purpose").item(0));
				}

				testsDiv.appendChild(tDiv);
			}
	}

	static formatTextBody(text, element) {
		element.innerHTML = "";
		const lines = text.trim().split("\n");
		if (lines.length === 1)
			element.textContent = lines[0];
		else {
			let currentListElement = null;
			let currentListDepth = 0;

			for (const line of lines) {
				const match = line.match(/^\s+([*|-]+)/);

				if (match) {
					if (match[1].length > currentListDepth) {
						currentListDepth++;
						const listElement = document.createElement("ul");
						(currentListElement || element).append(listElement);
						currentListElement = listElement;

					} else if (match[1].length < currentListDepth) {
						for (let i = 0; i < currentListDepth - match[1].length; i++)
							currentListElement = currentListElement.parentElement;
						currentListDepth = match[1].length;
					}

					const d = document.createElement("li");
					d.textContent = line.trim().slice(currentListDepth).trim();
					currentListElement.appendChild(d);
				} else {
					currentListDepth = 0;
					currentListElement = null;
					const d = document.createElement("div");
					d.textContent = line.trim();
					element.appendChild(d);
				}
			}
		}
	}
}
