import React from "react";
import StepHeader from "./components/StepHeader";
import StepSection from "./components/StepSection";

const SuccessPage = () => {
  return (<>
    <StepHeader title="Inschrijving ontvangen" />
    <StepSection>
      <p>Bedankt voor uw inschrijving.</p>
    </StepSection>
  </>)
};

export default SuccessPage;