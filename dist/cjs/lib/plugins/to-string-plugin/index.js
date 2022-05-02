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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToStringPlugin = void 0;
var utils_1 = require("../../utils");
var transform_plugin_1 = require("../../transform-plugin");
var validate_1 = require("../../validate");
var validator_1 = __importDefault(require("validator"));
var typed_metadata_1 = require("../../typed-metadata");
var exceptions_1 = require("../../exceptions");
var ToStringPlugin = (function (_super) {
    __extends(ToStringPlugin, _super);
    function ToStringPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToStringPlugin.prototype.validator = function (fieldValue) {
        this.validateRequired(fieldValue);
        if (fieldValue !== undefined) {
            var _a = this.typeMirror, metadata = _a.metadata, field_1 = _a.field;
            var iValidators_1 = [
                {
                    type: 'String',
                    validator: function (value) {
                        return typeof value === 'string' || value instanceof String;
                    },
                },
            ];
            var nullable = false;
            if (metadata) {
                var options = metadata.options;
                if (options) {
                    nullable = !!options.nullable;
                    var rules = typed_metadata_1.TypedMetadata.mergeRule(options.rules || []);
                    rules.forEach(function (rule) {
                        switch (rule.type) {
                            case 'Base32':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isBase32,
                                });
                                break;
                            case 'Base58':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isBase58,
                                });
                                break;
                            case 'Base64':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isBase64,
                                });
                                break;
                            case 'BIC':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isBIC,
                                });
                                break;
                            case 'BtcAddress':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isBtcAddress,
                                });
                                break;
                            case 'Currency':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) {
                                        return validator_1.default.isCurrency(value, rule.options);
                                    },
                                });
                                break;
                            case 'DataURI':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isDataURI,
                                });
                                break;
                            case 'Decimal':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) {
                                        return validator_1.default.isDecimal(value, rule.options);
                                    },
                                });
                                break;
                            case 'Date':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) { return validator_1.default.isDate(value, rule.options); },
                                });
                                break;
                            case 'EthereumAddress':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isEthereumAddress,
                                });
                                break;
                            case 'Email':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) { return validator_1.default.isEmail(value, rule.options); },
                                });
                                break;
                            case 'Enum':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) {
                                        return (rule.enums || []).includes(value);
                                    },
                                });
                                break;
                            case 'FullWidth':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isFullWidth,
                                });
                                break;
                            case 'FQDN':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) { return validator_1.default.isFQDN(value, rule.options); },
                                });
                                break;
                            case 'HexColor':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isHexColor,
                                });
                                break;
                            case 'HSL':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isHSL,
                                });
                                break;
                            case 'Hexadecimal':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isHexadecimal,
                                });
                                break;
                            case 'HalfWidth':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isHalfWidth,
                                });
                                break;
                            case 'IBAN':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isIBAN,
                                });
                                break;
                            case 'ISIN':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isISIN,
                                });
                                break;
                            case 'ISO4217':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isISO4217,
                                });
                                break;
                            case 'ISRC':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isISRC,
                                });
                                break;
                            case 'IdentityCard':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) {
                                        return validator_1.default.isIdentityCard(value, rule.options);
                                    },
                                });
                                break;
                            case 'ISSN':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) { return validator_1.default.isISSN(value, rule.options); },
                                });
                                break;
                            case 'IP':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) { return validator_1.default.isIP(value, rule.version); },
                                });
                                break;
                            case 'IPRange':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) {
                                        return validator_1.default.isIPRange(value, rule.version);
                                    },
                                });
                                break;
                            case 'JSON':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isJSON,
                                });
                                break;
                            case 'JWT':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isJWT,
                                });
                                break;
                            case 'LatLong':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isLatLong,
                                });
                                break;
                            case 'Locale':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isLocale,
                                });
                                break;
                            case 'Lowercase':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isLowercase,
                                });
                                break;
                            case 'MongoId':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isMongoId,
                                });
                                break;
                            case 'MD5':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isMD5,
                                });
                                break;
                            case 'MagnetURI':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isMagnetURI,
                                });
                                break;
                            case 'MobilePhone':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) {
                                        return validator_1.default.isMobilePhone(value, rule.locale, rule.options);
                                    },
                                });
                                break;
                            case 'MimeType':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isMimeType,
                                });
                                break;
                            case 'MACAddress':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) {
                                        return validator_1.default.isMACAddress(value, rule.options);
                                    },
                                });
                                break;
                            case 'Numeric':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) {
                                        return validator_1.default.isNumeric(value, rule.options);
                                    },
                                });
                                break;
                            case 'PassportNumber':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) {
                                        return validator_1.default.isPassportNumber(value, rule.countryCode);
                                    },
                                });
                                break;
                            case 'Port':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isPort,
                                });
                                break;
                            case 'RFC3339':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isRFC3339,
                                });
                                break;
                            case 'RgbColor':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) {
                                        return validator_1.default.isRgbColor(value, rule.includePercentValues);
                                    },
                                });
                                break;
                            case 'range':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) {
                                        var state = true;
                                        if (rule.min !== undefined && value.length < rule.min) {
                                            state = false;
                                        }
                                        if (rule.max !== undefined && value.length > rule.max) {
                                            state = false;
                                        }
                                        return state;
                                    },
                                });
                                break;
                            case 'SemVer':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isSemVer,
                                });
                                break;
                            case 'Slug':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isSlug,
                                });
                                break;
                            case 'SurrogatePair':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isSurrogatePair,
                                });
                                break;
                            case 'Url':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) { return validator_1.default.isURL(value, rule.options); },
                                });
                                break;
                            case 'UUID':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: function (value) { return validator_1.default.isUUID(value, rule.version); },
                                });
                                break;
                            case 'Uppercase':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isUppercase,
                                });
                                break;
                            case 'VariableWidth' + '':
                                iValidators_1.push({
                                    type: rule.type,
                                    message: rule.message,
                                    validator: validator_1.default.isVariableWidth,
                                });
                                break;
                            default:
                                throw exceptions_1.ValidateException.create({
                                    field: field_1,
                                    fieldValue: fieldValue,
                                    message: "The rule \"".concat(rule.type, "\" cannot be found."),
                                });
                        }
                    });
                }
            }
            if (nullable && fieldValue === null) {
                return;
            }
            (0, validate_1.validate)(field_1, fieldValue, iValidators_1);
        }
    };
    ToStringPlugin.prototype.transform = function (values) {
        values = this.beforeTransform(values);
        this.validator(values);
        return utils_1.Utils.toString(values);
    };
    ToStringPlugin.type = String;
    return ToStringPlugin;
}(transform_plugin_1.TransformPlugin));
exports.ToStringPlugin = ToStringPlugin;
