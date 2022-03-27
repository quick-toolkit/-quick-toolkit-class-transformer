/**
 * MIT License
 * Copyright (c) 2021 RanYunLong<549510622@qq.com> quick-toolkit/class-transformer
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Utils } from '../../utils';
import { TransformPlugin } from '../../transform-plugin';
import { IValidator, validate } from '../../validate';
import validator from 'validator';
import { TypedMetadata } from '../../typed-metadata';
import { ValidateException } from '../../exceptions';

/**
 * String转换插件
 */
export class ToStringPlugin extends TransformPlugin {
  public static type = String;

  /**
   * 类型验证
   */
  public validator(fieldValue: any): void {
    // 验证必须
    this.validateRequired(fieldValue);
    if (fieldValue !== undefined) {
      const { metadata, field } = this.typeMirror;
      // 先验证类型 系统规则
      const iValidators: IValidator[] = [
        {
          type: 'String',
          validator: (value): boolean =>
            typeof value === 'string' || value instanceof String,
        },
      ];
      // 设置手动添加的规则
      if (metadata) {
        const { options } = metadata;
        if (options) {
          const rules = TypedMetadata.mergeRule(options.rules || []);
          rules.forEach((rule) => {
            switch (rule.type) {
              case 'Base32':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isBase32,
                });
                break;
              case 'Base58':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isBase58,
                });
                break;
              case 'Base64':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isBase64,
                });
                break;
              case 'BIC':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isBIC,
                });
                break;
              case 'BtcAddress':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isBtcAddress,
                });
                break;
              case 'Currency':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: (value) =>
                    validator.isCurrency(value, rule.options),
                });
                break;
              case 'DataURI':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isDataURI,
                });
                break;
              case 'Decimal':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: (value) =>
                    validator.isDecimal(value, rule.options),
                });
                break;
              case 'Date':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: (value) => validator.isDate(value, rule.options),
                });
                break;
              case 'EthereumAddress':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isEthereumAddress,
                });
                break;
              case 'Email':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: (value) => validator.isEmail(value, rule.options),
                });
                break;
              case 'Enum':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: (value: string) =>
                    (rule.enums || []).includes(value),
                });
                break;
              case 'FullWidth':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isFullWidth,
                });
                break;
              case 'FQDN':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: (value) => validator.isFQDN(value, rule.options),
                });
                break;
              case 'HexColor':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isHexColor,
                });
                break;
              case 'HSL':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isHSL,
                });
                break;
              case 'Hexadecimal':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isHexadecimal,
                });
                break;
              case 'HalfWidth':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isHalfWidth,
                });
                break;
              case 'IBAN':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isIBAN,
                });
                break;
              case 'ISIN':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isISIN,
                });
                break;
              case 'ISO4217':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isISO4217,
                });
                break;
              case 'ISRC':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isISRC,
                });
                break;
              case 'IdentityCard':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: (value) =>
                    validator.isIdentityCard(value, rule.options),
                });
                break;
              case 'ISSN':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: (value) => validator.isISSN(value, rule.options),
                });
                break;
              case 'IP':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: (value) => validator.isIP(value, rule.version),
                });
                break;
              case 'IPRange':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: (value) =>
                    validator.isIPRange(value, rule.version),
                });
                break;
              case 'JSON':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isJSON,
                });
                break;
              case 'JWT':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isJWT,
                });
                break;
              case 'LatLong':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isLatLong,
                });
                break;
              case 'Locale':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isLocale,
                });
                break;
              case 'Lowercase':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isLowercase,
                });
                break;
              case 'MongoId':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isMongoId,
                });
                break;
              case 'MD5':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isMD5,
                });
                break;
              case 'MagnetURI':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isMagnetURI,
                });
                break;
              case 'MobilePhone':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: (value) =>
                    validator.isMobilePhone(value, rule.locale, rule.options),
                });
                break;
              case 'MimeType':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isMimeType,
                });
                break;
              case 'MACAddress':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: (value) =>
                    validator.isMACAddress(value, rule.options),
                });
                break;
              case 'Numeric':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: (value) =>
                    validator.isNumeric(value, rule.options),
                });
                break;
              case 'PassportNumber':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: (value) =>
                    validator.isPassportNumber(value, rule.countryCode),
                });
                break;
              case 'Port':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isPort,
                });
                break;
              case 'RFC3339':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isRFC3339,
                });
                break;
              case 'RgbColor':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: (value) =>
                    validator.isRgbColor(value, rule.includePercentValues),
                });
                break;
              case 'range':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: (value: string) => {
                    let state = true;
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
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isSemVer,
                });
                break;
              case 'Slug':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isSlug,
                });
                break;
              case 'SurrogatePair':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isSurrogatePair,
                });
                break;
              case 'Url':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: (value) => validator.isURL(value, rule.options),
                });
                break;
              case 'UUID':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: (value) => validator.isUUID(value, rule.version),
                });
                break;
              case 'Uppercase':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isUppercase,
                });
                break;
              case 'VariableWidth' + '':
                iValidators.push({
                  type: rule.type,
                  message: rule.message,
                  validator: validator.isVariableWidth,
                });
                break;
              default:
                throw ValidateException.create({
                  field,
                  fieldValue,
                  message: `The rule "${rule.type}" cannot be found.`,
                });
            }
          });
        }
      }
      // 验证
      validate(field, fieldValue, iValidators);
    }
  }

  /**
   * 转换成实例
   * @param values
   */
  public transform(values: any): string {
    values = this.beforeTransform(values);
    this.validator(values);
    return Utils.toString(values);
  }
}
