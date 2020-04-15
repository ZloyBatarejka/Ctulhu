const ANIMATION_SPEED = 1000;
let home = false;
function drawMain() {
  articleRemover("data-article");
  if (!home) {
    home = true;
    const $section = document.createElement("section");
    $section.classList.add("content", "main");
    document.body.append($section);
    $section.innerHTML = `
				<div class="container">
					<div class="row">
						<div class="col-lg-6 lovecraft-text">
							<p>Говард Филлипс Лавкрафт (англ. Howard Phillips Lovecraft, 20 августа 1890, Провиденс, Род-Айленд, США — 15 марта 1937, там же) — американский писатель, поэт и журналист, писавший в жанрах ужасов, мистики, и фэнтези совмещая их в оригинальном стиле. Родоначальник Мифов Ктулху. Наряду с Робертом Говардом считается одним из основателей жанра фэнтези. При жизни Лавкрафта его произведения не пользовались большой популярностью, однако уже после его смерти они оказали заметное влияние на формирование современной нам массовой культуры. Его творчество настолько уникально, что произведения Лавкрафта выделяются в отдельный поджанр — так называемые лавкрафтовские ужасы.</p>
							<button class="btn btn-danger start" data-start>Cthulhu fhtagn!</button>
						</div>
						<div class="col-lg-6 lovecraft-img">
							<img src="./img/lovecraft.jpg">
						</div>
					</div>
				</div>
	`;
    setTimeout(() => {
      $section.classList.add("open");
    }, 1);
    $section.querySelector("[data-start]").addEventListener("click", () => {
      undrawMainSection();
      setTimeout(() => {
        drawMainChoise();
      }, 1000);
    });
  } else {
    return null;
  }
}

function undrawMainSection() {
  home = false;
  const main = document.querySelector(".main");
  main
    .querySelector("[data-start]")
    .removeEventListener("click", drawMainChoise);
  main.classList.remove("open");
  setTimeout(() => {
    main.remove();
  }, ANIMATION_SPEED);
}

function drawMainChoise() {
  const $mainChoise = document.createElement("section");
  $mainChoise.classList.add("mainChoise");
  $mainChoise.dataset.choise = "main";
  const $div = document.createElement("div");
  $div.classList.add("container", "pepezapr");
  $mainChoise.append($div);
  $div.innerHTML = `
			<div class="row mainChoise-row">
				<div class="col-md-3 mainChoise-option anc" data-main= "anc"><p class="mainChoise-title ">Древние</p></div>
				<div class="col-md-3 mainChoise-option out" data-main= "out"><p class="mainChoise-title ">Внешние Боги</p></div>
				<div class="col-md-3 mainChoise-option raz" data-main= "raz"><p class="mainChoise-title ">Разумные существа</p></div>
			</div>
	`;
  document.body.append($mainChoise);
  setTimeout(() => {
    $mainChoise.classList.add("open");
  }, 1);

  const ancChoise = document.querySelector("[data-main='anc']");
  const razChoise = document.querySelector("[data-main='out']");
  const nerazChoise = document.querySelector("[data-main='raz']");
  ancChoise.addEventListener("click", () => {
    select(0);
    drawSubChoise("anc", $div);
  });
  razChoise.addEventListener("click", () => {
    select(1);
    drawSubChoise("out", $div);
  });
  nerazChoise.addEventListener("click", () => {
    select(2);
    drawSubChoise("raz", $div);
  });
}
function select(index) {
  const choises = document.querySelectorAll("[data-main]");
  choises.forEach(item => item.classList.remove("selected"));
  choises[index].classList.add("selected");
}
function undrawMainChoise() {
  const $mainChoise = document.querySelector(`[data-choise="main"]`);
  $mainChoise.classList.remove("open");
  setTimeout(() => {
    $mainChoise.remove();
  }, ANIMATION_SPEED);
}

function drawSubChoise(option, div) {
  const row = document.querySelector(".subChoise-row");
  if (row) {
    row.remove();
    drawSubChoise(option, div);
  } else {
    const object = {
      anc: `
			<div class="subChoise-option col-md-2" data-sub="dagon">Дагон</div>
			<div class="subChoise-option col-md-2" data-sub="ctulhu">Ктулху</div>
			<div class="subChoise-option col-md-2" data-sub="glaaki">Глааки</div>
			<div class="subChoise-option col-md-2" data-sub="hastur">Хастур</div>
		`,
      out: `
			<div class="subChoise-option col-md-2" data-sub="abhot">Абхот</div>
			<div class="subChoise-option col-md-2" data-sub="azatot">Азатот</div>
			<div class="subChoise-option col-md-2" data-sub="nya">Ньярлатхотеп </div>
			<div class="subChoise-option col-md-2" data-sub="yog">Йог-Сотот</div>
		`,
      raz: `
			<div class="subChoise-option col-md-2" data-sub="yit">Великая раса Йит</div>
			<div class="subChoise-option col-md-2" data-sub="ghosts">Ночные призраки</div>
			<div class="subChoise-option col-md-2" data-sub="elders">Старцы</div>
		`
    };
    const $row = document.createElement("div");
    $row.classList.add("row", "subChoise-row");
    $row.innerHTML = object[option];
    div.append($row);
    setTimeout(() => {
      $row.classList.add("open");
    }, 1);
  }
  const subs = document.querySelectorAll("[data-sub]");
  subs.forEach(item => {
    item.addEventListener("click", event => {
      document
        .querySelectorAll("[data-sub]")
        .forEach(item => item.classList.remove("selected"));
      document
        .querySelector(`[data-sub="${event.target.dataset.sub}"]`)
        .classList.add("selected");
      drawArticle(item.dataset.sub);
    });
  });
}

function drawArticle(option) {
  const article = document.querySelector("[data-article]");
  if (article) {
    article.remove();
    drawArticle(option);
  } else {
    const $div = document.createElement("div");
    $div.classList.add("article");
    $div.innerHTML = options[option];
    $div.dataset.article = "set";
    document.body.append($div);
    setTimeout(() => {
      $div.classList.add("open");
    }, 1);
  }
}
function articleRemover(data) {
  document.querySelector(`[${data}]`)
    ? document.querySelector(`[${data}]`).classList.remove("open")
    : null;
  setTimeout(() => {
    document.querySelector(`[${data}]`)
      ? document.querySelector(`[${data}]`).remove()
      : null;
  }, ANIMATION_SPEED);
}
const optionsText = {
  dagon: `Дагон (тж. Отец Дагон, англ. Dagon, Father Dagon) — одно из меньших божеств пантеона мифов Ктулху. Наряду с его супругой Гидрой, Дагон является непосредственным покровителем Глубоководных, которые почтительно именуют их Отец Дагон и Мать Гидра.
				<br /><br />Выглядит Дагон аналогично Глубоководным (гуманоид с чертами рыбы и амфибии), но отличается гигантскими размерами.
				<br /><br />Дагон упоминается в нескольких произведениях Г. Ф. Лавкрафта, в том числе, в качестве действующего лица в рассказе «Дагон».
				<br /><br />Лавкрафтовский Дагон основан на трактовке по народной этимологии имени одноимённого семитского божества как «человек-рыба»`,
  ctulhu: `Ктулху (англ. Cthulhu) в Мифах Ктулху — божество, Зверь миров, спящий на дне Тихого океана, но, тем не менее, способный воздействовать на разум человека. Впервые упомянут в рассказе Говарда Лавкрафта «Зов Ктулху» (1928).
				<br /><br/>Ктулху принадлежит роду Древних. Он лежит во сне, подобном смерти, на вершине подводного города Р’льех посреди Тихого океана. «При верном положении звёзд» Р’льех появляется над водой, и Ктулху освобождается.
				<br/><br/>Ктулху способен воздействовать на разум человеческих существ, но его способности заглушаются толщей воды, так что подвластными ему остаются только сновидения особо чувствительных людей. В «Зове Ктулху» сны, напускаемые Ктулху, сильно ужасают видевших их, и порой доводят до сумасшествия. Ктулху — инопланетное, совершенно чуждое людской природе существо, а вся история человечества есть лишь миг его сна. Культисты убеждены в великой мощи своего идола, и гибель цивилизации представляется им весьма вероятным, хотя и незначительным, последствием пробуждения Ктулху.`,
  glaaki: `Глааки (Glaaki) — Обитатель озера, Властитель мертвых снов. Глааки выглядит как огромный слизняк, сплошь покрытый металлическими шипами. Последние являются не просто стильным аксессуаром — они живые и растут из тела, подобно волосам. Глааки может выпускать из себя щупальца с глазами на концах, чтобы выглядывать из воды.
           <br>Культ Глааки достаточно силен — в основном за счет магических знаний, которыми это божество снабжает своих последователей`,
  hastur: `Хастур (Hastur) — персонаж мифов Ктулху Говарда Филлипса Лавкрафта, один из так называемых Великих Древних. Хастур — один из самых мало разработанных образов в творчестве писателя и последователей, но, в то же время, один из самых популярных. Строго говоря, Лавкрафт не изобрел Хастура сам, хотя именно образ Хастура из его произведений стал своего рода классическим.
            <br>Хастур ассоциируется с желтым цветом как символом безумия. Наиболее четко Хастур описан в рассказе «Обитающий во мраке», единственном произведении писателя, где он фигурирует как действующий персонаж. В рассказе он предстает перед героями в виде черного вихря, способного похищать человеческую душу и рассудок.`,
  abhot: "Абхот(Abhot)- бог нечистот. Живёт в подземном царстве Н'кай(N'kai) и представляется людям как отвратительная гора гниющий плоти. Из него рождаются отвратительные чудовища, но он выпускает свои щупальца и пожирает их. Он циничен, зол и безумен. Обладает телепатическими способностями, при помощи которых он общается с окружающими. Демон Jubilex из ролевой игры D&D , вероятно, основан на Абхоте.",
  azatot: `Азатот (англ. Azathoth) — вымышленный Древний бог в произведениях Г. Ф. Лавкрафта и других авторов. Самый могущественный и верховный бог пантеона мифов Ктулху. Среди его эпитетов присутствуют такие как «слепой безумный бог», «вечно жующий султан демонов» и «ядерный хаос». Впервые Азатот упоминается в незавершенном романе «Азатот», который должен был стать произведением, похожим на сказку «Тысяча и одна ночь». Азатот часто упоминается во многих произведениях Лавкрафта, например, в «Сомнамбулический поиск Неведомого Кадата». Азатот описан в 22 сонете «Грибы с Юггота».`,
  nya: "Ньярлатоте́п (варианты перевода: Ньярлахоте́п, Ниарлатхоте́п, Нъярлотхоте́п; англ. Nyarlathotep) — воплощение хаоса, посланник Древних богов из мира, созданного Г. Ф. Лавкрафтом. Не имеет чёткой формы, однако всегда представляется как нечто очень отвратительное, бурлящее, постоянно меняющееся («ползучий хаос Ньярлатхотеп»). Со слов самого Ньярлатхотепа, он имеет тысячи обличий. Имя божества было придумано Лавкрафтом, но оно заканчивается на древнеегипетский элемент «-хотеп», который означает «мир» или «довольство» и входит в имена многих фараонов. В творчестве Августа Дерлета образ Ньярлатхотепа подвергся сильному упрощению: в частности, для него Ньярлатхотеп воплощал элемент земли, на что в творчестве Лавкрафта нет никаких указаний",
  yog: "Роль Йог-Сотота в пантеоне — тайна. Предположительно, это нейтральное божество, представляющее собой физическое воплощение мироздания. Известно, что о нем говорят, как о хранителе Врат между мирами, который и сам является вратами, и ключом. В рассказе Лавкрафта «Врата Серебряного Ключа» герой называет его «Бытие». Йог-Сотот заперт вне нашей Вселенной, он существует одновременно во всех временах и во всём пространстве. Это всезнающий бог, силой своей едва ли не превосходящий Азатота, а мудростью — Йига. По мнению писателя Кларка Эштона Смита, Йог-Сотот в одном из своих воплощений мог повелевать временем.",
  yit: "Великая Раса, когда она еще не была великой, населяла планету Йит более 200 миллионов лет тому назад. Йитианцы овладели способностью перемещения сознания в другое тело (другими словами, способностью обмена телами), и когда их планета начала умирать, они все взяли и переместили свои сознания на Землю, в тела разумных конусообразных существ. Там они продолжили свои исследования, и вскоре смогли переносить сознание не только сквозь пространство, но и через миллионы лет в обоих направлениях. Время стало подвластно им, и Йитианцы использовали его для своих дальнейших научных изысканий, в процессе познавая все, что было, и все, что еще не случилось. Они овладели лучшими технологиями прошлого и будущего. Правда, было одно «но» — в будущем они не видели себя в обличии тех самых конусообразных хлюпающих существ. Они стали копать и узнали, что спустя несколько десятков лет их раса исчезнет в связи с ужасным катаклизмом, и произойдет это в период, который позже назовут Меловым (около 65 миллионов лет до нашего времени). Этот катаклизм порождал в Йитианцах первобытный ужас, как и то, что станет его причиной — жутковатые «летающие полипы», жившие под землей. По какой-то причине Великая Раса не нашла способа борьбы с ними, и продолжала их бояться. Периодически полипы вылезали из-под земли и вступали в битву с Йитианцами; в бою попрощались с жизнью многие представители Великой Расы.",
  ghosts: `Ночные призраки (так же известные как мверзи или ночные феи) - существа, один из разумных видов, исконно населявших Страну Снов. Эти создания питаются самой структурой сна и выглядят не менее жутко, чем самый страшный кошмар, но они разумны и легко идут на контакт. 
            <br>Большинство считает, они неразумны. Однако этот факт ошибочен, ведь они состоят в союзе с упырями-вампирами, понимают человеческую речь и подчиняются приказам-просьбам. Служат седому богу Ноденсу, вечному охотнику и стражу звездных врат.`,
  elders: "Старцы первыми пришли из далеких глубин космоса на молодую Землю [3]. В то время они были высокоразвитой в технологическом отношении расой, но использовали свои знания только в случае крайней необходимости. Старцы ушли со своей планеты по причине техногенного кризиса. Считали свою прошлую механистическую цивилизацию пагубной для эмоциональной сферы. Первоначально старцы населяли только подводные пространства Земли, но впоследствии расселились и на суше.",
};
const options = {
  dagon: creatureHTMLBuilder({
    title: "Dagon",
    imgUrl: "./img/dagon.jpg",
    text: optionsText.dagon
  }),
  ctulhu: creatureHTMLBuilder({
    title: "Cthulhu",
    imgUrl: "./img/ktulhu.webp",
    text: optionsText.ctulhu
  }),
  glaaki: creatureHTMLBuilder({
    title: "Gla'aki",
    imgUrl: "./img/glaaki.jpg",
    text: optionsText.glaaki
  }),
  hastur: creatureHTMLBuilder({
    title: "Xasthur",
    imgUrl: "./img/hastur.jpg",
    text: optionsText.hastur
  }),
  abhot: creatureHTMLBuilder({
    title: "Abhoth",
    imgUrl: "./img/abhot.jpg",
    text: optionsText.abhot
  }),
  azatot: creatureHTMLBuilder({
    title: "Azathoth",
    imgUrl: "./img/azatot.jpg",
    text: optionsText.azatot
  }),
  nya: creatureHTMLBuilder({
    title: "Nyarlathotep",
    imgUrl: "./img/nya.jpg",
    text: optionsText.nya
  }),
  yog: creatureHTMLBuilder({
    title: "Yog-Sothoth",
    imgUrl: "./img/yog.jpg",
    text: optionsText.yog
  }),
  yit: creatureHTMLBuilder({
    title: "Great Race of Yith",
    imgUrl: "./img/yit.jpg",
    text: optionsText.yit
  }),
  ghosts: creatureHTMLBuilder({
    title: "Night Ghost",
    imgUrl: "./img/ghosts.jpg",
    text: optionsText.ghosts
  }),
  elders: creatureHTMLBuilder({
    title: "Elder Thing",
    imgUrl: "./img/elders.jpg",
    text: optionsText.elders
  })
};
function creatureHTMLBuilder(options) {
  const creatureHTML = `<div class='container creature'>
					<div class="row">
						<div class="col-md-6 creature-body">
						<h1 class="creature-title">${options.title}</h1>
						<p class="creature-text">${options.text}</p>
						</div>
						<div class="col-md-6 creature-img">
						<img src="${options.imgUrl}"></img>
						</div>
					</div>	
				</div>`;
  return creatureHTML;
}