/**
 * 对应后端涉及的 API
 * User: jiaomx
 * Date: 2016/12/22
 * Time: 14:59
 */

import xhr from './xhr/'
import { success, error } from 'UTIL/notification';
class RoleManageService {

    /**
     * 获取角色列表请求逻辑
     * @returns {{}}
     */
    readRoleManage() {
        let roleManageList = {};
        xhr({
            url: '/RoleManager/listRole',
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    roleManageList = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return roleManageList;
    }

    saveUserRole(roleName, roleUserList) {
        let saveUserRole = {};
        xhr({
            url: '/RoleManager/modify',
            data: {roleName: roleName, member: roleUserList},
            success: function (data) {
                if (data.code == '0') {
                    saveUserRole = data;
                    success('保存成功！');
                }else {
                    error(data.msg);
                }
            }
        });
        return saveUserRole;
    }

}

// 导出实例化对象
export default new RoleManageService()
