import Head from "next/head";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import styled from "styled-components";
import { CardContainer } from "../components/CardContainer";

export interface MockCardData {
  title: string;
  creator: string;
  competitionBody: string;
  rewardInfo: string;
  coverImage: string;
  flippedImage: string;
}

const mockCardData: Array<MockCardData> = [
  {
    title: "Overgrown",
    creator: "nathanhead",
    coverImage: "/PNGs/cover-image.png",
    flippedImage: "/PNGs/image-blank.png",
    competitionBody:
      "For the week of 02/03/21 Overgrown by @nathanhead will be up for appraisal and top appraisers in the groups: Artmash, Mememash and Randommash will be rewarded with a limited edition NFT from the series. Blah Blah Blah.",
    rewardInfo:
      "The top apparaiser accross all three groups will recieve 3 limited edition NFTs from @nathanhead’s nevest collection. These rewards will appear in your trophy case.",
  },
];

export default function Home() {
  return (
    <div className={styles.container}>
      {mockCardData.map((c) => (
        <CardContainer key={c.title} nft={c} />
      ))}
    </div>
  );
}
