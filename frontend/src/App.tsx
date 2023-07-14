import { useState } from 'react'
import './App.css'

import { validateCreditCard } from './Services/CreditCardValidator'; 

function App() {
  const [creditCardNumber, setCreditCardNumber] = useState("")
  const [errors, setErrors] = useState<string[]>([]);
  const [valid, setValid] = useState<boolean | undefined>();

  const handleInputUpdate = (event: any) => {
    setValid(undefined);
    setErrors([]);
    setCreditCardNumber(event.target.value);
  }

  const handleValidation = (res: any) => {
    if (res.valid) {
      setErrors([]);
      setValid(true);
    } else {
      setValid(false);
      setErrors(res.failureReasons || [])
    }
  }

  return (
    <>
      <div>
        <input type="text" maxLength={16} value={creditCardNumber} onChange={event => handleInputUpdate(event)}/>
        <button onClick={() => { validateCreditCard(creditCardNumber).then(res => handleValidation(res)) }}>Validate</button>
        {valid && <span style={{"color":"#00FF00"}}><br/>Valid!</span>}
        {errors.map(error => <span style={{"color":"#FF0000"}}><br/>{error}</span>)}
      </div>
    </>
  )
}

export default App
