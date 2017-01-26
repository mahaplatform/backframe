import rest from 'rest'
import qs from 'qs'
import mime from 'rest/interceptor/mime'
import defaultRequest from 'rest/interceptor/defaultRequest'
import errorCode from 'rest/interceptor/errorCode'
import params from 'rest/interceptor/params'
import localStorage from 'platform/services/localforage'

type optionsType = {
  method: string,
  action: string,
  params: Object,
  entity: Object
}

class Api {

  constructor(): void {
    this.client = rest.wrap(params).wrap(mime).wrap(defaultRequest).wrap(errorCode)
  }

  get(options: optionsType): any {
    options['method'] = 'GET'
    return this.request(options)
  }

  patch(options: optionsType): any {
    options['method'] = 'PATCH'
    return this.request(options)
  }

  post(options: optionsType): any {
    options['method'] = 'POST'
    return this.request(options)
  }

  destroy(options: optionsType): any {
    options['method'] = 'DELETE'
    return this.request(options)
  }

  auth(options: optionsType): any {

  }

  request(options: optionsType): any {

    let config = {
      method: options.method.toUpperCase(),
      path: this._path(options.endpoint),
      headers: { 'Content-Type': 'application/json' }
    }

    options.method = options.method.toUpperCase()

    if(options.params) {
      if(config.method == 'GET') {
        config.path += '?'+qs.stringify(options.params)
      } else  {
        config.entity = options.params
      }
    }

    const client = this.client

    return dispatch => {

      return localStorage.getItem('teams', (err, teams) => {

        const activeTeam = teams.reduce((active, team) => {
          return (team.active) ? team : active
        }, null)

        if(options.token) {
          config.headers['Authorization'] = `Bearer ${options.token}`
        } else if(options.params && options.params.token) {
          config.headers['Authorization'] = `Bearer ${options.params.token}`
        } else if(activeTeam) {
          config.headers['Authorization'] = `Bearer ${activeTeam.token}`
        }

        dispatch({
          type: options.request,
          params: options.params,
          ...options.meta
        })

        return client(config)
          .then(response => response.entity)
          .then(json => {

            dispatch({
              type: options.success,
              data: json,
              ...options.meta
            })

          }, response => {

            dispatch({
              type: options.failure,
              error: response.entity,
              ...options.meta
            })

          })

      })
    }

  }

  _path(endpoint: string): string {
    return '/api' + endpoint
  }

}

const api = new Api()

export default api
