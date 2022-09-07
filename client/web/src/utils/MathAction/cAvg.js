import СMathAction from './cMathAction';

/**
 * Класс для расчёта среднего арифметического из массива чисел
 *
 * @class   CAvg
 * @extends {СMathAction}
 */
class CAvg extends СMathAction {

  /**
   * Применяет назначенную мат.функцию (среднее арифметическое) класса к массиву элементов
   *
   * @this   {СMathAction}
   * @return {number} Результат выполнение основной функции класса
   */
  result() {
    if (this.data.length === 0) {
      return 0;
    }

    let result = 0;
    this.data.forEach((item) => {
      result += item;
    });
    return Math.floor(result / this.data.length);
  }
}

export default CAvg;