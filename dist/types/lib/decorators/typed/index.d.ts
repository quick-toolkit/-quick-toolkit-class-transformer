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
import { ClassConstructor } from '@quick-toolkit/class-mirror';
import { TypeMirror } from '../../type-mirror';
import { EnumRule, FloatRule, IntegerRule, RangeRule, Rule, TypedMetadataOptions } from '../../typed-metadata';
/**
 * Typed decorator
 * @param options
 */
export declare function Typed<T extends object = any>(options?: TypedMetadataOptions<T>): PropertyDecorator;
/**
 * Typed decorator
 * @param type
 * @param options
 */
export declare function Typed<T extends object = any>(type?: TypeMirror<T> | ClassConstructor<T>, options?: Omit<TypedMetadataOptions<T>, 'elementRules'> & TypedOps<T>): PropertyDecorator;
export interface TypedOps<T> {
    rules?: T extends Number ? NumberValidateTypes | ObjectNumberValidateType | ObjectNumberValidateType[] : T extends String ? StringValidateTypes | Rule | Rule[] : never;
}
export declare type NumberValidateTypes = 'Integer' | 'Float' | 'range';
export declare type ObjectNumberValidateType = IntegerRule | FloatRule | RangeRule | EnumRule;
export declare type StringValidateTypes = 'Base32' | 'Base58' | 'Base64' | 'BIC' | 'BtcAddress' | 'DataURI' | 'EthereumAddress' | 'FullWidth' | 'HexColor' | 'HSL' | 'Hexadecimal' | 'HalfWidth' | 'IBAN' | 'ISIN' | 'ISO4217' | 'ISRC' | 'JSON' | 'JWT' | 'LatLong' | 'Locale' | 'Lowercase' | 'MongoId' | 'MD5' | 'MagnetURI' | 'MimeType' | 'Port' | 'RFC3339' | 'SemVer' | 'Slug' | 'SurrogatePair' | 'Uppercase' | 'VariableWidth' | 'length' | 'Email' | 'range' | 'MobilePhone' | 'Float' | 'Integer' | 'Currency' | 'Date' | 'Decimal' | 'FQDN' | 'IP' | 'IPRange' | 'IdentityCard' | 'ISSN' | 'MACAddress' | 'Numeric' | 'PassportNumber' | 'RgbColor' | 'Url' | 'UUID';
