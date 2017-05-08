import backframe from '../../services/backframe'
import Kitten from '../models/kitten'

const processor = options => (job, trx) => {

  return Kitten.where({ id: job.data.id }).fetch({ transacting: trx }).then(kitten => `Scratching ${kitten.get('name')}`)

}

export default backframe.queue({
  name: 'scratch',
  processor
})
