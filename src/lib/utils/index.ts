/**
 * MIT License
 * Copyright (c) 2021 RanYunLong<549510622@qq.com> quick-toolkit/class-transformer
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Where } from '../type-mirror';
import moment from 'moment';

/**
 * 工具类
 * @class Utils
 */
export class Utils {
  /**
   * 获取对象的所有key
   * @param obj
   */
  public static objectKeys(obj: object): Array<string | symbol> {
    const keys: Array<symbol | string> = [];
    return keys.concat(
      Object.getOwnPropertyNames(obj),
      Object.getOwnPropertySymbols(obj)
    );
  }

  /**
   * Match where
   * @param wheres
   * @param value
   */
  public static where = (wheres: Where[], value: any): boolean => {
    return (
      typeof value === 'object' &&
      value !== null &&
      wheres.some((where) => {
        return Utils.objectKeys(where).every((key) => {
          return value[key] === where[key];
        });
      })
    );
  };

  /**
   * 转换为数字
   * @param value
   * @param strict
   */
  public static toNumber = (value: any, strict = false): number | undefined => {
    if (typeof value === 'number') {
      return value;
    }
    if (value instanceof Number) {
      return Number(value);
    }

    if (
      /^[0-9]+(\.?[0-9]+)?$/.test(value) ||
      /^0x[a-fA-F0-9]+?$/i.test(value)
    ) {
      return Number(value);
    }

    if (value === undefined || value === null) {
      if (strict) {
        return NaN;
      }
      return value;
    }
  };

  /**
   * 转换为boolean值
   * @param value
   * @param strict
   */
  public static toBoolean = (value: any, strict = false): boolean => {
    if (/^true$/.test(value)) {
      return true;
    }

    if (/^false$/.test(value)) {
      return false;
    }

    if (value === null || value === undefined) {
      if (!strict) {
        return value;
      }
    }

    return Boolean(value);
  };

  /**
   * 转换为字符串
   * @param value
   * @param strict
   */
  public static toString = (value: any, strict = false): string => {
    if (typeof value === 'string') {
      return value;
    }

    if (value instanceof String) {
      return value.toString();
    }

    if (value === null || value === undefined) {
      if (strict) {
        return '';
      }
      return value;
    }

    return String(value);
  };

  /**
   * 转换为JSON
   * @param value
   */
  public static toJSON(value: any): string | undefined {
    if (Array.isArray(value)) {
      return JSON.stringify(value);
    }

    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }

    return undefined;
  }

  /**
   * 转换为正则
   * @param value
   */
  public static toRegexp(value: any): RegExp | undefined {
    if (value instanceof RegExp) {
      return value;
    }
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      value instanceof String ||
      value instanceof Number
    ) {
      return new RegExp(value.toString());
    }
  }

  /**
   * 转换为symbol
   * @param value
   */
  public static toSymbol(value: any): symbol | undefined {
    if (
      typeof value === 'string' ||
      typeof value === 'undefined' ||
      typeof value === 'number'
    ) {
      return Symbol(value);
    }
  }

  /**
   * 转换日期
   * @param value
   * @param strict
   */
  public static toDate = (value: any, strict = false): Date | undefined => {
    if (moment.isMoment(value)) {
      return value.toDate();
    }
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      value instanceof String ||
      value instanceof Number
    ) {
      return new Date(value.toString());
    }

    if (value === undefined || value === null) {
      if (strict) {
        return new Date('');
      }
      return value;
    }
  };

  /**
   * 转换为函数
   * @param value
   */
  public static toFunction = (value: any): Function | undefined => {
    if (typeof value === 'function') {
      return value;
    }
  };

  public static toURL = (value: any): URL | undefined => {
    if (typeof value === 'string') {
      return new URL(value);
    } else if (value instanceof URL) {
      return value;
    }
  };

  public static isPromise = (value: any): boolean => {
    if (value instanceof Promise) {
      return true;
    }
    return (
      typeof value === 'object' &&
      typeof value.then === 'function' &&
      typeof value.catch === 'function' &&
      typeof value.finally === 'function'
    );
  };

  /**
   * Object => Map
   * @param value
   */
  public static objectToMap<T extends {} = {}>(value: T): Map<PropertyKey, T> {
    const map = new Map();
    Object.keys(value).forEach((key) => {
      map.set(key, value[key as keyof T]);
    });

    return map;
  }

  /**
   * array => set
   * @param values
   */
  public static arrayToSet<T>(values: T[]): Set<T> {
    return new Set<T>(values);
  }

  /**
   * set => array
   * @param values
   */
  public static setToArray<T>(values: Set<T>): T[] {
    return Array.from(values);
  }

  /**
   * str => number
   * @param values
   */
  public static stringToNumber(values: string): number {
    return Number(values);
  }

  /**
   * number => string
   * @param values
   */
  public static numberToString(values: number): string {
    return String(values);
  }

  /**
   * string => Date
   * @param values
   */
  public static stringToDate(values: string): Date {
    return new Date(values);
  }

  /**
   * number => Date
   * @param values
   */
  public static numberToDate(values: number): Date {
    return new Date(values);
  }
}
