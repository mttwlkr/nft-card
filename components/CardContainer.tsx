import Head from "next/head";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import styled from "styled-components";
import { CardFlipped } from "./CardFlipped";

const height = "794px"; // from figma
const width = "639px"; // from figma

export const CardWrapper = styled.div`
  width: ${width};
  height: ${height};

  background-color: white;
  border-radius: 25px;

  .cover-image {
    border-radius: 25px;
  }
`;

export const CardContainer: React.FC<{ nft: MockCardData }> = ({ nft }) => {
  const [isFlipped, setFlipped] = useState(false);
  return (
    <CardWrapper onClick={() => setFlipped(!isFlipped)}>
      {!isFlipped && (
        <img
          className="cover-image"
          src={nft.coverImage}
          alt={nft.title}
          width={width}
        />
      )}
      {isFlipped && <CardFlipped {...nft} />}
    </CardWrapper>
  );
};
