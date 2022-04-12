import Web3 from "web3";
import { coins, minABI } from "./data";

declare type getWalletInformationType = (address: string) => Promise<any>;
declare global {
    interface Window {
        ethereum?: any;
    }
}
const provider = "https://mainnet.infura.io/v3/6246707008c04969805a13694dff7951"
const web3 = new Web3(new Web3.providers.HttpProvider(provider));

export const getWalletInformation: getWalletInformationType = async (address) => {
    let balance = await web3.eth.getBalance(address);
    balance = Number(web3.utils.fromWei(balance, "ether")).toFixed(6);

    const balances = [
        {
            name: "ETH",
            balance
        }
    ];

    for (let coin of coins) {
        try {
            const contract = new web3.eth.Contract(minABI as any, coin.address);
            const coinBalance = await contract.methods.balanceOf(address).call();
            const tokenDecimal = await contract.methods.decimals().call();

            balances.push({
                name: coin.name,
                balance: Number(coinBalance / Math.pow(10, tokenDecimal)).toFixed(6)
            });
        } catch (e) {
            console.log(e);
        }
    }

    return {
        data: balances
    };
}
