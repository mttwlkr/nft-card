import React from "react";
import styled from "styled-components";
import { CardContainer } from "../components/CardContainer";
import { UpshotWeb3Provider } from "../components/UpshotWeb3Provider";

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

const AppContainer = styled.div`
  background-color: grey;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function Home() {
  return (
    <AppContainer>
      <UpshotWeb3Provider>
        {mockCardData.map((c) => (
          <CardContainer key={c.title} nft={c} />
        ))}
      </UpshotWeb3Provider>
    </AppContainer>
  );
}
