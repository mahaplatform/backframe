# Kittens
Kittens is an example app which showcases how to use Backframe in your express
application

# Getting started
To get the example up and running, run the following commands from this directory:

```sh
npm install
npm run setup
npm run start
```

and open your browser to: <http://localhost:3000/kittens>. Here are some queries
to try for yourself:

| DESCRIPTION                  | URL                                                          |
|------------------------------|--------------------------------------------------------------|
| BASIC LIST                   | <http://localhost:3000/kittens>                              |
| PAGINATED LIST               | <http://localhost:3000/kittens?$page[limit]=2>               |
| PAGINATED LIST               | <http://localhost:3000/kittens?$page[limit]=2&$page[skip]=1> |
| SORTED BY NAME ASC           | <http://localhost:3000/kittens?$sort[]=name>                 |
| SORTED BY AGE DESC           | <http://localhost:3000/kittens?$sort[]=-age>                 |
| SORTED BY NAME ASC, AGE DESC | <http://localhost:3000/kittens?$sort[]=name&$sort[]=-age>    |
| KITTENS WHEN NAME IS SOCKS   | <http://localhost:3000/kittens?$filter[name][$eq]=socks>     |
| KITTENS WHEN NAME LIKE MIT   | <http://localhost:3000/kittens?$filter[name][$lk]=mit>       |
| KITTENS IN CSV               | <http://localhost:3000/kittens.csv>                          |
| KITTENS IN XML               | <http://localhost:3000/kittens.xml>                          |
| BASIC SHOW                   | <http://localhost:3000/kittens/1>                            |
