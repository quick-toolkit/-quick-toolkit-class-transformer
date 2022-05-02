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
exports.ToMapPlugin = void 0;
var transform_plugin_1 = require("../../transform-plugin");
var type_mirror_1 = require("../../type-mirror");
var typed_metadata_1 = require("../../typed-metadata");
var exceptions_1 = require("../../exceptions");
var validate_1 = require("../../validate");
var exceptions_2 = require("../../exceptions");
var ToMapPlugin = (function (_super) {
    __extends(ToMapPlugin, _super);
    function ToMapPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToMapPlugin.prototype.validator = function (fieldValue) {
        this.validateRequired(fieldValue);
        if (fieldValue !== undefined) {
            var _a = this.typeMirror, metadata = _a.metadata, field_1 = _a.field;
            var iValidators_1 = [
                {
                    type: 'Map',
                    validator: function (value) { return value instanceof Map; },
                },
            ];
            var nullable = false;
            if (metadata) {
                var options = metadata.options;
                if (options) {
                    nullable = !!options.nullable;
                    var rules = typed_metadata_1.TypedMetadata.mergeRule(options.rules || []);
                    rules.forEach(function (rule) {
                        switch (rule.type) {
                            case 'length':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) {
                                        return value.size === rule.len;
                                    },
                                });
                                break;
                            case 'range':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) {
                                        var state = true;
                                        if (rule.min !== undefined && value.size < rule.min) {
                                            state = false;
                                        }
                                        if (rule.max !== undefined && value.size > rule.max) {
                                            state = false;
                                        }
                                        return state;
                                    },
                                });
                                break;
                            case 'Enum':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) {
                                        return Array.from(value.values()).every(function (o) {
                                            return (rule.enums || []).includes(o);
                                        });
                                    },
                                });
                                break;
                            default:
                                throw exceptions_1.ValidateException.create({
                                    field: field_1,
                                    fieldValue: fieldValue,
                                    message: "The rule \"".concat(rule.type, "\" cannot be found."),
                                });
                        }
                    });
                }
            }
            if (nullable && fieldValue === null) {
                return;
            }
            (0, validate_1.validate)(field_1, fieldValue, iValidators_1);
        }
    };
    ToMapPlugin.prototype.transform = function (values) {
        var _this = this;
        values = this.beforeTransform(values);
        this.validator(values);
        var _a = this.typeMirror, elementType = _a.elementType, metadata = _a.metadata, field = _a.field;
        var typeMirror = elementType();
        var exceptions = [];
        var fieldExceptions = {};
        var newValue = new Map();
        if (typeMirror) {
            values.forEach(function (value, key) {
                var newTypeMirror = type_mirror_1.TypeMirror.from(typeMirror.type, typeMirror.elementType);
                newTypeMirror.field = [field, key].join('.');
                newTypeMirror.parent = _this.typeMirror;
                var options = {};
                newTypeMirror.metadata = {
                    type: newTypeMirror,
                    options: options,
                };
                if (metadata && metadata.options && metadata.options.elementRules) {
                    options.rules = metadata.options.elementRules;
                }
                try {
                    newValue.set(key, _this.transformer.transform(newTypeMirror, value));
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
            });
        }
        if (exceptions.length) {
            var _type = 'any';
            if (typeMirror) {
                var _t = typeMirror.type();
                if (_t) {
                    _type = _t.name;
                }
            }
            throw exceptions_2.TransformerException.create({
                field: field,
                fieldValue: values,
                exceptions: exceptions,
                fieldExceptions: fieldExceptions,
                message: "The value \"".concat(typeof values === 'object' ? JSON.stringify(values) : String(values), "\" can't transform to \"Map<PropertyKey, ").concat(_type, ">\""),
            });
        }
        return newValue;
    };
    ToMapPlugin.type = Map;
    return ToMapPlugin;
}(transform_plugin_1.TransformPlugin));
exports.ToMapPlugin = ToMapPlugin;
