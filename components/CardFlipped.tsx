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
import { useWeb3Context } from "web3-react";
import { ethers } from "ethers";

const CardFlippedWrapper = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const CardMetaWrapper = styled.div`
  padding-right: 50px;
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

const FlexVert = styled.div`
  display: flex;
  justify-content: space-between;
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
  padding: 15px;
`;

const ImageWrapper = styled.div`
  position: relative;

  img.ribbon {
    z-index: 5;
    position: absolute;
    right: 5px;
    top: 5px;
  }

  img.badge {
    border-radius: 10px;
  }
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

const AppraiserNFTBadge: React.FC<{ src: string }> = ({ src }) => {
  return (
    <div style={{ marginRight: "20px" }}>
      <ImageWrapper>
        <img
          className="ribbon"
          src="/SVGs/ribbon-small.svg"
          alt="small-ribbon-overlay"
          width="15"
          height="18"
        />
        <img
          src={src}
          className="badge"
          alt="small-appraiser-badge"
          height="80"
          width="64"
        />
      </ImageWrapper>
      <span>#14762</span>
    </div>
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

  const [showNFTBadges, setShowNFTBadges] = useState(true);
  const [appraiserPrefix, setAppraiserPrefix] = useState("1st");
  const [ownerAddress, setOwnerAddress] = useState("0x");

  const { priceInUSD } = useFetchEthPrice("2500000000000000000");
  const copyVariable = "Place | top appraiser reward info:";

  useEffect(() => {
    if (trophyState === trophyPossibilities[Url.Third]) {
      setAppraiserPrefix("3rd");
    } else if (trophyState === trophyPossibilities[Url.Second]) {
      setAppraiserPrefix("2nd");
    } else {
      setAppraiserPrefix("1st");
    }
  }, [trophyState]);

  const context = useWeb3Context();

  useEffect(() => {
    const getOwner = async () => {
      const contract = new ethers.Contract(
        "0x60f80121c31a0d46b5279700f9df786054aa5ee5",
        [
          "function balanceOf(address owner) view returns (uint256)",
          "function ownerOf(uint256 tokenId)  view   returns (address)",
        ],
        context.library
      );
      const tokenId = 512384;
      let ownerAddr = await contract.callStatic.ownerOf(tokenId);
      setOwnerAddress(ownerAddr);
    };
    getOwner();
  }, [context]);

  return (
    <CardWrapper>
      <CardFlippedWrapper>
        <FlexVert>
          <ImageWrapper>
            <img
              className="ribbon"
              src="/SVGs/ribbon-main.svg"
              alt="small-ribbon-overlay"
              width="68"
              height="84"
            />
            <img src={flippedImage} alt={title} height="325" width="260" />
          </ImageWrapper>
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
              <Grey16Sans>Current Price: </Grey16Sans>
              <Black16SerifItalic>{` $${priceInUSD}`}</Black16SerifItalic>
            </div>
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
        </FlexVert>
        <div>
          <div style={{ margin: "10px 0" }}>
            <Black23SerifBold>Currently Owned By: </Black23SerifBold>
            <Grey14Sans>{ownerAddress}</Grey14Sans>
          </div>
          <div>
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
          <div style={{ marginBottom: "4px" }}>
            <Black18SansBold>
              {`${appraiserPrefix} ${copyVariable}`}
            </Black18SansBold>
          </div>
          <Grey14Sans>
            The top apparaiser accross all three groups will recieve 2 limited
            edition NFTs from @nathanhead’s nevest collection. These rewards
            will appear in your trophy case.
          </Grey14Sans>
          {showNFTBadges && (
            <div style={{ display: "flex", marginTop: "10px" }}>
              <AppraiserNFTBadge src={flippedImage} />
              <AppraiserNFTBadge src={flippedImage} />
              <AppraiserNFTBadge src={flippedImage} />
            </div>
          )}
        </RewardInfoWrapper>
      </CardFlippedWrapper>
    </CardWrapper>
  );
};
