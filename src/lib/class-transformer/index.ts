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
  ClassConstructor,
  ClassMirror,
  ParameterMirror,
} from '@quick-toolkit/class-mirror';
import { TransformPluginConstructor } from '../transform-plugin';
import * as plugins from '../plugins';
import { ToObjectPlugin } from '../plugins';
import { TypeMirror } from '../type-mirror';

/**
 * 插件集合
 */
const allPlugins: Map<ClassConstructor, TransformPluginConstructor> = new Map();
// 注册默认插件
Object.values(plugins).forEach((o) => allPlugins.set(o.type, o));

/**
 * @class ClassTransformer
 */
export class ClassTransformer {
  /**
   * 注册插件
   * @param plugin
   */
  public static register(plugin: TransformPluginConstructor): void {
    allPlugins.set(plugin.type, plugin);
  }

  /**
   * 卸载插件
   * @param plugin
   */
  public static unregister(plugin: TransformPluginConstructor): void {
    allPlugins.delete(plugin.type);
  }

  /**
   * 获取参数列表
   * @param targetType 目标类型
   * @param options 实例选项参数
   */
  public static getArgumentsList(
    targetType: ClassConstructor,
    options?: ClassTransformerOptions
  ): any[] {
    const list: any[] = [];
    const classMirror = ClassMirror.reflect(targetType);
    if (options) {
      const { newInstanceHandler } = options;
      classMirror.getParameters().forEach((o) => {
        if (newInstanceHandler) {
          const result = newInstanceHandler(targetType, o);
          if (result) {
            list.push(result);
          } else {
            list.push(undefined);
          }
        } else {
          list.push(undefined);
        }
      });
    }
    return list;
  }

  /**
   * 创建实例
   * @param targetType 目标类型
   * @param options 实例选项参数
   */
  public newInstance<T extends {}>(
    targetType: ClassConstructor<T>,
    options?: ClassTransformerOptions
  ): T {
    return Reflect.construct(
      targetType,
      ClassTransformer.getArgumentsList(targetType, options)
    );
  }

  /**
   * 创建实例
   * @param options 实例选项参数
   */
  public static create(options?: ClassTransformerOptions): ClassTransformer {
    return new ClassTransformer(options);
  }

  /**
   * 构造函数
   * @param options
   */
  public constructor(public options?: ClassTransformerOptions) {}

  /**
   * 数参数并转化为数据类型
   * @param type
   * @param values 转化的参数
   * @param allValues
   */
  public transform<T extends object>(
    type: ClassConstructor<T> | TypeMirror<T>,
    values: Partial<Record<keyof T, T[keyof T] | any>>,
    allValues?: any
  ): T {
    const _type =
      type instanceof TypeMirror ? type : TypeMirror.createObjectMirror(type);
    const Plugin: TransformPluginConstructor =
      allPlugins.get(_type.type()) || ToObjectPlugin;
    values = new Plugin(this, _type).transform(values, allValues);
    return values as T;
  }
}

export interface ClassTransformerOptions {
  newInstanceHandler?: <T extends {}>(
    targetType: ClassConstructor<T>,
    o: ParameterMirror
  ) => any;
}
