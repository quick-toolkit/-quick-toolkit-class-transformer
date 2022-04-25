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
exports.ToDatePlugin = void 0;
var utils_1 = require("../../utils");
var transform_plugin_1 = require("../../transform-plugin");
var validate_1 = require("../../validate");
var ToDatePlugin = (function (_super) {
    __extends(ToDatePlugin, _super);
    function ToDatePlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToDatePlugin.prototype.validator = function (fieldValue) {
        var field = this.typeMirror.field;
        this.validateRequired(fieldValue);
        if (fieldValue !== undefined) {
            (0, validate_1.validate)(field, fieldValue, [
                {
                    type: 'Date',
                    validator: function (values) {
                        return values instanceof Date && !isNaN(values.getTime());
                    },
                },
            ]);
        }
    };
    ToDatePlugin.prototype.transform = function (values) {
        values = this.beforeTransform(values);
        this.validator(values);
        return utils_1.Utils.toDate(values);
    };
    ToDatePlugin.type = Date;
    return ToDatePlugin;
}(transform_plugin_1.TransformPlugin));
exports.ToDatePlugin = ToDatePlugin;