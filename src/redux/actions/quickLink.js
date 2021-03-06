import quickLinkService from 'SERVICE/quickLinkService'
// ================================
// Action Type
// ================================
const GET_USER_INFO = 'GET_USER_INFO';
const SET_USER_INFO = 'SET_USER_INFO';
// ================================
// Action Creator
// ================================
const getUserInfo = () => {
    return {
        type: 'GET_USER_INFO',
        payload: {
            userInfo: quickLinkService.getQuickLinkInfo()
        }
    }
};

const setUserInfo = (quickLinkInfo) => {
    return {
        type: 'SET_USER_INFO',
        payload: {
            userInfo: quickLinkService.setQuickLinkInfo(quickLinkInfo)
        }
    }
};

/* default 导出所有 Actions Creator */
export default {
    getUserInfo, setUserInfo
}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    [GET_USER_INFO]: (quickLink, { payload }) => Object.assign({}, quickLink, { userInfo: payload.userInfo }),
    [SET_USER_INFO]: (quickLink, { payload }) => Object.assign({}, quickLink, { userInfo: payload.userInfo })
};
