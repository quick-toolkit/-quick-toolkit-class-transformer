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
import {
  ClassConstructor,
  ClassMirror,
  PropertyMirror,
} from '@quick-toolkit/class-mirror';
import { TypedDecorate } from '../../typed-decorate';
import { Utils } from '../../utils';
import { ValidateException } from '../../exceptions/validate-exception';
import {
  TransformerException,
  ValidateExceptionFields,
} from '../../exceptions';
import { validate } from '../../validate';

/**
 * 字符串转换插件
 */
export class ToObjectPlugin extends TransformPlugin {
  public static type = Object;

  /**
   * 类型验证
   */
  public validator(fieldValue: any): void {
    this.validateRequired(fieldValue);
    const { field } = this.typeMirror;
    if (fieldValue !== undefined) {
      validate(field, fieldValue, [
        {
          type: 'Object',
          validator: (value): boolean => value instanceof Object,
        },
      ]);
    }
  }

  /**
   * 转换成实例
   * @param values
   */
  public transform(values: any): any {
    values = this.beforeTransform(values);
    const exceptions: ValidateException[] = [];
    const fieldExceptions: ValidateExceptionFields = {};
    const { typeMirror } = this;
    const type = typeMirror.type();
    const allProperties =
      ClassMirror.reflect(type).getAllProperties(PropertyMirror);
    const newInstance = this.transformer.newInstance(type);

    // 循环所有成员
    allProperties.forEach((propertyMirror, propertyKey) => {
      let value = values[propertyKey];
      if (value === undefined) {
        value = newInstance[propertyKey];
      }
      const allDecorates = propertyMirror.getAllDecorates(TypedDecorate);
      allDecorates.forEach((decorate) => {
        const { metadata } = decorate;
        if (metadata) {
          const { options } = metadata;
          if (options) {
            const { alias } = options;
            // 从别名取参数
            if (alias && values[alias] !== undefined) {
              value = values[alias];
            }
          }
          const _subType = metadata.type;
          if (_subType) {
            _subType.field = typeMirror.field
              ? [typeMirror.field, propertyKey].join('.')
              : Utils.toString(propertyKey);
            const _subTypeConstructor = _subType.type();
            if (
              _subTypeConstructor === undefined ||
              _subTypeConstructor === Object
            ) {
              _subType.type = (): ClassConstructor =>
                propertyMirror.getDesignType();
            }
            try {
              const newValue = this.transformer.transform(_subType, value);
              if (newValue !== undefined) {
                value = newValue;
              }
            } catch (e) {
              if (e instanceof ValidateException) {
                exceptions.push(e);
                const fieldsError = fieldExceptions[e.field];
                if (!fieldsError) {
                  fieldExceptions[e.field] = [e];
                } else {
                  fieldsError.push(e);
                }
              }
            }
          }
        }
      });
      newInstance[propertyKey] = value;
    });

    // 统计异常
    if (exceptions.length) {
      throw TransformerException.create({
        field: typeMirror.field,
        fieldValue: values,
        exceptions,
        fieldExceptions,
        message: `The value ${
          typeof values === 'object' ? JSON.stringify(values) : String(values)
        } can't transform to type "${type.name}".`,
      });
    }

    // 直接返回
    return newInstance;
  }
}
