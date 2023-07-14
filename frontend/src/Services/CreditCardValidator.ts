export async function validateCreditCard(creditCardNumber: string) {
    const response = await fetch("http://localhost:3000/api/validateCreditCard", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ creditCardNumber })
    });
    const result = await response.json();
    return result;
}
