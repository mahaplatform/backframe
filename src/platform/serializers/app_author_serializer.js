export default (object) => {

    return Promise.resolve({
        id: object.get('id'),
        name: object.get('name')
    })

}
