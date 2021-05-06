import React, { useState } from "react";
import styled from "styled-components";
import { Black35SansBold } from "./Text";

const CountdownWrapper = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  padding: 6px;
  text-align: center;
`;

export const CardCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState("00:10:34:04");

  return (
    <CountdownWrapper>
      <Black35SansBold>{timeLeft}</Black35SansBold>
    </CountdownWrapper>
  );
};
