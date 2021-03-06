/**
 * 报表分析组件
 * User: gaogy
 * Date: 2016/12/29
 * Time: 16:10
 */
import React, { Component } from 'react';
import ReportConf from 'COMPONENT/Report/ReportConf/ReportConf';
import DateRangePicker from 'COMPONENT/Common/DateRangePicker/DateRangePicker';
import DisplayArea from 'COMPONENT/Report/ReportDisplay/DisplayArea';
import createTip from 'UTIL/baseTip';
import Tag from 'COMPONENT/Common/Tag/Tag';

class ReportAnalysis extends Component {
    constructor(props) {
        super(props);
        this.searchHandler = this.searchHandler.bind(this);
        this.setChartOptionHandler = this.setChartOptionHandler.bind(this);
        this.getStartTimeHandler = this.getStartTimeHandler.bind(this);
        this.getEndTimeHandler = this.getEndTimeHandler.bind(this);
    }

    componentWillMount() {
        this.props.getReport(this.props.params.reportName);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.report.selectedRecord.mql && nextProps.report.selectedRecord.mql) {
            this.props.mqlSearch({
                mql: nextProps.report.selectedRecord.mql,
                startTime: this.refs.daterangePicker.getStartTime(),
                endTime: this.refs.daterangePicker.getEndTime()
            });
        }
    }

    componentDidUpdate() {
        let contentTpl = `<dl><dt>名称：</dt><dd>${this.props.report.selectedRecord.reportName}</dd></dl><dl><dt>MQL：</dt><dd>${this.props.report.selectedRecord.mql}</dd></dl></dl><dl><dt>描述：</dt><dd>${this.props.report.selectedRecord.desc}</dd></dl>`;
        createTip({
            parent: '.qtipTarget',
            content: contentTpl
        });

        // 分析后，存在mql查询结果和报表类型时，执行重新创建逻辑报表
        if (this.props.report.mqlResult.result && this.props.report.selectedRecord.chartType) {
            this.refs.reportConf.getWrappedInstance().createChartHandler(this.props.report.selectedRecord.chartType);
        }
    }

    /**
     * 查询事件
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
        let mqlSearchObj = {
            mql: this.props.report.selectedRecord.mql,
            filters: filters,
            startTime: this.refs.daterangePicker.getStartTime(),
            endTime: this.refs.daterangePicker.getEndTime()
        };

        // 进行MQL查询，渲染结果列表
        this.props.mqlSearch(mqlSearchObj);
    }

    getStartTimeHandler() {
        return this.refs.daterangePicker.getStartTime();
    }

    getEndTimeHandler() {
        return this.refs.daterangePicker.getEndTime();
    }

    /**
     * 设置图表配置项事件
     * @param options
     */
    setChartOptionHandler(options, forceReload) {
        this.refs.displayArea.getWrappedInstance().setChartOptionsHandler(options, forceReload);
    }

    render() {
        let { selectedRecord, mqlResult } = this.props.report;
        return (
            <div id="reportAnalysis">
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

                <div id="reportConf" className="box box-primary hide">
                    <div className="box-header with-border">
                        <h3 className="box-title">报表配置</h3>
                    </div>

                    <div className="box-body">
                        <ReportConf ref="reportConf" operation="reportAnalysis" selectedRecord={ selectedRecord } mqlResult={ mqlResult } mqlSearchHandler={ this.searchHandler } changeDisplayAreaHandler={ this.changeDisplayAreaHandler } removeSeriesHandler={ this.removeSeriesHandler } setChartOptionHandler={ this.setChartOptionHandler }/>
                    </div>
                </div>

                <div id="reportAnalyze" className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">报表可视化</h3>
                    </div>

                    <div className="box-body">
                        <DisplayArea ref="displayArea" operation="reportAnalysis" getStartTime={this.getStartTimeHandler} getEndTime={this.getEndTimeHandler} />
                    </div>
                </div>
            </div>
        )
    }
}
export default ReportAnalysis;
