import { expect } from 'chai';
import 'mocha';

import { validateCreditCard, CCValidationResult, CCValidationErrorCodes } from '../../src/Services/CCValidator';

const validCCNumbers = [
    '4242424242424242',
    '4263982640269299',
    '5425233430109903',
    '2223000048410010'
];

const luhnFailingCCNumbers = [
    '4242424242424249',
    '4242424242424248'
];

// Could use named functions rather than lambdas here, easier debugging on larger projects, but keeping it simple

describe('Credit Card Validation', () => {
    describe('Success cases', () => {
        it('Should validate correct credit card numbers', () => {
            let res: CCValidationResult;
            for (const cc of validCCNumbers) {
                res = validateCreditCard(cc);
                expect(res.valid).to.be.true;
                expect(res.failureReasons).to.not.exist;             
            }
        })
    });

    describe('Failure cases', () => {
        it('Should reject cards with invalid lengths.', () => {
            let res: CCValidationResult;
            res = validateCreditCard('');
            expect(res.valid).to.be.false;
            expect(res.failureReasons).to.have.lengthOf(1);
            expect(res.failureReasons).to.contain(CCValidationErrorCodes.INVALID_LENGTH);
            res = validateCreditCard('4242');
            expect(res.valid).to.be.false;
            expect(res.failureReasons).to.have.lengthOf(1);
            expect(res.failureReasons).to.contain(CCValidationErrorCodes.INVALID_LENGTH);
            res = validateCreditCard('4242424242424242424242424242424242');
            expect(res.valid).to.be.false;
            expect(res.failureReasons).to.have.lengthOf(1);
            expect(res.failureReasons).to.contain(CCValidationErrorCodes.INVALID_LENGTH);
        });

        it('Should reject cards with the correct length but invalid characters.', () => {
            let res: CCValidationResult;
            res = validateCreditCard('ABABABABABABABAB');
            expect(res.valid).to.be.false;
            expect(res.failureReasons).to.have.lengthOf(1);
            expect(res.failureReasons).to.contain(CCValidationErrorCodes.NON_NUMERIC);
            res = validateCreditCard('A242424242424242');
            expect(res.valid).to.be.false;
            expect(res.failureReasons).to.have.lengthOf(1);
            expect(res.failureReasons).to.contain(CCValidationErrorCodes.NON_NUMERIC);
            res = validateCreditCard('424242424242424z');
            expect(res.valid).to.be.false;
            expect(res.failureReasons).to.have.lengthOf(1);
            expect(res.failureReasons).to.contain(CCValidationErrorCodes.NON_NUMERIC);
        });

        it('Should reject cards that are formatted correctly but fail the luhn test.', () => {
            let res: CCValidationResult;
            for (const cc of luhnFailingCCNumbers) {
                res = validateCreditCard(cc);
                expect(res.valid).to.be.false;
                expect(res.failureReasons).to.have.lengthOf(1);
                expect(res.failureReasons).to.contain(CCValidationErrorCodes.FAILED_LUHN_CHECK);                
            }
        });
    });
});