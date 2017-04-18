export default (results) => ({

  extend: () => ({
    __super__: {
      tableName: 'users'
    }
  }),

  query: (qb) => ({

    fetch: (options) => {

      return Promise.resolve(results)

    }

  })

})
