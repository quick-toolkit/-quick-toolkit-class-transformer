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
/**
 * 工具类
 * @class Utils
 */
export declare class Utils {
    /**
     * 获取对象的所有key
     * @param obj
     */
    static objectKeys(obj: object): Array<string | symbol>;
    /**
     * Match where
     * @param wheres
     * @param value
     */
    static where: (wheres: Where[], value: any) => boolean;
    /**
     * 转换为数字
     * @param value
     */
    static toNumber: (value: any) => number | undefined;
    /**
     * 转换为boolean值
     * @param value
     */
    static toBoolean: (value: any) => boolean;
    /**
     * 转换为字符串
     * @param value
     */
    static toString: (value: any) => string;
    /**
     * 转换为JSON
     * @param value
     */
    static toJSON(value: any): string | undefined;
    /**
     * 转换为正则
     * @param value
     */
    static toRegexp(value: any): RegExp | undefined;
    /**
     * 转换为symbol
     * @param value
     */
    static toSymbol(value: any): symbol | undefined;
    /**
     * 转换日期
     * @param value
     */
    static toDate: (value: any) => Date | undefined;
    /**
     * 转换为函数
     * @param value
     */
    static toFunction: (value: any) => Function | undefined;
    static toURL: (value: any) => URL | undefined;
    static isPromise: (value: any) => boolean;
    /**
     * Object => Map
     * @param value
     */
    static objectToMap<T extends {} = {}>(value: T): Map<PropertyKey, T>;
    /**
     * array => set
     * @param values
     */
    static arrayToSet<T>(values: T[]): Set<T>;
    /**
     * set => array
     * @param values
     */
    static setToArray<T>(values: Set<T>): T[];
    /**
     * str => number
     * @param values
     */
    static stringToNumber(values: string): number;
    /**
     * number => string
     * @param values
     */
    static numberToString(values: number): string;
    /**
     * string => Date
     * @param values
     */
    static stringToDate(values: string): Date;
    /**
     * number => Date
     * @param values
     */
    static numberToDate(values: number): Date;
}
