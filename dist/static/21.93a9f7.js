webpackJsonp([21],{524:function(e,a,s){"use strict";function t(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(a,"__esModule",{value:!0});var r=s(5),l=t(r),d=s(6),n=t(d),o=s(3),u=t(o),i=s(4),m=t(i),p=s(8),f=t(p),c=s(7),v=t(c),h=s(2),g=t(h),w=s(10),P=s(144),N=s(321),b=t(N),y=(0,l.default)("label",{htmlFor:"exampleInputOperator"},void 0,"用户名："),x=(0,l.default)("label",{htmlFor:"exampleInputDepartment"},void 0,"旧密码："),C=(0,l.default)("span",{className:"messages"}),U=(0,l.default)("label",{htmlFor:"exampleInputName"},void 0,"新密码："),k=(0,l.default)("span",{className:"messages"}),I=(0,l.default)("label",{htmlFor:"exampleInputPosition"},void 0,"确认密码："),O=(0,l.default)("span",{className:"messages"}),_=function(e){function a(e){(0,u.default)(this,a);var s=(0,f.default)(this,(a.__proto__||(0,n.default)(a)).call(this,e));return s.returnHandler=s.returnHandler.bind(s),s.userUpdateSave=s.userUpdateSave.bind(s),s}return(0,v.default)(a,e),(0,m.default)(a,[{key:"componentWillMount",value:function(){var e=sessionStorage.getItem("XDataUserName");this.props.readUserPasswd(e)}},{key:"componentDidMount",value:function(){var e=this;this.refs.operator.value=this.props.changePasswd.userInfo.result.detail.userName,document.addEventListener("keydown",function(a){a&&13==a.keyCode&&e.userUpdateSave()})}},{key:"handleChange",value:function(e){}},{key:"returnHandler",value:function(){this.props.history.replace("/")}},{key:"userUpdateSave",value:function(){var e=this.props.changePasswd.userInfo.result.detail.password,a=(0,b.default)(this.refs.OldPass.value).toUpperCase();if(e!=a)return(0,w.error)("原密码错误！"),this.refs.OldPass.value="",void this.refs.OldPass.focus();var s={oldPasswd:{presence:{message:"原密码不能为空"},length:{minimum:6,message:"密码至少6位有效字符"},format:{pattern:"[a-z0-9]+",message:"只能包含字母和数字"}},newPass:{presence:{message:"新密码不能为空"},length:{minimum:6,message:"密码至少6位有效字符"},format:{pattern:"[a-z0-9]+",message:"只能包含字母和数字"}},confirmPasswd:{presence:{message:"确认密码不能为空"},equality:{attribute:"newPass",message:"两次输入密码不一致"}}},t={};t.userName=this.refs.operator.value,t.inputNewPasswd=(0,b.default)(this.refs.NewPass.value).toUpperCase(),this.refs.save.disabled=!0;var r=(0,P.baseValidate)($("#userUpdeta"),s);return r?void(this.refs.save.disabled=!1):(this.props.changePasswdSave(t),this.props.changePasswd.resUserPasswd.code&&(this.refs.save.disabled=!1),void(0==this.props.changePasswd.resUserPasswd.code&&((0,w.success)("修改成功！"),this.refs.NewPass.value="",this.refs.NewPass2.value="",this.refs.OldPass.value="")))}},{key:"render",value:function(){return(0,l.default)("div",{id:"userUpdeta",className:"box box-primary"},void 0,(0,l.default)("div",{className:"row"},void 0,(0,l.default)("div",{className:"box-body col-md-4"},void 0,(0,l.default)("div",{className:" form-group col-md-12"},void 0,y,g.default.createElement("input",{type:"text",ref:"operator",className:"form-control operator col-md-5",id:"exampleInputOperator",disabled:!0})),(0,l.default)("div",{className:"form-group col-md-12"},void 0,x,C,g.default.createElement("input",{type:"password",ref:"OldPass",maxLength:100,name:"oldPasswd",className:"form-control",id:"exampleInputOldPass",onChange:this.handleChange})),(0,l.default)("div",{className:"form-group col-md-12"},void 0,U,k,g.default.createElement("input",{type:"password",ref:"NewPass",maxLength:100,name:"newPass",className:"form-control",id:"exampleInputNewPass",onChange:this.handleChange})),(0,l.default)("div",{className:"form-group col-md-12"},void 0,I,O,g.default.createElement("input",{type:"password",ref:"NewPass2",maxLength:100,name:"confirmPasswd",className:"form-control",id:"exampleInputNewPass2",onChange:this.handleChange})),(0,l.default)("div",{className:"box-button col-md-12"},void 0,(0,l.default)("button",{className:"btn btn-primary",onClick:this.returnHandler},void 0,"返回"),g.default.createElement("button",{className:"btn btn-primary",ref:"save",onClick:this.userUpdateSave},"保存")))))}}]),a}(h.Component);a.default=_}});