import {useState} from "react";

export const useError = (initialValue: string) => {
    const [error, setError] = useState<string>(initialValue);
    const [isError, setIsError] = useState(false);

    return {
        setError,
        setIsError,
        isError,
        error
    }
}