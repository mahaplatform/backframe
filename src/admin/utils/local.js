import localforage from 'localforage'

type optionsType = {
  key: string,
  value: any,
  request: string,
  success: string,
  failure: string
}

class Local {

  constructor(): void {
    this.client = localforage.createInstance({
      name: 'platform',
      storeName: 'cache'
    })
  }

  set(options: optionsType): any {

    return dispatch => {

      dispatch({
        type: options.request,
        key: options.key,
        value: options.value
      })

      return this.client.setItem(options.key, options.value, function(err, value) {

        if(err) {
          return dispatch({
            type: options.failure,
            err
          })
        }

        return dispatch({
          type: options.success,
          value
        })

      })

    }

  }

  get(options: optionsType): any {

    return dispatch => {

      dispatch({
        type: options.request,
        key: options.key
      })

      return this.client.getItem(options.key, function(err, value) {

        if(err) {
          return dispatch({
            type: options.failure,
            err
          })
        }

        return dispatch({
          type: options.success,
          value
        })

      })

    }

  }

  remove(options: optionsType): any {

    return dispatch => {

      dispatch({
        type: options.request,
        key: options.key
      })

      return this.client.removeItem(options.key, function(err) {

        if(err) {
          return dispatch({
            type: options.failure,
            err
          })
        }

        return dispatch({
          type: options.success
        })

      })

    }

  }

}

const local = new Local()

export default local
