import СMathAction from './cMathAction';

/**
 * Класс для расчёта максимума из массива чисел
 *
 * @class   CMax
 * @extends {СMathAction}
 */
class CMax extends СMathAction {

  /**
   * Применяет назначенную мат.функцию (Максимум) класса к массиву элементов
   *
   * @this   {СMathAction}
   * @return {number} Результат выполнение основной функции класса
   */
  result() {
    let result = -Infinity;
    this.data.forEach((item) => {
      result = Math.max(result, item);
    });
    return result;
  }
}

export default CMax;