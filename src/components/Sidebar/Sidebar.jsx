/**
 * 侧边栏组件
 * User: gaogy
 * Date: 2016/11/29
 * Time: 14:58
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

@connect(
    ({ sidebar, router }) => ({sidebar, router}),
    require('ACTION/sidebar').default
)
class Sidebar extends Component {

    // 菜单点击事件处理，改变菜单选中样式
    menuClickHandler(e) {
        $('li', $('ul.sidebar-menu')).removeClass('active');
        $(e.currentTarget).addClass('active');
    }

    componentDidMount() {
        // 菜单渲染
        let pathname = this.props.router.locationBeforeTransitions.pathname;
        pathname = '/' + pathname.split('/')[1];
        if (pathname) {
            $('li', $('ul.sidebar-menu')).removeClass('active');
            $('li[name = "' + pathname + '"]', $('ul.sidebar-menu')).addClass('active');
        }

        // 根路径下菜单渲染
        if (pathname === '/') {
            $('li', $('ul.sidebar-menu')).removeClass('active');
            $('li:eq(1)', $('ul.sidebar-menu')).addClass('active');
        }
    }

    componentDidUpdate() {
        // 菜单渲染
        let pathname = this.props.router.locationBeforeTransitions.pathname;
        pathname = '/' + pathname.split('/')[1];
        if (pathname) {
            $('li', $('ul.sidebar-menu')).removeClass('active');
            $('li[name = "' + pathname + '"]', $('ul.sidebar-menu')).addClass('active');
        }

        // 根路径下菜单渲染
        if (pathname === '/') {
            $('li', $('ul.sidebar-menu')).removeClass('active');
            $('li:eq(1)', $('ul.sidebar-menu')).addClass('active');
        }
    }

    render() {
        let userRolePermission = sessionStorage.getItem('userRolePermission');

        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <ul className="sidebar-menu">
                        <li className="header"></li>
                        { this.props.sidebar.menuList.map(menu => {
                            if (userRolePermission.indexOf(menu.path.split('/')[1].toLocaleUpperCase()) != -1 || menu.path === '/quickNav') {
                                return <li className={ menu.isActive } name={ menu.path } onClick={ this.menuClickHandler }>
                                            <Link to={ menu.path }>
                                                <i className={ menu.iconType }></i>
                                                <span>{ menu.name }</span>
                                            </Link>
                                        </li>
                                }
                            })
                        }
                    </ul>
                </section>
            </aside>
        )
    }
}
export default Sidebar;
