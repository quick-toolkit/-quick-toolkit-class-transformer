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
exports.ToBooleanPlugin = void 0;
var utils_1 = require("../../utils");
var transform_plugin_1 = require("../../transform-plugin");
var validate_1 = require("../../validate");
var ToBooleanPlugin = (function (_super) {
    __extends(ToBooleanPlugin, _super);
    function ToBooleanPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToBooleanPlugin.prototype.validator = function (fieldValue) {
        this.validateRequired(fieldValue);
        var _a = this.typeMirror, field = _a.field, metadata = _a.metadata;
        if (fieldValue !== undefined) {
            if (metadata &&
                metadata.options &&
                metadata.options.nullable &&
                fieldValue === null) {
                return;
            }
            (0, validate_1.validate)(field, fieldValue, [
                {
                    type: 'Boolean',
                    validator: function (values) {
                        return values instanceof Boolean ||
                            typeof values === 'boolean' ||
                            values === 'true' ||
                            values === 'false';
                    },
                },
            ]);
        }
    };
    ToBooleanPlugin.prototype.transform = function (values, allValues) {
        values = this.beforeTransform(values, allValues);
        this.validator(values);
        return utils_1.Utils.toBoolean(values);
    };
    ToBooleanPlugin.type = Boolean;
    return ToBooleanPlugin;
}(transform_plugin_1.TransformPlugin));
exports.ToBooleanPlugin = ToBooleanPlugin;
