import { createContext, useContext, useState } from "react";

const RecentsContext = createContext(null);

export default function RecentsProvider({ children }) {

    const [recents, setRecents] = useState([]);

    return (
        <RecentsContext.Provider value={{ recents, setRecents }}>
            {children}
        </RecentsContext.Provider>
    );
};

export const useRecents = () => useContext(RecentsContext);