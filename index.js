// Словарь траслита
const converter = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'yo',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'sch',
  ь: "'",
  ы: 'y',
  ъ: "'",
  э: 'e',
  ю: 'yu',
  я: 'ya',
  А: 'A',
  Б: 'B',
  В: 'V',
  Г: 'G',
  Д: 'D',
  Е: 'E',
  Ё: 'Yo',
  Ж: 'Zh',
  З: 'Z',
  И: 'I',
  Й: 'Y',
  К: 'K',
  Л: 'L',
  М: 'M',
  Н: 'N',
  О: 'O',
  П: 'P',
  Р: 'R',
  С: 'S',
  Т: 'T',
  У: 'U',
  Ф: 'F',
  Х: 'H',
  Ц: 'Ts',
  Ч: 'Ch',
  Ш: 'Sh',
  Щ: 'Sch',
  Ь: "'",
  Ы: 'Y',
  Ъ: "'",
  Э: 'E',
  Ю: 'Yu',
  Я: 'Ya',
};

// Получаю доступ к вводимому тексту
const inputText = document.querySelector('.inputText');
// Получаю доступ к кнопке 'Добавить'
const addButton = document.querySelector('.addButton');
// При нажатии на кпопку и нажатии на enter будет запускаться функция
addButton.addEventListener('click', buttonFunction);
inputText.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    buttonFunction();
  }
});

// "Коробка, в кот. лежат все строки"
const box = document.querySelector('.box');

// Получаю доступ к кнопке удаления строки, чтобы после при
// жатии на добавить её клонировать (добавлять SVG в Js это та её проблема)
const lineClear = document.querySelector('.lineClear');

let ruText; // То, что вводится в input
let engText; // Массив из транслирерируемых букв
let result; // Массив преобразован в строку
let ruSliced;
let resultSliced;

// Функция, которая вывывается при нажатии на кнопку/enter
function buttonFunction() {
  if (inputText.value !== '') {
    // Все индексы //
    const indexCount = document.querySelectorAll('.inputValue');

    ruText = inputText.value;

    engText = [];
    ruText.split('').forEach((symbol) => {
      if (symbol in converter) {
        engText.push(converter[symbol]);
      } else {
        engText.push(symbol);
      }
      result = engText.join('');
    });

    ruSliced = ruText.slice(0, 7) + '...';
    resultSliced = result.slice(0, 7) + '...';

    // Новая строка:
    const newLine = document.createElement('div');
    newLine.classList.add('line', 'newLine'); // Добавтл class newLine
    box.appendChild(newLine);

    // "Русская половина" (состоит из индекса и текста на русском)
    const newRus = document.createElement('div');
    newRus.classList.add('rus');
    newLine.appendChild(newRus);

    // "Индекс строчки"
    const newInputValue = document.createElement('div');
    newInputValue.classList.add('inputValue', 'newInputValue');
    newInputValue.innerText = indexCount.length + 1; // Индекс "смотрит" на
    newRus.appendChild(newInputValue);

    // Текст на русском
    const newRusText = document.createElement('div');
    // Условие длины слова
    if (ruText.length > ruSliced.length) {
      // При длинном слове вставляем в строку обрезок
      newRusText.innerText = ruSliced;
      // Даем обрезку класс
      newRusText.classList.add('short');
      // Создал текст, который будет выпадать при наведении
      // (у него display:none в css) и даем ему класс
      const newRusTextCovered = document.createElement('div');
      newRusTextCovered.classList.add('covered');
      newRusTextCovered.innerText = ruText;
      // вставляем
      newRus.appendChild(newRusText);
      newRus.appendChild(newRusTextCovered);
      // При наведении будет всплывать полный текст
      newRusText.addEventListener('mouseover', () => {
        newRusTextCovered.style.display = 'block';
      });
      newRusText.addEventListener('mouseleave', () => {
        newRusTextCovered.style.display = 'none';
      });
    } else {
      // ЕСли слово малое, то просто вставляем без доп.классов
      newRusText.innerText = ruText;
      newRus.appendChild(newRusText);
    }

    // Транслит половина (транслит + кнопка)
    const newTrans = document.createElement('div');
    newTrans.classList.add('trans');
    newLine.appendChild(newTrans);

    // Транслит текст
    const newTransText = document.createElement('div');
    if (result.length > resultSliced.length) {
      newTransText.innerText = resultSliced;
      newTransText.classList.add('short');
      const newTransTextCovered = document.createElement('div');
      newTransTextCovered.classList.add('covered');
      newTransTextCovered.innerText = result;
      newTrans.appendChild(newTransText);
      // Изначально я подставлял newTransTextCovered
      // в блок newTransText, но это приводило к проблемам:
      // всплывающий блок клипался в бох, аналогично для
      // для newRusTextCovered
      newTrans.appendChild(newTransTextCovered);
      newTransText.addEventListener('mouseover', () => {
        newTransTextCovered.style.display = 'block';
      });
      newTransText.addEventListener('mouseleave', () => {
        newTransTextCovered.style.display = 'none';
      });
    } else {
      newTransText.innerText = result;
      newTrans.appendChild(newTransText);
    }

    // скопированная кнопка с 1 строки
    const newLineClear = lineClear.cloneNode(true);
    newLineClear.className = 'newLineClear'; // Добавлю на всякий еще 1 класс
    newTrans.appendChild(newLineClear);

    // console.log(ruText, result);
    inputText.value = ''; // Обнуление текста, записанного в форму

    // Очистить всё
    // Доступ к кнопке
    const cleansing = document.querySelector('.cleansing');
    // Доступ ко всем новым строкам
    const allNewLines = document.querySelectorAll('.newLine');
    // При нажатии убираются все (forEach) новые линии (allNewLines)
    cleansing.addEventListener('click', () => {
      // console.log(allNewLines);
      allNewLines.forEach((x) => {
        x.remove();
      });
    });

    // Удалить строку
    // доступ к кнопке в строке (для каждой строки
    // находится своя строка. наверное потому что мы
    // еще находимся в function buttonFunction() )
    const deleteLine = newLine.querySelector('svg');
    deleteLine.addEventListener('click', () => {
      newLine.remove();
      // Определяю все индексы, кроме первого
      const newIndexCount = document.querySelectorAll('.newInputValue');
      // Для каждого индекса (el) определяю индекс индекса
      // (i) в списке, прибавляю к числу 2, т.к изменяемые индексы
      // начинаются с 2-х
      newIndexCount.forEach((el, i) => {
        el.innerText = i + 2;
      });
    });
  } else {
    alert('Вы забыли ввести текст! :)');
  }
}
