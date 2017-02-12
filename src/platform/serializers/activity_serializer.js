export default (object) => {

    return Promise.resolve({
        id: object.get('id'),
        app: {
            id: object.related('app').get('id'),
            title: object.related('app').get('title'),
            icon: object.related('app').get('icon')
        },
        user: {
            id: object.related('user').get('id'),
            full_name: object.related('user').get('full_name'),
            photo: object.related('user').related('photo').get('url')
        },
        story: {
            id: object.related('story').get('id'),
            text: object.related('story').get('text')
        },
        url: object.get('url'),
        subject_type: object.get('subject_type'),
        subject_text: object.get('subject_text'),
        object1_type: object.get('object1_type'),
        object1_text: object.get('object1_text'),
        object2_type: object.get('object2_type'),
        object2_text: object.get('object2_text'),
        created_at: object.get('created_at'),
        updated_at: object.get('updated_at')
    })

}
