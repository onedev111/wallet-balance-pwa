import React, { useState, createContext, useEffect } from "react";
import { IBalances, IContextValues, themeType } from "../types";

export const AppContext = createContext<IContextValues | null>(null);

const WithAppContext = ({ children }: JSX.ElementChildrenAttribute) => {
	const [addresses, setAddresses] = useState<string[]>([]);
	const [balances, setBalances] = useState<IBalances[]>([]);
	const [selectedAddress, setSelectedAddress] = useState<string | undefined>();
	const [theme, setTheme] = useState<themeType>(localStorage.getItem("theme") as themeType || "light");

	const loadApp = () => {
		try {
			const _addresses = JSON.parse(localStorage.getItem("addresses") as any);
			if (_addresses?.length) setAddresses(_addresses);
		} catch (e) {
			console.log("ERROR GETTING ADDRESSES FROM LOCAL STORAGE", e);
		}
	};

	useEffect(() => {
		loadApp();
	}, []);

	const addAddress = (address: string) => {
		addresses.push(address);
		localStorage.setItem("addresses", JSON.stringify(addresses));
		setAddresses([...addresses]);
	};

	const removeAddress = (index: number) => {
		addresses.splice(index, 1);
		localStorage.setItem("addresses", JSON.stringify(addresses));
		setAddresses([...addresses]);
	}

	return (
		<AppContext.Provider
			value={{
				addresses,
				balances,
				selectedAddress,
				addAddress,
				removeAddress,
				setBalances,
				setSelectedAddress,
				theme,
				setTheme,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default WithAppContext;
