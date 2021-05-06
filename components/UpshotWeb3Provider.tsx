import Web3Provider, { useWeb3Context, Connectors } from "web3-react";
import React, { useEffect } from "react";
const { InjectedConnector, NetworkOnlyConnector } = Connectors;

const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4] });

const Infura = new NetworkOnlyConnector({
  providerURL: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
});

const connectors = { MetaMask, Infura };

const MyComponent: React.FC = ({ children }) => {
  const context = useWeb3Context();

  useEffect(() => {
    context.setFirstValidConnector(["MetaMask", "Infura"]);
  }, []);

  if (!context.active && !context.error) {
    return <div>loading</div>;
  } else if (context.error) {
    return <div>error</div>;
  } else {
    return <div>{children}</div>;
  }
};

export const UpshotWeb3Provider: React.FC = ({ children }) => {
  return (
    <Web3Provider connectors={connectors} libraryName={"ethers.js"}>
      <MyComponent>{children}</MyComponent>
    </Web3Provider>
  );
};
