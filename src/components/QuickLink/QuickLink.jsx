/**
 * 快速导航
 * User: gaogy
 * Date: 2017/1/9
 * Time: 13:58
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { warning } from 'UTIL/notification';
import { cutStr } from 'UTIL/util';

@connect(
    ({ quickLink, router }) => ({quickLink, router}),
    require('ACTION/quickLink').default,
    null,
    { withRef: true }
)

class QuickLink extends Component {
    constructor(props) {
        super(props);

        this.dashboardDetailHandler = this.dashboardDetailHandler.bind(this);
        this.removeQuickLinkHandler = this.removeQuickLinkHandler.bind(this);
    }

    componentWillMount() {
        this.props.getUserInfo();
    }

    /**
     * 仪表板导航事件
     * @param e
     */
    dashboardDetailHandler(e) {
        let userRolePermission = sessionStorage.getItem('userRolePermission');
        if (userRolePermission.indexOf('DASHBOARD_ANALYSIS') != -1) {
            let dashboardName = $(e.currentTarget).attr('name');
            this.props.history.replace('/dashboard/analysis/' + dashboardName);
        } else {
            warning('当前用户无仪表板分析权限！');
        }
    }

    /**
     * 取消快速导航事件
     * @param e
     */
    removeQuickLinkHandler(e) {
        e.stopPropagation();
        let dashboardName = $(e.currentTarget).attr('name');
        let userInfo = this.props.quickLink.userInfo;
        userInfo.quickLink = userInfo.quickLink.split(dashboardName + ';').join('');
        this.props.setUserInfo(userInfo);
    }

    render() {
        // 构造快速导航模板
        let quickLinkInfo = this.props.quickLink.userInfo.quickLink;
        let quickLinks = [];
        if (quickLinkInfo) {
            quickLinkInfo = quickLinkInfo.split(';');
            for (let i = 0; i < quickLinkInfo.length - 1; i++) {
                let quickLink = <div className="col-lg-3 col-xs-6 mb15">
                    <div className="box box-primary">
                        <div className="box-tools pull-right mr5">
                            <i className="fa fa-close removeBtn" name={ quickLinkInfo[i] }
                               onClick={ this.removeQuickLinkHandler }></i>
                        </div>
                        <div name={ quickLinkInfo[i] } onClick={ this.dashboardDetailHandler }>
                            <div className="cardContent">
                                <h3>{ i + 1 }</h3>
                                <p style={{ cursor: 'pointer' }} title={ quickLinkInfo[i] }>{ cutStr(quickLinkInfo[i], 10) }</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-tags"></i>
                            </div>
                        </div>

                    </div>
                </div>;
                quickLinks.push(quickLink);
            }
        }

        return (
            <div id="quickNav">
                <div className="no-print">
                    <div className="callout callout-info">
                        <h4><i className="fa fa-info"></i> 提示：</h4>
                        您可以在创建仪表板时，勾选“添加至导航”，将常用仪表板添加至此页面，由此可以方便快捷的查看仪表板详情。
                    </div>
                </div>
                <div className="row">
                    { quickLinks }
                </div>
            </div>
        )
    }
}
export default QuickLink;
