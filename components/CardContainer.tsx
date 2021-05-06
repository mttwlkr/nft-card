import Head from "next/head";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import styled from "styled-components";
import { CardFlipped } from "./CardFlipped";

enum CardState {
  Default = "default",
  Flipped = "flipped",
}

export const CardWrapper = styled.div`
  width: 558px; // from figma
  height: 794px; // from figma
  background-color: white;
  border: 1px solid red;
  border-radius: 25px;
`;

export const CardContainer: React.FC<{ nft: MockCardData }> = ({
  nft,
  children,
}) => {
  const [uiState, setUiState] = useState<CardState>(CardState.Default);
  return (
    <CardWrapper
      onClick={() => {
        if (uiState === CardState.Default) {
          setUiState(CardState.Flipped);
        } else {
          setUiState(CardState.Default);
        }
      }}
    >
      {uiState === CardState.Default && (
        <Image
          src={nft.coverImage}
          alt={nft.title}
          width="443px"
          height="550px"
        />
      )}
      {uiState === CardState.Flipped && <CardFlipped {...nft} />}
    </CardWrapper>
  );
};
