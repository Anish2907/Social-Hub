export const AuthReducer = (state, action) => {
    switch (action.type) {
        case "Login_Start":
            return {
                ...state,
                user: null,
                isFetching: true,
                error: null
            };
        case "Login_Success":
            return {
                ...state,
                user: action.payload,
                isFetching: false,
                error: null
            };
        case "Login_Failure":
            return {
                ...state,
                user: null,
                isFetching: false,
                error: action.payload
            };
        case "New_Access_Token":
            return {
                ...state,
                user: { ...state.user, accessToken: action.payload },
                isFetching: false,
                error: null
            };
        case "Session_Expired":
            return {
                ...state,
                user: null,
                isFetching: false,
                error: action.payload
            };
        case "Page_Refresh":
            return {
                ...state,
                user: action.payload,
                isFetching: false,
                error: null
            };
        default: return state;
    }
}