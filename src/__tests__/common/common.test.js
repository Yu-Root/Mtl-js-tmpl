import printMe from '../../js/common/common'

test('printMe function', () => {
  console.log = jest.fn()
  printMe()
  expect(console.log.mock.calls[0][0]).toBe('%c ================ This is a js webpack template.=================')
})
