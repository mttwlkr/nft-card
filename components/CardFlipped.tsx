import Head from "next/head";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import { MockCardData } from "../pages/index";
import { CardWrapper } from "./CardContainer";
import { CardCountdown } from "./CardCountdown";
import {
  Black16SerifItalic,
  Black23SerifBold,
  Grey14Sans,
  Black18SansBold,
  Grey12Sans,
  Black35SerifBold,
  Grey16Sans,
} from "./Text";
import { useFetchEthPrice } from "./useFetchEthPrice";

const CardFlippedWrapper = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .flipped_upper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
`;

const CardMetaWrapper = styled.div`
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const GroupIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 4px;
`;

const FlexHorizontal = styled.div`
  display: flex;
  align-items: center;
`;

const TrophyWrapper = styled.div`
  text-align: center;

  .trophy-icon {
    padding: 0 30px;
  }
`;

const RewardInfoWrapper = styled.div`
  border: 1px solid black;
  border-radius: 20px;
  padding: 25px;
`;

const GroupIcon: React.FC = () => {
  return (
    <GroupIconWrapper>
      <Image
        src="/SVGs/group-icon.svg"
        height="58"
        width="58"
        alt="group-smash"
      />
      <Grey12Sans>Group</Grey12Sans>
    </GroupIconWrapper>
  );
};

enum Url {
  First = "/SVGs/first-trophy.svg",
  Second = "/SVGs/second-trophy.svg",
  Third = "/SVGs/third-trophy.svg",
}

const trophyPossibilities = {
  [Url.First]: [Url.Second, Url.First, Url.Third],
  [Url.Second]: [Url.First, Url.Second, Url.Third],
  [Url.Third]: [Url.Second, Url.Third, Url.First],
};
export const CardFlipped: React.FC<MockCardData> = (props) => {
  const { title, competitionBody, flippedImage } = props;

  const [trophyState, setTrophyState] = useState(
    trophyPossibilities[Url.First]
  );

  const { priceInUSD } = useFetchEthPrice("2500000000000000000");
  const isFirstCard = trophyState === trophyPossibilities[Url.First];
  const isSecondCard = trophyState === trophyPossibilities[Url.Second];
  const isThirdCard = trophyState === trophyPossibilities[Url.Third];

  return (
    <CardWrapper>
      <CardFlippedWrapper>
        <div className="flipped_upper">
          <Image src={flippedImage} alt={title} height="325" width="260" />
          <CardMetaWrapper>
            <Black35SerifBold>{title}</Black35SerifBold>
            <FlexHorizontal>
              <Grey16Sans>Created by: </Grey16Sans>
              <div style={{ margin: "0 6px" }}>
                <Image
                  src="/SVGs/creator-icon.svg"
                  height="16px"
                  width="16px"
                  alt="creator-icon"
                />
              </div>
              <Black16SerifItalic>{` @${title}`}</Black16SerifItalic>
            </FlexHorizontal>
            <div>
              <Black23SerifBold>Eligible Groups</Black23SerifBold>
              <FlexHorizontal>
                <GroupIcon />
                <GroupIcon />
                <GroupIcon />
              </FlexHorizontal>
            </div>
            <Black23SerifBold>Competition ends in:</Black23SerifBold>
            <CardCountdown />
          </CardMetaWrapper>
        </div>
        <div>
          <Black18SansBold>{`Current Price: $${priceInUSD} `}</Black18SansBold>
        </div>
        <div>
          <div style={{ marginBottom: "10px" }}>
            <Black23SerifBold>Competition Details</Black23SerifBold>
          </div>
          <Grey14Sans>{competitionBody}</Grey14Sans>
        </div>
        <TrophyWrapper>
          {trophyState.map((url, idx) => (
            <Image
              src={url}
              height={idx === 1 ? 68 : 55}
              width={idx === 1 ? 68 : 55}
              alt="trophy-icon"
              className="trophy-icon"
              onClick={(e) => {
                e.stopPropagation();
                setTrophyState(trophyPossibilities[url]);
              }}
            />
          ))}
        </TrophyWrapper>
        <RewardInfoWrapper>
          <Black18SansBold>
            {isFirstCard && "1st Place | top appraiser reward info:"}
            {isSecondCard && "2nd Place | top appraiser reward info:"}
            {isThirdCard && "3rd Place | top appraiser reward info:"}
          </Black18SansBold>
          <br />
          <Grey14Sans>
            The top apparaiser accross all three groups will recieve 2 limited
            edition NFTs from @nathanhead’s nevest collection. These rewards
            will appear in your trophy case.
          </Grey14Sans>
        </RewardInfoWrapper>
      </CardFlippedWrapper>
    </CardWrapper>
  );
};
