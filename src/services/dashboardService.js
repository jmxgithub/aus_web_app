/**
 * 对应后端涉及的 API
 * User: gaogy
 * Date: 2016/12/09
 * Time: 11:47
 */

import xhr from './xhr/'
import { success, error } from 'UTIL/notification';
class DashboardService {

    /**
     * 获取仪表板列表请求逻辑
     * @returns {{}}
     */
    readDashboards() {
        let dashboardList = {};
        xhr({
            url: '/DashboardManager/list',
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    dashboardList = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return dashboardList;
    }

    /**
     * 仪表板删除事件
     * @param dashboardId
     */
    delDashboard(dashboardId) {
        var isDelSuccess = false;

        xhr({
            url: '/DashboardManager/delete',
            data: {
                names: dashboardId
            },
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    success('删除成功！');
                    isDelSuccess = true;
                    window.location.replace('#/dashboard');
                } else {
                    for (let key in data.result.status) {
                        error('仪表板[' + key + ']删除失败！' + data.result.status[key]);
                    }
                }
            }
        });

        if (isDelSuccess) {
            return dashboardId;
        }
    }

    /**
     * MQL查询事件
     * @param options
     */
    mqlSearch(mqlOptions) {
        let mqlResult = {};
        xhr({
            url: '/DashboardManager/search',
            data: mqlOptions,
            async: true,
            success: function (data) {
                if (data.code == '0') {
                    mqlResult = data;
                } else {
                    error(data.msg);
                }
            }
        });

        return mqlResult;
    }

    /**
     * 仪表板保存事件
     * @param dashboardName
     */
    getDashboard(dashboardName) {
        let dashboard = {};
        xhr({
            url: '/DashboardManager/get',
            data: {
                dashboardName: dashboardName
            },
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    dashboard = data.result.detail;
                } else {
                    error(data.msg);
                }
            }
        });
        return dashboard;
    }

    /**
     * 仪表板新建事件
     * @param options
     */
    addDashboard(dashboardOptions) {
        xhr({
            url: '/DashboardManager/create',
            data: dashboardOptions,
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    success('创建成功！');
                    window.location.replace('#/dashboard');
                } else {
                    error(data.msg);
                }
            }
        });
    }

    /**
     * 仪表板更新事件
     * @param options
     */
    updateDashboard(dashboardOptions) {
        xhr({
            url: '/DashboardManager/modify',
            data: dashboardOptions,
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    success('更新成功！');
                    window.location.replace('#/dashboard');
                } else {
                    error(data.msg);
                }
            }
        });
    }

    /**
     * 获取报表列表请求逻辑
     * @returns {{}}
     */
    getReportList() {
        let reportList = {};
        xhr({
            url: '/ReportManager/list',
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    reportList = data;
                } else {
                    error(data.msg);
                }
            }
        });
        return reportList;
    }

    /**
     * 报表保存事件
     * @param reportName
     */
    selectReport(reportName) {
        let report = {};
        xhr({
            url: '/ReportManager/get',
            data: {
                reportName: reportName
            },
            async: false,
            success: function (data) {
                if (data.code == '0') {
                    if (data.result.detail) {
                        report = data.result.detail;
                    } else {
                        report.reportName = reportName;
                    }
                } else {
                    error(data.msg);
                }
            }
        });
        return report;
    }
}

// 导出实例化对象
export default new DashboardService()
