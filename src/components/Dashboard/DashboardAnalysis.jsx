/**
 * 仪表板分析组件
 * User: gaogy
 * Date: 2017/1/6
 * Time: 11:30
 */
import React, { Component } from 'react';
import DateRangePicker from 'COMPONENT/Common/DateRangePicker/DateRangePicker';
import Tag from 'COMPONENT/Common/Tag/Tag';
import ChartReport from 'COMPONENT/Dashboard/ChartReport';
import { Responsive, WidthProvider } from 'react-grid-layout';
import createTip from 'UTIL/baseTip';
import { dateFormat } from 'UTIL/util';
let ResponsiveReactGridLayout = WidthProvider(Responsive);
require('../../../node_modules/react-grid-layout/css/styles.css');
require('../../../node_modules/react-resizable/css/styles.css');

class DashboardAnalysis extends Component {
    constructor(props) {
        super(props);
        this.searchHandler = this.searchHandler.bind(this);
        this.onBreakpointChangeHandler = this.onBreakpointChangeHandler.bind(this);
        this.onResizeStopHandler = this.onResizeStopHandler.bind(this);
        this.getStartTimeHandler = this.getStartTimeHandler.bind(this);
        this.getEndTimeHandler = this.getEndTimeHandler.bind(this);
    }

    componentWillMount() {
        this.props.getDashboard(this.props.params.dashboardName);
    }

    componentDidUpdate() {
        let contentTpl = `<dl><dt>名称：</dt><dd>${this.props.dashboard.selectedRecord.dashboardName}</dd></dl><dl><dt>描述：</dt><dd>${this.props.dashboard.selectedRecord.desc}</dd></dl>`;
        createTip({
            parent: '.qtipTarget',
            content: contentTpl
        });
    }

    /**
     * 更新仪表板事件
     */
    searchHandler() {
        if ($('#filters').val()) {
            let tagObj = {
                id: new Date().getTime(),
                desc: $('#filters').val()
            };
            this.refs.filterTag.addTagDataHandler(tagObj);
            $('#filters').val('');
        }

        let tags = this.refs.filterTag.getTagsHandler();
        let filters = '';
        for (let i = 0; i < tags.length; i++) {
            if (i > 0) {
                filters = filters + ' AND ';
            }
            filters = filters + tags[i].desc;
        }

        // 构造查询参数对象
        let searchObj = {
            filters: filters,
            startTime: this.refs.daterangePicker.getStartTime(),
            endTime: this.refs.daterangePicker.getEndTime()
        };

        this.props.dashboard.selectedRecord.reportList.map((item) => {
            this.refs['chartReport' + item.reportName].searchHandler(searchObj);
        });
    }


    /**
     * Grid列响应修改事件
     * @param breakpoint
     * @param cols
     */
    onBreakpointChangeHandler(breakpoint, cols) {
        this.props.changeBreakpoint(cols);
    }

    /**
     * panel重置后图表reflow
     * @param layout
     * @param oldItem
     * @param newItem
     * @param placeholder
     * @param e
     * @param element
     */
    onResizeStopHandler(layout, oldItem, newItem, placeholder, e, element) {
        let trendChartReportId = $(element).closest('div.reportBlock').find('div.chartReport').attr('id');
        if (trendChartReportId && $('#' + trendChartReportId).highcharts()) {
            $('#' + trendChartReportId).highcharts().reflow();
        }
    }

    /**
     * 获取日期控件开始时间
     * @returns {*}
     */
    getStartTimeHandler() {
        return dateFormat(new Date(), 'yyyy-MM-dd 00:00:00');
    }

    /**
     * 获取日期控件截止时间
     * @returns {*}
     */
    getEndTimeHandler() {
        return dateFormat(new Date(), 'yyyy-MM-dd 23:59:59');
    }

    render() {
        let cols = this.props.dashboard.breakpointCols;
        let colWidth = 3;
        if (cols < 6) {
            colWidth = 2;
        }

        let selectedReports = this.props.dashboard.selectedRecord ? this.props.dashboard.selectedRecord.reportList : [];
        let reportTplArray = [];
        let layoutInfo = {};
        // 排序显示报表面板
        if (selectedReports) {
            layoutInfo = JSON.parse(this.props.dashboard.selectedRecord.layoutInfo);
            for (let i = 0; i < selectedReports.length; i++) {
                let reportTpl = '';
                let item = selectedReports[i];
                reportTpl = <div name={ item.reportName } key={item.reportName} data-grid={{w: colWidth, h: colWidth, x: (i % (cols / colWidth)) * colWidth, y: Math.floor(i / cols) * colWidth}} className='col-md-3 reportBlock mb20 pr0'>
                    <div className="box box-primary mb0" style={{ height: '100%' }}>
                        <div className="box-body border-radius-none" style={{ height: '90%' }}>
                            <ChartReport getStartTime={this.getStartTimeHandler} getEndTime={this.getEndTimeHandler} ref={ 'chartReport' + item.reportName } reportName={ item.reportName } searchObj={ this.props.dashboard.searchObj } />
                        </div>
                    </div>
                </div>;

                reportTplArray.push(reportTpl);
            }
        }

        return (
            <div id="dashboardAnalysis">
                <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">查询</h3><i className="fa fa-info-circle qtipTarget"></i>
                    </div>

                    <div className="box-body form-horizontal">
                        <div className="form-group">
                            <label htmlFor="filters" className="col-md-1 control-label">关键字</label>

                            <div className="col-md-6">
                                <input type="text" className="form-control" id="filters"/>
                            </div>

                            <div className="col-md-4">
                                <DateRangePicker ref="daterangePicker" />
                            </div>

                            <div className="col-md-1">
                                <button name="searchBtn" className="btn btn-primary" onClick={ this.searchHandler } ><i className="fa fa-search" ></i> 查询</button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-1 control-label"></label>
                            <div className="col-md-11">
                                <Tag ref="filterTag" />
                            </div>
                        </div>
                    </div>
                </div>
                <div id='reportList' className='row connectedSortable pr15' style={{ position: 'relative' }}>
                    <ResponsiveReactGridLayout verticalCompact={true} layouts={ layoutInfo } onResizeStop={ this.onResizeStopHandler } className="layout" rowHeight={130} cols={{lg: 12, md: 9, sm: 6, xs: 4, xxs: 2}} onBreakpointChange={ this.onBreakpointChangeHandler }>
                        { reportTplArray }
                    </ResponsiveReactGridLayout>
                </div>
            </div>
        )
    }
}
export default DashboardAnalysis;
