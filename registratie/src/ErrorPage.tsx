import React from "react";
import StepHeader from "./components/StepHeader";
import StepSection from "./components/StepSection";

import { ReactComponent as CadeauSvg } from './images/cadeau.svg';

const SuccessPage = () => {
  return (<>
    <StepHeader title="Betaling niet geslaagd" image={<CadeauSvg />} />
    <StepSection>
      <p>Bij de betaling ging iets mis. Probeer het later nog eens of neem contact op via <a href="mailto:sinterklaas@nederlandsecluboslo.nl">sinterklaas@nederlandsecluboslo.nl</a></p>
    </StepSection>
  </>)
};

export default SuccessPage;