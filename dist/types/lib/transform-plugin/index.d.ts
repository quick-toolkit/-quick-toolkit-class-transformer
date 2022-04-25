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
/**
 * @abstract
 * @class TransformPlugin
 */
export declare abstract class TransformPlugin {
    transformer: ClassTransformer;
    typeMirror: TypeMirror;
    static type: ClassConstructor;
    /**
     * 构造函数
     * @param transformer
     * @param typeMirror
     */
    constructor(transformer: ClassTransformer, typeMirror: TypeMirror);
    abstract validator(values: any): any;
    abstract transform(values: any): any;
    /**
     * 验证是否为必须
     * @param fieldValue
     */
    validateRequired(fieldValue: any): void;
    /**
     * 前置转换，使用元数据的转换函数
     * @param fieldValue 字段值
     */
    beforeTransform<T = any>(fieldValue: any): T;
}
export interface TransformPluginConstructor {
    new (transformer: ClassTransformer, type: TypeMirror): TransformPlugin;
    type: ClassConstructor;
}
