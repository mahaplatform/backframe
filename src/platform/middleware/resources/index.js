import { includeAction, wrapWithHooks } from './utils'
import create from './create'
import destroy from './destroy'
import list from './list'
import load from './load'
import show from './show'
import update from './update'

export default userOptions => {

  const options = {
    before: {},
    after: {},
    ownedByTeam: true,
    ...userOptions
  }

  const resource = router => {

    if(includeAction('list', options)) {
      router.get('/', wrapWithHooks(router => {
        router.use(list(options))
      }, options.before.list, options.after.list))
    }

    if(includeAction('create', options)) {
      router.post('/', wrapWithHooks(router => {
        router.use(create(options))
      }, options.before.create, options.after.create))
    }

    router.use('/:id', load(options))

    if(includeAction('show', options)) {
      router.get('/:id', wrapWithHooks(router => {
        router.use(show(options))
      }, options.before.show, options.after.show))
    }

    if(includeAction('update', options)) {
      router.patch('/:id', wrapWithHooks(router => {
        router.use(update(options))
      }, options.before.update, options.after.update))
    }

    if(includeAction('destroy', options)) {
      router.delete(`/${options.path}/:id`, wrapWithHooks(router => {
        router.use(destroy(options))
      }, options.before.destroy, options.after.destroy))
    }

  }

  return wrapWithHooks(resource, options.before.all, options.after.all)

}
