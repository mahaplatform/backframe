import path from 'path'
import express from 'express'
import jwt from 'platform/services/jwt'
import passport from 'passport'
import Team from 'platform/models/team'
import User from 'platform/models/user'

export const cornell = (req, res, next) => {

  const SAMLStrategy = require('passport-saml').Strategy

  const cornellConfig = {
    entryPoint: 'https://shibidp-test.cit.cornell.edu/idp/profile/SAML2/Redirect/SSO',
    issuer: 'https://shibidp-test.cit.cornell.edu/idp/shibboleth',
    path: '/admin/signin/cornell',
    cert: 'MIIDXDCCAkSgAwIBAgIVAMKCR8IGXIOzO/yLt6e4sd7OMLgEMA0GCSqGSIb3DQEB BQUAMCcxJTAjBgNVBAMTHHNoaWJpZHAtdGVzdC5jaXQuY29ybmVsbC5lZHUwHhcN MTIwNjA3MTg0NjIyWhcNMzIwNjA3MTg0NjIyWjAnMSUwIwYDVQQDExxzaGliaWRw LXRlc3QuY2l0LmNvcm5lbGwuZWR1MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB CgKCAQEAkhlf9EP399mqnBtGmPG9Vqu79Af2NZhhsT+LTMA1uhPZYv4RX/E4VD+I qce/EUP1ndPkGEwBnhrRT2ZegDpCmgo+EcED8cAh9AbwFTTitmBjxvErtJnS0ZBf MCLDcgOV1zM6bT5fF9SAIm0ZVSaeyQbNDwVDdwsBQHjAdg5vLd5VeYH9MI6enzdg BtPNSrEt3qZtCWl7ev8YQlWF3vZ+EoyDrWPZSOWzgR31QBs7mz13ABSveIri68Fg Nth9ylgFS7VNUlAp6xx6BRnMgL1QzVMZ5F4PbSRDp3UBoS6PMHd+WFenJWPPh6Sh MyrInrJ4QAPfKC77tJW+GUXl4T4DqQIDAQABo38wfTBcBgNVHREEVTBTghxzaGli aWRwLXRlc3QuY2l0LmNvcm5lbGwuZWR1hjNodHRwczovL3NoaWJpZHAtdGVzdC5j aXQuY29ybmVsbC5lZHUvaWRwL3NoaWJib2xldGgwHQYDVR0OBBYEFF9RADnmBsO5 0hD8T+MUFqIgWAOxMA0GCSqGSIb3DQEBBQUAA4IBAQBqYpfdK4XAYE56sYmq/vUK OSBcbO2Uy3R7oTGrDKxrZI7xC1jchaaTW6BXtg6wzTSn8Jo2M0gvQrWyxZgQDrXG aL2TaPf5WjOWt/SsuJ+IShofS6ZWLkPCnrR0Ag9PwU58szw2jjUE4eJyv/dLDzhD HJ0EGastgSzRh1r3v2w8BYz1RHvjwESPB2HTgV1iuHwaIjaJxN39XyS6ZQzBj6sZ 6Lem1R39zXmEvtVfCk9qgSKnbYulrrkIBzxllB34TUTKFs+Nz1j/sg2gj6Q5u9uW 6mSm66mqn2E53r2CNHPTzWGwom5Mi9Z/DtOb2L/5jjxhFvCKxnEbIWm7XIe8qtqo',
    acceptedClockSkewMs: 300000
  }

  passport.use(new SAMLStrategy(cornellConfig, (profile, done) => {
    loadUserByEmail(profile.email, done)
  }))

  passport.authenticate('saml', { session: false })(req, res, next)

}

export const google = (req, res, next) => {

  const GoogleStrategy = require('passport-google-oauth20').Strategy

  const googleConfig = {
    clientID: '145859176057-sainn11sroqfsf3eg8vl5qqregnf4agm.apps.googleusercontent.com',
    clientSecret: 'VuN69Tbo5uyF08zQZ3zvOE6B',
    callbackURL: 'http://localhost:8089/admin/signin/callback'
  }

  passport.use(new GoogleStrategy(googleConfig, (accessToken, refreshToken, profile, done) => {
    loadUserByEmail(profile.emails[0].value, done)
  }))

  passport.authenticate('google', { scope: ['profile','email'], session: false })(req, res, next)

}

export const ldap = (req, res, next) => {

  const LDAPStrategy = require('passport-ldapauth')

  const ldapConfig = {
    url: 'ldap://0.0.0.0:1389',
    base: 'o=example',
    search: {
      filter: '(&(l=Seattle)(email=*@foo.com))'
    }
  }

  passport.use(new LDAPStrategy(ldapConfig, (req, user, done) => {
    loadUserByEmail(user.email, done)
  }))

  passport.authenticate('ldapauth', { session: false })(req, res, next)

}

export const loadUserByEmail = (email, done) => {

  return User.where({ email }).fetch().then(user => {

    if(!user) {
      return done(null, false, { message: 'cannot find user' })
    }

    return done(null, user)

  })


}

export const success = (req, res, next) => {

  const two_weeks = 60 * 60 * 24 * 7 * 2
  const token = jwt.encode({ user_id: req.user.get('id') }, two_weeks)

  Team.where({ id: req.user.get('team_id') }).fetch({ withRelated: ['logo'] }).then(team => {

    if(!team) {
      const error = new Error({ code: 500, message: 'unable to load team' })
      return next(error)
    }

    res.render('success', {
      team: {
        id: team.get('id'),
        title: team.get('title'),
        subdomain: team.get('subdomain'),
        logo: team.related('logo').get('url'),
        token
      }
    })

  }).catch(err => {
    const error = new Error({ code: 500, message: err.message })
    return next(error)
  })
}

const router = express()
router.set('views', path.join('.', 'src', 'admin', 'middleware','external'))
router.set('view engine', 'ejs')
router.get('/signin/cornell', cornell, success)
router.post('/signin/cornell', cornell, success)
router.get('/signin/google', google, success)
router.get('/signin/ldap', ldap, success)

export default router
