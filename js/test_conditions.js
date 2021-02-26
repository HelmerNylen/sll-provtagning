const schistosomiasis_list = [
	Country.Eritrea
];

const malaria_list = [
	Country.Uganda
];

const hepatit_c_list = [
	Country.Angola,
	Country.Armenia,
	Country.Azerbaijan,
	Country.Bolivia,
	Country.BurkinaFaso,
	Country.Burundi,
	Country.DemocraticRepublicOfTheCongo,
	Country.Egypt,
	Country.Estonia,
	Country.IvoryCoast,
	Country.Gabon,
	Country.Georgia,
	Country.Grenada,
	Country.Guinea,
	Country.GuineaBissau,
	Country.Haiti,
	Country.Indonesia,
	Country.Iraq,
	Country.Italy,
	Country.Cambodia,
	Country.Cameroon,
	Country.CaboVerde,
	Country.Kazakhstan,
	Country.Kyrgyzstan,
	Country.Kuwait,
	Country.Liberia,
	Country.Malawi,
	Country.Mali,
	Country.Mongolia,
	Country.Mozambique,
	Country.Niger,
	Country.Pakistan,
	Country.Romania,
	Country.Russia,
	Country.Rwanda,
	Country.SaoTomeAndPrincipe,
	Country.Senegal,
	Country.Tajikistan,
	Country.Chad,
	Country.Togo,
	Country.TrinidadAndTobago,
	Country.Turkmenistan,
	Country.Tanzania,
	Country.Uganda,
	Country.Uzbekistan,
	Country.WesternSahara
];

const tbc_list = [
	Country.Afghanistan,
	//Country.Algeria,
	Country.Angola,
	Country.Azerbaijan,
	Country.Bangladesh,
	//Country.Benin,
	Country.Bhutan,
	Country.Bolivia,
	Country.Botswana,
	//Country.Brazil,
	//Country.Brunei,
	//Country.BurkinaFaso,
	Country.Burundi,
	Country.CentralAfricanRepublic,
	Country.DemocraticRepublicOfTheCongo,
	Country.Djibouti,
	//Country.DominicanRepublic,
	//Country.Ecuador,
	Country.EquatorialGuinea,
	//Country.ElSalvador,
	Country.IvoryCoast,
	Country.Eritrea,
	Country.Eswatini,
	Country.Ethiopia,
	//Country.Fiji,
	Country.Philippines,
	Country.Gabon,
	Country.Gambia,
	Country.Georgia,
	Country.Ghana,
	Country.Greenland,
	//Country.Guam,
	Country.Guinea,
	Country.GuineaBissau,
	//Country.Guyana,
	Country.Haiti,
	Country.India,
	Country.Indonesia,
	//Country.Iraq,
	//Country.Yemen,
	Country.Cambodia,
	Country.Cameroon,
	//Country.CaboVerde,
	Country.Kazakhstan,
	Country.Kenya,
	//Country.China,
	Country.Kyrgyzstan,
	Country.Kiribati,
	Country.RepublicOfTheCongo,
	Country.Laos,
	Country.Lesotho,
	Country.Liberia,
	//Country.Libya,
	//Country.Lithuania,
	Country.Madagascar,
	Country.Malawi,
	Country.Malaysia,
	//Country.Mali,
	Country.Morocco,
	Country.MarshallIslands,
	Country.Mauritania,
	Country.FederatedStatesOfMicronesia,
	Country.Moldova,
	Country.Mongolia,
	Country.Mozambique,
	Country.Myanmar,
	Country.Namibia,
	//Country.Nauru,
	Country.Nepal,
	//Country.Nicaragua,
	Country.Niger,
	Country.Nigeria,
	//Country.Niue,
	Country.NorthKorea,
	Country.NorthMarianaIslands,
	//Country.Pakistan,
	//Country.Palau,
	//Country.Panama,
	Country.PapuaNewGuinea,
	//Country.Paraguay,
	Country.Peru,
	//Country.Romania,
	//Country.Rwanda,
	//Country.Russia,
	Country.SaoTomeAndPrincipe,
	Country.Senegal,
	Country.SierraLeone,
	//Country.Singapore,
	//Country.SolomonIslands,
	Country.Somalia,
	//Country.SriLanka,
	Country.Sudan,
	Country.SouthSudan,
	Country.SouthAfrica,
	//Country.SouthKorea,
	Country.Tajikistan,
	Country.Tanzania,
	Country.Chad,
	Country.Thailand,
	//Country.Turkmenistan,
	Country.Tuvalu,
	Country.Uganda,
	Country.Ukraine,
	Country.Uzbekistan,
	//Country.Vanuatu,
	//Country.Venezuela,
	Country.Vietnam,
	Country.Zambia,
	Country.Zimbabwe,
	Country.EastTimor
];

const test_conditions = [
	{
		"age": any,
		"gender": any,
		"country": any,
		"name": "HIV-1/HIV-2 antikroppar/antigen",
		"purpose": "Hiv-diagnostik"
	},
	{
		"age": any,
		"gender": any,
		"country": any,
		"name": "HBsAg",
		"purpose": "Bärarskap/aktuell hepatit B"
	},
	{
		"age": [0, 17],
		"gender": any,
		"country": any,
		"name": "HBs-antikroppar",
		"purpose": "Immunitet mot hepatit B"
	},
	{
		"age": [0, 17],
		"gender": any,
		"country": any,
		"name": "Blodstatus inklusive HB",
		"purpose": "Anemi"
	},
	{
		"age": [0, 8],
		"gender": any,
		"country": any,
		"name": "PKU",
		"purpose": "Medfödda ämnesomsättningssjukdomar"
	},
	{
		"age": [0, 5],
		"gender": any,
		"country": any,
		"question": "Går barnet i förskolan?",
		"Ja": {
			"name": "Parasiter, utland feces",
			"purpose": "Screening för tarmparasiter"
		},
		"Nej": {}
	},
	{
		"age": [21, 45],
		"gender": female,
		"country": any,
		"name": "Rubella IgG-antikroppar",
		"purpose": "Immunitet mot röda hund (rubella)"
	},
	{
		"age": [15, 20],
		"gender": female,
		"country": any,
		"question": "Erbjuds personen MPR-vaccination via elevhälsan?",
		"Ja": {},
		"Nej": {
			"name": "Rubella IgG-antikroppar",
			"purpose": "Immunitet mot röda hund (rubella)"
		}
	},
	{
		"age": any,
		"gender": any,
		"country": hepatit_c_list,
		"name": "HCV-antikroppar",
		"purpose": "Hepatit C-infektion"
	},
	{
		"age": [0, 1],
		"gender": any,
		"country": tbc_list,
		"question": "Är barnet vaccinerat med BCG?",
		"Ja": {
			"name": "IGRA (Quantiferon), alternativt PPD om IGRA inte kan genomföras",
			"purpose": `
				Screening för latent tuberkulos
				Obs! Tag omedelbar kontakt med infektions- eller barnklinik vid misstanke om aktiv tuberkulos.
			`
		},
		"Nej": {
			"name": "PPD",
			"purpose": `
				Screening för latent tuberkulos
				Obs! Tag omedelbar kontakt med infektions- eller barnklinik vid misstanke om aktiv tuberkulos.
			`
		},
		"Vet ej": {
			"name": "PPD",
			"purpose": `
				Screening för latent tuberkulos
				Obs! Tag omedelbar kontakt med infektions- eller barnklinik vid misstanke om aktiv tuberkulos.
			`
		}
	},
	{
		"age": [0, 1],
		"gender": any,
		"country": any,
		"tbc_risk": true,
		"question": "Är barnet vaccinerat med BCG?",
		"Ja": {
			"name": "IGRA (Quantiferon), alternativt PPD om IGRA inte kan genomföras",
			"purpose": `
				Screening för latent tuberkulos
				Obs! Tag omedelbar kontakt med infektions- eller barnklinik vid misstanke om aktiv tuberkulos.
			`
		},
		"Nej": {
			"name": "PPD",
			"purpose": `
				Screening för latent tuberkulos
				Obs! Tag omedelbar kontakt med infektions- eller barnklinik vid misstanke om aktiv tuberkulos.
			`
		},
		"Vet ej": {
			"name": "PPD",
			"purpose": `
				Screening för latent tuberkulos
				Obs! Tag omedelbar kontakt med infektions- eller barnklinik vid misstanke om aktiv tuberkulos.
			`
		}
	},
	{
		"age": [2, 35],
		"gender": any,
		"country": tbc_list,
		"name": "IGRA (Quantiferon)",
		"purpose": `
			Screening för latent tuberkulos
			Obs! Tag omedelbar kontakt med infektions- eller barnklinik vid misstanke om aktiv tuberkulos.
		`
	},
	{
		"age": [2, 35],
		"gender": any,
		"country": any,
		"tbc_risk": true,
		"name": "IGRA (Quantiferon)",
		"purpose": `
			Screening för latent tuberkulos
			Obs! Tag omedelbar kontakt med infektions- eller barnklinik vid misstanke om aktiv tuberkulos.
		`
	},
	{
		"age": [36, any],
		"gender": any,
		"country": tbc_list,
		"question": "Har personen någon riskfaktor för tuberkulos?",
		"question-info": `
			Till riskfaktorer räknas följande:
				* Gravid eller postpartum
				* Bakomliggande sjukdom:
				** Hiv
				** Leukemi, lymfom
				** Annan aktiv malign sjukdom
				** Immunsupprimerande behandling
				** Insulinbehandlad diabetes
				** Uremi/hemodialys
				** Grav undervikt
				** Gastrectomi, jejuno-ileal bypass
				** Silikos
				* Känd exponering senaste 2 åren
		`,
		"Ja": {
			"name": "IGRA (Quantiferon)",
			"purpose": `
				Screening för latent tuberkulos
				Obs! Tag omedelbar kontakt med infektions- eller barnklinik vid misstanke om aktiv tuberkulos.
			`
		},
		"Nej": {
			"name": "Lungröntgen",
			"purpose": `
				Screening för aktiv tuberkulos
				Obs! Tag omedelbar kontakt med infektions- eller barnklinik vid misstanke om aktiv tuberkulos.
			`
		}
	},
	{
		"age": [36, any],
		"gender": any,
		"country": any,
		"tbc_risk": true,
		"question": "Har personen någon riskfaktor för tuberkulos?",
		"question-info": `
			Till riskfaktorer räknas följande:
				* Gravid eller postpartum
				* Bakomliggande sjukdom:
				** Hiv
				** Leukemi, lymfom
				** Annan aktiv malign sjukdom
				** Immunsupprimerande behandling
				** Insulinbehandlad diabetes
				** Uremi/hemodialys
				** Grav undervikt
				** Gastrectomi, jejuno-ileal bypass
				** Silikos
				* Känd exponering senaste 2 åren
		`,
		"Ja": {
			"name": "IGRA (Quantiferon)",
			"purpose": `
				Screening för latent tuberkulos
				Obs! Tag omedelbar kontakt med infektions- eller barnklinik vid misstanke om aktiv tuberkulos.
		`
		},
		"Nej": {
			"name": "Lungröntgen",
			"purpose": `
				Screening för aktiv tuberkulos
				Obs! Tag omedelbar kontakt med infektions- eller barnklinik vid misstanke om aktiv tuberkulos.
			`
		}
	},
	{
		"age": any,
		"gender": any,
		"country": schistosomiasis_list,
		"alert": "Överväg provtagning för Schistosomiasis. Diskutera eventuellt med infektions- eller barnläkare."
	},
	{
		"age": any,
		"gender": any,
		"country": malaria_list,
		"alert": "Överväg provtagning för Malaria. Diskutera eventuellt med infektions- eller barnläkare."
	}
];