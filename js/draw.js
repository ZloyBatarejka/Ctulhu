const ANIMATION_SPEED = 1000;
let home = false;
// window.addEventListener("load",()=>{
// 	drawMain()
// 	home = true;
// })

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
  glaaki: "Глааки",
  hastur: "Хастур",
  abhot: "Абхот",
  azatot: "Азатот",
  nya: "Ньярлатхотеп",
  yog: "Йог-согот",
  yit: "Великая раса Йит",
  ghosts: "Ночные призаки",
  elders: "Старцы"
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
    text: optionsText.ctulhu
  }),
  hastur: creatureHTMLBuilder({
    title: "Xasthur",
    imgUrl: "./img/hastur.jpg",
    text: optionsText.ctulhu
  }),
  abhot: creatureHTMLBuilder({
    title: "Abhoth",
    imgUrl: "./img/abhot.jpg",
    text: optionsText.ctulhu
  }),
  azatot: creatureHTMLBuilder({
    title: "Azathoth",
    imgUrl: "./img/azatot.jpg",
    text: optionsText.ctulhu
  }),
  nya: creatureHTMLBuilder({
    title: "Nyarlathotep",
    imgUrl: "./img/nya.jpg",
    text: optionsText.ctulhu
  }),
  yog: creatureHTMLBuilder({
    title: "Yog-Sothoth",
    imgUrl: "./img/yog.jpg",
    text: optionsText.ctulhu
  }),
  yit: creatureHTMLBuilder({
    title: "Great Race of Yith",
    imgUrl: "./img/yit.jpg",
    text: optionsText.ctulhu
  }),
  ghosts: creatureHTMLBuilder({
    title: "Night Ghost",
    imgUrl: "./img/ghosts.jpg",
    text: optionsText.ctulhu
  }),
  elders: creatureHTMLBuilder({
    title: "Elder Thing",
    imgUrl: "./img/elders.jpg",
    text: optionsText.ctulhu
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
