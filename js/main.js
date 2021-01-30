//Генерация целых чисел из диапазона положительных чисел включительно.
//Т.к. в ТЗ не прописано, поступают ли на вход целочисленные значения границ диапазона,
//то будем округлять их до целого значения, даже если придут с плавающей точкой.

const getIntFromRange = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min === max) {
    return min;
  }

  if (max < min) {
    let buffer = max;
    max = min;
    min = buffer;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

alert(getIntFromRange(0, 10));

//Реализация функции под Кексобукинг с числами с плавающей точкой.
//Т.к. Math.random оперирует числами в диапазоне [0, 1), исключая единицу,
//придётся включать данную границу за счет округления и увеличения на
//машинный эпсилон, что позволяет включить единицу.

const getFloatFromRange = function(min, max, digits) {
  if (min === max) {
    return Math.round(min * Math.pow(10, digits)) / Math.pow(10, digits);
  }

  if (max < min) {
    let buffer = max;
    max = min;
    min = buffer;
  }

  return Math.round((Math.random() * (max - min) + min + Number.EPSILON) * Math.pow(10, digits)) / Math.pow(10, digits);
}

alert(getFloatFromRange(0.1, 10.720, 5));
