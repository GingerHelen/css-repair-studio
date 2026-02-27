// Данные уровней и заданий (по структуре из PDF). Последний (уровень 5) не включён.

export const TOTAL_SECTIONS = 4;

export const sections = [
  {
    id: 1,
    title: 'Раздел 1. Базовые селекторы',
    subtitle: 'Теги, классы, вложенность, группы, псевдоклассы',
    rank: 'Стажёр-новичок',
    test: {
      title: 'Мини-тест: селекторы',
      theory: {
        title: 'CSS-селекторы: как “попасть” в нужный элемент',
        blocks: [
          {
            subtitle: 'Зачем нужны селекторы',
            text:
              'CSS-селектор — это “адрес” элемента на странице. Если адрес неверный, стиль не применится, а интерфейс останется сломанным. ' +
              'В наших заказах ошибка часто именно в селекторе: правило есть, но оно цепляет не тот элемент (или вообще ничего).',
          },
          {
            subtitle: 'Базовые виды селекторов',
            text:
              'Самые популярные: по тегу, по классу и по id. Класс начинается с точки (.), id — с решётки (#).',
            code: `p { color: #fff; }
.card { padding: 16px; }
#header { background: rgba(255,255,255,.08); }`,
          },
          {
            subtitle: 'Вложенность, группы, “прямой потомок”',
            text:
              'Пробел — любой потомок: .card .title. Символ > — только прямой потомок: ul > li. ' +
              'Запятая объединяет правила для нескольких селекторов.',
            code: `.card .title { font-weight: 700; }
ul > li { margin: 4px 0; }
h1, h2, h3 { letter-spacing: .2px; }`,
          },
          {
            subtitle: 'Псевдоклассы и типичные ошибки',
            text:
              'Псевдоклассы описывают состояние: :hover, :focus, :active и т.д. ' +
              'Типичные ошибки новичков: забыли точку у класса, перепутали пробел и >, выбрали слишком общий селектор и “сломали” всю страницу.',
            code: `.btn:hover { transform: translateY(-1px); }
input:focus { outline: 2px solid rgba(255,255,255,.35); }`,
          },
          {
            subtitle: 'Практика под наши заказы: “только внутри блока”',
            text:
              'Во многих заказах задача — применить стиль не “везде”, а только внутри конкретного контейнера. ' +
              'Для этого используем вложенные селекторы с пробелом: .card .title, .card img, .list .active, .menu li. ' +
              'Селектор без контейнера (.title, img, .active) почти всегда сломает элементы вне нужного блока.',
            code: `.card .title { font-weight: 700; }
.card img { border-radius: 16px; }
.list .active { font-weight: 700; }
.menu li { color: #111827; }`,
          },
        ],
      },
      questions: [
        { q: 'Как выбрать элемент по классу card?', options: ['#card', '.card', 'card', 'div#card'], correctIndex: 1 },
        { q: 'Как выбрать элемент по идентификатору header?', options: ['.header', '#header', 'header', 'div.header'], correctIndex: 1 },
        { q: 'Как выбрать элемент li, который является прямым потомком ul?', options: ['ul li', 'ul > li', 'li > ul', 'ul + li'], correctIndex: 1 },
        { q: 'Какой селектор выберет все элементы p внутри div?', options: ['div + p', 'div > p', 'div p', 'p div'], correctIndex: 2 },
        { q: 'Как выбрать элемент с классом active внутри элемента с классом menu?', options: ['.menu.active', '.menu > .active', '.menu .active', '.active .menu'], correctIndex: 2 },
        { q: 'Как выбрать все элементы на странице?', options: ['html', 'body', '*', 'all'], correctIndex: 2 },
        { q: 'Какой селектор выберет элемент с классом button, если он находится внутри div?', options: ['.button div', 'div .button', 'div div.button', 'button div'], correctIndex: 1 },
      ],
    },
    orders: [
      {
        id: '1-1',
        title: 'Заголовок внутри карточки стал обычным',
        context: 'Заголовок внутри карточки товара должен быть жирным, но стиль почему-то не применяется.',
        type: 'selector',
        html: `<div class="card"><h3 class="title">Название товара</h3></div>`,
        // ✅ Исправлено: targetCSS теперь соответствует HTML и правильному селектору
        targetCSS: `.card{padding:16px;border-radius:16px;border:1px solid rgba(255,255,255,.25);max-width:320px}
.card .title{font-weight:700;margin:0;font-size:20px}`,
        brokenCSS: `.card{padding:16px;border-radius:16px;border:1px solid rgba(255,255,255,.25);max-width:320px}
.card .title{font-weight:300;}`,
        promptCSS: `{ font-weight: 700; }`,
        selectorOptions: ['.title', '.card__title', '.card .title', 'h3'],
        correct: { selector: '.card .title' },
        fixCSS: `.card .title{font-weight:700;}`,
      },
      {
        id: '1-2',
        title: 'Серый текст “поплыл” по всей странице',
        context: 'Текст описания должен быть серым только внутри карточек, но сейчас меняется весь текст на странице.',
        type: 'selector',
        html: `<div class="card"><p class="text">Описание</p></div><p class="text">Текст вне карточки</p>`,
        targetCSS: `.card{padding:16px;border-radius:16px;border:1px solid rgba(255,255,255,.25);max-width:320px;margin-bottom:12px}
.card .text{color:#9ca3af;margin:0}
.text{color:#fff;margin:0}`,
        brokenCSS: `.card{padding:16px;border-radius:16px;border:1px solid rgba(255,255,255,.25);max-width:320px;margin-bottom:12px}
.wrong{color:#9ca3af;}
.text{color:#fff;margin:0}`,
        promptCSS: `{ color: #9ca3af; }`,
        selectorOptions: ['.text', '.card .text', '.card.text', 'div .text'],
        correct: { selector: '.card .text' },
        fixCSS: `.card .text{color:#9ca3af;}`,
      },
      {
        id: '1-3',
        title: 'Кнопка стала “универсальной”',
        context: 'Стили должны применяться только к кнопке внутри футера карточки.',
        type: 'selector',
        html: `<div class="card"><div class="footer"><button class="button">Купить</button></div></div><button class="button">Отмена</button>`,
        targetCSS: `.card{padding:16px;border-radius:16px;border:1px solid rgba(255,255,255,.25);max-width:320px;margin-bottom:12px}
.footer .button{background:#4f46e5;color:#fff;border:0;border-radius:12px;padding:10px 14px}
.button{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.35);border-radius:12px;padding:10px 14px}`,
        brokenCSS: `.card{padding:16px;border-radius:16px;border:1px solid rgba(255,255,255,.25);max-width:320px;margin-bottom:12px}
.wrong{background:#4f46e5;}
.button{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.35);border-radius:12px;padding:10px 14px}`,
        promptCSS: `{ background-color: #4f46e5; }`,
        selectorOptions: ['.button', '.footer .button', '.card.button', '.card > .button'],
        correct: { selector: '.footer .button' },
        fixCSS: `.footer .button{background:#4f46e5;}`,
      },
      {
        id: '1-4',
        title: 'Список меню красит всё подряд',
        context: 'Нужно изменить стиль только у элементов списка, которые находятся внутри блока .menu.',
        type: 'selector',
        html: `<ul class="menu"><li>Главная</li><li>Каталог</li></ul><ul><li>Служебный пункт</li></ul>`,
        targetCSS: `.menu{padding:12px;border-radius:16px;border:1px solid rgba(255,255,255,.25);max-width:320px;margin-bottom:12px}
.menu li{color:#111827;background:#fff;padding:8px 10px;border-radius:10px;margin:6px 0}
ul{list-style:none;padding:12px;margin:0}
li{color:#fff;padding:8px 10px;border-radius:10px;margin:6px 0;border:1px solid rgba(255,255,255,.2)}`,
        brokenCSS: `.menu{padding:12px;border-radius:16px;border:1px solid rgba(255,255,255,.25);max-width:320px;margin-bottom:12px}
.wrong{color:#111827;}
ul{list-style:none;padding:12px;margin:0}
li{color:#fff;padding:8px 10px;border-radius:10px;margin:6px 0;border:1px solid rgba(255,255,255,.2)}`,
        promptCSS: `{ color: #111827; }`,
        selectorOptions: ['li', '.menu li', 'ul li', '.menu > ul > li'],
        correct: { selector: '.menu li' },
        fixCSS: `.menu li{background-color:white; color:#111827}`,
      },
      {
        id: '1-5',
        title: 'Скругление съехало на все картинки',
        context: 'Нужно стилизовать изображение внутри карточки, но не трогать другие изображения.',
        type: 'selector',
        html: `<div class="card"><img alt="product" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='90'%3E%3Crect width='160' height='90' fill='%235b8'/%3E%3Ctext x='12' y='52' font-size='16' fill='white'%3Eproduct%3C/text%3E%3C/svg%3E" /></div><img alt="logo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect width='120' height='60' fill='%23555'/%3E%3Ctext x='12' y='38' font-size='16' fill='white'%3Elogo%3C/text%3E%3C/svg%3E" />`,
        targetCSS: `.card{padding:16px;border-radius:16px;border:1px solid rgba(255,255,255,.25);max-width:320px;margin-bottom:12px}
.card img{border-radius:16px;display:block;max-width:100%}
img{border-radius:0;display:block;margin-top:8px}`,
        brokenCSS: `.card{padding:16px;border-radius:16px;border:1px solid rgba(255,255,255,.25);max-width:320px;margin-bottom:12px}
.wrong{border-radius:16px;}
img{border-radius:0;display:block;margin-top:8px}`,
        promptCSS: `{ border-radius: 16px; }`,
        selectorOptions: ['img', '.card img', '.card > img', '.card.image'],
        correct: { selector: '.card img' },
        fixCSS: `.card img{border-radius:16px;}`,
      },
      {
        id: '1-6',
        title: 'Активный пункт выделяется не там',
        context: 'Текст с классом active должен быть выделен, но только внутри списка.',
        type: 'selector',
        html: `<ul class="list"><li class="active">Выбранный пункт</li></ul><p class="active">Активный текст</p>`,
        targetCSS: `.list{list-style:none;padding:12px;border-radius:16px;border:1px solid rgba(255,255,255,.25);max-width:320px;margin-bottom:12px}
.list .active{font-weight:700}
.active{font-weight:400}`,
        brokenCSS: `.list{list-style:none;padding:12px;border-radius:16px;border:1px solid rgba(255,255,255,.25);max-width:320px;margin-bottom:12px}
.wrong{font-weight:700;}
.active{font-weight:400}`,
        promptCSS: `{ font-weight: 700; }`,
        selectorOptions: ['.active', '.list .active', 'ul.active', '.active .list'],
        correct: { selector: '.list .active' },
        fixCSS: `.list .active{font-weight:700;}`,
      },
    ],
  },

  {
    id: 2,
    title: 'Раздел 2. Box Model',
    subtitle: 'width, height, margin, padding, box-sizing, border',
    rank: 'Младший стажёр',
    test: {
      title: 'Мини-тест: box model',
      theory: {
        title: 'Box Model: отступы, границы и размеры без сюрпризов',
        blocks: [
          {
            subtitle: 'Что такое Box Model',
            text:
              'Любой элемент — это прямоугольник: content → padding → border → margin. ' +
              'Ошибки в заказах чаще всего из-за неверных отступов и рамок.',
          },
          {
            subtitle: 'Padding и Margin: как не перепутать',
            text:
              'padding — внутренний отступ (внутри рамки, “воздух” вокруг текста). ' +
              'margin — внешний отступ (расстояние между блоками).',
            code: `.card { padding: 16px; }   /* внутри карточки */
.card { margin-bottom: 16px; } /* между карточками */`,
          },
          {
            subtitle: 'Шорткаты отступов (важно для задания с кнопкой)',
            text:
              'Отступы можно задавать сокращённо: padding: 0 14px означает сверху/снизу 0, слева/справа 14px. ' +
              'Так ты делаешь кнопку “объёмной” по горизонтали.',
            code: `.button { padding: 0 14px; }`,
          },
          {
            subtitle: 'Border: толщина рамки и как её чинить',
            text:
              'Рамка задаётся свойством border. Толщина отдельно — border-width. ' +
              'Если рамка “слишком толстая” — чаще всего нужно уменьшить border-width.',
            code: `.card { border: 1px solid rgba(255,255,255,.3); }
.card { border-width: 1px; }`,
          },
          {
            subtitle: 'box-sizing: почему блок “вылазит” за контейнер',
            text:
              'По умолчанию (content-box) ширина width не включает padding и border. ' +
              'Поэтому блок может стать шире, чем контейнер. border-box делает поведение предсказуемым.',
            code: `* { box-sizing: border-box; }
.card { width: 100%; padding: 16px; box-sizing: border-box; }`,
          },
          {
            subtitle: 'gap: расстояние между элементами в строке',
            text:
              'gap работает во flex/grid контейнерах и создаёт расстояние между элементами. ' +
              'Это удобнее, чем ставить margin каждому элементу.',
            code: `.row { display: flex; gap: 8px; }`,
          },
          {
            subtitle: 'Частые ошибки (чтобы не терять баллы)',
            text:
              '1) Путают padding и margin. 2) Забывают единицы (px). 3) Чинят не тот селектор. ' +
              '4) Пытаются “лечить” отступы через height/line-height — это не про box model.',
          },
        ],
      },
      questions: [
        { q: 'Какое свойство отвечает за внутренний отступ элемента?', options: ['margin', 'padding', 'border', 'gap'], correctIndex: 1 },
        { q: 'Какое свойство отвечает за внешний отступ элемента?', options: ['padding', 'gap', 'margin', 'outline'], correctIndex: 2 },
        { q: 'Какое свойство задаёт толщину рамки элемента?', options: ['border-width', 'outline-width', 'stroke', 'padding'], correctIndex: 0 },
        { q: 'Какое значение box-sizing включает padding и border в общую ширину элемента?', options: ['content-box', 'border-box', 'inherit', 'auto'], correctIndex: 1 },
        { q: 'Что произойдёт при width: 200px и padding: 20px при box-sizing: content-box?', options: ['Ширина останется 200px', 'Станет 220px', 'Станет 240px', 'Станет 160px'], correctIndex: 2 },
        { q: 'Какое свойство управляет расстоянием между элементами во flex/grid-контейнере?', options: ['margin', 'padding', 'gap', 'spacing'], correctIndex: 2 },
        { q: 'Какое свойство полностью убирает рамку у элемента?', options: ['border: none', 'border-width: 0', 'outline: none', 'frame: 0'], correctIndex: 0 },
      ],
    },
    orders: [
      {
        id: '2-1',
        title: 'Текст в карточке прилип к краям',
        context: 'Текст в карточке прилип к краям, читать неудобно.',
        type: 'triple',
        html: `<div class="card"><p class="description">Описание товара</p></div>`,
        targetCSS: `.card{width:320px;border-radius:16px;border:1px solid rgba(255,255,255,.25);padding:16px}
.description{margin:0}`,
        brokenCSS: `.card{width:320px;border-radius:16px;border:1px solid rgba(255,255,255,.25);padding:0}
.description{margin:0}`,
        selectorOptions: ['.card', '.description', '.container'],
        propertyOptions: ['margin', 'padding', 'gap'],
        valueOptions: ['16px', '0', '4px'],
        correct: { selector: '.card', property: 'padding', value: '16px' },
        fixCSS: `.card{padding:16px;}`,
      },
      {
        id: '2-2',
        title: 'Карточки слишком близко друг к другу',
        context: 'Карточки в списке стоят слишком близко друг к другу.',
        type: 'triple',
        html: `<div class="list"><div class="card">Карточка 1</div><div class="card">Карточка 2</div></div>`,
        targetCSS: `.card{padding:14px;border-radius:16px;border:1px solid rgba(255,255,255,.25);margin-bottom:16px}
.list{max-width:320px}`,
        brokenCSS: `.card{padding:14px;border-radius:16px;border:1px solid rgba(255,255,255,.25);margin-bottom:0}
.list{max-width:320px}`,
        selectorOptions: ['.card', '.list', '.container'],
        propertyOptions: ['padding-bottom', 'margin-bottom', 'gap'],
        valueOptions: ['16px', '0', '4px'],
        correct: { selector: '.card', property: 'margin-bottom', value: '16px' },
        fixCSS: `.card{margin-bottom:16px;}`,
      },
      {
        id: '2-3',
        title: 'Карточка выходит за границы контейнера',
        context: 'Карточка выходит за границы контейнера.',
        type: 'triple',
        html: `<div class="container"><div class="card">Контент карточки</div></div>`,
        targetCSS: `.container{width:320px;border-radius:16px;border:1px dashed rgba(255,255,255,.25);padding:12px}
.card{width:100%;padding:16px;border-radius:14px;border:1px solid rgba(255,255,255,.25);box-sizing:border-box}`,
        brokenCSS: `.container{width:320px;border-radius:16px;border:1px dashed rgba(255,255,255,.25);padding:12px}
.card{width:100%;padding:16px;border-radius:14px;border:1px solid rgba(255,255,255,.25);box-sizing:content-box}`,
        selectorOptions: ['.container', '.card', '.card__content'],
        propertyOptions: ['box-sizing', 'overflow', 'max-width'],
        valueOptions: ['border-box', 'content-box', 'hidden'],
        correct: { selector: '.card', property: 'box-sizing', value: 'border-box' },
        fixCSS: `.card{box-sizing:border-box;}`,
      },
      {
        id: '2-4',
        title: 'Кнопка выглядит плоской: текст прижат',
        context: 'Кнопка выглядит плоской, текст внутри слишком прижат.',
        type: 'triple',
        html: `<button class="button">Купить</button>`,
        targetCSS: `.button{height:40px;padding:0 14px;border-radius:12px;border:1px solid rgba(255,255,255,.25);background:rgba(79,70,229,.2);color:#fff}`,
        brokenCSS: `.button{height:40px;padding:0;border-radius:12px;border:1px solid rgba(255,255,255,.25);background:rgba(79,70,229,.2);color:#fff}`,
        selectorOptions: ['.button', 'button', 'span', '.actions'],
        propertyOptions: ['padding', 'margin', 'line-height'],
        valueOptions: ['0 14px', '14px', '0'],
        correct: { selector: '.button', property: 'padding', value: '0 14px' },
        fixCSS: `.button{padding:0 14px;}`,
      },
      {
        id: '2-5',
        title: 'Рамка карточки слишком толстая',
        context: 'Рамка карточки слишком толстая и выглядит грубо.',
        type: 'triple',
        html: `<div class="card">Контент</div>`,
        targetCSS: `.card{padding:14px;border-radius:16px;border:1px solid rgba(255,255,255,.3)}`,
        brokenCSS: `.card{padding:14px;border-radius:16px;border:4px solid rgba(255,255,255,.3)}`,
        selectorOptions: ['.card', '.container', '.title'],
        propertyOptions: ['border-width', 'outline-width', 'padding'],
        valueOptions: ['1px', '2px', '4px'],
        correct: { selector: '.card', property: 'border-width', value: '1px' },
        fixCSS: `.card{border-width:1px;}`,
      },
      {
        id: '2-6',
        title: 'Элементы в строке стоят слишком плотно',
        context: 'Элементы в строке стоят слишком плотно.',
        type: 'triple',
        html: `<div class="row"><span class="label">Цена</span><span class="value">₽</span></div>`,
        targetCSS: `.row{display:flex;gap:8px;padding:12px;border-radius:16px;border:1px solid rgba(255,255,255,.25);max-width:320px}
.label{opacity:.85}`,
        brokenCSS: `.row{display:flex;gap:0;padding:12px;border-radius:16px;border:1px solid rgba(255,255,255,.25);max-width:320px}
.label{opacity:.85}`,
        selectorOptions: ['.row', '.label', '.row span'],
        propertyOptions: ['gap', 'margin-right', 'padding'],
        valueOptions: ['8px', '0', '2px'],
        correct: { selector: '.row', property: 'gap', value: '8px' },
        fixCSS: `.row{gap:8px;}`,
      },
    ],
  },

  {
    id: 3,
    title: 'Раздел 3. Flexbox',
    subtitle: 'flex-direction, justify-content, align-items, gap, wrap',
    rank: 'Миддл-стажёр',
    test: {
      title: 'Мини-тест: flexbox',
      theory: {
        title: 'Flexbox: быстро выравнивать и раскладывать элементы',
        blocks: [
          {
            subtitle: 'Когда нужен Flexbox',
            text:
              'Flexbox помогает выстроить элементы в ряд или колонку, выровнять их и задать расстояния между ними.',
          },
          {
            subtitle: 'Включение Flex: контейнер и элементы',
            text:
              'Flex включается на контейнере: display: flex. Дальше управляешь расположением дочерних элементов.',
            code: `.row { display: flex; }`,
          },
          {
            subtitle: 'Оси: главная и поперечная (это решает половину задач)',
            text:
              'Главная ось зависит от flex-direction. При row главная ось — горизонталь, поперечная — вертикаль. ' +
              'justify-content работает по главной оси, align-items — по поперечной.',
            code: `.toolbar{
  display:flex;
  justify-content: space-between; /* по горизонтали при row */
  align-items: center;            /* по вертикали при row */
}`,
          },
          {
            subtitle: 'align-items: выравнивание по вертикали в строке',
            text:
              'Если иконка и текст “криво стоят” — почти всегда нужно align-items: center на контейнере.',
            code: `.row { display:flex; align-items: center; }`,
          },
          {
            subtitle: 'justify-content: распределение по краям',
            text:
              'space-between раздвигает элементы к краям контейнера. Это нужно, когда “кнопки не разъезжаются”.',
            code: `.actions{ display:flex; justify-content: space-between; }`,
          },
          {
            subtitle: 'flex-direction: row vs column (задача “должно быть колонкой”)',
            text:
              'row — элементы в ряд, column — элементы сверху вниз (колонкой).',
            code: `.stack{ display:flex; flex-direction: column; gap: 8px; }`,
          },
          {
            subtitle: 'gap: расстояние между элементами',
            text:
              'gap задаёт расстояние между flex-элементами. Это ровно задача “слишком плотно”.',
            code: `.row{ display:flex; gap: 12px; }`,
          },
          {
            subtitle: 'flex-wrap: перенос на новую строку',
            text:
              'По умолчанию nowrap — всё пытается уместиться в одну строку. ' +
              'wrap разрешает перенос на следующую строку. Это задача “теги уезжают за экран”.',
            code: `.tags{ display:flex; flex-wrap: wrap; gap: 8px; }`,
          },
          {
            subtitle: 'Мини-шпаргалка под заказы',
            text:
              'Не по центру → align-items. Не разъехались → justify-content. Надо колонку → flex-direction: column. ' +
              'Плотно → gap. Уезжает за экран → flex-wrap: wrap.',
          },
        ],
      },
      questions: [
        { q: 'Какое свойство включает flex-контейнер?', options: ['display: block', 'display: flex', 'flex: 1', 'position: flex'], correctIndex: 1 },
        { q: 'Какое свойство определяет направление основной оси во flex-контейнере?', options: ['justify-content', 'align-items', 'flex-direction', 'flex-wrap'], correctIndex: 2 },
        { q: 'Какое свойство выравнивает элементы по главной оси?', options: ['align-items', 'justify-content', 'align-content', 'text-align'], correctIndex: 1 },
        { q: 'Какое свойство выравнивает элементы по поперечной оси?', options: ['justify-content', 'align-items', 'align-self', 'line-height'], correctIndex: 1 },
        { q: 'Какое значение flex-direction расположит элементы в колонку сверху вниз?', options: ['row', 'row-reverse', 'column', 'column-reverse'], correctIndex: 2 },
        { q: 'Какое свойство отвечает за перенос flex-элементов на новую строку?', options: ['flex-flow', 'flex-wrap', 'white-space', 'overflow'], correctIndex: 1 },
        { q: 'Какое свойство управляет расстоянием между элементами во flex-контейнере?', options: ['margin', 'padding', 'gap', 'spacing'], correctIndex: 2 },
      ],
    },
    orders: [
      {
        id: '3-1',
        title: 'Иконка и текст криво стоят в строке',
        context: 'Иконка и текст в строке стоят криво, нужно выровнять по центру.',
        type: 'triple',
        html: `<div class="row"><div class="icon"></div><div class="text">Доставка завтра</div></div>`,
        targetCSS: `.row{display:flex;align-items:center;gap:10px;padding:12px;border-radius:16px;border:1px solid rgba(255,255,255,.25);max-width:320px}
.icon{width:18px;height:18px;border-radius:6px;background:#4f46e5}`,
        brokenCSS: `.row{display:flex;align-items:flex-start;gap:10px;padding:12px;border-radius:16px;border:1px solid rgba(255,255,255,.25);max-width:320px}
.icon{width:18px;height:18px;border-radius:6px;background:#4f46e5}`,
        selectorOptions: ['.row', '.icon', '.text'],
        propertyOptions: ['align-items', 'justify-content', 'flex-wrap'],
        valueOptions: ['center', 'flex-start', 'space-between'],
        correct: { selector: '.row', property: 'align-items', value: 'center' },
        fixCSS: `.row{align-items:center;}`,
      },
      {
        id: '3-2',
        title: 'Кнопки не разъезжаются по краям',
        context: 'Кнопки должны разъехаться по краям, а они стоят рядом.',
        type: 'triple',
        html: `<div class="actions"><button class="btn">Отмена</button><button class="btn btn--primary">Сохранить</button></div>`,
        targetCSS: `.actions{display:flex;justify-content:space-between;gap:10px;max-width:360px}
.btn{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff}
.btn--primary{background:#4f46e5;border-color:transparent}`,
        brokenCSS: `.actions{display:flex;justify-content:flex-start;gap:10px;max-width:360px}
.btn{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff}
.btn--primary{background:#4f46e5;border-color:transparent}`,
        selectorOptions: ['.actions', '.btn', '.btn--primary'],
        propertyOptions: ['justify-content', 'align-items', 'flex-direction'],
        valueOptions: ['space-between', 'center', 'flex-start'],
        correct: { selector: '.actions', property: 'justify-content', value: 'space-between' },
        fixCSS: `.actions{justify-content:space-between;}`,
      },
      {
        id: '3-3',
        title: 'Должно быть колонкой, а сейчас ряд',
        context: 'Элементы должны идти в колонку, но сейчас они выстроены в ряд.',
        type: 'triple',
        html: `<div class="stack"><div class="item">Пункт 1</div><div class="item">Пункт 2</div><div class="item">Пункт 3</div></div>`,
        targetCSS: `.stack{display:flex;flex-direction:column;gap:8px;max-width:220px}
.item{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.25)}`,
        brokenCSS: `.stack{display:flex;flex-direction:row;gap:8px;max-width:220px}
.item{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.25)}`,
        selectorOptions: ['.stack', '.item', '.container'],
        propertyOptions: ['flex-direction', 'justify-content', 'align-items'],
        valueOptions: ['column', 'row', 'row-reverse'],
        correct: { selector: '.stack', property: 'flex-direction', value: 'column' },
        fixCSS: `.stack{flex-direction:column;}`,
      },
      {
        id: '3-4',
        title: 'Карточки/чипы слишком плотно',
        context: 'Карточки в строке стоят слишком плотно, нужно добавить расстояние.',
        type: 'triple',
        html: `<div class="row"><div class="chip">HTML</div><div class="chip">CSS</div><div class="chip">JS</div></div>`,
        targetCSS: `.row{display:flex;gap:12px;flex-wrap:wrap}
.chip{padding:8px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.25)}`,
        brokenCSS: `.row{display:flex;gap:0;flex-wrap:wrap}
.chip{padding:8px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.25)}`,
        selectorOptions: ['.row', '.chip', '.container'],
        propertyOptions: ['gap', 'margin', 'padding'],
        valueOptions: ['12px', '0', '4px'],
        correct: { selector: '.row', property: 'gap', value: '12px' },
        fixCSS: `.row{gap:12px;}`,
      },
      {
        id: '3-5',
        title: 'В шапке аватар и имя не по центру',
        context: 'В шапке карточки аватар и имя должны быть по центру по вертикали.',
        type: 'triple',
        html: `<div class="header"><div class="avatar"></div><div class="name">Анастасия</div></div>`,
        targetCSS: `.header{display:flex;align-items:center;gap:10px;padding:12px;border-radius:16px;border:1px solid rgba(255,255,255,.25);max-width:320px}
.avatar{width:28px;height:28px;border-radius:999px;background:#22c55e}`,
        brokenCSS: `.header{display:flex;align-items:stretch;gap:10px;padding:12px;border-radius:16px;border:1px solid rgba(255,255,255,.25);max-width:320px}
.avatar{width:28px;height:28px;border-radius:999px;background:#22c55e}`,
        selectorOptions: ['.header', '.avatar', '.name'],
        propertyOptions: ['align-items', 'justify-content', 'flex-wrap'],
        valueOptions: ['center', 'stretch', 'flex-start'],
        correct: { selector: '.header', property: 'align-items', value: 'center' },
        fixCSS: `.header{align-items:center;}`,
      },
      {
        id: '3-6',
        title: 'Теги не переносятся и уезжают за экран',
        context: 'Теги должны переноситься на новую строку, но сейчас всё уезжает за экран.',
        type: 'triple',
        html: `<div class="tags"><span class="tag">frontend</span><span class="tag">css</span><span class="tag">flexbox</span><span class="tag">layout</span><span class="tag">ui</span><span class="tag">practice</span></div>`,
        targetCSS: `.tags{display:flex;flex-wrap:wrap;gap:8px;max-width:320px}
.tag{padding:7px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.25);white-space:nowrap}`,
        brokenCSS: `.tags{display:flex;flex-wrap:nowrap;gap:8px;max-width:320px}
.tag{padding:7px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.25);white-space:nowrap}`,
        selectorOptions: ['.tags', '.tag', '.container'],
        propertyOptions: ['flex-wrap', 'flex-direction', 'overflow'],
        valueOptions: ['wrap', 'nowrap', 'hidden'],
        correct: { selector: '.tags', property: 'flex-wrap', value: 'wrap' },
        fixCSS: `.tags{flex-wrap:wrap;}`,
      },
    ],
  },

  {
    id: 4,
    title: 'Раздел 4. Тексты и визуальный стиль',
    subtitle: 'font-size, font-weight, line-height, align, decoration',
    rank: 'Старший стажёр',
    test: {
      title: 'Мини-тест: типографика',
      theory: {
        title: 'Тексты и визуальный стиль: читаемость, акценты, кнопки',
        blocks: [
          {
            subtitle: 'Иерархия текста: заголовок vs основной текст',
            text:
              'Заголовок должен отличаться от основного текста: обычно больше размер и/или выше font-weight. ' +
              'Если заголовок “не выделяется” — проверь font-weight.',
            code: `.title{ font-size: 22px; font-weight: 700; }
.text{ font-size: 14px; font-weight: 400; }`,
          },
          {
            subtitle: 'line-height: “воздух” между строками (задача 4-1)',
            text:
              'line-height управляет межстрочным интервалом. Если текст “сжатый” — увеличь line-height (например 1.6).',
            code: `.description{ line-height: 1.6; }`,
          },
          {
            subtitle: 'Цвет текста: HEX, RGB, RGBA (задача про ошибку)',
            text:
              'Цвет задаётся свойством color. Можно использовать HEX (#e53935), RGB или RGBA. ' +
              'HEX — самый частый вариант в макетах.',
            code: `.error{ color: #e53935; } /* заметная ошибка */
.muted{ color: rgba(255,255,255,.7); }`,
          },
          {
            subtitle: 'text-align: выравнивание текста (задача 4-4)',
            text:
              'text-align выравнивает текст внутри блока: left / center / right / justify.',
            code: `.text{ text-align: left; }`,
          },
          {
            subtitle: 'text-transform: регистр (задача 4-5)',
            text:
              'text-transform меняет регистр: uppercase — все буквы заглавные, none — без изменений.',
            code: `.title{ text-transform: uppercase; }`,
          },
          {
            subtitle: 'text-decoration: подчёркивание ссылок (задача 4-6)',
            text:
              'Ссылки часто по умолчанию подчёркнуты. Чтобы убрать — text-decoration: none.',
            code: `.link{ text-decoration: none; }`,
          },
          {
            subtitle: 'letter-spacing (в тесте спрашивается)',
            text:
              'letter-spacing — расстояние между буквами. Обычно его делают небольшим, чтобы заголовки выглядели аккуратнее.',
            code: `.title{ letter-spacing: .2px; }`,
          },
        ],
      },
      questions: [
        { q: 'Какое свойство отвечает за размер текста?', options: ['font-weight', 'font-size', 'line-height', 'text-style'], correctIndex: 1 },
        { q: 'Какое свойство управляет толщиной шрифта?', options: ['font-style', 'font-weight', 'text-transform', 'letter-spacing'], correctIndex: 1 },
        { q: 'Какое свойство изменяет расстояние между строками текста?', options: ['letter-spacing', 'line-height', 'text-align', 'font-size'], correctIndex: 1 },
        { q: 'Какое свойство отвечает за выравнивание текста по центру/левому/правому краю?', options: ['vertical-align', 'justify-content', 'text-align', 'align-items'], correctIndex: 2 },
        { q: 'Какое свойство управляет расстоянием между буквами?', options: ['word-spacing', 'line-height', 'letter-spacing', 'font-stretch'], correctIndex: 2 },
        { q: 'Какое свойство чаще всего используют для задания цвета текста?', options: ['background-color', 'color', 'text-color', 'fill'], correctIndex: 1 },
      ],
    },
    orders: [
      {
        id: '4-1',
        title: 'Текст “сжатый”: нужен воздух',
        context: 'Текст выглядит “сжатым” и тяжело читается. В макете больше воздуха.',
        type: 'triple',
        html: `<p class="description">Мы обновили интерфейс. Проверьте настройки профиля и сохраните изменения.</p>`,
        targetCSS: `.description{line-height:1.6;max-width:520px}`,
        brokenCSS: `.description{line-height:1;max-width:520px}`,
        selectorOptions: ['.description', '.text', '.title'],
        propertyOptions: ['line-height', 'letter-spacing', 'font-size'],
        valueOptions: ['1', '1.4', '1.6'],
        correct: { selector: '.description', property: 'line-height', value: '1.6' },
        fixCSS: `.description{line-height:1.6;}`,
      },
      {
        id: '4-2',
        title: 'Заголовок не выделяется',
        context: 'Заголовок не отличается от основного текста, должно быть полужирное начертание.',
        type: 'triple',
        html: `<h3 class="card__title">Личный кабинет</h3>
<p class="text">Для входа в личный кабинет нужно ввести логин и пароль</p>`,
        targetCSS: `.card__title{font-weight:700;margin:0}
.text{font-weight:400;margin:0}`,
        brokenCSS: `.card__title{font-weight:400;margin:0}
.text{font-weight:400;margin:0}`,
        selectorOptions: ['.card__title', '.title', 'h3'],
        propertyOptions: ['font-weight', 'font-size', 'text-align'],
        valueOptions: ['100', '400', '700'],
        correct: { selector: '.card__title', property: 'font-weight', value: '700' },
        fixCSS: `.card__title{font-weight:700;}`,
      },
      {
        id: '4-3',
        title: 'Незаметная ошибка',
        context: 'Сообщение об ошибке должно быть заметным.',
        type: 'triple',
        html: `<span class="error">Неверный пароль</span>`,
        targetCSS: `.error{color:#e53935;font-weight:600}`,
        brokenCSS: `.error{color:#999999;font-weight:600}`,
        selectorOptions: ['.error', '.text', '.label'],
        propertyOptions: ['color', 'opacity', 'font-weight'],
        valueOptions: ['#e53935', '#999999', '0.5'],
        correct: { selector: '.error', property: 'color', value: '#e53935' },
        fixCSS: `.error{color:#e53935;}`,
      },
      {
        id: '4-4',
        title: 'Текст должен быть выровнен слева',
        context: 'Текст должен быть выровнен слева.',
        type: 'triple',
        html: `<p class="text">Текст выравнен неправильно</p>`,
        targetCSS: `.text{text-align:left;max-width:520px}`,
        brokenCSS: `.text{text-align:center;max-width:520px}`,
        selectorOptions: ['.text', '.description', '.title'],
        propertyOptions: ['text-align', 'line-height', 'letter-spacing'],
        valueOptions: ['left', 'center', 'justify'],
        correct: { selector: '.text', property: 'text-align', value: 'left' },
        fixCSS: `.text{text-align:left;}`,
      },
      {
        id: '4-5',
        title: 'Неаккуратный заголовок из-за регистра',
        context: 'Заголовок должен быть аккуратным: верхний регистр.',
        type: 'triple',
        html: `<h2 class="title">Личный кабинет</h2>`,
        targetCSS: `.title{text-transform:uppercase;margin:0}`,
        brokenCSS: `.title{text-transform:none;margin:0}`,
        selectorOptions: ['.title', '.card__title', 'h2'],
        propertyOptions: ['text-transform', 'letter-spacing', 'font-size'],
        valueOptions: ['uppercase', 'capitalize', 'none'],
        correct: { selector: '.title', property: 'text-transform', value: 'uppercase' },
        fixCSS: `.title{text-transform:uppercase;}`,
      },
      {
        id: '4-6',
        title: 'Подчёркивание у ссылки нужно убрать',
        context: 'Подчёркивание у ссылки нужно убрать.',
        type: 'triple',
        html: `<a class="link" href="#">Подробнее</a>`,
        targetCSS: `.link{text-decoration:none;color:#2979ff}`,
        brokenCSS: `.link{text-decoration:underline;color:#2979ff}`,
        selectorOptions: ['.link', 'a', '.text'],
        propertyOptions: ['color', 'text-decoration', 'font-weight'],
        valueOptions: ['underline', 'none', '#2979ff'],
        correct: { selector: '.link', property: 'text-decoration', value: 'none' },
        fixCSS: `.link{text-decoration:none;}`,
      },
    ],
  },
];