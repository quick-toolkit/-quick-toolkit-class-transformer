"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformPlugin = void 0;
var exceptions_1 = require("../exceptions");
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
                        throw exceptions_1.ValidateException.create({
                            field: field,
                            fieldValue: fieldValue,
                            message: message,
                        });
                    }
                }
            }
        }
    };
    TransformPlugin.prototype.beforeTransform = function (fieldValue, allValues) {
        if (fieldValue === undefined) {
            return fieldValue;
        }
        var _a = this.typeMirror, metadata = _a.metadata, field = _a.field;
        try {
            if (metadata) {
                var options = metadata.options;
                if (options) {
                    var transform = options.transform;
                    if (transform && typeof transform === 'function') {
                        fieldValue = transform(fieldValue, allValues);
                    }
                }
            }
            return fieldValue;
        }
        catch (e) {
            throw exceptions_1.CustomTransformException.create({
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
