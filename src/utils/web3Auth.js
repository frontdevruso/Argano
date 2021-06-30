import Web3 from 'web3';
import WalletConnectProvider from "@walletconnect/web3-provider";

export const authWeb3 = async (providerName) => {

    let web3;
    const web3Instance = await initWeb3(providerName);

    const accounts = await web3Instance.eth.getAccounts();


    web3 = {
        instance: web3Instance,
        address: accounts[0],
    }

    return web3;

}

const initWeb3 = async (providerName) => {

    let web3 = null;

    switch (providerName) {
        case "MetaMask":
            if (isMetaMaskInstalled) {

                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                web3 = window.web3;

            }
            else if (window.web3) {
                // console.log("if we had cached web3 provider alredy");
                web3 = window.web3

            }
            else {
                web3 = null;
            }
            return web3;

        case "WalletConnect":

            const provider = new WalletConnectProvider({
                rpc: {
                    1: "HTTP://127.0.0.1:7545"
                }
            })
            try {
                await provider.enable();
                web3 = new Web3(provider);
            }
            catch (e) {
                console.log(e)
            }

            return web3;
        default:
            web3 = undefined;
            return web3;
    }
}

const isMetaMaskInstalled = () => {
    const {ethereum} = window;
    return Boolean(ethereum && ethereum.isMetaMask);
}
