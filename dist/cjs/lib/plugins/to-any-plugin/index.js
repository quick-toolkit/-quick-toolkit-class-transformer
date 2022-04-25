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
exports.ToAnyPlugin = void 0;
var transform_plugin_1 = require("../../transform-plugin");
var any_1 = require("../../any");
var ToAnyPlugin = (function (_super) {
    __extends(ToAnyPlugin, _super);
    function ToAnyPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToAnyPlugin.prototype.validator = function (fieldValue) {
        this.validateRequired(fieldValue);
    };
    ToAnyPlugin.prototype.transform = function (values) {
        values = this.beforeTransform(values);
        this.validator(values);
        return values;
    };
    ToAnyPlugin.type = any_1.Any;
    return ToAnyPlugin;
}(transform_plugin_1.TransformPlugin));
exports.ToAnyPlugin = ToAnyPlugin;
