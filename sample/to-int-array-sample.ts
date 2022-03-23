import { TypedArray } from '../src';

/**
 * @class ToIntArraySample
 */
export class ToIntArraySample {
  @TypedArray(Number, { required: true, elementRules: 'Integer' })
  public userIds: number[] = [];
}
