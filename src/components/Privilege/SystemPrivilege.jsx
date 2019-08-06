/**
 * 系统权限管理组件
 * User: zhangax
 * Date: 2016/12/21
 * Time: 10:18
 */
import React, { Component } from 'react';
import Modal from 'COMPONENT/Common/Modal/Modal';
import createSelect, { bindSelectEvent } from 'UTIL/baseSelect2';
import createiCheck from 'UTIL/baseiCheck';

class SystemPrivilege extends Component {
    constructor(props) {
        super(props);
        this.createSelect = this.createSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        // 读取 action 里面 ajax 请求到的数据
        this.props.readPrivilege();
    }
    componentDidMount() {
        let spDetail = this.props.systemPrivilege.systemPrivilegeData.result.data[0].sysPrivilege.split(' ');
        let spClass = $('.sp_detail');
        $('.ensure').attr('disabled', true);
        $('.cancel').attr('disabled', true);
        spClass.each((n, e) => {
            if ($.inArray(e.name, spDetail) != -1) {
                e.checked = true;
                createiCheck(e);
            } else {
                $(e).parents('label').css('color', '#d2d6de');
                createiCheck(e);
            }
            e.disabled = true;
            createiCheck(e);
        });
        let obj = [];
        let roleName = this.props.systemPrivilege.systemPrivilegeData.result.data;
        for (var i = 0; i < roleName.length; i++) {
            let param = {};
            param.id = roleName[i].roleName;
            param.text = roleName[i].roleName;
            obj.push(param);
        }
        this.createSelect(obj);
    }

    // select2 下拉框
    createSelect(data) {
        let selectConfig = {};
        selectConfig.id = 'select_role';
        selectConfig.data = data;
        selectConfig.tags = false;
        selectConfig.placeholder = '输入角色名快速查找';
        selectConfig.minimumResultsForSearch = 2;
        createSelect(selectConfig);
        bindSelectEvent('select_role', 'select2:select', this.handleChange);
    }

    /**
    componentDidUpdate() {
        let spDetail = this.props.systemPrivilege.systemPrivilegeData.result.data[0].sysPrivilege.split(' ');
        let spClass = $('.sp_detail');
        spClass.each((n, e) =>{
            if ($.inArray(e.name, spDetail) != -1) {
                e.checked = true;
            };
            e.disabled = true;
        });
        /**
         *接口是对象时
         for (var ca in a) {
        }
    }*/
    // 选择角色权限
    handleChange() {
        this.props.selectPrivilege();
        $('.sp_select_role').attr('disabled', false);
        $('.modify').attr('disabled', false);
        $('.cancel').attr('disabled', true);
        $('.ensure').attr('disabled', true);
        let roleId = $('.sp_select_role').val();
        let spDetail = this.props.systemPrivilege.selectSystemPrivilegeData.result.data;
        let spClass = $('.sp_detail');
        for (var i = 0; i < spDetail.length; i++) {
            if (spDetail[i].roleName == roleId) {
                spDetail = spDetail[i].sysPrivilege.split(' ');
                spClass.each((n, e) =>{
                    e.disabled = false;
                    $(e).parents('label').css('color', '#000');
                    e.checked = false;
                    if ($.inArray(e.name, spDetail) != -1) {
                        e.checked = true;
                        createiCheck(e);
                    } else {
                        $(e).parents('label').css('color', '#d2d6de');
                        createiCheck(e);
                    }
                    e.disabled = true;
                    createiCheck(e);
                });
            }
        }
    }
    // 点击修改权限
    handleEdit(e) {
        $('.ensure').attr('disabled', false);
        $('.modify').attr('disabled', true);
        $('.cancel').attr('disabled', false);
        $('.sp_select_role').attr('disabled', true);
        let spClass = $('.sp_detail');
        spClass.each((n, e) => {
            $(e).parents('label').css('color', '#000');
            e.disabled = false;
            createiCheck(e);
        });
    };
    // 修改权限确认
    handleModify() {
        let roleName = $('.sp_select_role option:selected').text();
        this.refs.sp_modify.setContent('您确定要修改：  <' + roleName + '> 的系统权限吗？');
    }
    // 修改提交
    modifyOKHandle() {
        $('.sp_select_role').attr('disabled', false);
        let roleId = $('.sp_select_role').val();
        let spClass = $('.sp_detail');
        let data = {};
        data.roleName = roleId;
        data.sysPrivilege = '';
        spClass.each((n, e) => {
            if (e.checked) {
                data.sysPrivilege += (e.name + ' ');
            } else {
                $(e).parents('label').css('color', '#d2d6de');
            }
            e.disabled = true;
            createiCheck(e);
        });
        this.props.modifyPrivilege(data);
        $('.ensure').attr('disabled', true);
        $('.cancel').attr('disabled', true);
        $('.modify').attr('disabled', false);
        $('#sp_modify').modal('hide');
    };
    render() {
        let role = this.props.systemPrivilege.systemPrivilegeData.result.data[0].roleName;
        return (
            <div className="box box-primary">
                <p className="box-header with-border sp_role_info"><h4>权限管理</h4></p>
                <div className="row sp_content">
                    <div className="col-sm-2 hidden-xs text-right">
                        <p className="sp_role">选择角色 : </p>
                        <p className="sp_role_set">角色权限设置 : </p>
                    </div>
                    <div className="col-sm-8 col-xs-12">
                        <div className="sp_select_role_div">
                            {/*
                            <select className="sp_select_role form-control" onChange={ this.handleChange.bind(this) }>
                                <option value="sm_00001">超级管理员</option>
                                <option value="m_00001">管理员</option>
                                <option value="u_00001">角色1</option>
                                <option value="u_00002">角色2</option>
                            </select>
                            */}
                            <select className="sp_select_role form-control" name="" id="select_role">
                                <option value={role}>{ role }</option>
                            </select>
                        </div>
                        <div className="nav-tabs-custom" style={{userSelect: 'none'}}>
                            <ul className="nav nav-tabs" role="tablist">
                                <li role="presentation" className="active"><a className="sp_presentation" href="#home" role="tab" data-toggle="tab">系统权限管理</a></li>
                                <li className="pull-right header"><button type="submit" className="modify btn btn-primary" onClick={this.handleEdit.bind(this)}>修改</button></li>
                            </ul>
                            <div className="tab-content">
                                <div role="tabpanel" className="tab-pane active" id="home">
                                    {/*
                                    <div className="row sp_classify">
                                        <div className="col-xs-2 sp_classify_name text-right sp_pluginsystem">插件权限: </div>
                                        <div className="row col-xs-10 text-center">
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_pluginsystem_upload sp_pluginsystem_detail sp_detail" name="PLUGIN_INSTALL" type="checkbox" /> <span>上传</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_pluginsystem_del sp_pluginsystem_detail sp_detail" name="PLUGIN_DELETE" type="checkbox" /> <span>删除</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_pluginsystem_lookup sp_pluginsystem_detail sp_detail" name="PLUGIN_QUERY" type="checkbox" /> <span>查看</span>
                                            </label>
                                        </div>
                                         <div className="col-xs-2 sp_classify_name text-center">
                                         <label>
                                         <input className="sp_pluginsystem_all" type="checkbox" /> <span>全选</span>
                                         </label>
                                         </div>
                                    </div>
                                    */}
                                    <div className="row sp_classify">
                                        <div className="col-xs-2 sp_classify_name text-right sp_users">用户权限: </div>
                                        <div className=" row col-xs-10 text-center">
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_users_lookup sp_users_detail sp_detail" name="USER_QUERY" type="checkbox" /> <span>查看</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_users_add sp_users_detail sp_detail" name="USER_CREATE" type="checkbox" /> <span>新建</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_users_del sp_users_detail sp_detail" name="USER_DELETE" type="checkbox" /> <span>删除</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_users_modify sp_users_detail sp_detail" name="USER_MODIFY" type="checkbox" /> <span>修改</span>
                                            </label>
                                        </div>
                                        {/*
                                        <div className="col-xs-2 sp_classify_name text-center">
                                            <label>
                                                <input className="sp_users_all" type="checkbox" /> <span>全选</span>
                                            </label>
                                        </div>
                                        */}
                                    </div>

                                    <div className="row sp_classify">
                                        <div className="col-xs-2 sp_classify_name text-right sp_roles">角色权限: </div>
                                        <div className=" row col-xs-10 text-center">
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_roles_lookup sp_roles_detail sp_detail" name="ROLE_QUERY" type="checkbox" /> <span>查看</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_roles_add sp_roles_detail sp_detail" name="ROLE_CREATE" type="checkbox" /> <span>新建</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_roles_del sp_roles_detail sp_detail" name="ROLE_DELETE" type="checkbox" /> <span>删除</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_roles_modify sp_roles_detail sp_detail" name="ROLE_MODIFY" type="checkbox" /> <span>修改</span>
                                            </label>
                                        </div>
                                        {/*
                                         <div className="col-xs-2 sp_classify_name text-center">
                                         <label>
                                         <input className="sp_roles_all" type="checkbox" /> <span>全选</span>
                                         </label>
                                         </div>
                                         */}
                                    </div>

                                    <div className="row sp_classify">
                                        <div className="col-xs-2 sp_classify_name text-right sp_dateset">数据集权限: </div>
                                        <div className="row col-xs-10 text-center">
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_dateset_query sp_dateset_detail sp_detail" name="DATASET_QUERY" type="checkbox" /> <span>查看</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_dateset_add sp_dateset_detail sp_detail" name="DATASET_CREATE" type="checkbox" /> <span>新建</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_dateset_del sp_dateset_detail sp_detail" name="DATASET_DELETE" type="checkbox" /> <span>删除</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_dateset_modify sp_dateset_detail sp_detail" name="DATASET_MODIFY" type="checkbox" /> <span>修改</span>
                                            </label>
                                            {/*
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_dateset_manager sp_dateset_detail sp_detail" name="DATESET_ADMIN" type="checkbox" /> <span>管理</span>
                                            </label>
                                            */}
                                        </div>
                                        {/*
                                        <div className="col-xs-2 sp_classify_name text-center">
                                            <label>
                                            <input className="sp_dateset_all" type="checkbox" /> <span>全选</span>
                                            </label>
                                         </div>
                                        */}
                                    </div>
                                    <div className="row sp_classify">
                                        <div className="col-xs-2 sp_classify_name text-right sp_quota">报表权限: </div>
                                        <div className=" row col-xs-10 text-center">
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_quota_query sp_quota_detail sp_detail" name="REPORT_QUERY" type="checkbox" /> <span>查看</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_quota_add sp_quota_detail sp_detail" name="REPORT_CREATE" type="checkbox" /> <span>新建</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_quota_del sp_quota_detail sp_detail" name="REPORT_DELETE" type="checkbox" /> <span>删除</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_quota_modify sp_quota_detail sp_detail" name="REPORT_MODIFY" type="checkbox" /> <span>修改</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_quota_analysis sp_quota_detail sp_detail" name="REPORT_ANALYSIS" type="checkbox" /> <span>分析</span>
                                            </label>
                                            {/*
                                             <label className="col-xs-3 col-sm-2 sp_label">
                                             <input className="sp_quota_manager sp_quota_detail sp_detail" name="REPORT_ADMIN" type="checkbox" /> <span>管理</span>
                                             </label>
                                             */}
                                        </div>
                                        {/*
                                         <div className="col-xs-2 sp_classify_name text-center">
                                         <label>
                                         <input className="sp_quota_all" type="checkbox" /> <span>全选</span>
                                         </label>
                                         </div>
                                         */}
                                    </div>
                                    <div className="row sp_classify">
                                        <div className="col-xs-2 sp_classify_name text-right sp_dashboard">仪表板权限: </div>
                                        <div className=" row col-xs-10 text-center">
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_dashboard_query sp_dashboard_detail sp_detail" name="DASHBOARD_QUERY" type="checkbox" /> <span>查看</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_dashboard_add sp_dashboard_detail sp_detail" name="DASHBOARD_CREATE" type="checkbox" /> <span>新建</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_dashboard_del sp_dashboard_detail sp_detail" name="DASHBOARD_DELETE" type="checkbox" /> <span>删除</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_dashboard_modify sp_dashboard_detail sp_detail" name="DASHBOARD_MODIFY" type="checkbox" /> <span>修改</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_dashboard_analysis sp_dashboard_detail sp_detail" name="DASHBOARD_ANALYSIS" type="checkbox" /> <span>分析</span>
                                            </label>
                                            {/*
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_dashboard_manager sp_dashboard_detail sp_detail" name="DASHBOARD_ADMIN" type="checkbox" /> <span>管理</span>
                                            </label>
                                            */}
                                        </div>
                                        {/*
                                        <div className="col-xs-2 sp_classify_name text-center">
                                            <label>
                                                <input className="sp_dashboard_all" type="checkbox" /> <span>全选</span>
                                            </label>
                                        </div>
                                        */}
                                    </div>
                                    {/*
                                    <div className="row sp_classify">
                                        <div className="col-xs-2 sp_classify_name text-right sp_jobsystem">作业权限: </div>
                                        <div className=" row col-xs-10 text-center">
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_jobsystem_add sp_jobsystem_detail sp_detail" name="JOB_CREATE" type="checkbox" /> <span>创建</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_jobsystem_del sp_jobsystem_detail sp_detail" name="JOB_DELETE" type="checkbox" /> <span>删除</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_jobsystem_modify sp_jobsystem_detail sp_detail" name="JOB_MODIFY" type="checkbox" /> <span>修改</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_jobsystem_online sp_jobsystem_detail sp_detail" name="JOB_EXCUTE" type="checkbox" /> <span>执行</span>
                                            </label>
                                            <label className="col-xs-3 col-sm-2 sp_label">
                                                <input className="sp_jobsystem_search sp_jobsystem_detail sp_detail" name="JOB_QUERY" type="checkbox" /> <span>查询</span>
                                            </label>
                                        </div>
                                        <div className="col-xs-2 sp_classify_name text-center">
                                            <label>
                                                <input className="sp_jobsystem_all" type="checkbox" /> <span>全选</span>
                                            </label>
                                        </div>
                                    </div>
                                    */}
                                </div>
                            </div>
                        </div>
                        <button type="button" className="ensure btn btn-primary sp_btn" data-toggle="modal" data-target="#sp_modify" onClick={this.handleModify.bind(this)}>保存</button>
                        <button type="button" className="cancel btn btn-primary sp_btn" onClick={this.handleChange}>取消</button>
                    </div>
                </div>
                <Modal modalId="sp_modify" ref='sp_modify' title="修改权限" okHandler={this.modifyOKHandle.bind(this)} />
            </div>
        )
    }
}
export default SystemPrivilege;
