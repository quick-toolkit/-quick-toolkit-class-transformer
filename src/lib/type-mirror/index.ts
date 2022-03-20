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
import { TypedMetadata } from '../typed-metadata';
/**
 * @abstract TypeMirror<T>
 */
export class TypeMirror<
  T extends object = any,
  E extends TypeMirror | undefined = any
> {
  /**
   * array mirror
   * @param type
   */
  public static createArrayMirror = (
    type: TypeMirror | ClassConstructor
  ): TypeMirror => {
    return new TypeMirror(
      () => Array,
      () =>
        type instanceof TypeMirror ? type : TypeMirror.createObjectMirror(type)
    );
  };

  /**
   * object mirror
   * @param type
   */
  public static createObjectMirror = (type: ClassConstructor): TypeMirror => {
    return new TypeMirror(
      () => type,
      () => undefined
    );
  };

  /**
   * create Mirror
   * @param type
   * @param elementType
   */
  public static from = <T extends ClassConstructor>(
    type: () => T,
    elementType?: () => TypeMirror
  ): TypeMirror => {
    return new TypeMirror(
      type,
      elementType ? elementType : (): undefined => undefined
    );
  };

  /**
   * set mirror
   * @param type
   */
  public static createSetMirror(
    type: TypeMirror | ClassConstructor
  ): TypeMirror {
    return new TypeMirror(
      () => Set,
      () =>
        type instanceof TypeMirror ? type : TypeMirror.createObjectMirror(type)
    );
  }

  /**
   * map mirror
   * @param type
   */
  public static createMapMirror(
    type: TypeMirror | ClassConstructor
  ): TypeMirror {
    return new TypeMirror(
      () => Map,
      () =>
        type instanceof TypeMirror ? type : TypeMirror.createObjectMirror(type)
    );
  }

  /**
   * promise mirror
   * @param type
   */
  public static createPromiseMirror(
    type: TypeMirror | ClassConstructor
  ): TypeMirror {
    return new TypeMirror(
      () => Promise,
      () =>
        type instanceof TypeMirror ? type : TypeMirror.createObjectMirror(type)
    );
  }

  /**
   * 字段名称
   */
  public field = '';

  public metadata: TypedMetadata;

  public parent?: TypeMirror;

  /**
   * constructor
   * @param type
   * @param elementType
   */
  public constructor(
    public type: () => ClassConstructor<T>,
    public elementType: () => E
  ) {
    const e = elementType();
    if (e) {
      e.parent = this;
    }
  }
}

export interface WhereType {
  subType: ClassConstructor;
  wheres: Where[];
}

export type Where = Record<PropertyKey, any>;
