describe('Example Component', () => {

  test('Debe ser mayor a 10', () => {
    let valor = 8  
    valor = valor + 2

    expect(valor).toBeGreaterThan(9)
  });

});
