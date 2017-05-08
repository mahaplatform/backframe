# REST APIs
Backframe is a great tool for creating REST APIs for your web or mobile application!

## Resources
At the core of most REST APIs is the concept of a resource or a collection of
resources. Backframe provides a convenient factory for creating a series of
endpoints for each resource in your application.

[Learn more about resources](https://github.com/mahaplatform/backframe/blob/master/docs/resources.md)

## Routes
A route is a single endpoint in express that wraps a Backframe handler.
[Learn more about handlers](https://github.com/mahaplatform/backframe/blob/master/docs/route.md)

## Segments
In order to handle routes and resources collectively, routes can be grouped into
one or more nested segments. Segments can be nested as deeply as needed allowing
attributes to be applied in batch to any level of the hierarchy.

[Learn more about segments](https://github.com/mahaplatform/backframe/blob/master/docs/segment.md)

## Routers
In most cases, you will want to use Backframe to within Express as a middleware
router. The Backframe router component enables you to wrap a routing segment
with an Express router and mount it within your application.

[Learn more about routers](https://github.com/mahaplatform/backframe/blob/master/docs/router.md)
