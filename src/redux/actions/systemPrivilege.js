/**
 * Created by zhangaoxiang on 2016/12/21.
 */
import systemPrivilegeService from 'SERVICE/systemPrivilegeService'

const READ_PRIVILEGE = 'READ_PRIVILEGE';
const SELECT_PRIVILEGE = 'SELECT_PRIVILEGE';
const MODIFY_PRIVILEGE = 'MODIFY_PRIVILEGE';

const readPrivilege = () => {
    return {
        type: 'READ_PRIVILEGE',
        payload: {
            systemPrivilegeData: systemPrivilegeService.readSystemPrivilege()
        }
    }
};
const selectPrivilege = () => {
    return {
        type: 'SELECT_PRIVILEGE',
        payload: {
            selectSystemPrivilegeData: systemPrivilegeService.selectSystemPrivilege()
        }
    }
};
const modifyPrivilege = (roleId) => {
    return {
        type: 'MODIFY_PRIVILEGE',
        payload: {
            modifySystemPrivilegeData: systemPrivilegeService.modifySystemPrivilege(roleId)
        }
    }
};
export default { readPrivilege, selectPrivilege, modifyPrivilege }

export const ACTION_HANDLERS = {
    [READ_PRIVILEGE]: (systemPrivilege, { payload }) => { systemPrivilege.systemPrivilegeData = payload.systemPrivilegeData; return systemPrivilege; },
    [SELECT_PRIVILEGE]: (systemPrivilege, { payload }) => { systemPrivilege.selectSystemPrivilegeData = payload.selectSystemPrivilegeData; return systemPrivilege; },
    [MODIFY_PRIVILEGE]: (systemPrivilege, { payload }) => { systemPrivilege.modifySystemPrivilegeData = payload.modifySystemPrivilegeData; return systemPrivilege; }
};
