# Routers
In most cases, you will want to use Backframe to within Express as a middleware
router. The Backframe router component enables you to wrap a routing segment
with an Express router and mount it within your application.

```Javascript
import { router } from 'backframe'

const app = Express()

app.use(router({
  cors: true,
  notFound: true,
  routes: website
}))

app.listen(3000)
```
