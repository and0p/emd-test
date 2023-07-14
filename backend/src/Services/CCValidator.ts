// The result of the validation.
// Failure reasons are an array, for future-proofing where a card could be invalidated by other third-party sources.
export interface CCValidationResult {
    valid: boolean,
    failureReasons?: string[]
}

// Errors are simple and static. This allows for easier testing and internationalization on the frontend
export enum CCValidationErrorCodes {
    INVALID_LENGTH = 'INVALID_LENGTH',
    NON_NUMERIC = 'NON_NUMERIC',
    FAILED_LUHN_CHECK = 'FAILED_LUHN_CHECK'
}

const generateFailure = (failureReasons: string[]): CCValidationResult => {
    return {
        valid: false,
        failureReasons
    }
}

const sumTable = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

export const validateCreditCard  = (cardNumber: string): CCValidationResult => {
    // Check for valid card length
    if (cardNumber.length !== 16) {
        return generateFailure([CCValidationErrorCodes.INVALID_LENGTH])
    }

    // Cast to an array of integers
    const digits: number[] = [];
    for (let i = 0; i < cardNumber.length; i++) {
        const n: number = parseInt(cardNumber.charAt(i));
        if (isNaN(n)) {
            return generateFailure([CCValidationErrorCodes.NON_NUMERIC])
        }
        digits.push(n);
    }

    /* 
    * Do a luhn check on the card.
    * This method uses a simple, static lookup table for the results of multplying by two and summing and double-digit results.
    */
    let len: number = cardNumber.length;
    let bit: number = 1;
    let sum: number = 0;

    while (len) {
        const val = digits[--len];
        sum += (bit ^= 1) ? sumTable[val] : val;
    }

    const valid = sum && sum % 10 === 0;

    return valid ? { valid: true } : generateFailure([CCValidationErrorCodes.FAILED_LUHN_CHECK]);
}
