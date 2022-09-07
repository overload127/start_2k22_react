import СMathAction from './cMathAction';

/**
 * Класс для расчёта минимума из массива чисел
 *
 * @class   CMin
 * @extends {СMathAction}
 */
class CMin extends СMathAction {

  /**
   * Применяет назначенную мат.функцию (Минимум) класса к массиву элементов
   *
   * @this   {СMathAction}
   * @return {number} Результат выполнение основной функции класса
   */
  result() {
    let result = +Infinity;
    this.data.forEach((item) => {
      result = Math.min(result, item);
    });
    return result;
  }
}

export default CMin;