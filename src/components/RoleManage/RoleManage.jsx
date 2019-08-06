/**
 *角色列表组件
 * User: jiaomx
 * Date: 2016/12/22
 * Time: 14:19
 */

import React, { Component } from 'react';
import createList, { bindTableEvent } from 'UTIL/baseList';

class RoleManage extends Component {
	constructor(props) {
        super(props);
        this.editHandler = this.editHandler.bind(this);
    }

	componentWillMount() {
        // 读取用户列表数据
        this.props.readRole();
    }

    componentDidUpdate() {
        this.createTable(this.props.roleManage.roleManagesData.result.data);
    }

    // 编辑事件处理
    editHandler(e) {
        let selectedRecord = $('#roleList').DataTable().row($(e.currentTarget).parents('tr')).data();
        this.props.selectRole(selectedRecord);
        this.props.history.replace('/roleManage/edit/' + selectedRecord.roleName);
    }

    createTable(data) {
        // 构造列表配置项
        let tableConfig = {};
        // 获取用户列表内数据列

        tableConfig.id = 'roleList';

        // 定义用户列字段数据
        tableConfig.columns = [{ data: 'roleName' }, { data: 'memberNumber' }];

        let userRolePermission = sessionStorage.getItem('userRolePermission');
        // 定义列表内操作列
        if (userRolePermission.indexOf('ROLE_') != -1) {
            tableConfig.columnDefs = [{
                'targets': 2, // 操作列生成位置，当前为列表第3列
                'render': function (data, type, row) {
                    let html = '';
                    if (userRolePermission.indexOf('ROLE_MODIFY') != -1) {
                        html = `<a href='javascript:void(0);' class='roleEdit btn btn-default btn-xs'><i class='fa fa-pencil-square-o'></i> 修改</a>`;
                    }
                    return html;
                }
            }];
        }
        tableConfig.data = [];
        for (let i = 0; i < data.length; i++) {
            let roleInfo = {};
            roleInfo.roleName = data[i].roleName;
            roleInfo.memberNumber = data[i].member.length;
            roleInfo.member = data[i].member;
            tableConfig.data.push(roleInfo);
        }

        // 生成用户列表
        createList(tableConfig);

        // 角色列表内编辑事件绑定
        bindTableEvent('roleList', 'click', 'a.roleEdit', this.editHandler);
       
    }
    
	render() {
        // 判断有无角色操作权限
        let thTpl = <tr><th>角色名称</th>
            <th>人数</th>
            </tr>;
        let userRolePermission = sessionStorage.getItem('userRolePermission');
        if (userRolePermission.indexOf('ROLE_') != -1) {
            thTpl = <tr>
                        <th>角色名称</th>
                        <th>人数</th>
                        <th>操作</th>
                    </tr>;
        }
		return (
			<div id="roleManage" className="box box-primary" >
                <div className="row">
                    <div className="col-md-12">
                        <div className="box-body">
                            <table id="roleList" className="table table-striped table-bordered">
                                <thead>
                                {thTpl}
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
		)
	}
}
export default RoleManage;
