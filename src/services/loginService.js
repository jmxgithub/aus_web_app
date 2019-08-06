/**
 * 对应后端涉及的 API
 * User: jiaomx
 * Date: 2016/12/27
 * Time: 17:26
 */

import xhr from './xhr/';
import { error } from 'UTIL/notification';
class ReportService {

    /**
     * 用户登录
     * @returns {{}}
     */
    login(userName, passwd) {
        let login = {};
        xhr({
            url: '/UserManager/validUser',
            async: false,
            data: {userName: userName, password: passwd},
            success: function (data) {
                if (data.code == '0') {
                    login = data;
                    sessionStorage.setItem('XDataUserName', userName);
                } else {
                    error(data.msg);
                }
            }
        });
        return login;
    }
    /**
     * 用户注销
     * @returns {{}}
     */
    logoff(userName) {
        let logoff = {};
        xhr({
            url: '/UserManager/logout',
            async: false,
            data: {userName: userName},
            success: function (data) {
                if (data.code == '0') {
                    logoff = data;
                    sessionStorage.removeItem('XDataUserName');
                    sessionStorage.removeItem('userRolePermission');
                }else {
                    error(data.msg);
                }
            }
        });
        return logoff;
    }

    /**
     * 用户权限获取
     * @returns {{}}
     */
    userRolePermission(userName) {
        let userRolePermission = {};
        xhr({
            url: '/PrivilegeManager/listSystemPrivilege',
            async: false,
            data: {userName: userName},
            success: function (data) {
                if (data.code == '0') {
                    userRolePermission = data;
                    sessionStorage.setItem('userRolePermission', data.result);
                }else {
                    error(data.msg);
                }
            }
        });
        return userRolePermission;
    }

    /**
     * 激活获取
     * @returns {{}}
     */
    getActive() {
        let getActive = {};
        xhr({
            url: '/LicenseManager/validLicenseStatus',
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    getActive = data;
                }else {
                    error(data.msg);
                }
            }
        });
        return getActive;
    }

}

// 导出实例化对象
export default new ReportService()
