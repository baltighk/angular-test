export const tasks = [
  {
    A: {
      imageUrl: 'assets/images/tasks/1/A/to_toluca_lake.png',
      story: `A feladat célja egy mini játék megvalósítása, amelyben  a labirintust úgy kell összerakni, hogy a bal alsó
      sarokból vezessen út a jobb felsőbe.`,
      subTasks: [
        {
          text: `A feladathoz tartozó komponensben találhatsz egy 5x5-ös táblázatot. A bal alsó sarokban egy fix cella
          jelöli a labirintus bejáratát, míg a jobb felső sarokban egy másik fix cella jelöli a kijáratot.

A fix cellákra kattintva ne történjen semmi. Bármelyik másik cellára kattintva viszont lépkedjünk végig a
lehetséges cellatípusokon, az ezekhez tartozó kép jelenjen meg a táblázatban.
A cellatípusokhoz kapcsolódó képeket az _assets/images/tasks/1/labyrinth_ mappában találod.

Érdemes olyan adatstruktúrát használni a lehetséges cellatípusokhoz, amely a következő feladat bejárását a lehető
legegyszerűbbé teszi.
Például a függőleges egyenes _straight_vertical.jpg_  esetén tudjuk, hogy alul és felül van kapcsolódási pont.

Minden szükséges cellatípus külön képként szerepel, ezért a képek forgatását nem szükséges implementálni.`,
          xp: 1
        },
        {
          text: `Minden cellamódosítás után ellenőrizd, hogy teljesült-e a labirintust, vezet-e folyamatos út a bejárattól a kijáratig.
          A bejárat és a kijárt cellák mindkét elérhető oldalából indulhasson út, ezt nem szükséges megszorítani.

Segítség: mivel a kezdő és végpont rögzített, ezért csak el kell indulni az egyikből és megnézni, hogy cellaismétlés
nélkül elérhető-e a másik.`,
          xp: 1
        },
        {
          text: `Ha a labirintust teljesült, jelenjen meg egy gratuláló üzenet a labirintus felett.
          A cellák ezt követően már ne legyenek módosíthatók.`,
          xp: 1
        },
        {
          text: `A táblázat mérete két inputmező segítségével legyen változthatható (a cellák száma vízszintesen, illetve függőlegesen).
          Méretváltozás esetén állítsd alapállapotba a játékot, a korábban már lehelyezett cellák nyugodtan eldobhatóak.

A játék működjön 3x3-as vagy annál nagyobb méret esetén.`,
          xp: 1
        },
      ],
      title: `Event handling`
    },
    B: {
      imageUrl: 'assets/images/tasks/1/B/plot_of_lost.png',
      story: `Ez a feladat annyiban tér el a többitől, hogy nem a _Task2BComponent_-ben kell megoldani, hanem globálisan a projektben.
      A cél egy közös navigáció létrehozása, amely lehetővé teszi, hogy a felhasználó egyszerűen mozoghasson az oldalak között.`,
      subTasks: [
        {
          text: `A navigáció kialakítása előtt adj minden, a routingban szereplő aloldalnak egy "title"-t - ez az a szöveg,
          amely a böngésző fülén jelenik meg.
Ez a szöveg jelenleg minden oldalon _ChooseYourOwnBeadando_, azonban oldalanként eltérő címet kell megjeleníteni.

Segítség: https://dev.to/brandontroberts/setting-page-titles-natively-with-the-angular-router-393j ("Using the built-in TitleStrategy" fejezet)`,
          xp: 1
        },
        {
          text: `Hozz létre egy új komponenst "BreadcrumbComponent" néven.
A komponens jelezze, hogy a felhasználó éppen hol áll a weboldal struktúrájában.
Például:
"/task/1/B" útvonal esetén: "Feladatok / 1 / B" (3 szegmens)

"/summary" útvonal esetén: "Várható eredmény"

Nem kötelező, de az egységes kinézet érdekében érdemes az ng-zorro _Breadcrumb_ elemét használni: https://ng.ant.design/components/breadcrumb`,
          xp: 1
        },
        {
          text: `Amennyiben egy lépéshez/feladathoz tartozó útvonalon vagyunk, legyen lehetőség bármelyik másik lépésre való gyors ugrásra.

Ez azt jelenti, hogy például a "Feladatok / 1 / B" esetén az 1-es helyén jelenjen meg egy választómező, amelyben a
felhasználó 1-től 5-ig választhat a lépések közül.
A választás után azonnal navigáljunk át a kiválasztott lépés megfelelő oldalára.
Tehát, ha a "/task/1/B" oldalon voltunk épp, és a felhasználó a 3-as opciót választja, akkor a program navigáljon át a "/task/3/B" oldalra.

Segítség: https://ng.ant.design/components/select/en`,
          xp: 1
        },
        {
          text: `Az előző feladatban említett választási lehetőség valósuljon meg a feladatok szintjén is, azaz legyen lehetőség
           hasonlóan választani az A/B opciók közül is.`,
          xp: 1
        }
      ],
      title: `Routing & Breadcrumb`
    },
  },
  {
    A: {
      imageUrl: 'assets/images/tasks/2/A/dooom.gif',
      story: `Készíts egy űrlapot, ami segít eldönteni, hogy fogod-e tudni futtatni a DOOM: The Dark Ages játékot május 15-én.`,
      subTasks: [
        {
          text: `Hozz létre egy reaktív űrlapot.
          Az űrlap 5 mezőt tartalmazzon:

- Processzor típusa (választó - _nz-select_)
- GPU típusa (választó - _nz-select_)
- RayTracing támogatás (jelölőnégyzet - _nz-checkbox_)
- memória mennyisége GB-ben (számmező - _nz-input-number_)
- elérhető tárhely mennyisége GB-ben (számmező - _nz-input-number_)

Az űrlaphoz hozz létre egy _FormGroup_-ot TypeScriptben, és kösd össze a HTML-ben létrehozott űrlappal a [formGroup] direktíva segítségével.

Az űrlapon szerepeljen egy submit gomb is.
A gomb lenyomásakor a _console.alert()_ segítségével írd ki, hogy a jelenlegi adatok alapján futtatható-e a DOOM: The Dark Ages, vagy sem.

Segítség: https://angular.dev/guide/forms/reactive-forms

https://ng.ant.design/components/select/en

https://ng.ant.design/components/checkbox/en

https://ng.ant.design/components/input-number/en`,
          xp: 1
        },
        {
          text: `A két választómező (CPU és GPU) lehetőségeit töltsd be dinamikusan!

A CPU-k és a GPU-k adatait is a _Task2AComponent_-ben találod a _CPUs_ és _GPUs_ változókban.
A CPU-król egy nevet és a CPU pontszámát tároljuk, GPU-król pedig a név mellett azt, hogy mennyi VRAM tartozik a videokártyához.

A selectorokban minden szükséges információ jelenjen meg:
- CPU-k esetén: jelenítsd meg a processzor nevét és a CPU score-t.
- GPU-k esetén: jelenjen meg a név és a VRAM mennyisége.`,
          xp: 1
        },
        {
          text: `Készítsd el a következő FormControl-szintű validációkat:
- A CPU score értéke legyen nagyobb 14500-nál.
- Az elérhető VRAM legalább 8GB.
- RayTracing támogatás kötelező (true érték szükséges).
- A számítógépben legyen legalább 16GB RAM.
- Legyen elérhető legalább 100 GB szabad tárhely.

A megfelelő űrlapmezők alatt jeleníts meg egy releváns hibaüzenetet, ha a validáció nem teljesül.

Segítség: Az űrlapmezők értékeit célszerű úgy kialakítani, hogy könnyen validálhatók legyenek.
Például: a GPU kiválasztásakor az érték lehet maga a VRAM mennyisége, hiszen csak azt kell validálni.`,
          xp: 1
        },
        {
          text: `Készíts egy FormGroup szintű, egyedi (custom) validációt, amely két mező együttes értékét ellenőrzi!

Ha az elérhető VRAM mennyisége kisebb mint 4GB, de a RayTracing be van kapcsolva, jelenjen meg a következő hiba:
"A megadott paraméterekkel rendelkező GPU nem létezik!"`,
          xp: 1
        },
      ],
      title: `
        Form validation
      `
    },
    B: {
      imageUrl: 'assets/images/tasks/2/B/frieren.webp',
      story: 'A cél egy webshop bevásárlókosarának frontend-oldali megvalósítása.',
      subTasks: [
        {
          text: `Készíts egy komponenst a termékek listázására és egy másikat a termékek egyedi megjelenítésére.

A termékek rendelkezzenek a következő mezőkkel:
- Név
- Leírás
- Ár (forintban)
- Kép (nem kötelező)

Vegyél fel legalább 5 terméket, és ezek jelenjenek meg a listázó komponensben.`,
          xp: 1
        },
        {
          text: `Készíts egy külön komponenst a kosár megjelenítésére.
                 Ez a listázótól jobbra vagy alatta jelenjen meg.

A kosárban jelenjen meg:
- minden kosárba helyezett termék neve,
- valamint az, hogy hány darabot szeretnénk vásárolni az adott termékből.

A mennyiség egyszerűen módosítható legyen + és – gombok segítségével.

A listázóból legyen lehetőség termékeket kosárba helyezni. Ennek eléréséhez minden terméken szerepeljen egy "Kosárba" gomb.
Ha a termék már benne van a kosárban, akkor növeljük meg a mennyiségét 1-gyel.`,
          xp: 1
        },
        {
          text: `Ha a kosárban egy termék mennyisége a - gomb használatával 1 alá csökkenne,
          távolítsuk el a terméket a kosárból.

Az eltávolítás előtt azonban kérjünk megerősítést a felhasználótól egy Popconfirm segítségével!
A megerősítő üzenet szövege legyen:

"Biztosan el szeretné távolítani a terméket a kosárból?"

Segítség: https://ng.ant.design/components/popconfirm/en`,
          xp: 1
        },
        {
          text: `A kosár állapotát minden változás esetén tárold el localStorage-ben vagy cookie-ban.
          A cél, hogy a kosár tartalma újratöltés után is megmaradjon, ezért az oldal betöltésekor olvassuk vissza az eltárolt adatokat!

Fontos: Teszteld le azt az esetet is, amikor a felhasználó először érkezik az oldalra - vagyis amikor a localStorage vagy a süti még üres.
Ebben az esetben is megfelelően kell működnie az alkalmazásnak!`,
          xp: 1
        }
      ],
      title: `Component`
    },
  },
  {
    A: {
      imageUrl: 'assets/images/tasks/3/A/say-my-name.gif',
      story: 'Készíts egy Angular pipe-ot személynevek formázására!',
      subTasks: [
        {
          text: `A komponensen helyezz el egy űrlapot 4 mezővel:

- Titulus (title)
- Keresztnév (first name)
- Középső név (middle name)
- Vezetéknév (last name)

A titulus és a középső név opcionális, a keresztnév és a vezetéknév megadása kötelező.
Az űrlap alapján a háttérben hozz létre egy objektumot, amely 4 mezőt tartalmaz, és ezek az inputoknak megfelelő információkat tárolják.`,
          xp: 1
        },
        {
          text: `Készíts egy saját Angular pipe-ot (https://angular.dev/guide/templates/pipes)!

Ez a pipe az előző feladatban létrehozott objektumra működjön és formázza meg a nevet a következő formátumra:
_titulus vezetéknév középsőnév keresztnév_

A későbbi alfeladatokban megadott esetekhez írj ki példákat a komponensben, amelyek bemutatják a pipe működését különböző bemeneti adatokra.`,
          xp: 1
        },
        {
          text: `A pipe fogadjon egy második paramétert, ami kétféle értéket vehet fel: 'hu' vagy 'en'.

- Ha ez a paraméter nem kerül megadásra vagy 'hu' értéket kap, használjuk az előző részfeladatban meghatározott formátumot:
_titulus vezetéknév középsőnév keresztnév_

- 'en' érték esetén a megjelenített formátum legyen a következő:
_titulus keresztnév középsőnév vezetéknév_`,
          xp: 1
        },
        {
          text: `Egészítsd ki a pipe működését egy további ellenőrzéssel:

Ha a keresztnév vagy a vezetéknév 3 karakternél rövidebb, a pipe ne a formázott nevet adja vissza, hanem jelenítsen meg egy fix szöveget:

_"Nem megfelelő név!"_
          `,
          xp: 1
        },
      ],
      title: `Pipe`
    },
    B: {
      imageUrl: 'assets/images/tasks/3/B/malkavian.webp',
      story: 'Készíts egy Angular direktívát, amely megakadályozza, hogy egy űrlapot többször is be lehessen küldeni!',
      subTasks: [
        {
          text: `Helyezz el egy gombot a felületen, amely kattintásra vagy:
- kiad egy HTTP-kérést,
- vagy elindít egy aszinkron eseményt az RxJS of() és delay() függvényeinek segítségével.

Segítség:
- https://rxjs.dev/api/index/function/of
- https://rxjs.dev/api/operators/delay`,
          xp: 1
        },
        {
          text: `Készíts egy direktívát, amit helyezz is el az előző feladatban létrehozott gombra.
          A direktívában implementáld, hogy a gombra kattintva a gomb kerüljön _disabled_ állapotba, hogy a felhasználó ne tudjon véletlenül többször rákattintani.`,
          xp: 1
        },
        {
          text: `Az előző feladatban beállított _disabled_ állapot a gombon szűnjön meg, amint az első feladat
          HTTP/mock kérése befejeződött. Természetesen ez a logika is a direktíva kódjában kerüljön megvalósításra.`,
          xp: 1
        },
        {
          text: `Amíg a gomb kikapcsolt (_disabled_) állapotban van, jelenjen meg az oldal tetején a következő üzenet:

_"Töltés folyamatban..."_

Az üzenet automatikusan tűnjön el, amint a kérés befejeződik, vagyis amikor a gomb újból aktívvá válik.

Segítség: https://ng.ant.design/components/message/en`,
          xp: 1
        },
      ],
      title: `Directive`
    },
  },
  {
    A: {
      imageUrl: 'assets/images/tasks/4/A/pyramid.png',
      story: '',
      subTasks: [
        {
          text: `Integráld a projektbe az _@swimlane/ngx-charts_ csomagot!

- Dokumentáció:
https://github.com/swimlane/ngx-charts

- Demók:
https://swimlane.github.io/ngx-charts/#/ngx-charts/bar-vertical`,
          xp: 1
        },
        {
          text: `Készíts egy kördiagramot (pie chart), amely a _configuration.ts_ fájl alapján megjeleníti, hogy hány (rész)feladatot oldottál meg!

- A diagram annyi szeletből álljon, ahány feladatból legalább egy részfeladat megoldásra került (maximum 10).
- Az egyes szeletek mérete feleljen meg az adott feladathoz tartozó megoldott részfeladatok számának (maximum 4).`,
          xp: 1
        },
        {
          text: `Készíts egy oszlopdiagramot (column chart) fix, beégetett adatokkal, amelyben megtippeled a csoport beadandóra szerzett jegyeinek eloszlását.

- A diagramon legyen 6 oszlop, 1-től 5-ig terjedően a lehetséges jegyekhez valamint egy külön oszlop a "Feladta és szégyenli magát" kategóriának.
- A kurzust összesen 32 fő vette fel - az oszlopok értékeinek összege ennek megfelelően legyen pontosan 32.`,
          xp: 1
        },
        {
          text: `Készíts egy timeline chartot fix (beégetett) adatokkal, amely azt mutatja, hogy az 1-től 10-ig terjedő skálán
          a tárgy iránti érdeklődésed milyen mértékben csökkent az első hét óta!

- A diagram idővonalként működjön, például: https://swimlane.github.io/ngx-charts/#/ngx-charts/timeline-filter-bar-chart-demo
- Minden eltelt héthez tartozzon 1 oszlop, tehát 1 hét - 1 érték.`,
          xp: 1
        },
      ],
      title: `ngx-charts`
    },
    B: {
      imageUrl: 'assets/images/tasks/4/B/nice_crop_bro.webp',
      story: 'Az ngx-image-cropper csomag lehetővé teszi, hogy képekről kivágj egy részt és csak ezt töltsd fel egy szerverre.',
      subTasks: [
        {
          text: `Integráld a projektbe az ngx-image-cropper csomagot!
A csomagot add hozzá a package.json-hoz, és importáld a megfelelő modult az Angular alkalmazásban.

A felületen jelenjen meg egy gomb, amelyre kattintva egy modal (_nz-modal_) ugrik fel.
A modalban legyen a felhasználónak lehetősége ngx-image-cropper használatával képet kiválasztani és kivágni.

A modal láblécében (footer) két gomb jelenjen meg:
- _Bezárás_ – zárja be a modalt.
- _Mentés_ – működése a későbbi feladatokban lesz részletezve

Segítség:
- https://www.npmjs.com/package/ngx-image-cropper
- https://ng.ant.design/components/modal/en`,
          xp: 1
        },
        {
          text: `Validáld a kiválasztott képet! Ha a kép bármelyik dimenziója meghaladja az _1080p_ felbontást
          (azaz _1920x1080_ pixelt), jelezd a felhasználónak, hogy inkább válasszon egy másik képet.`,
          xp: 1
        },
        {
          text: `A "Mentés" gomb mentse el a kivágott képrészletet localStorage-be, _Base64_ formátumban.

A mentésre használd mindig ugyanazt a fix localStorage kulcsot. Mindig csak egy
kép lehessen "feltöltve", különben az 5MB-os localStorage limit könnyen elérhető lenne!`,
          xp: 1
        },
        {
          text: `A modal-nyitó gomb mellett jelenjen meg a kép, ha az elérhető localStorage-ben.

Ebben az esetben jelenjen meg egy további "Törlés" gomb is, amellyel a kép eltávolítható localStorage-ből.`,
          xp: 1
        },
      ],
      title: `ngx-image-cropper & modal`
    },
  },
  {
    A: {
      imageUrl: 'assets/images/tasks/5/A/priorities.png',
      story: '',
      subTasks: [
        {
          text: `Helyezz el a felületen egy drag & drop eseményekkel átrendezhető listát, amely 3 opciót tartalmaz:
- _config-default.yaml_
- _config-course.yaml_
- _config-user.yaml_

A listaelemek tetszőleges sorrendbe húzhatók, így a felhasználó meg tudja határozni a fájlok prioritását.
Ennek a következő részfeladatokban lesz jelentősége.

Segítség: https://material.angular.io/cdk/drag-drop/overview`,
          xp: 1
        },
        {
          text: `Az _assets/yamls_ könyvtárban található a három kapcsolódó YAML fájl.

A feladathoz tartozó komponens inicializációjakor (_OnInit_) töltsd be mindhárom fájl tartalmát és használj egy RxJS
operátort arra, hogy a 3 fájl tartalmát akkor logold ki (_console.log_) amikor már mindhárom fájl beérkezett.

Segítség: https://rxjs.dev/api/operators`,
          xp: 1
        },
        {
          text: `A beérkezett fájlok tartalmát parseold be JavaScript objektumokká.
          Minden YAML fájl tartalma kerüljön be egy-egy külön változóba, mint JavaScript objektum.

Segítség: https://www.npmjs.com/package/yaml`,
          xp: 1
        },
        {
          text: `A három YAML fájl (illetve azok beolvasott JavaScript objektumainak) tartalma között vannak közös, ütköző kulcsok.

A feladat célja, hogy a három objektumot egyetlen JavaScript objektummá mergeld össze, a felhasználó által meghatározott prioritási sorrend alapján!

Merge-elés szabálya:
- Ha több fájl tartalmazza ugyanazt a kulcsot, akkor a legnagyobb prioritású fájl értéke élvez prioritást,
- tehát az adott kulcs értékét az első fájl határozza meg, amelyben szerepel.

Példa:
- _config-default.yaml_
- _config-course.yaml_
- _config-user.yaml_

Ebben az esetben a config-default.yaml prioritása a legmagasabb, így az eredményül kapott objektumban a következők lesznek igazak:

- A _title_ értéke: _ChooseYourOwnBeadando_
- A _theme_ értéke: _light_
- _enableChartExport_ értéke: _true_
- _showHints_ értéke: _true_
- stb.

Az így lértehozott, mergelt objektumot JSON formátumban írasd ki a komponensben (_JSON.stringify_), hogy egyszerűen ellenőrizhető legyen az eredmény.`,
          xp: 1
        },
      ],
      title: `Drag&Drop, YAML, RxJS`
    },
    B: {
      imageUrl: 'assets/images/tasks/5/B/cache.webp',
      story: '',
      subTasks: [
        {
          text: `Hozz létre egy service-t, _GeneratorService_ néven!
          A service tartalmazzon egy függvényt, amely egy paraméterként megadott számú személyek tömbjét generálja le.

A generált személyekhez az alábbi mezők tartozzanak:
- _név_: teljes név
- _születési év_: szám 1950 és 2024 között
- _lakhely_: realisztikusnak tűnő cím

A generáláshoz integrálj a projektbe egy faker csomagot, például: https://www.npmjs.com/package/@faker-js/faker), ennek
segítségével próbálj realisztikusnak tűnő adatokat generálni.

A feladathoz tartozó komponensben inicializációjakor (_OnInit_) generálj le _10 000_ személyt és ezeket töltsd be egy
komponensben elérhető változóba.`,
          xp: 1
        },
        {
          text: `Készíts egy táblázatot két oszloppal:
- _név_
- _születési év_

A táblázat jelenítse meg a generált személyeket virtual scrolling használatával!

A virtual scrolling célja, hogy a DOM-ba ne kerüljön be mind a 10 000 sor - csak azok, amelyek éppen láthatók, valamint néhány további sor bufferként.
Ezzel elkerülhető, hogy az oldal lefagyjon vagy jelentősen belassuljon a nagy adatmennyiség miatt.

Erre létezik több megoldás is, például: https://material.angular.io/cdk/scrolling/overview

Segítség: https://ng.ant.design/components/table/en#components-table-demo-virtual`,
          xp: 1
        },
        {
          text: `Egészítsd ki a táblázat első oszlopát (név) egy tetszőleges ng-zorro ikonnal!

- Az ikon a név mellett jelenjen meg.
- Ha a felhasználó az ikon fölé viszi az egeret, egy tooltip jelenjen meg, amelyben a személy lakhelyének címe olvasható.

Segítség: https://ng.ant.design/components/tooltip/en`,
          xp: 1
        },
        {
          text: `A lista felett jelenjen meg egy szöveges beviteli mező, amely lehetővé teszi a táblázat szűrését.

- A keresés történjen mindhárom mezőben.
- A keresés legyen kis- és nagybetű-független.
- A szűrés ne történjen minden billentyűleütésre, csak akkor, ha a felhasználó legalább 500ms-ig nem gépel tovább.
Ehhez célszerű az RxJS _debounceTime_ operátorát használni: https://rxjs.dev/api/operators/debounceTime

Segítség: https://ng.ant.design/components/input`,
          xp: 1
        }
      ],
      title: `Virtual Scrolling`
    },
    preview: {
      imageUrl: 'assets/images/preview/5.jpg',
      text: 'Csak így tovább, már csak egy feladat van hátra...'
    }
  }
]
