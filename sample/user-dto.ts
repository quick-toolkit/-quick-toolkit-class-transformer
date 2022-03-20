import { Typed, TypedArray } from '../src';
import { TypedMap } from '../src/lib/decorators/typed-map';
import { TypedSet } from '../src/lib/decorators/typed-set';

/**
 * @class RoleDto
 */
class RoleDto {
  @Typed({
    required: true,
  })
  public id: number;

  @Typed(String, {
    required: true,
  })
  public name: string;
}

/**
 * @class UserDto
 */
export class UserDto {
  @Typed({
    required: true,
    rules: { type: 'MongoId' },
  })
  public id: number;

  @Typed(String, {
    required: true,
  })
  public name: string;

  @Typed(String, {
    required: true,
    rules: 'Email',
  })
  public email: string;

  @Typed(String, {
    required: true,
  })
  public password: string;

  @Typed(String, {
    required: true,
  })
  public type: 'boy' | 'girl';

  @Typed({
    required: true,
  })
  public sex: 1 | 0;

  @TypedArray(Number, {
    required: true,
  })
  public roleIds: number[];

  @TypedSet(RoleDto, {
    transform: (values) => new Set<RoleDto>(values),
  })
  public roles: Set<RoleDto>;

  @Typed({
    required: true,
    transform: (value: any) => new Date(value),
  })
  public createTime: Date;

  @Typed({
    required: true,
  })
  public isOk: boolean;

  @TypedMap(RoleDto, {
    required: true,
    transform: (values) => {
      const map = new Map();
      Object.keys(values).forEach((key) => {
        map.set(key, values[key]);
      });
      return map;
    },
  })
  public users: Map<string, RoleDto>;
}
