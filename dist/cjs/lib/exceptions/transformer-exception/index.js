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
exports.TransformerException = void 0;
var validate_exception_1 = require("../validate-exception");
var TransformerException = (function (_super) {
    __extends(TransformerException, _super);
    function TransformerException(field, filedValue, exceptions, fieldExceptions, message) {
        var _this = _super.call(this, field, filedValue, message) || this;
        _this.exceptions = exceptions;
        _this.fieldExceptions = fieldExceptions;
        _this.name = 'TransformerException';
        return _this;
    }
    TransformerException.create = function (options) {
        return new TransformerException(options.field, options.fieldValue, options.exceptions, options.fieldExceptions, options.message);
    };
    return TransformerException;
}(validate_exception_1.ValidateException));
exports.TransformerException = TransformerException;
