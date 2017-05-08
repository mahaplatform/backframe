# Overview


## Handlers
The fundamental actor in a Backframe application is the handler. A handler is a
function that performs an atomic unit of work. A handler has the signature `req => result`
and can be used within an Express middleware. These functions can be used as
route handlers for express and work processors for bull queues.

[Learn more about handlers](https://github.com/mahaplatform/backframe/blob/master/docs/handler.md)

## Plugins
Backframe has a plugin framework that enables developers to extend Backframe
with supplemental functionality through the addition of one or more hooks.
Plugins can also define their own configuration options to be invoked when
constructing Backframe objects.

[Learn more about plugins](https://github.com/mahaplatform/backframe/blob/master/docs/plugin.md)
