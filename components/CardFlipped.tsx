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

// ----------------------------
// TYPES
// ----------------------------

enum Url {
  First = "/SVGs/first-trophy.svg",
  Second = "/SVGs/second-trophy.svg",
  Third = "/SVGs/third-trophy.svg",
}

// ----------------------------
// CONSTANTS
// ----------------------------

const trophyPossibilities = {
  [Url.First]: [Url.Second, Url.First, Url.Third],
  [Url.Second]: [Url.First, Url.Second, Url.Third],
  [Url.Third]: [Url.Second, Url.Third, Url.First],
};

// ----------------------------
// COMPONENTS
// ----------------------------

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
        <span className="rarity-value rarity-badge">00%</span>
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
        <div style={{ padding: `15px` }}>
          <FlexVert>
            <ImageWrapper>
              <img
                className="ribbon"
                src="/SVGs/ribbon-main.svg"
                alt="small-ribbon-overlay"
                width="68"
                height="84"
              />
              <span className="rarity-value">00%</span>
              <span className="rarity-label">rarity</span>
              <img src={flippedImage} alt={title} width="250" height="300" />
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
        </div>
        <TrophyWrapper>
          {trophyState.map((url, idx) => (
            <img
              key={idx}
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
            <NftRewardButton
              onClick={(e) => {
                setShowNFTBadges(!showNFTBadges);
                e.stopPropagation();
              }}
            >
              {`${!showNFTBadges ? "Show " : "Hide "} Reward NFTs`}
            </NftRewardButton>
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

// I'd break these out into my own file...

// ----------------------------
// STYLES
// ----------------------------

export const CardFlippedWrapper = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const CardMetaWrapper = styled.div`
  width: 100%;
  padding: 0 30px 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const GroupIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 4px;
`;

export const FlexHorizontal = styled.div`
  display: flex;
  align-items: center;
`;

export const FlexVert = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TrophyWrapper = styled.div`
  text-align: center;

  img.trophy-icon {
    margin: 0 10px;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const RewardInfoWrapper = styled.div`
  border: 1px solid black;
  border-radius: 20px;
  padding: 15px;
`;

export const ImageWrapper = styled.div`
  position: relative;

  img.ribbon,
  span.rarity-label,
  span.rarity-value {
    z-index: 5;
    position: absolute;
    color: white;
  }

  img.ribbon {
    right: 5px;
    top: 5px;
  }

  span.rarity-label {
    right: 20px;
    top: 40px;
  }

  span.rarity-value {
    font-size: 24px;
    right: 14px;
    top: 16px;
  }

  span.rarity-badge {
    font-size: 10px;
    right: 14px;
    top: 16px;
    color: red;
  }

  img.badge {
    border-radius: 10px;
  }
`;

export const NftRewardButton = styled.button`
  float: right;
  color: #d1568e;
  border: none;
  background: transparent;
  textdecoration: underline;

  &:hover {
    cursor: pointer;
  }
`;
