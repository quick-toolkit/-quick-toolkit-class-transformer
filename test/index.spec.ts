import 'reflect-metadata';
import { describe, it } from 'mocha';
import { assert } from 'chai';
import { ClassTransformer } from '../src';
import {
  ToArraySample,
  ToFloatArraySample,
  ToIntArraySample,
  ToIntSetSample,
  ToNumberSample,
} from '../sample';
import * as uuid from 'uuid';

const transformer = new ClassTransformer();

describe('index.spec.ts', () => {
  it('should ToNumberSample', () => {
    const res = transformer.transform(ToNumberSample, {
      id: 1,
      age1: 1,
      age2: 2,
      age3: 3,
      age4: '4',
    });

    assert.equal(res.id, 1);
    assert.equal(res.age1, 1);
    assert.equal(res.age2, 2);
    assert.equal(res.age3, 3);
    assert.equal(res.age4, 4);
  });

  it('should optional ToNumberSample', () => {
    const res = transformer.transform(ToNumberSample, {
      id: 1,
    });
    assert.equal(res.id, 1);
    assert.equal(res.age1, undefined);
    assert.equal(res.age2, undefined);
    assert.equal(res.age3, undefined);
    assert.equal(res.age4, undefined);
  });

  it('should ToArraySample 1', () => {
    const res = transformer.transform(ToArraySample, {
      users: [],
    });

    assert.instanceOf(res, ToArraySample);
    assert.instanceOf(res.users, Array);
    assert.isArray(res.users);
    assert.lengthOf(res.users, 0);
  });

  it('should ToArraySample 2', () => {
    const res = transformer.transform(ToArraySample, {
      users: [{ id: 1, name: 'xx' }],
    });

    assert.instanceOf(res, ToArraySample);
    assert.instanceOf(res.users, Array);
    assert.isArray(res.users);
    assert.lengthOf(res.users, 1);
  });

  it('should ToArraySample 3', () => {
    const res = transformer.transform(ToArraySample, {
      users: [
        { id: 1, uuid: uuid.v1(), name: 'xx' },
        { id: 1, uuid: uuid.v4(), name: 'xx' },
      ],
    });

    assert.instanceOf(res, ToArraySample);
    assert.instanceOf(res.users, Array);
    assert.isArray(res.users);
    assert.lengthOf(res.users, 2);
  });

  it('should ToIntArraySample 1', () => {
    const res = transformer.transform(ToIntArraySample, {});
    assert.instanceOf(res, ToIntArraySample);
    assert.instanceOf(res.userIds, Array);
    assert.lengthOf(res.userIds, 0);
  });

  it('should ToIntArraySample 2', () => {
    const res = transformer.transform(ToIntArraySample, {
      userIds: [1, 2, 3],
    });
    assert.instanceOf(res, ToIntArraySample);
    assert.instanceOf(res.userIds, Array);
    assert.lengthOf(res.userIds, 3);
  });

  it('should ToFloatArraySample 1', () => {
    const res = transformer.transform(ToFloatArraySample, {});
    assert.instanceOf(res, ToFloatArraySample);
    assert.instanceOf(res.userIds, Array);
    assert.lengthOf(res.userIds, 0);
  });

  it('should ToFloatArraySample 2', () => {
    const res = transformer.transform(ToFloatArraySample, {
      userIds: [1],
    });
    assert.instanceOf(res, ToFloatArraySample);
    assert.instanceOf(res.userIds, Array);
    assert.lengthOf(res.userIds, 1);
  });

  it('should ToIntSetSample', () => {
    const res = transformer.transform(ToIntSetSample, {
      userIds: [1],
    });
    assert.instanceOf(res, ToIntSetSample);
    assert.instanceOf(res.userIds, Set);
    assert.equal(res.userIds.size, 1);
  });
});
