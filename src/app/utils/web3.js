const Web3 = require("web3");

export const checkHasMM = () => {
  const { ethereum } = window;
  if (ethereum) throw new Error("Please Add MetaMask for you browser");
};

export const loadWeb3 = () => {
  const provider = new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/d3099dcc710c4909bd4882e850fdf962"
  );
  if (Web3) window.web3 = new Web3(provider);
};
