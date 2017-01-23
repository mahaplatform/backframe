import _ from 'lodash'

export default (body, params) => {

    return _.pick(body, params)

}
