import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();//pipe does't involve an angular testing utilities 
    expect(pipe.transform('hello')).toEqual('olleh');
  });
});
