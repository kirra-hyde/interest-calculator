it('should calculate monthly rate', function () {
  expect(calcMonthlyPayment(10000, 8, 5.8)).toEqual(130.44263011109317);
  expect(calcMonthlyPayment(1000, 40, 99)).toEqual(82.5);
});