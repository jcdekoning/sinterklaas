import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements'
import Form from "./Form";

const App = () => {
  return <>
    <StripeProvider apiKey="pk_test_FbPLI6YGcTMjFEcccJvSi0zm">
      <Elements locale="nl">
        <Form />
      </Elements>
    </StripeProvider>
  </>
}

export default App;
