import React, { useState } from 'react';

interface IFormProps {

}

const Form = (props: IFormProps) => {
  const [naam, setNaam] = useState("");

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('https://localhost:4000/api/inschrijving',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({}),

      });
    const data = await response.json();
    console.log(data);

    const stripe = (window as any).Stripe('pk_test_FbPLI6YGcTMjFEcccJvSi0zm');
    stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: data.sessionId
    }).then((result: any) => {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      console.log(result);
    });
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label>Naam</label>
        <input
          type="text"
          value={naam}
          onChange={e => setNaam(e.target.value)} />
        <button>Betaal</button>
      </form>
    </main>
  )
}

export default Form;