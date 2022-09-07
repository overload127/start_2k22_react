import СMathAction from './cMathAction';

/**
 * Класс для расчёта суммы из массива чисел
 *
 * @class   CSum
 * @extends {СMathAction}
 */
class CSum extends СMathAction {

  /**
   * Применяет назначенную мат.функцию (сумма) класса к массиву элементов
   *
   * @this   {СMathAction}
   * @return {number} Результат выполнение основной функции класса
   */
  result() {
    let result = 0;
    this.data.forEach((item) => {
      result += item;
    });
    return result;
  }
}

export default CSum;