import Activity from 'platform/models/activity'
import Story from 'platform/models/story'

export default (req, text, object1_type = null, object1_text = null, object2_type = null, object2_text = null) => {

    return Story.where({ text }).fetch().then(story => {

        return (!story) ? Story.forge({ text }).save() : story

    }).then(story => {

        const data = {
            user_id: req.user.get('id'),
            story_id: story.get('id'),
            object1_type,
            object1_text,
            object2_type,
            object2_text
        }

        return Activity.forge(data).save()

    })

}
