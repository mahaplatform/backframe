# Resources
At the core of most REST APIs is the concept of a resource or a collection of
resources. Backframe provides a convenient factory for creating a series of
endpoints for each resource in your application. By default a resource generates
the following endpoints

| ENDPOINT | METHOD | DESCRIPTION                                                          |
|----------|--------|----------------------------------------------------------------------|
| list     | GET    | returns a pageable, filterable, and sortable collection of resources |
| show     | GET    | return a single resource                                             |
| create   | POST   | create a new resource                                                |
| edit     | GET    | return a flat view of a resource                                     |
| update   | PATCH  | updates an existing resource                                         |
| destroy  | DELETE | deletes an existing resource                                         |
