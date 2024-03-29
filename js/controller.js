const any = {};
const female = "female";
const male = "male";

class Controller {

	static currentTests = null;
	static questionIndices = null;
	static getStandardAnswers() {
		// Plocka ut val av ålder
		let ageVal = document.getElementById("age").value;
		let age = any;
		if (ageVal !== "") {
			age = Math.floor(ageVal * 1);
			document.getElementById("age").value = age;
		} else
			age = null;

		// Plocka ut val av kön
		let gender;
		if (document.getElementById("male").checked)
			gender = male;
		else if (document.getElementById("female").checked)
			gender = female;
		else
			gender = null;

		// Plocka ut valt land
		let country = document.getElementById("country").value;
		if (country)
			country = Country[country];
		else
			country = null;

		// Plocka ut val av TBC-risk
		let tbc_risk;
		if (document.getElementById("risk_yes").checked)
			tbc_risk = true;
		else if (document.getElementById("risk_no").checked)
			tbc_risk = false;
		else
			tbc_risk = null;
		
		return [age, gender, country, tbc_risk];
	}

	static updateSubmitButtonVisibility() {
		if (this.getStandardAnswers().some(value => value === null))
			document.getElementById("submitButton").setAttribute("disabled", "true");
		else
			document.getElementById("submitButton").removeAttribute("disabled");
	}

	static begin() {
		// Skapa dropdown-listan med länder
		const countrySwitch = document.getElementById("country");
		const countryOptions = [];
		for (const c of Object.keys(Country).sort()) {
			// Plocka ut det svenska namnet, om det finns angivet
			// Är det inte angivet så används fältets identifier
			let name = Country[c].hasOwnProperty("se") ? Country[c].se : c;
			const o = document.createElement("option");
			o.value = c;
			o.text = name;
			countryOptions.push(o);
			
			// Om det finns ett alternativt namn läggs det också till
			if (Country[c].hasOwnProperty("alt")) {
				const o2 = document.createElement("option");
				o2.value = c;
				o2.text = Country[c].alt;
				countryOptions.push(o2);
			}
		}
		// Sortera och sätt in i HTMLen
		countryOptions
			.sort((a, b) => a.text.localeCompare(b.text))
			.forEach(option => {
				countrySwitch.appendChild(option);
			});

		// Hantera av- och påslagning av Nästa-knappen
		// Varje gång ett inputfält uppdateras kollar vi om de alla har värden
		for (let id of ["age", "male", "female", "country", "risk_yes", "risk_no"]) {
			document.getElementById(id).addEventListener("change", e => {
				this.updateSubmitButtonVisibility();
			});
		}
		document.getElementById("submitButton").setAttribute("disabled", "true");
		
		// "submitButton" är knappen det står "Nästa" på.
		// När den klickas på går vi till nästa steg, att ställa följdfrågor.
		document.getElementById("submitButton").addEventListener("click", _ => {
			Controller.showTests(null); // Rensa bort testerna vi visar
			Controller.currentTests = null;
			Controller.questionIndices = null;

			let abort = message => {
				alert(message);
				throw new Error(message);
			};

			let [age, gender, country, tbc_risk] = this.getStandardAnswers();
			// Den här funktionen bör inte ens anropas om inte allt är ifyllt,
			// men för säkerhets skull kollar vi allt ändå
			if (age === null)
				abort("Du måste ange personens ålder");
			if (gender === null)
				abort("Du måste ange personens kön");
			if (country === null)
				abort("Du måste ange ett land");
			if (tbc_risk === null)
				abort("Du måste ange ifall personen kommer från en riskmiljö för tuberkulos");

			Controller.showAdditionalQuestions(Controller.findTests(age, gender, country, tbc_risk));
		});

		// "submitQuestions" är knappen det står "Visa resultat" på.
		// När man trycker på den filtreras testen utifrån eventuella frågesvar
		document.getElementById("submitQuestions").addEventListener("click", _ => {
			const additionalQuestionsDiv = document.getElementById("additionalQuestions");

			let tests = Controller.currentTests.map((test, test_index) => {
				if (Controller.questionIndices[test_index] === null)
					return test;
				else {
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
					.getElementsByClassName("prompt").item(0)
					.textContent;
				alert(`Du har inte svarat på frågan "${qText.trim()}"`);
			}
			else {
				tests = tests.map(t => {
					let res = {};
					if (t.hasOwnProperty("alert"))
						res.alert = t.alert;
					else {
						res.name = t.name;
						res.purpose = t.purpose;
					}
					return res;
				});
				// Filtrera ut tomma element
				tests = tests.filter(t => JSON.stringify(t) !== JSON.stringify({}));
				// Filtrera ut dubletter
				tests = tests.filter((t1, i) => i === tests.findIndex(t2 => JSON.stringify(t1) === JSON.stringify(t2)));
				Controller.showTests(tests);
				document.getElementById("submitQuestions").setAttribute("disabled", true);
			}
		});
	}

	// Hittar alla tester som matchar angivna uppgifter om patienten
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

	// Skapar en lista med frågorna som hör till de utvalda testen
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

				// För att undvika att ställa samma fråga flera gånger
				// kollar vi om den redan finns med. I så fall mappar vi istället
				// denna fråga till den befintliga.
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
			//submitQuestionsButton.click();
			document.getElementById("noQuestions").classList.remove("hide");
			submitQuestionsButton.removeAttribute("disabled");
		}
		else {
			document.getElementById("noQuestions").classList.add("hide");
			submitQuestionsButton.setAttribute("disabled", true);
			
			// Rendra varje fråga till HTMLen
			questions.forEach((q, qi) => {
				const qDiv = questionTemplate.cloneNode(true);
				qDiv.classList.remove("hide");
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
					aLabel.setAttribute("for", `q_${qi}_a_${ai}`);
					aLabel.textContent = a;
				});

				for (const input of qDiv.getElementsByTagName("input"))
					input.addEventListener("change", e => {
						if (Controller.allQuestionsAnswered(additionalQuestionsDiv))
							submitQuestionsButton.removeAttribute("disabled");
					});
				
				additionalQuestionsDiv.appendChild(qDiv);
			});
		}
	}

	// Dessa fält har specialbetydelser. Övriga fält kan användas till svarsalternativ.
	static PREDEFINED_FIELDS = ["age", "gender", "country", "tbc_risk", "alert", "name", "purpose", "question", "question-info"];
	static getAnswerKeys(test) {
		return Object.keys(test).filter(key => !this.PREDEFINED_FIELDS.includes(key));
	}

	// Rendrar de utvalda testerna till HTMLen (och tar bort gamla)
	static showTests(tests) {
		const testsDiv = document.getElementById("tests");
		const testDivs = testsDiv.getElementsByClassName("test");
		const testTemplate = testDivs.item(0);

		document.getElementById("noTestsYet").classList.add("hide");

		while (testDivs.length > 1)
			testsDiv.removeChild(testDivs.item(1));

		if (tests && tests.length > 0) {
			for (const test of tests) {
				const tDiv = testTemplate.cloneNode(true);
				tDiv.classList.remove("hide");

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
		} else if (tests && tests.length === 0) {
			document.getElementById("noTests").classList.remove("hide");
		} else {
			document.getElementById("noTestsYet").classList.remove("hide");
		}
	}

	// Formaterar textblock (framförallt question-info, alert och purpose)
	// för att tillåta punktlistor med olika nivåer
	static formatTextBody(text, element) {
		element.innerHTML = "";
		if (!text)
			return;
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

	// Går igenom alla frågor och kollar om ett alternativ är valt för samtliga
	static allQuestionsAnswered(additionalQuestionsDiv) {
		if (!Controller.currentTests || Controller.currentTests.length === 0)
			return false;
		
		for (let questionIndex of Controller.questionIndices) {
			// + 1 på grund av templaten som göms först
			const qDiv = additionalQuestionsDiv.getElementsByClassName("question")
				.item(questionIndex + 1);
			const aInputs = qDiv.getElementsByTagName("input");

			let wasAnswered = false;
			for (let ai = 0; ai < aInputs.length; ai++) {
				if (aInputs.item(ai).checked) {
					wasAnswered = true;
					break;
				}
			}

			if (!wasAnswered)
				return false;
		}

		return true;
	}
}
