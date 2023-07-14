import { Request, Response } from 'express';

import { validateCreditCard } from '../Services/CCValidator';

export const validateCreditCardController = (req: Request<{ creditCardNumber: string }>, res: Response) => {
    try {
        const cc = req.body.creditCardNumber;

        // Ensure that the parameter passed in was a string
        if (typeof cc !== 'string') {
            res.status(400).json({
                valid: false,
                failureReasons: ['Expected a string for creditCardNumber.']
            });
            return;
        }
    
        // Check for valid formatting
        const validationResult = validateCreditCard(cc);
    
        res.status(validationResult.valid ? 200 : 400).json(validationResult);
        return;
    } catch (err: any) {
        res.status(500).end();
        return;
    }
}
