import { Typed } from '../src';

/**
 * @class ToNumberSample
 */
export class ToNumberSample {
  @Typed({ required: true })
  public id: number;

  @Typed(Number, {
    rules: 'Integer',
  })
  public age1: number;

  @Typed(Number, {
    rules: { type: 'Integer' },
  })
  public age2: number;

  @Typed(Number, {
    rules: [{ type: 'Integer' }],
  })
  public age3: number;

  /**
   * Prev transform to type Number
   */
  @Typed(Number, {
    rules: { type: 'Integer' },
    transform: (values) => Number(values),
  })
  public age4: number;
}
