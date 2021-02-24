const test_conditions = [
	{
		"name": "HIV-1/HIV-2 antikroppar/antigen",
		"purpose": "Hiv-diagnostik",
		"age": "any",
		"gender": any,
		"country": any
	},
	{
		"name": "HBsAg",
		"purpose": "Bärarskap/aktuell hepatit B",
		"age": "any",
		"gender": any,
		"country": any
	},
	{
		"name": "HBs-antikroppar",
		"purpose": "Immunitet mot hepatit B",
		"age": [0, 17],
		"gender": any,
		"country": any,
	},
	{
		"name": "Blodstatus inklusive Hb",
		"purpose": "Anemi",
		"age": [0, 17],
		"gender": any,
		"country": any,
	},
	{
		"name": "HCV-antikroppar",
		"purpose": "Hepatit C-infektion",
		"age": any,
		"gender": any,
		"country": [
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
		],
	},
	{
		"name": "IGRA(Quantiferon)/PPD",
		"purpose": "Screening för latent tuberkulos",
		"age": [0, 35],
		"gender": any,
		"country": [
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
		]
	},
	{
		"name": "Lungröntgen",
		"purpose": "Screening för aktiv tuberkulos<br>Obs! Tag omedelbar kontakt med infektions- eller barnklinik vid misstanke om aktiv tuberkulos.",
		"age": [35, any],
		"gender": any,
		"country": [
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
		]
	},
	{
		"name": "Rubella IgG-antikroppar",
		"purpose": "Immunitet mot röda hund (rubella)",
		"age": [15, 45],
		"gender": female,
		"country": any,
	},
	{
		"name": "Parasiter, utland feces",
		"purpose": "Screening för tarmparasiter",
		"age": [1, 5],
		"gender": any,
		"country": any,
	},
	{
		"name": "PKU",
		"purpose": "Medfödda ämnesomsättningssjukdomar",
		"age": [0, 9],
		"gender": any,
		"country": any,
	}
];