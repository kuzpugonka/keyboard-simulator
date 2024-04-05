// при выборе уровня сложности и скорости нужно делать активной кнопку Начать
// по клику на кнопку Начать скрываются блоки level, speed и сама кнопка Начать, увеличивается keybord,  запускается выбранный уровень, по умолчанию первый уровень и первая скорость

const keys = [..."ABCDIFGHIJKLMNOPQRSTUVWXYZ"];

// рандомайзер чисел в диапазоне
const getRandomNumber = (min, max) => {
  min = Math.ceil(min); // округление вверх
  max = Math.floor(max); // округл. вниз

  return Math.floor(Math.random() * (max - min + 1) + min);
};

// возвращаем из массива один элемент с рандомным индексом в диапазоне длины массива
const getRandomKey = () => {
  return keys[getRandomNumber(0, keys.length - 1)];
};

// для рандомной кнопки из предыдущей функции добавляем класс selected предварительно удалив со всех кнопок классы selected и hit
const targetRandomKey = () => {
  const key = document.getElementById(getRandomKey());
  const keys = document.querySelectorAll(".key");

  keys.forEach((key) => {
    key.classList.remove("selected");
    key.classList.remove("hit");
  });

  key.classList.add("selected");
};

let score = 0;

// при отпускании кнопки
document.addEventListener("keyup", (event) => {
  const keyPressed = String.fromCharCode(event.keyCode); // получает символ кнопки
  const keyElement = document.getElementById(keyPressed); // получает елемент с идентификатором = символу кнопки
  const hightlightKey = document.querySelector(".selected"); // получает выбранную кнопку
  const result = document.querySelector(".info__result"); // получает блок с баллами

  keyElement.classList.add("hit");

  keyElement.addEventListener("animationend", () => {
    // когда анимация окончена
    keyElement.classList.remove("hit"); // удаляется класс hit

    if (keyPressed === hightlightKey.id) {
      // если нажатая кнопка точно соответствует выбранной
      score = score + 1; // прибавляется балл
    } else {
      alert("Вы проиграли");
      score = 0;
    }
    result.innerHTML = `Количество баллов: ${score}`;

    hightlightKey.classList.remove("selected");

    targetRandomKey();
  });
});

targetRandomKey();
