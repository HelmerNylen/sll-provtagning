const any = {};
const female = "female";
const male = "male";

class Controller {
	static begin() {
		const countrySwitch = document.getElementById("country");
		for (const c of Object.keys(Country).sort()) {
			const o = document.createElement("option");
			o.value = c;
			o.text = c;
			countrySwitch.appendChild(o);
		}
		document.getElementById("submitButton").addEventListener("click", _ => {
			let age = document.getElementById("age").value * 1;

			let gender = document.getElementById("gender").value;
			if (!gender)
				gender = any;

			let country = document.getElementById("country").value;
			if (!country)
				country = any;
			else
				country = Country[country];

			Controller.showTests(Controller.findTests(age, gender, country));
		});
	}

	static findTests(age, gender, country) {
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

			return true;
		});
	}

	static showTests(tests) {
		const testsDiv = document.getElementById("tests");
		testsDiv.innerHTML = "";
		for (const test of tests) {
			const testDiv = document.createElement("div");
			testDiv.innerHTML = `Vad undersöks? <b>${test.purpose}</b><br>Namn på analys: <b>${test.name}</b>`;
			testDiv.classList.add("test");
			testsDiv.appendChild(testDiv);
		}
	}
}
