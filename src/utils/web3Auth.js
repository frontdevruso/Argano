import Web3 from 'web3'
import WalletConnectProvider from "@walletconnect/web3-provider"

export const authWeb3 = async providerName => {
    const web3Instance = await initWeb3(providerName)
    const address = await web3Instance?.eth.getAccounts()

    return {
        instance: web3Instance,
        address: address && address[0],
    }
}

const initWeb3 = async providerName => {
    switch (providerName) {
        case "MetaMask":
            if (window.ethereum?.isMetaMask) {
                window.web3 = new Web3(window.ethereum)
                await window.ethereum.enable().catch(console.log)
            }
            return window.web3
        case "WalletConnect":
            const provider = new WalletConnectProvider({ rpc: {1: "HTTP://127.0.0.1:7545"} })
            await provider.enable().catch(console.log)
            return new Web3(provider)
        default:
            console.log(`Unsupported wallet: ${providerName}`)
            return undefined
    }
}