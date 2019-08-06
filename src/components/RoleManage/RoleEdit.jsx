/**
 *角色编辑组件
 * User: jiaomx
 * Date: 2016/12/22
 * Time: 17:10
 */

import React, { Component } from 'react';

class RoleEdit extends Component {
	constructor(props) {
        super(props);
        this.addUserHander = this.addUserHander.bind(this);
        this.removeUserHander = this.removeUserHander.bind(this);
        this.saveUserHander = this.saveUserHander.bind(this);
        this.returnHander = this.returnHander.bind(this);
    }
    componentWillMount() {
        // 读取角色下用户详细信息
        // let roleName = this.props.roleManage.selectRole.roleName;
        this.props.roleManageUserList(this.props.params.id);
        this.props.allUserList(this.props.roleManage.roleUserList.member);
    }

    componentDidMount() {
        this.refs.save.disabled = true;
    }
    // 添加用户到角色
    addUserHander(e) {
        this.refs.save.disabled = false;
        let roleUserList = this.props.roleManage.roleUserList;
        let allUserList = this.props.roleManage.allUserList;
        for (let i = 0; i < allUserList.member.length; i++) { // 去掉admin
            if (allUserList.member[i].userName == 'admin') {
                allUserList.splice(i, 1);
            }
        }
        let select = document.querySelector('#select1');
        // 获取选中option的index
        let selectUserIndex = [];
        for (let i = 0;i < select.length;i++) {
            if (select.options[i].selected) {
                selectUserIndex.push(select[i].index);
            }
        }
        // 处理显示在所有用户
        let allUserListDeal = [];
        for (let i = 0; i < allUserList.member.length; i++) {
            let flag = true;
            for (let j = 0; j < roleUserList.member.length; j++) {
                if (roleUserList.member[j].userName == allUserList.member[i].userName || allUserList.member[i].userName == 'admin') {
                    flag = false;
                }
            }
            if (flag) {
                allUserListDeal.push(allUserList.member[i]);
            }
        }
        for (let i = 0; i < selectUserIndex.length; i++) {
            roleUserList.member.push(allUserListDeal[selectUserIndex[i]])
        }
        if (selectUserIndex.length > 0) {
            this.props.addUserORRemoveToRole(roleUserList);
        }

    }

    // 从角色中移除用户
    removeUserHander() {
        this.refs.save.disabled = false;
        let roleUserList = this.props.roleManage.roleUserList;
        let allUserList = this.props.roleManage.allUserList;
        for (let i = 0; i < allUserList.member.length; i++) { // 去掉admin
            if (allUserList.member[i].userName == 'admin') {
                allUserList.splice(i, 1);
            }
        }
        let select = document.querySelector('#select2');
        // 获取选中option的index
        let selectUserIndex = [];
        for (let i = 0;i < select.length;i++) {
            if (select.options[i].selected) {
                selectUserIndex.push(select[i].index);
            }
        }
        // 处理显示在所有用户
        let allUserListDeal = [];
        for (let i = 0; i < allUserList.member.length; i++) {
            let flag = true;
            for (let j = 0; j < roleUserList.member.length; j++) {
                if (roleUserList.member[j].userName == allUserList.member[i].userName || allUserList.member[i].userName == 'admin') {
                    flag = false;
                }
            }
            if (flag) {
                allUserListDeal.push(allUserList.member[i]);
            }
        }

        selectUserIndex.sort().reverse();
        for (let i = 0; i < selectUserIndex.length; i++) {
            roleUserList.member.splice(selectUserIndex[i], 1)
        }
        if (selectUserIndex.length > 0) {
            this.props.addUserORRemoveToRole(roleUserList);
        }
    }

    // 提交用户
    saveUserHander() {
        this.refs.save.disabled = true;
        let roleName = this.props.roleManage.selectRole.roleName;
        let roleUserList = this.props.roleManage.roleUserList.member;
        let roleUserListArr = [];
        for (let i = 0; i < roleUserList.length; i++) {
            roleUserListArr.push(roleUserList[i].userName)
        }
        this.props.saveUserRole(roleName, roleUserListArr);
        if (this.props.roleManage.isSave.code == 0) {
            this.refs.save.disabled = false;
            this.props.history.replace('/roleManage');
            window.location.reload();
        }
    }

    returnHander() {
        this.props.history.replace('/roleManage');
    }
	render() {
        let roleUserList = this.props.roleManage.roleUserList.member;
        let allUserList = this.props.roleManage.allUserList.member;
        for (let i = 0; i < allUserList.length; i++) { // 去掉admin
            if (allUserList[i].userName == 'admin') {
                allUserList.splice(i, 1);
            }
        }
        let option1 = roleUserList.map((elememt, index) =>{
            return <option value={elememt.userName}>{elememt.userName + ' (' + elememt.name + ')'}</option>
        });
        let allUserListDeal = [];
        for (let i = 0; i < allUserList.length; i++) {
            let flag = true;
            for (let j = 0; j < roleUserList.length; j++) {
                if (roleUserList[j].userName == allUserList[i].userName || allUserList[i].userName == 'admin') {
                    flag = false;
                }
            }
            if (flag) {
                allUserListDeal.push(allUserList[i]);
            }
        }
        let option2 = allUserListDeal.map((elememt, index) =>{
            return <option value={elememt.userName}>{elememt.userName + ' (' + elememt.name + ')'}</option>
        });
        let roleName = this.props.roleManage.selectRole.roleName;
		return (
			<div id="roleEdit" className="box box-primary" >
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="col-md-12">{roleName}</h3>
                        <div className="box-body">
                            <div className="form-group col-md-4">
                                <label>可添加用户</label>
                                <select multiple="multiple" id="select1" ref="select1" className="form-control" size="8" >
                                    {option2}
                                </select>
                                <div className="col-md-12 button">
                                    <button type="submit" className="btn btn-primary" onClick={ this.returnHander}>返回</button>
                                    <button type="submit" className="btn btn-primary" ref="save" onClick={ this.saveUserHander}>保存</button>
                                </div>
                            </div>
                            <div className="col-md-2 dir">
                                <div className="dir-button">
                                    <button ref="add" onClick={ this.addUserHander}><i className="fa fa-long-arrow-right col-md-12 dir-right"></i></button>
                                    <button ref="remove" onClick={ this.removeUserHander}><i className="fa fa-long-arrow-left col-md-12 dir-left"></i></button>
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <label>角色内用户</label>
                                <select multiple="multiple" id="select2" ref="select2" className="form-control" size="8">
                                    {option1}
                                </select>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		)
	}
}
export default RoleEdit;
