import { createContext, useReducer, useState } from "react";
import { AuthReducer } from "./AuthReducer";

const Initial_State = {
    user: null,
    isFetcheing: false,
    error: null
}

export const UserContext = createContext(Initial_State);

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, Initial_State);
    const [messages, countMessages] = useState(0);

    return <UserContext.Provider
        value={{
            user: state.user,
            isFetcheing: state.isFetcheing,
            error: state.error,
            messages,
            countMessages,
            dispatch
        }}
    >
        {children}
    </UserContext.Provider>
}