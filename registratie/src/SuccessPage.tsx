import React from "react";
import StepHeader from "./components/StepHeader";
import StepSection from "./components/StepSection";

import { ReactComponent as CadeauSvg } from './images/cadeau.svg';
import text from "./text";

const SuccessPage = () => {
  return (<>
    <StepHeader title={text.success.title} image={<CadeauSvg />} />
    <StepSection>
      {text.success.description}
    </StepSection>
  </>)
};

export default SuccessPage;