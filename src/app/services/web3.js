export const _login = () => {
  return window.ethereum
  .request({ method: 'eth_requestAccounts' })
};
