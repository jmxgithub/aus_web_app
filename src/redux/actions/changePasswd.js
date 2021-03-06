import usermanageService from 'SERVICE/usermanageService'
// ================================
// Action Type
// ================================
const READ_USER_INFO = 'READ_USER_INFO';
const IS_CHANGE_SUCCESS = 'IS_CHANGE_SUCCESS';

// ================================
// Action Creator
// ================================

const readUserPasswd = (userName) => {
    let userInfo = usermanageService.userDetail(userName)
    return {
        type: 'READ_USER_INFO',
        payload: {
            userInfo: userInfo
        }
    }
};

const changePasswdSave = (detail) => {
	let userName = detail.userName;
	let passwd = detail.inputNewPasswd
	let resUserPasswd = usermanageService.resUserPass(userName, passwd);
    return {
        type: 'IS_CHANGE_SUCCESS',
        payload: {
            resUserPasswd: resUserPasswd
        }
    }
};
/* default 导出所有 Actions Creator */
export default {
    readUserPasswd, changePasswdSave
}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    [READ_USER_INFO]: (changePasswd, { payload }) => { changePasswd.userInfo = payload.userInfo; return changePasswd; },
    [IS_CHANGE_SUCCESS]: (changePasswd, { payload }) => { changePasswd.resUserPasswd = payload.resUserPasswd; return changePasswd; }
};
