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
import { ValidateException, ValidateExceptionOptions } from '../validate-exception';
/**
 * @class TransformerException
 */
export declare class TransformerException extends ValidateException {
    exceptions: ValidateException[];
    fieldExceptions: ValidateExceptionFields;
    /**
     * 创建异常实例
     * @param options
     */
    static create(options: TransformerExceptionOps): TransformerException;
    name: string;
    /**
     * 构造函数
     * @param field 字段
     * @param filedValue 字段值
     * @param exceptions 异常列表
     * @param fieldExceptions 异常字段列表
     * @param message 错误消息
     */
    constructor(field: string, filedValue: any, exceptions: ValidateException[], fieldExceptions: ValidateExceptionFields, message?: string);
}
export interface TransformerExceptionOps extends ValidateExceptionOptions {
    exceptions: ValidateException[];
    fieldExceptions: ValidateExceptionFields;
}
export type ValidateExceptionFields = Record<PropertyKey, ValidateException[]>;
