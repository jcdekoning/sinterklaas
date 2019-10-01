import React from "react";
import StepHeader from "./components/StepHeader";
import StepSection from "./components/StepSection";

import { ReactComponent as CadeauSvg } from './images/cadeau.svg';

const SuccessPage = () => {
  return (<>
    <StepHeader title="Inschrijving ontvangen" image={<CadeauSvg />} />
    <StepSection>
      <p>Bedankt voor uw inschrijving.</p>
    </StepSection>
  </>)
};

export default SuccessPage;