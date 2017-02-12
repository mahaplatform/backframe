import { expect } from 'chai'
import SecurityQuestion from '../security_question'

describe('security_question model', function() {

  it('requires text', function(done) {

    SecurityQuestion.forge({}).save().catch(err => {

      expect(err.errors).to.have.property('text')
      done()

    })

  })

})
