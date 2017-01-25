import { expect } from 'chai'
import User from '../user'
import bcrypt from 'bcrypt-nodejs'

describe('user model', function() {

  it('requires first_name, last_name, and email', function(done) {
    User.forge({})
    .save()
    .then(user => {})
    .catch(err => {
      expect(err.errors).to.have.property('first_name')
      expect(err.errors).to.have.property('last_name')
      expect(err.errors).to.have.property('email')
      done()
    })
  })

  it('enforces unique email', function(done) {
    User.forge({ email: 'gmk8@cornell.edu' })
    .save()
    .then(user => {})
    .catch(err => {
      expect(err.errors).to.have.property('email')
      done()
    })
  })

  it('returns full name', function(done) {
    User.where({ id: 1 }).fetch().then(user => {
      expect(user.get('full_name')).to.equal('Greg Kops')
      done()
    })
  })

  it('does not return password', function(done) {
    User.where({ id: 1 }).fetch().then(user => {
      expect(user.get('password')).to.be.undefined
      done()
    })
  })

  it('can set password', function(done) {
    User.where({ id: 1 }).fetch().then(user => {
      user.set('password', 'cce')
      const salt = user.get('password_salt')
      expect(salt).to.exist
      const hash = user.get('password_hash')
      expect(hash).to.exist
      expect(bcrypt.compareSync('cce', hash))
      done()
    })
  })

})
