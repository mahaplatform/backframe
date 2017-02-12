import { buildRoutes, buildRouter } from './utils'

export default userOptions => {

    const routes = buildRoutes(userOptions)

    const router = buildRouter(routes)

    return {
        router,
        routes
    }

}
