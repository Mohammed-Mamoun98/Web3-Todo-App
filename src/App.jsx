import React, { useEffect } from "react";
import "./App.css";
import { usePromise } from "./app/hooks/usePromise";
import { _login } from "./app/services/web3";
import { loadWeb3 } from "./app/utils/web3";

loadWeb3();

function App() {
  const [login, account, loading] = usePromise(_login);
  useEffect(() => {
    login()
  }, []);

  const handleClick = () => {
    window.web3.eth.getAccounts().then(console.log);
  };
  return (
    <div className="">
      <button onClick={login}>Connect</button>
      <button onClick={handleClick} >Disconnect</button>
      {JSON.stringify({ account, loading })}
    </div>
  );
}

export default App;
