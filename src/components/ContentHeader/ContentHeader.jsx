/**
 * 面包屑导航组件
 * User: gaogy
 * Date: 2016/12/10
 * Time: 10:18
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

@connect( // 功能同 UTIL/createContainer
    ({ breadcrumb }) => ({ breadcrumb }),
    require('ACTION/breadcrumb').default
)

class ContentHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var breadcrumbTpl = [<li><Link to={ this.props.breadcrumb.defaultMenu.path }><i className="fa fa-dashboard"></i> { this.props.breadcrumb.defaultMenu.name }</Link></li>];
        var pathname = this.props.location.pathname;
        var paths = pathname.split('/');
        var currentName = '';

        switch (paths.length) {
            case 2 :
                currentName = this.props.breadcrumb[pathname];
                if (paths[1] && paths[1] != 'quickNav') {
                    breadcrumbTpl.push(<li className="active">{ currentName }</li>);
                }
                break;
            case 3 :
                currentName = this.props.breadcrumb[this.props.location.pathname];
                breadcrumbTpl.push(<li><Link to={ '/' + paths[1] }>{ this.props.breadcrumb['/' + paths[1]] }</Link></li>);
                breadcrumbTpl.push(<li className="active">{ currentName }</li>);
                break;
            case 4 :
                let lastIndex = this.props.location.pathname.lastIndexOf('/');
                let currPathname = this.props.location.pathname.slice(0, lastIndex);
                currentName = this.props.breadcrumb[currPathname];
                breadcrumbTpl.push(<li><Link to={ '/' + paths[1] }>{ this.props.breadcrumb['/' + paths[1]] }</Link></li>);
                breadcrumbTpl.push(<li className="active">{ currentName }</li>);
                break;
        }

        return (
            <section className="content-header">
                <h1>
                    { currentName }
                </h1>
                <ol className="breadcrumb">
                    { breadcrumbTpl }
                </ol>
            </section>
        )
    }
}
export default ContentHeader;
