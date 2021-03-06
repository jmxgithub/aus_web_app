import roleManageService from 'SERVICE/roleManageService'
import usermanageService from 'SERVICE/usermanageService'

// ================================
// Action Type
// ================================
const READ_ROLE = 'READ_ROLE';
const SELECT_ROLE = 'SELECT_ROLE';
const ROLE_USER_LIST = 'ROLE_USER_LIST';
const READ_ALL_USER = 'READ_ALL_USER';
const ADD_ROLE_USER_LIST = 'ADD_ROLE_USER_LIST';
const SAVE_USER_ROLE = 'SAVE_USER_ROLE';

// ================================
// Action Creator
// ================================
const readRole = () => {
	let roleManagesData = roleManageService.readRoleManage();
    return {
        type: 'READ_ROLE',
        payload: {
            roleManagesData: roleManagesData
        }
    }
};

const selectRole = (selectRole) => {
    return {
        type: 'SELECT_ROLE',
        payload: {
            selectRole: selectRole
        }
    }
};

const roleManageUserList = (roleName) => {
	let roleManageUserList = roleManageService.readRoleManage().result.data;
	let roleUserList = {};
	for (let i = 0; i < roleManageUserList.length; i++) {
		if (roleManageUserList[i].roleName == roleName) {
			roleUserList.member = roleManageUserList[i].member
		}
	}
    return {
        type: 'ROLE_USER_LIST',
        payload: {
            roleUserList: roleUserList
        }
    }
};

const allUserList = () => {
	let allUserList = usermanageService.readUsermanages().result.data;
    let allUserList1 = {};
    allUserList1.member = [];
    for (let i = 0; i < allUserList.length; i++) {
        let user = {};
        user.name = allUserList[i].name;
        user.userName = allUserList[i].userName;
        allUserList1.member.push(user);
    }
    return {
        type: 'READ_ALL_USER',
        payload: {
            allUserList: allUserList1
        }
    }
};

const addUserORRemoveToRole = (roleUserList) => {
    return {
        type: 'ADD_ROLE_USER_LIST',
        payload: {
            roleUserList: roleUserList
        }
    }
}

const saveUserRole = (roleName, roleUserList) => {
    let isSave = roleManageService.saveUserRole(roleName, roleUserList)
    return {
        type: 'SAVE_USER_ROLE',
        payload: {
            isSave: isSave
        }
    }
};
/* default 导出所有 Actions Creator */
export default {
    readRole, selectRole, roleManageUserList, allUserList, addUserORRemoveToRole, saveUserRole
}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    [READ_ROLE]: (roleManage, { payload }) => Object.assign({}, roleManage, { roleManagesData: payload.roleManagesData}),
    [SELECT_ROLE]: (roleManage, { payload }) => { roleManage.selectRole = payload.selectRole; return roleManage; },
    [ROLE_USER_LIST]: (roleManage, { payload }) => { roleManage.roleUserList = payload.roleUserList; return roleManage; },
    [READ_ALL_USER]: (roleManage, { payload }) => { roleManage.allUserList = payload.allUserList; return roleManage; },
    [SAVE_USER_ROLE]: (roleManage, { payload }) => { roleManage.isSave = payload.isSave; return roleManage; },
    [ADD_ROLE_USER_LIST]: (roleManage, { payload }) => Object.assign({}, roleManage, { roleUserList: payload.roleUserList})
};
