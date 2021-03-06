import usermanageService from 'SERVICE/usermanageService'
// ================================
// Action Type
// ================================
const READ_USER = 'READ_USER';
const SELECT_USER = 'SELECT_USER';
const DEL_USER = 'DEL_USER';
const RES_USER_PASS = 'RES_USER_PASS';
const USER_DETAIL = 'USER_DETAIL';
const USER_UPDATE = 'USER_UPDATE';
const USER_UPDATE_SAVE = 'USER_UPDATE_SAVE';
const ADD_USER_SAVE = 'ADD_USER_SAVE';

// ================================
// Action Creator
// ================================
const readUser = () => {
    return {
        type: 'READ_USER',
        payload: {
            usermanagesData: usermanageService.readUsermanages()
        }
    }
};

const selectUser = (selectedRecord) => {
    return {
        type: 'SELECT_USER',
        payload: {
            selectedRecord: selectedRecord
        }
    }
};

const delUser = (userRecordUserName) => {
    let delUserName = usermanageService.delUser(userRecordUserName);
    return {
        type: 'DEL_USER',
        payload: {
            userRecordUserName: delUserName
        }
    }
};

const resUserPass = (userRecordUserName, passwd) => {
    let resUserPasswd = usermanageService.resUserPass(userRecordUserName, passwd);
    return {
        type: 'RES_USER_PASS',
        payload: {
            resUserPasswd: resUserPasswd
        }
    }
};

const userDetail = (userName) => {
    let userDetail = usermanageService.userDetail(userName);
    return {
        type: 'USER_DETAIL',
        payload: {
            userDetail: userDetail
        }
    }
};

const userUpdate = (str, value) => {
    return {
        type: 'USER_UPDATE',
        payload: {
            str: str,
            value1: value
        }
    }
};

const userUpdateSave = (userDetailObj) => {
    let isSaveSuccess = usermanageService.userUpdateSave(userDetailObj);
    return {
        type: 'USER_UPDATE_SAVE',
        payload: {
          isSaveSuccess: isSaveSuccess
        }
        
    }
};

const addUser = (addUserinfoObj) => {
    let isAddSuccess = usermanageService.addUserSave(addUserinfoObj);
    return {
        type: 'ADD_USER_SAVE',
        payload: {
          isAddSuccess: isAddSuccess
        }
    }
};
/* default 导出所有 Actions Creator */
export default {
    readUser, selectUser, delUser, resUserPass, userDetail, userUpdate, userUpdateSave, addUser
}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    [READ_USER]: (usermanage, { payload }) => Object.assign({}, usermanage, { usermanagesData: payload.usermanagesData}),
    [SELECT_USER]: (usermanage, { payload }) => { usermanage.selectedRecord = payload.selectedRecord; return usermanage; },
    [DEL_USER]: (usermanage, { payload }) => { usermanage.userRecordUserName = payload.userRecordUserName; return usermanage; },
    [RES_USER_PASS]: (usermanage, { payload }) => { usermanage.resUserPasswd = payload.resUserPasswd; return usermanage; },
    [USER_DETAIL]: (usermanage, { payload }) => { usermanage.userDetail = payload.userDetail; return usermanage; },
    [USER_UPDATE]: (usermanage, { payload }) => { usermanage.userDetail.result.detail[payload.str] = payload.value1; return usermanage; },
    [USER_UPDATE_SAVE]: (usermanage, { payload }) => { usermanage.isSaveSuccess = payload.isSaveSuccess; return usermanage; },
    [ADD_USER_SAVE]: (usermanage, { payload }) => { usermanage.isAddSuccess = payload.isAddSuccess; return usermanage; }
};
