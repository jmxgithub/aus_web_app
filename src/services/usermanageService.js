/**
 * 对应后端涉及的 API
 * User: jiaomx
 * Date: 2016/12/19
 * Time: 17:29
 */

import xhr from './xhr/'
import { success, error } from 'UTIL/notification';
class UsermanageService {

    /**
     * 获取用户列表请求逻辑
     * @returns {{}}
     */
    readUsermanages() {
        let usermanageList = {};
        xhr({
            url: '/UserManager/listUser',
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    usermanageList = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return usermanageList;
    }

    /**
     * 用户删除事件
     * @param usertId
     */
    delUser(names) {
        let isDelSuccess = false;
        xhr({
            url: '/UserManager/delete',
            data: {
                names: names
            },
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    success('删除成功！');
                    isDelSuccess = true;
                }else {
                    for (let key in data.result.status) {
                        error('用户[' + key + ']删除失败！' + data.result.status[key]);
                    }
                }
            }
        });
        if (isDelSuccess) {
            return names;
        }
    }

    /**
     * 用户重置密码事件
     * @param usertId
     */
    resUserPass(userRecordUserName, md5Passwd) {
        let resUserPass = {}
        xhr({
            url: '/UserManager/modifyUserInfo',
            data: {
                userName: userRecordUserName,
                password: md5Passwd
            },
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    resUserPass = data;
                }else {
                    error(data.msg);
                }
            }
        });
        return resUserPass;
    }

    /**
     * 获取用户列表请求逻辑
     * @returns {{}}
     */
    userDetail(userName) {
        let userDetail = {};
        xhr({
            url: '/UserManager/getUserInfo',
            data: {
                userName: userName
            },
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    userDetail = data;
                }else {
                    error(data.msg);
                }
            }
        });
        return userDetail;
    }

    /**
     * 用户保存
     * @returns {{}}
     */
    userUpdateSave(userDetailObj) {
        let isUpdateSave = {};
        xhr({
            url: '/UserManager/modifyUserInfo',
            data: {
                userName: userDetailObj.userName,
                phoneNo: userDetailObj.phoneNo,
                name: userDetailObj.name,
                email: userDetailObj.email,
                department: userDetailObj.department,
                position: userDetailObj.position
            },
            success: function (data) {
                if (data.code == '0') {
                    success('修改成功！');
                    isUpdateSave = data;
                }else {
                    error(data.msg);
                }
            }
        });
        return isUpdateSave;
    }

    /**
     * 添加用户
     * @returns {{}}
     */
    addUserSave(addUserinfoObj) {
        let isAddSuccess = {};
        xhr({
            url: '/UserManager/create',
            data: {
                userName: addUserinfoObj.userName,
                password: addUserinfoObj.passwd,
                phoneNo: addUserinfoObj.phoneNo,
                name: addUserinfoObj.name,
                email: addUserinfoObj.email,
                department: addUserinfoObj.department,
                position: addUserinfoObj.position
            },
            success: function (data) {
                if (data.code == '0') {
                    isAddSuccess = data;
                    success('添加成功！');
                }else {
                    error(data.msg);
                }
            }
        });
        return isAddSuccess;
    }
}

// 导出实例化对象
export default new UsermanageService()
