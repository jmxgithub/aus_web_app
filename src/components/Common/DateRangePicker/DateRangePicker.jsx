/**
 * 时间范围选择组件
 * User: gaogy
 * Date: 2016/12/19
 * Time: 11:27
 */
import React, { Component } from 'react';
import moment from 'moment';

class DateRangePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
     * 获取开始时间
     * @returns {*|string}
     */
    getStartTime() {
        let daterange = $('#dateRange').val();
        let startTime = daterange.split(' - ')[0] || '';
        return startTime;
    }

    /**
     * 获取结束时间
     * @returns {*|string}
     */
    getEndTime() {
        let daterange = $('#dateRange').val();
        let endTime = daterange.split(' - ')[1] || '';
        return endTime;
    }

    /**
     * 设置时间段
     * @param start
     * @param end
     */
    setTime(start, end) {
        $('#dateRange').val(start.format('YYYY-MM-DD HH:mm:ss') + ' - ' + end.format('YYYY-MM-DD HH:mm:ss'));
    }

    componentDidMount() {
        $('#dateRange').daterangepicker({
            alwaysShowCalendars: false,
            showDropdowns: true,
            showWeekNumbers: false, // 是否显示第几周
            timePicker: true, // 是否显示小时和分钟
            timePickerSeconds: true,
            timePickerIncrement: 1, // 时间的增量，单位为分钟
            timePicker24Hour: true, // 是否使用12小时制来显示时间
            ranges: {
                '今日': [moment().startOf('day'), moment()],
                '昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
                '最近7日': [moment().subtract('days', 6), moment()],
                '最近30日': [moment().subtract('days', 29), moment()]
            },
            opens: 'left', // 日期选择框的弹出位置
            buttonClasses: ['btn btn-sm'],
            applyClass: 'btn-primary blue',
            cancelClass: 'btn-default',
            separator: ' to ',
            locale: {
                format: 'YYYY-MM-DD HH:mm:ss', // 控件中from和to 显示的日期格式
                applyLabel: '确定',
                cancelLabel: '取消',
                fromLabel: '起始时间',
                toLabel: '结束时间',
                customRangeLabel: '自定义',
                daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                    '七月', '八月', '九月', '十月', '十一月', '十二月'],
                firstDay: 1
            }
        }, function (start, end, label) {// 格式化日期显示框
            $('#dateRange').val(start.format('YYYY-MM-DD HH:mm:ss') + ' - ' + end.format('YYYY-MM-DD HH:mm:ss'));
        });

        if (this.props.disabled) {
            $(this.refs.dateRangeDisabled).removeClass('hide');
        }
    }

    render() {
        return (
            <div className={this.props.className} id="dateRangePicker">
                <div className="input-group" >
                    <div className="input-group-addon">
                        <i className="fa fa-clock-o"></i>
                    </div>
                    <input type="text" className="form-control pull-right" id="dateRange" />
                </div>
                <div ref="dateRangeDisabled" className="hide dateRangeDisabled">
                </div>
            </div>
        )
    }
}
export default DateRangePicker;
