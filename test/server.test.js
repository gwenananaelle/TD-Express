import should from 'should'

function add(a, b) {
    return a+b
}

describe('Mon premier goupe de test', () => {
    describe('test add with numbers', () => {
        it('should be successful', () => {
            should.equal(add(2, 2), 4)
        })
    })
    describe('Test add with strings', () => {
        it('should concat two strings', () => {
            should.equal(add('a', 'b'), 'ab')
        })
    })
})