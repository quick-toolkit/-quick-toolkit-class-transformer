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

import {
  ValidateException,
  ValidateExceptionOptions,
} from '../validate-exception';

/**
 * @class TransformerException
 */
export class TransformerException extends ValidateException {
  /**
   * 创建异常实例
   * @param options
   */
  public static create(options: TransformerExceptionOps): TransformerException {
    return new TransformerException(
      options.field,
      options.fieldValue,
      options.exceptions,
      options.fieldExceptions,
      options.message
    );
  }

  public name = 'TransformerException';

  /**
   * 构造函数
   * @param field 字段
   * @param filedValue 字段值
   * @param exceptions 异常列表
   * @param fieldExceptions 异常字段列表
   * @param message 错误消息
   */
  public constructor(
    field: string,
    filedValue: any,
    public exceptions: ValidateException[],
    public fieldExceptions: ValidateExceptionFields,
    message?: string
  ) {
    super(field, filedValue, message);
  }
}

export interface TransformerExceptionOps extends ValidateExceptionOptions {
  exceptions: ValidateException[];
  fieldExceptions: ValidateExceptionFields;
}

export type ValidateExceptionFields = Record<PropertyKey, ValidateException[]>;
