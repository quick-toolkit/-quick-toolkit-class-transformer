import { TypedArray } from '../src';

/**
 * @class ToFloatArraySample
 */
export class ToFloatArraySample {
  @TypedArray(Number, { required: true, elementRules: [{ type: 'Float' }] })
  public userIds: number[] = [];
}
