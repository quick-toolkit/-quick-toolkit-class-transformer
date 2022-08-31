"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
var Exception = (function () {
    function Exception(message) {
        if (message === void 0) { message = ''; }
        this.message = message;
        this.name = 'Exception';
    }
    return Exception;
}());
exports.Exception = Exception;
