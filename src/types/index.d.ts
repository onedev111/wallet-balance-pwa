import { Dispatch, SetStateAction } from "react";

export interface IBalances {
	name: string;
	balance: string;
}

export type themeType = "dark" | "light";
export interface IContextValues {
	addresses: string[];
	balances: IBalances[];
	selectedAddress: string | undefined;
	addAddress: (address: string) => any;
	removeAddress: (index: number) => any;
	setBalances: Dispatch<SetStateAction<IBalances[]>>;
	setSelectedAddress: (selectedAddress: string) => void;
	theme: themeType
	setTheme: Dispatch<SetStateAction<themeType>>;
}

export interface ICoinAddress {
	name: string;
	address: string;
}
