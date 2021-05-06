import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Black35SansBold } from "./Text";

const CountdownWrapper = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  padding: 6px;
  text-align: center;
`;

const zeroPad = (num, places) => String(num).padStart(places, "0");

function useCountdownTime() {
  const [timeLeft, setTimeLeft] = useState("00:00:00:00");
  const endsAt = 1620302400 * 1000;

  let intervalId = setInterval(function () {
    const now = Date.now();
    const diff = endsAt - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pDay = zeroPad(days, 2);
    const pHours = zeroPad(hours, 2);
    const pMin = zeroPad(minutes, 2);
    const pSec = zeroPad(seconds, 2);

    setTimeLeft(() => `${pDay}:${pHours}:${pMin}:${pSec}`);
  }, 1000);

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, []);

  return { timeLeft };
}

export const CardCountdown: React.FC = () => {
  const { timeLeft } = useCountdownTime();

  return (
    <CountdownWrapper>
      <Black35SansBold>{timeLeft}</Black35SansBold>
    </CountdownWrapper>
  );
};
