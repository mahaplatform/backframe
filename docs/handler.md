# Handlers
The fundamental actor in a Backframe application is the handler. A handler is a
function that performs an atomic unit of work. A handler has the signature `(req, res) => {}`
and can be used within an Express middleware. Although Backframe is primarily
intended to build handlers for Expres, these function can be used outside of
Express as well in the context of a worker or some other asynchronous process.

A Backframe handler observes the following sequence of lifecyle events:

| EVENT          | DESCRIPTION
|----------------|--------------------------------------------------------------------|
| alterRequest[] | An array of functions to mutate or add to the request object       |
| beforeHooks[]  | An array of functions to be executed before the processor          |
| processor      | A function that performs the work and returns a result             |
| afterHooks[]   | An array of functions to be executed after the processor           |
| renderer       | A function to render the result                                    |
| alterResult[]  | An array of functions to alter the result                          |
| responder      | A function to convert the result into a response object            |

All functions are promise based and either resolve successfully or reject with
an error code and message that can be displayed to the user or written to a log
