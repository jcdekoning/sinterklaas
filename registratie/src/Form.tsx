import React, { useState } from 'react';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';

interface IFormProps extends ReactStripeElements.InjectedStripeProps {

}

const Form = (props: IFormProps) => {
  const [naam, setNaam] = useState("");
  const [bedrag, setBedrag] = useState("");

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!props.stripe) {
      throw new Error('Stripe not available');
    }

    try {
      let token = await props.stripe.createToken({ name: naam });
      console.log(token);
    } catch (e) {
      throw e;
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label>Naam</label>
        <input
          type="text"
          value={naam}
          onChange={e => setNaam(e.target.value)} />
        <label>Bedrag</label>
        <input
          type="text"
          value={bedrag}
          onChange={e => setBedrag(e.target.value)} />
        <CardElement hidePostalCode={true} />
        <button>Betaal</button>
      </form>
    </main>
  )
}

export default injectStripe(Form);