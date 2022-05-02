"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformPlugin = void 0;
var custom_transform_exception_1 = require("../exceptions/custom-transform-exception");
var validate_exception_1 = require("../exceptions/validate-exception");
var TransformPlugin = (function () {
    function TransformPlugin(transformer, typeMirror) {
        this.transformer = transformer;
        this.typeMirror = typeMirror;
    }
    TransformPlugin.prototype.validateRequired = function (fieldValue) {
        var _a = this.typeMirror, metadata = _a.metadata, field = _a.field;
        var isRequired = fieldValue !== undefined;
        if (metadata) {
            var options = metadata.options;
            if (options) {
                var required = options.required;
                if (required) {
                    var message = typeof required === 'string'
                        ? required
                        : "The field \"".concat(field, "\" expected is required but received a ").concat(String(fieldValue), "\".");
                    if (!isRequired) {
                        throw validate_exception_1.ValidateException.create({
                            field: field,
                            fieldValue: fieldValue,
                            message: message,
                        });
                    }
                }
            }
        }
    };
    TransformPlugin.prototype.beforeTransform = function (fieldValue) {
        if (fieldValue === undefined) {
            return fieldValue;
        }
        var _a = this.typeMirror, metadata = _a.metadata, field = _a.field;
        try {
            if (metadata) {
                var options = metadata.options;
                if (options) {
                    var transform = options.transform;
                    if (transform) {
                        var newValue = transform(fieldValue);
                        if (newValue !== undefined) {
                            fieldValue = newValue;
                        }
                    }
                }
            }
            return fieldValue;
        }
        catch (e) {
            throw custom_transform_exception_1.CustomTransformException.create({
                field: field,
                fieldValue: fieldValue,
                message: "The field \"".concat(field, "\" custom transform exception.\r\n").concat(e.message),
            });
        }
    };
    TransformPlugin.type = Object;
    return TransformPlugin;
}());
exports.TransformPlugin = TransformPlugin;
