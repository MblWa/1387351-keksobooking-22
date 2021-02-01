//Генерация целых чисел из диапазона положительных чисел включительно.
//Т.к. в ТЗ не прописано, поступают ли на вход целочисленные значения границ диапазона,
//то будем округлять их до целого значения, даже если придут с плавающей точкой.

const getIntFromRange = function(min, max) {
  let randomNumber = undefined;
  min = Math.ceil(min);
  max = Math.floor(max);

  if (max < min) {
    let buffer = max;
    max = min;
    min = buffer;
  }

  if (min === max) {
    randomNumber = min;
  }

  if (min >= 0 && max >= 0) {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return randomNumber;
}

alert(getIntFromRange(0, 10));

//Реализация функции под Кексобукинг с числами с плавающей точкой.
//Т.к. Math.random оперирует числами в диапазоне [0, 1), исключая единицу,
//придётся включать данную границу за счет округления и увеличения на
//машинный эпсилон, что позволяет включить единицу.

const getFloatFromRange = function(min, max, digits) {
  let randomNumber = undefined;

  digits = (digits > 5) ? (digits = 5) : digits;

  if (max < min) {
    let buffer = max;
    max = min;
    min = buffer;
  }

  if (min === max) {
    randomNumber = min;
  }

  if (min >= 0 && max >= 0) {
    randomNumber = Math.round((Math.random() * (max - min) + min + Number.EPSILON) * Math.pow(10, digits)) / Math.pow(10, digits);
  }

  return randomNumber;
}

alert(getFloatFromRange(0.1, 10.720, 5));
