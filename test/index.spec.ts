import 'reflect-metadata';
import { describe, it } from 'mocha';
import { ClassTransformer } from '../src/lib/class-transformer';
import { UserDto } from '../sample';
import { TransformerException } from '../src';

const transformer = new ClassTransformer();

describe('index.spec.ts', () => {
  it('should ', () => {
    try {
      const res = transformer.transform(UserDto, {
        id: 12213232321321,
        roleIds: [1, 2, 3, 4, 5],
        email: '549510622@qq.com',
        name: 'x',
        password: 'x',
        roles: [
          {
            id: 11,
            name: 'x',
          },
          {
            id: 33,
            name: 'x',
          },
        ],
        createTime: '2021-12-01',
        type: 'boy',
        isOk: true,
        users: {
          xx: {
            id: 1,
            name: 'x',
          },
          uu: {
            id: 2,
            name: 'x',
          },
        },
        sex: 1,
      });
      console.log(res);
    } catch (e) {
      if (e instanceof TransformerException) {
        console.log(JSON.stringify(e.exceptions, null, 2));
      }
    }
  });
});
