import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({ dataset, router }) => ({ dataset, router }), // mapStateToProps
    require('ACTION/dataSet').default               // mapActionCreators
);

export default {
  path: 'dataSet',

  indexRoute: { // 对应 /msg
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, connectComponent(require('COMPONENT/DataSet/DataSet').default))
      }, 'DataSet')
    }
  },

  childRoutes: [
    { // 对应 /msg/detail/:datasetName
      path: 'detail/:datasetName',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          cb(null, connectComponent(require('COMPONENT/DataSet/DateSetDetail').default))
        }, 'getDataset')
      }
    },
    { // 对应 /msg/add
      path: 'add',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          cb(null, connectComponent(require('COMPONENT/DataSet/DateSetAdd').default))
        }, 'DateSetAdd')
      }
    },
    { // 对应 /msg/:datasetName
      path: 'update/:datasetName',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          cb(null, connectComponent(require('COMPONENT/DataSet/DataSetUpdate').default))
        }, 'DataSetUpdate')
      }
    }]
}
