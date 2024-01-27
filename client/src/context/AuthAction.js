export const LoginStart = (userCredentials) => {
    return {
        type: "Login_Start"
    }
}
export const LoginSuccess = (userInfo) => {
    return {
        type: "Login_Success",
        payload: userInfo
    }
}
export const LoginFailure = (error) => {
    return {
        type: "Login_Failure",
        payload: error
    }
}
export const NewAccessToken = (accessToken) => {
    return {
        type: "New_Access_Token",
        payload: accessToken
    }
}
export const SessionExpired = (error) => {
    return {
        type: "Session_Expired",
        payload: error
    }
}
export const PageRefresh = (userInfo) => {
    return {
        type: "Page_Refresh",
        payload: userInfo
    }
}