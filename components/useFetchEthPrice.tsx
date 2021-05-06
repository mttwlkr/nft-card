import { ethers } from "ethers";
import React, { useState, useEffect } from "react";

export function useFetchEthPrice(amountInWei: string) {
  const [priceInUSD, setPriceInUSD] = useState(0);

  let amountBN = ethers.BigNumber.from(amountInWei);
  let amountInEth = amountBN.div("1000000000000000000").toNumber();

  useEffect(() => {
    async function getPrice() {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd `
      );

      const { ethereum } = await response.json();

      setPriceInUSD(amountInEth * ethereum.usd);
    }

    getPrice();
  }, []);

  return {
    priceInUSD,
  };
}
