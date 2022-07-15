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

import { ClassConstructor } from '@quick-toolkit/class-mirror';
import { TypeMirror } from '../type-mirror';
import { ClassTransformer } from '../class-transformer';
import { CustomTransformException, ValidateException } from '../exceptions';

/**
 * @abstract
 * @class TransformPlugin
 */
export abstract class TransformPlugin {
  public static type: ClassConstructor = Object;

  /**
   * 构造函数
   * @param transformer
   * @param typeMirror
   */
  public constructor(
    public transformer: ClassTransformer,
    public typeMirror: TypeMirror
  ) {}

  abstract validator(values: any): any;

  abstract transform(values: any, allValues: any): any;

  /**
   * 验证是否为必须
   * @param fieldValue
   */
  public validateRequired(fieldValue: any): void {
    const { metadata, field } = this.typeMirror;
    const isRequired = fieldValue !== undefined;
    if (metadata) {
      const { options } = metadata;
      if (options) {
        const { required } = options;
        if (required) {
          const message =
            typeof required === 'string'
              ? required
              : `The field "${field}" expected is required but received a ${String(
                  fieldValue
                )}".`;

          if (!isRequired) {
            throw ValidateException.create({
              field,
              fieldValue,
              message,
            });
          }
        }
      }
    }
  }

  /**
   * 前置转换，使用元数据的转换函数
   * @param fieldValue 字段值
   * @param allValues
   */
  public beforeTransform<T = any>(fieldValue: any, allValues: any): T {
    if (fieldValue === undefined) {
      return fieldValue;
    }
    const { metadata, field } = this.typeMirror;
    try {
      if (metadata) {
        const { options } = metadata;
        if (options) {
          const { transform } = options;
          if (transform && typeof transform === 'function') {
            fieldValue = transform(fieldValue, allValues);
          }
        }
      }
      return fieldValue;
    } catch (e) {
      throw CustomTransformException.create({
        field,
        fieldValue,
        message: `The field "${field}" custom transform exception.\r\n${
          (e as Error).message
        }`,
      });
    }
  }
}

export interface TransformPluginConstructor {
  new (transformer: ClassTransformer, type: TypeMirror): TransformPlugin;

  type: ClassConstructor;
}
