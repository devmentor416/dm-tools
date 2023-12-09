import {assert} from 'chai';
import {addition} from './calc';

describe('Calculator Tests', () => {
  it('should return 5 when 2 is added to 3', () => {
    const result = addition(2, 3);
    assert.equal(result, 5);
  });

  it('should return 8 when -2 is added to 10', () => {
    const result = addition(-2, 10);
    assert.equal(result, 8);
  });
});
