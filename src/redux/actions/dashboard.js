import dashboardService from 'SERVICE/dashboardService'
import quickLinkService from 'SERVICE/quickLinkService'
// ================================
// Action Type
// ================================
const READ_DASHBOARD = 'READ_DASHBOARD';
const SELECT_DASHBOARD = 'SELECT_DASHBOARD';
const DEL_DASHBOARD = 'DEL_DASHBOARD';
const MQL_SEARCH = 'MQL_SEARCH';
const ADD_DASHBOARD = 'ADD_DASHBOARD';
const GET_DASHBOARD = 'GET_DASHBOARD';
const UPDATE_DASHBOARD = 'UPDATE_DASHBOARD';
const GET_REPORT_LIST = 'GET_REPORT_LIST';
const SELECT_REPORT = 'SELECT_REPORT';
const REMOVE_REPORT = 'REMOVE_REPORT';
const CLEAR_REPORT = 'CLEAR_REPORT';
const SEARCH_DASHBOARD = 'SEARCH_DASHBOARD';
const CHANGE_BREAKPOINT = 'CHANGE_BREAKPOINT';
const CHANGE_LAYOUT = 'CHANGE_LAYOUT';
const GET_QUICK_LINK_INFO = 'GET_QUICK_LINK_INFO';
const SET_QUICK_LINK_INFO = 'SET_QUICK_LINK_INFO';
// ================================
// Action Creator
// ================================
const readDashboard = () => {
    return {
        type: 'READ_DASHBOARD',
        payload: {
            dashboardData: dashboardService.readDashboards()
        }
    }
};

const selectDashboard = (selectedRecord) => {
    return {
        type: 'SELECT_DASHBOARD',
        payload: {
            selectedRecord: selectedRecord
        }
    }
};

const delDashboard = (dashboardRecordId) => {
    let delId = dashboardService.delDashboard(dashboardRecordId);
    return {
        type: 'DEL_DASHBOARD',
        payload: {
            dashboardRecordId: delId
        }
    }
};

const mqlSearch = (options) => {
    return {
        type: 'MQL_SEARCH',
        payload: {
            mqlResult: dashboardService.mqlSearch(options)
        }
    }
};

const addDashboard = (options) => {
    return {
        type: 'ADD_DASHBOARD',
        payload: {
            dashboardAdd: dashboardService.addDashboard(options)
        }
    }
};

const getDashboard = (dashboardName) => {
    return {
        type: 'GET_DASHBOARD',
        payload: {
            dashboard: dashboardService.getDashboard(dashboardName)
        }
    }
};

const updateDashboard = (options) => {
    return {
        type: 'UPDATE_DASHBOARD',
        payload: {
            dashboard: dashboardService.updateDashboard(options)
        }
    }
};

const getReportList = () => {
    return {
        type: 'GET_REPORT_LIST',
        payload: {
            reportList: dashboardService.getReportList()
        }
    }
};

const selectReport = (reportName) => {
    return {
        type: 'SELECT_REPORT',
        payload: {
            report: dashboardService.selectReport(reportName)
        }
    }
};

const removeReport = (reportName) => {
    return {
        type: 'REMOVE_REPORT',
        payload: {
            reportName: reportName
        }
    }
};

const clearReports = () => {
    return {
        type: 'CLEAR_REPORT',
        payload: {
            selectedReports: []
        }
    }
};

const searchDashboard = (filters) => {
    return {
        type: 'SEARCH_DASHBOARD',
        payload: {
            searchObj: filters
        }
    }
};

const changeBreakpoint = (cols) => {
    return {
        type: 'CHANGE_BREAKPOINT',
        payload: {
            breakpointCols: cols
        }
    }
};

const changeLayout = (layout, layouts) => {
    return {
        type: 'CHANGE_LAYOUT',
        payload: {
            layout: layout,
            layouts: layouts
        }
    }
};

const getQuickLinkInfo = () => {
    return {
        type: 'GET_QUICK_LINK_INFO',
        payload: {
            userInfo: quickLinkService.getQuickLinkInfo()
        }
    }
};

const setQuickLinkInfo = (quickLinkInfo) => {
    return {
        type: 'SET_QUICK_LINK_INFO',
        payload: {
            userInfo: quickLinkService.setQuickLinkInfo(quickLinkInfo)
        }
    }
};

/* default 导出所有 Actions Creator */
export default {
    readDashboard, selectDashboard, delDashboard, mqlSearch, addDashboard, getDashboard, updateDashboard, getReportList, selectReport, clearReports, removeReport, searchDashboard, changeBreakpoint, changeLayout, getQuickLinkInfo, setQuickLinkInfo
}

// ================================
// Action handlers for Reducer
// ================================
export const ACTION_HANDLERS = {
    [READ_DASHBOARD]: (dashboard, { payload }) => Object.assign({}, dashboard, { dashboardData: payload.dashboardData, selectedRecord: {} }),
    [SELECT_DASHBOARD]: (dashboard, { payload }) => Object.assign({}, dashboard, { selectedRecord: payload.selectedRecord }),
    [DEL_DASHBOARD]: (dashboard, { payload }) => Object.assign({}, dashboard, { dashboardRecordId: payload.dashboardRecordId }),
    [MQL_SEARCH]: (dashboard, { payload }) => Object.assign({}, dashboard, { mqlResult: payload.mqlResult }),
    [ADD_DASHBOARD]: (dashboard, { payload }) => Object.assign({}, dashboard, {}),
    [UPDATE_DASHBOARD]: (dashboard, { payload }) => Object.assign({}, dashboard, { dashboardRecordId: payload.dashboardRecordId }),
    [GET_DASHBOARD]: (dashboard, { payload }) => Object.assign({}, dashboard, { selectedRecord: payload.dashboard, isDelAll: false }),
    [GET_REPORT_LIST]: (dashboard, { payload }) => Object.assign({}, dashboard, { reportList: payload.reportList }),
    [SEARCH_DASHBOARD]: (dashboard, { payload }) => Object.assign({}, dashboard, { searchObj: payload.searchObj }),
    [SELECT_REPORT]: (dashboard, { payload }) => {
        let reports = dashboard.selectedReports;
        reports.push(payload.report);
        return Object.assign({}, dashboard, { selectedReports: reports });
    },
    [REMOVE_REPORT]: (dashboard, { payload }) => {
        let isNoReport = false;
        let reports = dashboard.selectedReports;
        reports = reports.filter((item) => {
            return item.reportName != payload.reportName;
        });

        if (reports.length === 0) {
            isNoReport = true;
        }

        return Object.assign({}, dashboard, { selectedReports: reports, isDelAll: isNoReport });
    },
    [CLEAR_REPORT]: (dashboard, { payload }) => Object.assign({}, dashboard, { selectedReports: payload.selectedReports }),
    [CHANGE_BREAKPOINT]: (dashboard, { payload }) => Object.assign({}, dashboard, { breakpointCols: payload.breakpointCols }),
    [CHANGE_LAYOUT]: (dashboard, { payload }) => Object.assign({}, dashboard, { layout: payload.layout, layouts: payload.layouts }),
    [GET_QUICK_LINK_INFO]: (dashboard, { payload }) => Object.assign({}, dashboard, { userInfo: payload.userInfo }),
    [SET_QUICK_LINK_INFO]: (dashboard, { payload }) => Object.assign({}, dashboard, { userInfo: payload.userInfo })
};
