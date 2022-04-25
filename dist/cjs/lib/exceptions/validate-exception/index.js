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
exports.ValidateException = void 0;
var exception_1 = require("../../exception");
var ValidateException = (function (_super) {
    __extends(ValidateException, _super);
    function ValidateException(field, fieldValue, message) {
        var _this = _super.call(this, message) || this;
        _this.field = field;
        _this.fieldValue = fieldValue;
        _this.name = 'ValidateException';
        return _this;
    }
    ValidateException.create = function (options) {
        return new ValidateException(options.field, options.fieldValue, options.message);
    };
    return ValidateException;
}(exception_1.Exception));
exports.ValidateException = ValidateException;
