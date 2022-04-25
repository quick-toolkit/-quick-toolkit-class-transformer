"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToObjectPlugin = void 0;
var transform_plugin_1 = require("../../transform-plugin");
var class_mirror_1 = require("@quick-toolkit/class-mirror");
var typed_decorate_1 = require("../../typed-decorate");
var utils_1 = require("../../utils");
var exceptions_1 = require("../../exceptions");
var exceptions_2 = require("../../exceptions");
var validate_1 = require("../../validate");
var ToObjectPlugin = (function (_super) {
    __extends(ToObjectPlugin, _super);
    function ToObjectPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToObjectPlugin.prototype.validator = function (fieldValue) {
        this.validateRequired(fieldValue);
        var field = this.typeMirror.field;
        if (fieldValue !== undefined) {
            (0, validate_1.validate)(field, fieldValue, [
                {
                    type: 'Object',
                    validator: function (value) { return value instanceof Object; },
                },
            ]);
        }
    };
    ToObjectPlugin.prototype.transform = function (values) {
        var _this = this;
        values = this.beforeTransform(values);
        var exceptions = [];
        var fieldExceptions = {};
        var typeMirror = this.typeMirror;
        var type = typeMirror.type();
        var allProperties = class_mirror_1.ClassMirror.reflect(type).getAllProperties(class_mirror_1.PropertyMirror);
        var newInstance = this.transformer.newInstance(type);
        allProperties.forEach(function (propertyMirror, propertyKey) {
            var value = values[propertyKey];
            if (value === undefined) {
                value = newInstance[propertyKey];
            }
            var allDecorates = propertyMirror.getAllDecorates(typed_decorate_1.TypedDecorate);
            allDecorates.forEach(function (decorate) {
                var metadata = decorate.metadata;
                if (metadata) {
                    var options = metadata.options;
                    if (options) {
                        var alias = options.alias;
                        if (alias && values[alias] !== undefined) {
                            value = values[alias];
                        }
                    }
                    var _subType = metadata.type;
                    if (_subType) {
                        _subType.field = typeMirror.field
                            ? [typeMirror.field, propertyKey].join('.')
                            : utils_1.Utils.toString(propertyKey);
                        var _subTypeConstructor = _subType.type();
                        if (_subTypeConstructor === undefined ||
                            _subTypeConstructor === Object) {
                            _subType.type = function () {
                                return propertyMirror.getDesignType();
                            };
                        }
                        try {
                            var newValue = _this.transformer.transform(_subType, value);
                            if (newValue !== undefined) {
                                value = newValue;
                            }
                        }
                        catch (e) {
                            if (e instanceof exceptions_1.ValidateException) {
                                exceptions.push(e);
                                var fieldsError = fieldExceptions[e.field];
                                if (!fieldsError) {
                                    fieldExceptions[e.field] = [e];
                                }
                                else {
                                    fieldsError.push(e);
                                }
                            }
                        }
                    }
                }
            });
            newInstance[propertyKey] = value;
        });
        if (exceptions.length) {
            throw exceptions_2.TransformerException.create({
                field: typeMirror.field,
                fieldValue: values,
                exceptions: exceptions,
                fieldExceptions: fieldExceptions,
                message: "The value ".concat(typeof values === 'object' ? JSON.stringify(values) : String(values), " can't transform to type \"").concat(type.name, "\"."),
            });
        }
        return newInstance;
    };
    ToObjectPlugin.type = Object;
    return ToObjectPlugin;
}(transform_plugin_1.TransformPlugin));
exports.ToObjectPlugin = ToObjectPlugin;
