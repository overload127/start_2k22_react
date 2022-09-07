/* eslint class-methods-use-this: ["error", { "exceptMethods": ["result"] }] */


/**
 * Abstract Class СMathAction.
 *
 * @class СMathAction
 */
class СMathAction {

  /**
   * Создаёт экземпляр СMathAction.
   *
   * @constructor
   * @this {СMathAction}
   */
  constructor() {
    if (this.constructor === СMathAction) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.data = [];
  }

  /**
   * Добавляет элемент в массив
   *
   * @this   {СMathAction}
   * @param  {number} digit - новый элемент (число)
   * @return {number} Результат выполнение основной функции класса
   */
  add(digit) {
    this.data.push(digit);
    return this.result();
  }

  /**
   * Применяет назначенную мат.функцию класса к массиву элементов
   *
   * @this   {СMathAction}
   * @return {number} Результат выполнение основной функции класса
   */
  result() {
    throw new Error("Abstract classes can't be instantiated.");
  }

  /**
   * Отчищает внутренний массив элементов
   *
   * @this   {СMathAction}
   * @return {undefined}
   */
  clear() {
    this.data = [];
  }
}

export default СMathAction;