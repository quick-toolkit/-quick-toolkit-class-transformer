import { Typed, TypedArray } from '../src';

/**
 * User
 */
export class User {
  @Typed({
    required: true,
  })
  public id: number;

  @Typed(String, {
    rules: 'UUID',
  })
  public uuid: string;

  @Typed({
    required: true,
  })
  public name: string;
}

/**
 * @class ToArraySample
 */
export class ToArraySample {
  @TypedArray(User, { required: true })
  public users: User[] = [];
}
