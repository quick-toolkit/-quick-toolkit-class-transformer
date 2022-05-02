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
import { ClassConstructor, ParameterMirror } from '@quick-toolkit/class-mirror';
import { TransformPluginConstructor } from '../transform-plugin';
import { TypeMirror } from '../type-mirror';
/**
 * @class ClassTransformer
 */
export declare class ClassTransformer {
    options?: ClassTransformerOptions | undefined;
    /**
     * 注册插件
     * @param plugin
     */
    static register(plugin: TransformPluginConstructor): void;
    /**
     * 卸载插件
     * @param plugin
     */
    static unregister(plugin: TransformPluginConstructor): void;
    /**
     * 获取参数列表
     * @param targetType 目标类型
     * @param options 实例选项参数
     */
    static getArgumentsList(targetType: ClassConstructor, options?: ClassTransformerOptions): any[];
    /**
     * 创建实例
     * @param targetType 目标类型
     * @param options 实例选项参数
     */
    newInstance<T extends {}>(targetType: ClassConstructor<T>, options?: ClassTransformerOptions): T;
    /**
     * 创建实例
     * @param options 实例选项参数
     */
    static create(options?: ClassTransformerOptions): ClassTransformer;
    /**
     * 构造函数
     * @param options
     */
    constructor(options?: ClassTransformerOptions | undefined);
    /**
     * 数参数并转化为数据类型
     * @param type
     * @param values 转化的参数
     */
    transform<T extends object>(type: ClassConstructor<T> | TypeMirror<T>, values: Partial<Record<keyof T, T[keyof T] | any>>): T;
}
export interface ClassTransformerOptions {
    newInstanceHandler?: <T extends {}>(targetType: ClassConstructor<T>, o: ParameterMirror) => any;
}
