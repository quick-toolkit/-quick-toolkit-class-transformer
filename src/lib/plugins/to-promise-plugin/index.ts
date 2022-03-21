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

import { TransformPlugin } from '../../transform-plugin';
import { TypeMirror } from '../../type-mirror';
import { ValidateException } from '../../exceptions';
import { IValidator, validate } from '../../validate';
import {
  TransformerException,
  ValidateExceptionFields,
} from '../../exceptions';
import { Utils } from '../../utils';

/**
 * Promise 串转换插件
 */
export class ToPromisePlugin extends TransformPlugin {
  public static type = Promise;

  /**
   * 类型验证
   */
  public validator(fieldValue: any): void {
    // 验证必须
    this.validateRequired(fieldValue);
    if (fieldValue !== undefined) {
      const { field } = this.typeMirror;
      // 先验证类型 系统规则
      const iValidators: IValidator[] = [
        {
          type: 'Promise',
          validator: (value): boolean => Utils.isPromise(value),
        },
      ];
      // 验证
      validate(field, fieldValue, iValidators);
    }
  }

  /**
   * 转换成实例
   * @param values
   */
  public transform(values: Promise<any>): Promise<any> {
    values = this.beforeTransform(values);
    this.validator(values);
    const { elementType, field } = this.typeMirror;
    const typeMirror: TypeMirror = elementType();
    const exceptions: ValidateException[] = [];
    const fieldExceptions: ValidateExceptionFields = {};

    // 如果有子类型
    if (typeMirror) {
      values = new Promise((resolve, reject) => {
        typeMirror.field = field;
        typeMirror.parent = this.typeMirror;
        values
          .then((res) => this.transformer.transform(typeMirror, res))
          .catch((err) => reject(err));
      });
    }

    // 统计异常
    if (exceptions.length) {
      let _type = 'any';
      if (typeMirror) {
        const _t = typeMirror.type();
        if (_t) {
          _type = _t.name;
        }
      }
      throw TransformerException.create({
        field,
        fieldValue: values,
        exceptions,
        fieldExceptions,
        message: `The value "${
          typeof values === 'object' ? JSON.stringify(values) : String(values)
        }" can't transform to "Promise<${_type}>"`,
      });
    }
    // 直接返回
    return values;
  }
}
