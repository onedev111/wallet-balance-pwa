import { useState } from "react";

declare type invokeApiType = (args: { api: Function, callBack: Function, errorCallback?: Function }, turnLoaderOn?: boolean) => Promise<void>;
export const useLoader = (initialState: boolean = false) => {
    const [loading, setLoading] = useState(initialState);

    const on = () => setLoading(true);
    const off = () => setLoading(false);

    const invokeApi: invokeApiType = async ({ api, callBack, errorCallback }, turnLoaderOn = true) => {
        try {
            if (turnLoaderOn) on();
            // api has to be a fucntion returning axios promise i.e () => axios.get("http://example.com")
            const { data } = await api();
            if (process.env.REACT_APP_MODE === "local") console.log(data);
            callBack(data);
        } catch (e) {
            if (process.env.REACT_APP_MODE === "local") console.log(e);
            errorCallback && errorCallback(e);
        } finally {
            off();
        }
    }

    return {
        loading,
        on,
        off,
        invokeApi
    }
}