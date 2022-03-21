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

import { ClassConstructor, PropertyMirror } from '@quick-toolkit/class-mirror';
import { TypeMirror } from '../../type-mirror';
import {
  LengthRule,
  RangeRule,
  TypedMetadata,
  TypedMetadataOptions,
} from '../../typed-metadata';
import { TypedDecorate } from '../../typed-decorate';

/**
 * TypedArray decorator
 * @param options
 */
export function TypedArray<T extends object = any>(
  options?: Omit<TypedMetadataOptions<T[]>, 'rules'> & TypedArrayOps
): PropertyDecorator;
/**
 * TypedArray decorator
 * @param type
 * @param options
 */
export function TypedArray<T extends object = any>(
  type?: TypeMirror<T> | ClassConstructor<T>,
  options?: Omit<TypedMetadataOptions<T[]>, 'rules'> & TypedArrayOps
): PropertyDecorator;
/**
 * 实现方法
 * @constructor
 */
export function TypedArray(...args: any[]): PropertyDecorator {
  const [a, b = {}] = args;
  if (args.length === 1) {
    if (typeof a === 'function' || a instanceof TypeMirror) {
      return PropertyMirror.createDecorator(
        new TypedDecorate(
          TypedMetadata.create(
            a instanceof TypeMirror ? a : TypeMirror.createArrayMirror(a),
            {}
          )
        )
      );
    } else {
      return PropertyMirror.createDecorator(
        new TypedDecorate(
          TypedMetadata.create(TypeMirror.createObjectMirror(Array), a)
        )
      );
    }
  }
  return PropertyMirror.createDecorator(
    new TypedDecorate(
      TypedMetadata.create(
        a instanceof TypeMirror ? a : TypeMirror.createArrayMirror(a),
        b
      )
    )
  );
}

export interface TypedArrayOps {
  rules?: LengthRule | RangeRule | Array<LengthRule | RangeRule>;
}
