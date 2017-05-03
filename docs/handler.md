# Handlers
The core abstraction in a Backframe application is the handler. A handler is a
function that performs an atomic unit of work within a transaction. A handler
has the signature `req => result`.

A Backframe handler observes the following lifecyle events:

| EVENT          | SIGNATURE                    | DESCRIPTION                                                  |
|----------------|------------------------------|--------------------------------------------------------------|
| alterRequest[] | (req, trx) => req            | An array of functions to mutate or add to the request object |
| before[]       | (req, trx) => null           | An array of functions to be executed before the processor    |
| processor      | (req, trx) => result         | A function that performs the work and returns a result       |
| after[]        | (req, trx, result) => null   | An array of functions to be executed after the processor     |
| renderer       | (req, trx, result) => null   | A function to render the result                              |
| alterResult[]  | (req, trx, result) => result | An array of functions to alter the result                    |

All functions are promises and either resolve successfully or throw a BackframeError
which can be handled in a predictable manner depending on the context.
