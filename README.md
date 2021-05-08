# sll-provtagning
Guide för provtagning av nyanlända. Kan ses på [https://helmernylen.github.io/sll-provtagning/](https://helmernylen.github.io/sll-provtagning/).

OBS: Jag som gjort detta har ingen medicinsk kompetens och uppgifterna kan mycket väl vara felaktiga eller utdaterade. Dubbelkolla gärna med en officiell kanal innan du fattar några beslut.

## Användning
Fyll i patientens ålder, kön, och ursprungsland samt om personen kommer från en riskmiljö för tuberkulos. Tyck på "Nästa". Beroende på vad du fyllde i kan du få ett par följdfrågor. Svara på även dessa och tryck på "Visa resultat". Då får du en lista över proverna som ska tas, och i vissa fall också andra saker att vara uppmärksam på.

Om du inte fyller i ett visst fält så visas proverna för alla möjliga alternativ (exempelvis alla olika åldrar om du lämnar det fältet blankt).

## Uppdatering av informationen

### Prover
Allt som har med prover att göra (vilka som ska ta dem, vad de ska upptäcka, vad de heter etc.) redigeras i [js/tests.js](js/tests.js). I toppen av filen finns det en mängd listor över [länder](#länder) som till exempel anger vilka områden som är relevanta att titta på för Hepatit C. Skrollar ned och förbi dem kommer du till listan `test_conditions`, och det är i den som proverna definieras.

För dig som inte är van vid JavaScript går det förhoppningsvis ändå att förstå hur du kan uppdatera informationen och lägga till nya prover. De olika proverna definieras i listan med hjälp av en mängd nyckelord (`age`, `gender`, osv.) som grupperas med måsvingar `{}`. Allt som står mellan ett par måsvingar tillhör samma test. Har vi till exempel
```js
{
    "age": any,
    "gender": any,
    "country": any,
    "name": "Högskoleprovet",
    "purpose": "För att söka in till högskola och universitet"
},
{
    "age": any,
    "gender": any,
    "country": any,
    "name": "Uppkörning",
    "purpose": "För att få körkort"
},
```
så har vi två olika prover (`Högskoleprovet` och `Uppkörning`) som kommer visas för alla. Ett nyckelord kan ha olika värden, dvs. det som står mellan kolonet (`:`) och kommatecknet (`,`). I exemplet ovan har det första provet värdet `"Högskoleprovet"` för nyckelordet `name`.

Det finns en mängd olika nyckelord som kan användas, och dessa listas här nedanför. Ett prov (alltså ett visst par måsvingar) *måste* ha åtminstone `age`, `gender` och `country`.
- `age`: Åldrar för vilka provet ska tas. Värdet kan vara `any`, och i så fall tas det för alla. Annars kan det vara t.ex. `[3, 18]` för att tas på barn mellan tre och 18 år gamla. Du kan också ange t.ex. `[65, any]` för att specificera att det tas på alla som är 65 år eller äldre. Om provet av någon anledning ska ges till både barn och äldre, men inte personer där emellan, måste du skriva in det som två separata prover (och ge dem samma värden på övriga nyckelord).
- `gender`: Anger om provet enbart ska ges till personer med något visst kön. Möjliga värden är `male`, `female`, eller `any`.
- `country`: De ursprungsländer där det är relevant att ge provet. Värdet kan vara antingen bara ett land (`"country": Country.Andorra,`) eller en lista med länder:
  ```js
  "country": [Country.Andorra, Country.Bahrain, Country.Chad],
  ```
  Länderna du kan använda specificeras i [js/countries.js](js/countries.js). Du måste använda namnet som står innan kolonet (`Midgard` i exemplet) och prefixet `Country.`. Har du långa listor rekommenderar jag att skriva dessa med de andra listorna längre upp i filen, exempelvis:
  ```js
  const ABClista = [Country.Andorra, Country.Bahrain, Country.Chad];
  ```
  Då kan du skriva `"country": ABClista,` i provet för att göra det lite kompaktare.
- `tbc_risk`: Ifall provet bara tas om "Riskmiljö för tuberkulos" är angivet. Värdet är antingen `true`, vilket gör att provet bara visas om användaren svarar `Ja`; `false`, vilket gör att provet bara visas om användaren svarar `Nej`; samt `any`, vilket gör att provet visas oavsett. Om du inte har med det här nyckelordet antas det att du vill ha `any`.
- `name`: Provets namn, som visas för användaren i listan. Värdet ska vara någon kort textsnutt mellan ett par citattecken (`"`). Se exemplet ovan.
- `purpose`: En förklaring av varför provet tas, eller vad det ska upptäcka. Liksom namnet är det en textsnutt mellan ett par citattecken enligt exemplet ovan.
- `alert`: Används för att indikera att användaren ska vara uppmärksam på något snarare än att ta ett prov, till exempel att de bör överlägga med en specialist om någon särskild typ av screening. Om du har med detta fält så ignoreras vad som står i `name` och `purpose`. Värdet är någon textsnutt mellan ett par citattecken. För användaren visas det på ett liknande sätt som ett vanligt prov, men med "namnet" `Observera!`.
- `question`: Används för att ställa följdfrågor till användaren. Värdet för `question` ska vara någon textsnutt mellan ett par citattecken som kommer att visas för användaren om de övriga kriterierna (`age`, `gender` osv.) uppfylls.
- `question-info`: Extra information som visas under frågan. Du måste inte ha med det här nyckelordet, men det kan såklart hjälpa användaren att få frågan förtydligad. Även detta är en textsnutt och den kan i princip vara hur lång som helst.
- Svarsalternativ: Frågorna som ställs till användaren är flervalsfrågor där ett alternativ ska väljas. Svarsalternativen anger du också som nyckelord. Du kan ha hur många svarsalternativ som helst. Om svarsalternativen, `question`, och (eventuellt) `question-info` är exakt samma för flera prover så ställs frågan bara en gång. Värdet för varje svarsalternativ är i sig ett nytt par måsvingar där du har `name` och `purpose` (eller `alert`). Om du lämnar dem tomma så visas inget prov om man väljer det alternativet.

#### Följdfrågor - exempel
Hanteringen av de olika svarsalternativen och frågorna som visas för användaren kan verka komplex, så vi tar ett exempel:
```js
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
```
Detta prov kommer att tolkas som följande:
- `"age": [15, 20],`: Provet ska bara tas om patienten är mellan 15 och 20 år (inklusive 15 och 20).
- `"gender": female,`: Provet ska bara tas bara om patienten är kvinna.
- `"country": any,`: Provet ska tas oavsett vilket land patienten kommer ifrån.
- `"question": "...",`: Användaren kommer få en fråga. Alternativet de väljer avgör om och i så fall vad som visas.
- `"Ja": {},`: Om användaren svarar `Ja` visas inte provet.
- `"Nej": {`: Om användaren svara `Nej` visas...
  - `"name": "Rubella IgG-antikroppar",`: ett prov med namnet `Rubella IgG-antikroppar` och ...
  - `"purpose": "Immunitet mot röda hund (rubella)"`: beskrivningen `Immunitet mot röda hund (rubella)`.
  - (`}`: Slut på svarsalternativet `Nej`)

#### Avancerade tips
Nyckelorden `purpose`, `alert` och `question-info` kan lätt bli långa och behöva flera rader text. För att åstadkomma det måste du byta ut citattecknen (`"`) runt textsnutten mot grava accenter:
```js
"purpose": "Eftersom den här textsnutten har citattecken får den bara vara en rad",
```
```js
"purpose": `Men den här textsnutten har grava accenter.

Det gör att du kan skriva på flera rader, och att det ändå blir rätt. Så bra!`,
```
I textsnuttar med flera rader kan du också skriva punktlistor, till och med med flera nivåer. Se följande exempel:
```js
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
```
Den frågan kommer att visas såhär:
> Har personen någon riskfaktor för tuberkulos?
> 
> Till riskfaktorer räknas följande:
> - Gravid eller postpartum
> - Bakomliggande sjukdom:
>   - Hiv
>   - Leukemi, lymfom
>   - Annan aktiv malign sjukdom
>   - Immunsupprimerande behandling
>   - Insulinbehandlad diabetes
>   - Uremi/hemodialys
>   - Grav undervikt
>   - Gastrectomi, jejuno-ileal bypass
>   - Silikos
> - Känd exponering senaste 2 åren

### Länder
Länderna som finns i dropdown-menyn "Ursprungsland" hämtas från [js/countries.js](js/countries.js). För att lägga till ett nytt land eller område (låt oss säga att det heter `Midgård`) lägger du till en ny rad i listan med följande:
```
Midgard: {se: "Midgård"},
```
I namnet som står innan det första kolonet bör du undvika ÅÄÖ och andra specialtecken. Det som står mellan citattecknen efter `se: ` får innehålla ÅÄÖ. Har området andra namn du också vill ska dyka upp i listan (exempelvis kanske någon försöker hitta samma område under `Endor`) kan du ange det som följande:
```
Midgard: {se: "Midgård", alt: "Endor"},
```
Då dyker både `Midgård` och `Endor` upp i menyn och syftar då på samma region.

Om området bara har engelska bokstäver i namnet (och alltså inga bindestreck, mellanslag eller ÅÄÖ), som till exempel `Andorra`, räcker det med att skriva
```
Andorra: {},
```
så kan namnet innan kolonet användas direkt.

Om du vill ta bort ett land är det bara att plocka bort dess rad, men se i så fall till att landet inte finns med i någon av listorna i [js/tests.js](js/tests.js) (annars kommer sidan inte fungera).

### Övrigt
Övrig text på sidan, som till exempel rubriken eller förklaringen av vad som räknas som en riskmiljö, redigeras i [index.html](index.html).
