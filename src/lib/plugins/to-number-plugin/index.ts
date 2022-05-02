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

import { Utils } from '../../utils';
import { TransformPlugin } from '../../transform-plugin';
import { IValidator, validate } from '../../validate';
import validator from 'validator';
import { TypedMetadata } from '../../typed-metadata';
import { ValidateException } from '../../exceptions';

/**
 * Number转换插件
 */
export class ToNumberPlugin extends TransformPlugin {
  public static type = Number;

  /**
   * 类型验证
   */
  public validator(fieldValue: any): void {
    // 验证必须
    this.validateRequired(fieldValue);
    if (fieldValue !== undefined) {
      const { metadata, field } = this.typeMirror;
      // 先验证类型 系统规则
      const iValidators: IValidator[] = [
        {
          type: 'Number',
          validator: (value): boolean =>
            (typeof value === 'number' || value instanceof Number) &&
            !isNaN(Number(value)),
        },
      ];
      let nullable = false;
      // 设置手动添加的规则
      if (metadata) {
        const { options } = metadata;
        if (options) {
          nullable = !!options.nullable;
          const rules = TypedMetadata.mergeRule(options.rules || []);
          rules.forEach((rule) => {
            if (typeof rule === 'object' && rule !== null) {
              switch (rule.type) {
                case 'range':
                  iValidators.push({
                    type: rule.type,
                    message: rule.message,
                    validator: (value: number) => {
                      let state = true;
                      if (rule.min !== undefined && value < rule.min) {
                        state = false;
                      }
                      if (rule.max !== undefined && value > rule.max) {
                        state = false;
                      }
                      return state;
                    },
                  });
                  break;
                case 'Float':
                  iValidators.push({
                    type: rule.type,
                    message: rule.message,
                    validator: (value: number) =>
                      validator.isFloat(String(value), rule.options),
                  });
                  break;
                case 'Integer':
                  iValidators.push({
                    type: rule.type,
                    message: rule.message,
                    validator: (value: number) =>
                      validator.isInt(String(value), rule.options),
                  });
                  break;
                case 'Enum':
                  iValidators.push({
                    type: rule.type,
                    message: rule.message,
                    validator: (value) => (rule.enums || []).includes(value),
                  });
                  break;
                default:
                  throw ValidateException.create({
                    field,
                    fieldValue,
                    message: `The rule "${rule.type}" cannot be found.`,
                  });
              }
            }
          });
        }
      }
      if (nullable && fieldValue === null) {
        return;
      }
      // 验证
      validate(field, fieldValue, iValidators);
    }
  }

  /**
   * 转换成实例
   * @param values
   */
  public transform(values: any): number | undefined {
    values = this.beforeTransform(values);
    this.validator(values);
    return Utils.toNumber(values);
  }
}
