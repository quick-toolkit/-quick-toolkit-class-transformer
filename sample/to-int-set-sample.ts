import { TypedSet } from '../src';

/**
 * @class ToIntSetSample
 */
export class ToIntSetSample {
  @TypedSet(Number, {
    required: true,
    elementRules: 'Integer',
    transform: (v) => new Set<Number>(v),
  })
  public userIds: Set<number>;
}
