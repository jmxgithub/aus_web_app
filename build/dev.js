/**
 * 开发环境配置
 * User: gaogy
 * Date: 2016/11/25
 * Time: 15:09
 */
var express = require('express'),
    webpack = require('webpack'),
// favicon = require('express-favicon'),
    config = require('./webpack.dev.conf'),
    app = express();

var compiler = webpack(config);

// 静态资源获取
app.use('/static', express.static(config.commonPath.staticDir));

// app.use(favicon(path.join(__dirname, '../favicon.ico')));

// HTML5 history API插件
app.use(require('connect-history-api-fallback')());

// 组织包装bundle文件使其变为中间件
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

// 启用 hot-reload 和 state-preserving
// 展示编译错误
app.use(require('webpack-hot-middleware')(compiler));

app.listen(9000, '127.0.0.1', function(err) {
    err && console.log(err);
});


/*******************报表管理请求**********************/
app.post('/ReportManager/list', function(req, res){
    res.send(require("./mock/reportList.json"));
});

app.post('/ReportManager/delete', function(req, res){
    res.send(require("./mock/deleteReport.json"));
});

app.post('/ReportManager/search', function(req, res){
    res.send(require("./mock/searchReport.json"));
});

app.post('/ReportManager/create', function(req, res){
    res.send(require("./mock/addReport.json"));
});

app.post('/ReportManager/get', function(req, res){
    res.send(require("./mock/reportDetail.json"));
});

app.post('/ReportManager/modify', function(req, res){
    res.send(require("./mock/updateReport.json"));
});

/*******************仪表板管理请求**********************/
app.post('/DashboardManager/list', function(req, res){
    res.send(require("./mock/dashboardList.json"));
});

app.post('/DashboardManager/create', function(req, res){
    res.send(require("./mock/createDashboard.json"));
});

app.post('/DashboardManager/delete', function(req, res){
    res.send(require("./mock/deleteDashboard.json"));
});

app.post('/DashboardManager/get', function(req, res){
    res.send(require("./mock/getDashboard.json"));
});

app.post('/DashboardManager/modify', function(req, res){
    res.send(require("./mock/deleteDashboard.json"));
});

app.post('/DashboardManager/search', function(req, res){
    res.send(require("./mock/searchDashboard.json"));
});

// 用户列表请求
app.post('/UserManager/listUser', function(req, res){
    res.send(require("./mock/usermanages.json"));
});

app.post('/UserManager/delete', function(req, res){
    res.send(require("./mock/usermanage2.json"));
});

app.post('/UserManager/getUserInfo', function(req, res){
    res.send(require("./mock/userDetail.json"));
});

app.post('/UserManager/modifyUserInfo', function(req, res){
    res.send(require("./mock/isSaveSuccess.json"));
});

app.post('/UserManager/create', function(req, res){
    res.send(require("./mock/isAddSuccess.json"));
});
/************************数据集请求****************************/
app.post('/DatasetManager/listDataset', function (req, res) {
    res.send(require("./mock/datasetsList.json"));
});
app.post('/DatasetManager/createDataset', function (req, res) {
    res.send(require("./mock/createDataset.json"));
});
app.post('/DatasetManager/isExists', function (req, res) {
    res.send(require("./mock/datasetIsExist.json"));
});
app.post('/DatasetManager/get', function (req, res) {
    res.send(require("./mock/getDataset.json"));
});
app.post('/DatasetManager/deleteDataset', function (req, res) {
    res.send(require("./mock/deleteDataset.json"));
});
app.post('/DatasetManager/modifyDataset', function (req, res) {
    res.send(require("./mock/modifyDataset.json"));
});
app.post('/DatasetManager/listAnalyzers', function (req, res) {
    res.send(require("./mock/listAnalyzers.json"));
});
app.post('/DatasetManager/getMaxSettingNums', function (req, res) {
    res.send(require("./mock/getMaxSettingNums.json"));
});
/************************数据集请求完毕****************************/
/************************系统权限请求****************************/
app.post('/RoleManager/list', function (req, res) {
    res.send(require("./mock/listRoleSystemPrivilege.json"));
});
app.post('/RoleManager/modify', function (req, res) {
    res.send(require("./mock/RoleManagerModify.json"));
});
/************************系统权限请求完毕****************************/
// 角色列表请求
app.post('/RoleManager/listRole', function(req, res){
    res.send(require("./mock/roleManages.json"));
});

app.post('/RoleManager/modify', function(req, res){
    res.send(require("./mock/roleListSave.json"));
});

app.post('/UserManager/validUser', function(req, res){
    res.send(require("./mock/isLoginSuccess.json"));
});

app.post('/UserManager/logout', function(req, res){
    res.send(require("./mock/isLoginSuccess.json"));
});
app.post('/PrivilegeManager/listSystemPrivilege', function(req, res){
    res.send(require("./mock/listSystemPrivilege.json"));
});

app.post('/LicenseManager/validLicenseStatus', function(req, res){
    res.send(require("./mock/isActive.json"));
});

app.post('/LicenseManager/uploadLicenseFile', function(req, res){
    res.send(require("./mock/isLoginSuccess.json"));
});