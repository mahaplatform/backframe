# Segment
In order to handle routes and resources collectively, routes can be grouped into
one or more nested segments. Segments can be nested as deeply as needed allowing
attributes to be applied in batch to any level of the hierarchy. For example,

```Javascript
import { resources, segment } from 'backframe'

const users = resources({
  model: User,
  name: 'user'
})

const admin = segment({
  authenticated: true,
  pathPrefix: '/admin',
  routes: [
    users
  ]
})

const pages = resources({
  model: Page,
  name: 'page'
})

const website = segment({
  routes: [
    admin,
    pages
  ]
})
```

produces the following routing table:

| PATH                  | METHOD | AUTHENTICATED  |
|-----------------------|--------|----------------|
| /admin/users          | GET    | TRUE           |
| /admin/users          | POST   | TRUE           |
| /admin/users/:id      | GET    | TRUE           |
| /admin/users/:id/edit | GET    | TRUE           |
| /admin/users/:id      | PATCH  | TRUE           |
| /admin/users/:id      | DELETE | TRUE           |
| /pages                | GET    | FALSE          |
| /pages                | POST   | FALSE          |
| /pages/:id            | GET    | FALSE          |
| /pages/:id/edit       | GET    | FALSE          |
| /pages/:id            | PATCH  | FALSE          |
| /pages/:id            | DELETE | FALSE          |
