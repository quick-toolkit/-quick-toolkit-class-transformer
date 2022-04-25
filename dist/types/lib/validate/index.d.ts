/**
 * 字段验证
 * @param field 字段名称
 * @param fieldValue 字段值
 * @param validators 验证器列表
 */
export declare function validate(field: string, fieldValue: string, validators: IValidator[]): void;
export interface IValidator {
    type: string;
    validator: (value: any) => boolean;
    message?: string | ((value: any) => string);
}
