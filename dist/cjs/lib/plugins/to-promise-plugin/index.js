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
exports.ToPromisePlugin = void 0;
var transform_plugin_1 = require("../../transform-plugin");
var validate_1 = require("../../validate");
var exceptions_1 = require("../../exceptions");
var utils_1 = require("../../utils");
var ToPromisePlugin = (function (_super) {
    __extends(ToPromisePlugin, _super);
    function ToPromisePlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToPromisePlugin.prototype.validator = function (fieldValue) {
        this.validateRequired(fieldValue);
        if (fieldValue !== undefined) {
            var _a = this.typeMirror, field = _a.field, metadata = _a.metadata;
            var iValidators = [
                {
                    type: 'Promise',
                    validator: function (value) { return utils_1.Utils.isPromise(value); },
                },
            ];
            if (metadata &&
                metadata.options &&
                metadata.options.nullable &&
                fieldValue === null) {
                return;
            }
            (0, validate_1.validate)(field, fieldValue, iValidators);
        }
    };
    ToPromisePlugin.prototype.transform = function (values) {
        var _this = this;
        values = this.beforeTransform(values);
        this.validator(values);
        var _a = this.typeMirror, elementType = _a.elementType, metadata = _a.metadata, field = _a.field;
        var typeMirror = elementType();
        var exceptions = [];
        var fieldExceptions = {};
        if (typeMirror) {
            var options = {};
            typeMirror.metadata = {
                type: typeMirror,
                options: options,
            };
            if (metadata && metadata.options && metadata.options.elementRules) {
                options.rules = metadata.options.elementRules;
            }
            values = new Promise(function (resolve, reject) {
                typeMirror.field = field;
                typeMirror.parent = _this.typeMirror;
                values
                    .then(function (res) { return _this.transformer.transform(typeMirror, res); })
                    .catch(function (err) { return reject(err); });
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
            throw exceptions_1.TransformerException.create({
                field: field,
                fieldValue: values,
                exceptions: exceptions,
                fieldExceptions: fieldExceptions,
                message: "The value \"".concat(typeof values === 'object' ? JSON.stringify(values) : String(values), "\" can't transform to \"Promise<").concat(_type, ">\""),
            });
        }
        return values;
    };
    ToPromisePlugin.type = Promise;
    return ToPromisePlugin;
}(transform_plugin_1.TransformPlugin));
exports.ToPromisePlugin = ToPromisePlugin;
