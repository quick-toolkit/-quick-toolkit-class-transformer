"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
var validate_exception_1 = require("../exceptions/validate-exception");
function validate(field, fieldValue, validators) {
    for (var _i = 0, validators_1 = validators; _i < validators_1.length; _i++) {
        var info = validators_1[_i];
        var type = info.type, message = info.message;
        try {
            if (!info.validator(fieldValue)) {
                throw validate_exception_1.ValidateException.create({
                    field: field,
                    fieldValue: fieldValue,
                    message: typeof message === 'function'
                        ? message(fieldValue)
                        : typeof message === 'string'
                            ? message
                            : "The field \"".concat(field, "\" expected a \"").concat(type, "\" but received a type ").concat(typeof fieldValue, " \"").concat(fieldValue, "\"."),
                });
            }
        }
        catch (e) {
            if (e instanceof validate_exception_1.ValidateException) {
                throw e;
            }
            else {
                throw validate_exception_1.ValidateException.create({
                    field: field,
                    fieldValue: fieldValue,
                    message: typeof e === 'object' && e !== null ? e.message : '',
                });
            }
        }
    }
}
exports.validate = validate;
