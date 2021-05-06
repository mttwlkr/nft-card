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

// height: 794px;
// width: 639px;
const height = "760px"; // from figma
const width = "560px"; // from figma

export const CardWrapper = styled.div`
  width: ${width};
  height: ${height};

  background-color: white;
  border-radius: 25px;

  .cover-image {
    border-radius: 25px;
  }
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
          className="cover-image"
          src={nft.coverImage}
          alt={nft.title}
          width={width}
          height={height}
        />
      )}
      {uiState === CardState.Flipped && <CardFlipped {...nft} />}
    </CardWrapper>
  );
};
