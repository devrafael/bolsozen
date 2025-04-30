import { StatusPipe } from './status.pipe';

describe('StatusPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusPipe();
    expect(pipe).toBeTruthy();
  });


  it('Deve ter status pago', () => {
    const pipe = new StatusPipe();
    const status = pipe.transform(true)
    expect(status).toBe('Pago')
  });

  it('Deve ter status pendente', () => {
    const pipe = new StatusPipe();
    const status = pipe.transform(false)
    expect(status).toBe('Pendente')
  });

});
