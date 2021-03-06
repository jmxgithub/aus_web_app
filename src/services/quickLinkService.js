/**
 * 对应后端涉及的 API
 * User: gaogy
 * Date: 2017/1/09
 * Time: 10:47
 */

import xhr from './xhr/'
import { error, success } from 'UTIL/notification';
class QuickLinkService {
    /**
     * 获取快速导航信息
     */
    getQuickLinkInfo() {
        let userInfo = {};
        xhr({
            url: '/UserManager/getUserInfo',
            data: {
                userName: sessionStorage.getItem('XDataUserName')
            },
            success: function (data) {
                if (data.code == '0') {
                    userInfo = data.result.detail;
                } else {
                    error(data.msg);
                }
            }
        });
        return userInfo;
    }

    /**
     * 更新快速导航信息
     * @param userInfo
     */
    setQuickLinkInfo(userInfo) {
        let report = {};
        xhr({
            url: '/UserManager/modifyUserInfo',
            data: {
                userName: userInfo.userName,
                phoneNo: userInfo.phoneNo,
                name: userInfo.name,
                email: userInfo.email,
                department: userInfo.department,
                position: userInfo.position,
                quickLink: userInfo.quickLink
            },
            success: function (data) {
                if (data.code == '0') {
                    report = userInfo;
                    success('添加到快速导航成功！');
                } else {
                    error(data.msg);
                }
            }
        });
        return report;
    }
}

// 导出实例化对象
export default new QuickLinkService()
