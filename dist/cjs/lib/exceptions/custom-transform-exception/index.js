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
exports.CustomTransformException = void 0;
var exception_1 = require("../../exception");
var CustomTransformException = (function (_super) {
    __extends(CustomTransformException, _super);
    function CustomTransformException(field, fieldValue, message) {
        var _this = _super.call(this, message) || this;
        _this.field = field;
        _this.fieldValue = fieldValue;
        _this.name = 'CustomTransformException';
        return _this;
    }
    CustomTransformException.create = function (options) {
        return new CustomTransformException(options.field, options.fieldValue, options.message);
    };
    return CustomTransformException;
}(exception_1.Exception));
exports.CustomTransformException = CustomTransformException;
