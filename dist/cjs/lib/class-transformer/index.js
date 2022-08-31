"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassTransformer = void 0;
var class_mirror_1 = require("@quick-toolkit/class-mirror");
var plugins = __importStar(require("../plugins"));
var plugins_1 = require("../plugins");
var type_mirror_1 = require("../type-mirror");
var allPlugins = new Map();
Object.values(plugins).forEach(function (o) { return allPlugins.set(o.type, o); });
var ClassTransformer = (function () {
    function ClassTransformer(options) {
        this.options = options;
    }
    ClassTransformer.register = function (plugin) {
        allPlugins.set(plugin.type, plugin);
    };
    ClassTransformer.unregister = function (plugin) {
        allPlugins.delete(plugin.type);
    };
    ClassTransformer.getArgumentsList = function (targetType, options) {
        var list = [];
        var classMirror = class_mirror_1.ClassMirror.reflect(targetType);
        if (options) {
            var newInstanceHandler_1 = options.newInstanceHandler;
            classMirror.getParameters().forEach(function (o) {
                if (newInstanceHandler_1) {
                    var result = newInstanceHandler_1(targetType, o);
                    if (result) {
                        list.push(result);
                    }
                    else {
                        list.push(undefined);
                    }
                }
                else {
                    list.push(undefined);
                }
            });
        }
        return list;
    };
    ClassTransformer.prototype.newInstance = function (targetType, options) {
        return Reflect.construct(targetType, ClassTransformer.getArgumentsList(targetType, options));
    };
    ClassTransformer.create = function (options) {
        return new ClassTransformer(options);
    };
    ClassTransformer.prototype.transform = function (type, values, allValues) {
        var _type = type instanceof type_mirror_1.TypeMirror ? type : type_mirror_1.TypeMirror.createObjectMirror(type);
        var Plugin = allPlugins.get(_type.type()) || plugins_1.ToObjectPlugin;
        values = new Plugin(this, _type).transform(values, allValues);
        return values;
    };
    return ClassTransformer;
}());
exports.ClassTransformer = ClassTransformer;
