import express from 'express';

import { validateCreditCardController } from './Controllers/CCValidator';

const app = express()
const port = 3000

app.use(express.json());

app.post('/api/validateCreditCard', validateCreditCardController);

app.listen(port, () => {
  console.log(`EMD CC validator listening on port ${port}`)
})
