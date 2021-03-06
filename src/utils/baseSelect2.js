/**
 * baseSelect2组件
 * User: gaogy
 * Date: 2016/12/21
 * Time: 10:12
 */
function createSelect(options) {
    $('#' + options.id).select2({
        placeholder: options.placeholder || '请选择',
        data: options.data || [],
        multiple: options.multiple || false,
        language: options.language || 'zh-CN',
        tags: options.tags || false,
        minimumResultsForSearch: options.minimumResultsForSearch || 'Infinity'
    });
}

// 绑定选择框内事件
function bindSelectEvent (id, eventType, handler) {
    $('#' + id).off(eventType).on(eventType, handler);
}

export default createSelect;
export { bindSelectEvent };
