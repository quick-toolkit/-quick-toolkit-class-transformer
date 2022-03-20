import { ValidateException } from '../exceptions/validate-exception';

/**
 * 字段验证
 * @param field 字段名称
 * @param fieldValue 字段值
 * @param validators 验证器列表
 */
export function validate(
  field: string,
  fieldValue: string,
  validators: IValidator[]
): void {
  for (const info of validators) {
    const { type, message } = info;
    try {
      if (!info.validator(fieldValue)) {
        throw ValidateException.create({
          field,
          fieldValue,
          message:
            typeof message === 'function'
              ? message(fieldValue)
              : typeof message === 'string'
              ? message
              : `The field "${field}" expected a "${type}" but received a type ${typeof fieldValue} "${fieldValue}".`,
        });
      }
    } catch (e) {
      if (e instanceof ValidateException) {
        throw e;
      } else {
        throw ValidateException.create({
          field,
          fieldValue,
          message:
            typeof e === 'object' && e !== null ? (e as any).message : '',
        });
      }
    }
  }
}

export interface IValidator {
  type: string;
  validator: (value: any) => boolean;
  message?: string | ((value: any) => string);
}
