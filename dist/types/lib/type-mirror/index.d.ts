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
export declare class TypeMirror<T extends object = any, E extends TypeMirror | undefined = any> {
    type: () => ClassConstructor<T>;
    elementType: () => E;
    /**
     * array mirror
     * @param type
     */
    static createArrayMirror: (type: TypeMirror | ClassConstructor) => TypeMirror;
    /**
     * object mirror
     * @param type
     */
    static createObjectMirror: (type: ClassConstructor) => TypeMirror;
    /**
     * create Mirror
     * @param type
     * @param elementType
     */
    static from: <T_1 extends ClassConstructor<any>>(type: () => T_1, elementType?: (() => TypeMirror) | undefined) => TypeMirror;
    /**
     * set mirror
     * @param type
     */
    static createSetMirror(type: TypeMirror | ClassConstructor): TypeMirror;
    /**
     * map mirror
     * @param type
     */
    static createMapMirror(type: TypeMirror | ClassConstructor): TypeMirror;
    /**
     * promise mirror
     * @param type
     */
    static createPromiseMirror(type: TypeMirror | ClassConstructor): TypeMirror;
    /**
     * 字段名称
     */
    field: string;
    metadata: TypedMetadata;
    parent?: TypeMirror;
    /**
     * constructor
     * @param type
     * @param elementType
     */
    constructor(type: () => ClassConstructor<T>, elementType: () => E);
}
export interface WhereType {
    subType: ClassConstructor;
    wheres: Where[];
}
export declare type Where = Record<PropertyKey, any>;
