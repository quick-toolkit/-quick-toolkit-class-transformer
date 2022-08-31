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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToNumberPlugin = void 0;
var utils_1 = require("../../utils");
var transform_plugin_1 = require("../../transform-plugin");
var validate_1 = require("../../validate");
var validator_1 = __importDefault(require("validator"));
var typed_metadata_1 = require("../../typed-metadata");
var exceptions_1 = require("../../exceptions");
var ToNumberPlugin = (function (_super) {
    __extends(ToNumberPlugin, _super);
    function ToNumberPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToNumberPlugin.prototype.validator = function (fieldValue) {
        this.validateRequired(fieldValue);
        if (fieldValue !== undefined) {
            var _a = this.typeMirror, metadata = _a.metadata, field_1 = _a.field;
            var iValidators_1 = [
                {
                    type: 'Number',
                    validator: function (value) {
                        return (typeof value === 'number' || value instanceof Number) &&
                            !isNaN(Number(value));
                    },
                },
            ];
            var nullable = false;
            if (metadata) {
                var options = metadata.options;
                if (options) {
                    nullable = !!options.nullable;
                    var rules = typed_metadata_1.TypedMetadata.mergeRule(options.rules || []);
                    rules.forEach(function (rule) {
                        if (typeof rule === 'object' && rule !== null) {
                            switch (rule.type) {
                                case 'range':
                                    iValidators_1.push({
                                        type: rule.type,
                                        message: rule.message,
                                        validator: function (value) {
                                            var state = true;
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
                                    iValidators_1.push({
                                        type: rule.type,
                                        message: rule.message,
                                        validator: function (value) {
                                            return validator_1.default.isFloat(String(value), rule.options);
                                        },
                                    });
                                    break;
                                case 'Integer':
                                    iValidators_1.push({
                                        type: rule.type,
                                        message: rule.message,
                                        validator: function (value) {
                                            return validator_1.default.isInt(String(value), rule.options);
                                        },
                                    });
                                    break;
                                case 'Enum':
                                    iValidators_1.push({
                                        type: rule.type,
                                        message: rule.message,
                                        validator: function (value) { return (rule.enums || []).includes(value); },
                                    });
                                    break;
                                default:
                                    throw exceptions_1.ValidateException.create({
                                        field: field_1,
                                        fieldValue: fieldValue,
                                        message: "The rule \"".concat(rule.type, "\" cannot be found."),
                                    });
                            }
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
    ToNumberPlugin.prototype.transform = function (values, allValues) {
        values = this.beforeTransform(values, allValues);
        this.validator(values);
        return utils_1.Utils.toNumber(values);
    };
    ToNumberPlugin.type = Number;
    return ToNumberPlugin;
}(transform_plugin_1.TransformPlugin));
exports.ToNumberPlugin = ToNumberPlugin;
