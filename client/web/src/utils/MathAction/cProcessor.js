import CMax from './cMax';
import CMin from './cMin';
import CAvg from './cAvg';
import CSum from './cSum';

export const SECOND_1 = 1 * 1000;
const MINUTE_1 = SECOND_1 * 60;
export const MINUTE_15 = MINUTE_1 * 15;
export const HOUR_1 = MINUTE_15 * 4;
export const HOUR_12 = HOUR_1 * 12;
export const DAY_1 = HOUR_1 * 24;
export const DAY_4 = DAY_1 * 4;

/**
 * Класс для выполнения сверток массивов данных
 *
 * @class CProcessor
 */
class CProcessor {

  /**
   * Корректировка округления десятичных дробей.
   * 
   * [
   *      [<Время_в_миллисекундах>, значение],
   *      ...
   *      [<Время_в_миллисекундах>, значение],
   * ]
   *
   * @param   {Array} inData Список ютм меток и количества за это время. Интервал должен быть определён.
   * @returns {undefined}
   */
  constructor(inData, intervalFromData = false, inMode = "Sum", inUtime0, inUtime1) {
    if (inData.length) {
      inData.sort((a, b) => a[0] - b[0]);
      this.importAndConvertTo15Min(inData, intervalFromData, inMode, inUtime0, inUtime1);
    } else {
      this.data = [];
    }
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

  /**
   * Свойство - количество элементов
   *
   * @this   {СMathAction}
   * @return {number} Количество элементов
   */
  get size() {
    return this.calcSize();
  }

  /**
   * Возвращает количество элементов в массиве
   *
   * @this   {СMathAction}
   * @return {number} Количество элементов
   */
  calcSize() {
    return this.data.length;
  }

  /**
   * Возвращает режим свертки в зависимости от параметра inMode
   *
   * @param  {string}      inMode - мат.функция
   * @return {СMathAction} Выбранный класс мат.функции
   * 
   * @static
   */
  static choiceMathActionClass(inMode = "Sum") {
    switch (inMode) {
      case 'Max':
        return CMax;
      case 'Min':
        return CMin;
      case 'Avg':
        return CAvg;
      case 'Sum':
        return CSum;
      default:
        return CSum;
    }
  }

  /**
   * Создает список с интервалом в 15 минут
   * 900 = 15 минут = MINUTE_15
   *
   * @param  {Array}       inData - Список элементов для конвертирования
   * @param  {String}      inMode - мат.функция
   * @return {undefined}
   */
  importAndConvertTo15Min(inData, intervalFromData = false, inMode = "Sum", inUtime0 = null, inUtime1 = null) {
    if (intervalFromData) {
      this.data = CProcessor.wrapData(inData, MINUTE_15, inMode, inData[0][0], inData[inData.length - 1][0]);
    } else {
      this.data = CProcessor.wrapData(inData, MINUTE_15, inMode, inUtime0, inUtime1);
    }
  }

  /**
   * Вычисляет период из имеющихся данных для создания Х строк
   * Важно: При уменьшении интервала не распределяет плавно значения
   *
   * @param  {number}       countValue - число желаемых значений в результате свертки
   * @return {undefined}
   */
  createWrapPeriodV1(countValue) {
    let period = null;

    const lengthData = this.data.length;
    if (!lengthData) {
      return null;
    }

    const startDateTimeFromData = this.data[0][0];
    const endDateTimeFromData = this.data[lengthData - 1][0];
    const periodData = endDateTimeFromData - startDateTimeFromData;
    period = Number(periodData / countValue);

    return period;
  }

  createWrapPeriodV2SO() {
    const startDateTimeFromData = this.data[0][0];
    const endDateTimeFromData = this.data[this.data.length - 1][0];
    const periodData = endDateTimeFromData - startDateTimeFromData;

    let period = MINUTE_15;
    if (periodData > DAY_1 && periodData <= DAY_4) {
      period = HOUR_1;
    } else if (periodData > DAY_4) {
      period = DAY_1;
    }
    return period;
  }

  createWrapPeriodV2KTS() {
    const startDateTimeFromData = this.data[0][0];
    const endDateTimeFromData = this.data[this.data.length - 1][0];
    const periodData = endDateTimeFromData - startDateTimeFromData;

    let period = MINUTE_15;
    if (periodData <= DAY_4) {
      period = HOUR_1;
    } else if (periodData > DAY_4) {
      period = DAY_1;
    }
    return period;
  }

  /**
   * Создает список с указанным интервалом.
   * Важно: При уменьшении интервала не распределяет плавно значения
   *
   * @param  {Number} inInterval - Интервал в миллисекундах
   * @param  {String} inMode - мат.функция
   * @param  {Number} inUtime0 - Время в миллисекундах от которого работаем
   * @param  {Number} inUtime1 - Время в миллисекундах до которого работаем
   * @return {undefined}
   */
  wrap(inInterval = MINUTE_15, inMode = "Sum", intervalFromData = false, inUtime0 = null, inUtime1 = null) {
    if (intervalFromData) {
      this.data = CProcessor.wrapData(this.data, inInterval, inMode, this.data[0][0], this.data[this.data.length - 1][0]);
    } else {
      this.data = CProcessor.wrapData(this.data, inInterval, inMode, inUtime0, inUtime1);
    }
  }

  /**
   * Создает список с указанным интервалом. Не изменяет текущие данные.
   * Важно: При уменьшении интервала не распределяет плавно значения
   *
   * @param  {Number} inInterval - Интервал в миллисекундах
   * @param  {String} inMode - мат.функция
   * @param  {Number} inUtime0 - Время в миллисекундах от которого работаем
   * @param  {Number} inUtime1 - Время в миллисекундах до которого работаем
   * @return {Array}
   */
  wrapOut(inInterval = MINUTE_15, inMode = "Sum", inUtime0 = null, inUtime1 = null) {
    return CProcessor.wrapData(this.data, inInterval, inMode, inUtime0, inUtime1);
  }

  /**
   * Создает список с указанным интервалом.
   * Важно: При уменьшении интервала не распределяет плавно значения
   *
   * @param  {Array}  inData - Список элементов для конвертирования
   * @param  {Number} inInterval - Интервал в миллисекундах
   * @param  {String} inMode - мат.функция
   * @param  {Number} inUtime0 - Время в миллисекундах от которого работаем
   * @param  {Number} inUtime1 - Время в миллисекундах до которого работаем
   * @return {undefined}
   * 
   * @static
   */
  static wrapData(inData, inInterval = MINUTE_15, inMode = "Sum", inUtime0 = null, inUtime1 = null) {
    const CurrentMathActionClass = CProcessor.choiceMathActionClass(inMode);

    let inUtimeMin = inData[0][0];
    if (inUtime0) {
      inUtimeMin = inUtime0;
    }

    const dateMin = new Date(inUtimeMin);
    if (inUtime0) {
      const intervalMinutes = Math.floor(inInterval / 1000 / 60);
      let minutes = dateMin.getMinutes();
      const diff = minutes % intervalMinutes;
      if (diff) {
        minutes += intervalMinutes;
        minutes -= diff;
      }
      dateMin.setHours(dateMin.getHours(), minutes, 0, 0);
    }
    //  else {
    //   dateMin.setHours(dateMin.getHours(), dateMin.getMinutes(), 0, 0);
    // }
    let utimeMin = dateMin.getTime();

    if (utimeMin < inUtimeMin) {
      utimeMin += inInterval;
    }

    let utimeMax = inData[inData.length - 1][0];
    if (inUtime1) {
      utimeMax = inUtime1;
    }

    const intervalCurrent = (utimeMax - utimeMin > 0 && utimeMax - utimeMin < inInterval) ? utimeMax - utimeMin : inInterval;

    let currentUtime = utimeMin;
    let nextUtime = currentUtime + intervalCurrent;
    let currentValue = 0;
    const objMathAction = new CurrentMathActionClass();
    let currentI = 0;

    const result = [
      // [utimeMin, 0]
    ];
    while (currentUtime <= utimeMax + intervalCurrent) {
      if (currentUtime === utimeMax + intervalCurrent) {
        currentUtime = utimeMax;
      }

      if (currentI >= inData.length) {
        // Ловушка. Если попали сюда, то объект мат-функции больше не нужен
        result.push([currentUtime, currentValue]);
        currentValue = 0;
        currentUtime += intervalCurrent;
        break;
      } else if (currentUtime >= inData[currentI][0]) {
        currentValue = objMathAction.add(Number(inData[currentI][1]));
        currentI += 1;
      } else {
        result.push([currentUtime, currentValue]);
        currentUtime = nextUtime;
        nextUtime += intervalCurrent;

        if (currentUtime >= inData[currentI][0]) {
          objMathAction.clear();
          currentValue = objMathAction.add(Number(inData[currentI][1]));
          currentI += 1;
        } else {
          currentValue = 0;
          objMathAction.clear();
        }
      }
    }

    return result;
  }


  /**
   * Выполняет сдвиг всех меток
   *
   * @this   {СMathAction}
   * @return {undefined}
   */
  shiftDatetime(shiftUTM = DAY_1) {
    if(this.data.length) {
      this.data.forEach((item, index, currentArray) => {
        // eslint-disable-next-line no-param-reassign
        currentArray[index] = [item[0] + shiftUTM, item[1]];
      });
    }
  }
}

export default CProcessor;