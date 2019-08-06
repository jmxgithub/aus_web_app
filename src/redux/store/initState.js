/**
 *  整个应用状态结构树 及其 初始值
 * User: gaogy
 * Date: 2016/11/25
 * Time: 15:05
 */
export default {
    userData: null,

    sidebar: {
        menuList: [
            {
                'id': '1',
                'isActive': 'active',
                'name': '快速导航',
                'iconType': 'fa fa-paper-plane',
                'path': '/quickNav'
            },
            {
                id: '2',
                name: '仪表板管理',
                iconType: 'fa fa-dashboard',
                path: '/dashboard'
            },
            {
                id: '3',
                name: '报表管理',
                iconType: 'fa fa-area-chart',
                path: '/report'
            },
            {
                id: '4',
                name: '数据集管理',
                iconType: 'fa fa-database',
                path: '/dataSet'
            }
        ],
        selectedMenu: {}
    },

    breadcrumb: {
        defaultMenu: {
            name: '快速导航',
            path: '/quickNav'
        },
        '/': '快速导航',
        '/report': '报表管理',
        '/report/add': '报表新建',
        '/report/update': '报表修改',
        '/report/detail': '报表详情',
        '/report/analysis': '报表分析',
        '/quickNav': '快速导航',
        '/dataSet': '数据集管理',
        '/dataSet/detail': '数据集详情',
        '/dataSet/add': '数据集新建',
        '/dataSet/update': '数据集修改',
        '/dashboard': '仪表板管理',
        '/dashboard/add': '新建仪表板',
        '/dashboard/detail': '仪表板详情',
        '/dashboard/update': '仪表板修改',
        '/dashboard/analysis': '仪表板分析',
        '/systemPrivilege': '权限管理',
        '/usercenter': '个人中心',
        '/changepasswd': '修改密码',
        '/usermanage': '用户管理',
        '/usermanage/detail': '用户详情',
        '/usermanage/update': '用户修改',
        '/usermanage/add': '用户新建',
        '/roleManage': '角色管理',
        '/roleManage/edit': '角色内用户列表'

    },

    report: {
        reportsData: {},
        selectedRecord: {},
        reportRecordId: {},
        mqlResult: {}
    },

    dashboard: {
        dashboardData: {},
        selectedRecord: {},
        reportList: {},
        breakpointCols: 12,
        layout: [],
        layouts: {},
        userInfo: {},
        selectedReports: [],
        isDelAll: false
    },

    quickLink: {
        userInfo: {}
    },

    usermanage: {
        usermanagesData: {},
        selectedRecord: {},
        userRecordId: {},
        userResRecordId: {},
        userDetail: {}
    },
    systemPrivilege: {
        systemPrivilegeData: {},
        selectSystemPrivilegeData: {},
        modifySystemPrivilegeData: {}
    },
    dataset: {
        analyzers: [],
        maxSettingNums: {},
        datasetList: {},
        selectedRecord: {},
        deleteDatasetID: {},
        getDatasetData: {},
        modifyDatasetId: {},
        isExists: {}
    },
    roleManage: {
        roleManagesData: {},
        selectRole: {},
        roleUserList: {},
        allUserList: {},
        isSave: {}
    },

    login: {
        loginData: {},
        logoff: {},
        userRolePermission: {},
        isActive: {}
    },

    userCenter: {
        userCenterData: {}
    },

    changePasswd: {
        passwd: {}
    }
}
