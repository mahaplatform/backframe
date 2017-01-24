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

    if(options.authenticatWith) {
      router.use('*', options.authenticatWith)
    }

    if(includeAction('list', options)) {
      router.get('(\.:ext)?', wrapWithHooks(router => {
        router.use(list(options))
      }, before.list, after.list))
    }

    if(includeAction('create', options)) {
      router.post('', wrapWithHooks(router => {
        router.use(create(options))
      }, before.create, after.create))
    }

    router.use('/:id', load(options))

    if(includeAction('show', options)) {
      router.get('/:id', wrapWithHooks(router => {
        router.use(show(options))
      }, before.show, after.show))
    }

    if(includeAction('update', options)) {
      router.patch('/:id', wrapWithHooks(router => {
        router.use(update(options))
      }, before.update, after.update))
    }

    if(includeAction('destroy', options)) {
      router.delete('/:id', wrapWithHooks(router => {
        router.use(destroy(options))
      }, before.destroy, after.destroy))
    }

  }

  return wrapWithHooks(resource, before.all, after.all)

}
