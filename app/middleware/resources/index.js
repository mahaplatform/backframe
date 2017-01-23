import pluralize from 'pluralize'
import { includeAction, wrapWithHooks } from './utils'
import create from './create'
import destroy from './destroy'
import list from './list'
import load from './load'
import show from './show'
import update from './update'

export default options => {

  const before = options.before || {}
  const after = options.after || {}

  const resource = router => {

    const plural = pluralize(options.name)

    if(includeAction('list', options)) {
      router.get(`/${plural}(\.:ext)?`, wrapWithHooks(router => {
        router.use(list(options))
      }, before.list, after.list))
    }

    if(includeAction('create', options)) {
      router.post(`/${plural}`, wrapWithHooks(router => {
        router.use(create(options))
      }, before.create, after.create))
    }

    if(includeAction('show', options)) {
      router.get(`/${plural}/:id`, wrapWithHooks(router => {
        router.use(load(options))
        router.use(show(options))
      }, before.show, after.show))
    }

    if(includeAction('update', options)) {
      router.patch(`/${plural}/:id`, wrapWithHooks(router => {
        router.use(load(options))
        router.use(update(options))
      }, before.update, after.update))
    }

    if(includeAction('destroy', options)) {
      router.delete(`/${plural}/:id`, wrapWithHooks(router => {
        router.use(load(options))
        router.use(destroy(options))
      }, before.destroy, after.destroy))
    }

  }

  return wrapWithHooks(resource, before.all, after.all)

}
