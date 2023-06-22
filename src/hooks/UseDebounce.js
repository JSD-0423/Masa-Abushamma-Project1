import { useEffect, useState } from "react";

const useDebounce = (Ammount, delay) => {
    const [debouncedAmmount, setDebouncedAmmount] = useState(Ammount);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedAmmount(Ammount);
        }, delay);

        return () => {
            clearTimeout(timerId);
        };
    }, [Ammount, delay]);

    return debouncedAmmount;
};

export default useDebounce;