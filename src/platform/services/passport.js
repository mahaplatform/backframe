import dotenv from 'dotenv'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import User  from 'platform/models/user'

dotenv.config({ path: '.env' })

export default key => {

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderWithScheme('Bearer'), ExtractJwt.fromUrlQueryParameter('jwt')]),
    secretOrKey: process.env.SECRET || ''
  }

  passport.use(new JwtStrategy(jwtOptions, (payload, done) => {

    if(!payload.data[key]) {
      return done(null, false, { message: 'invalid jwt' })
    }

    return User.where({ id: payload.data[key] }).fetch({ withRelated: ['photo','team'] }).then(user => {

      if(!user) {
        return done(null, false, { message: 'cannot find user' })
      }

      done(null, user, payload)

      return null

    }).catch(err => {
      done(null, false, { message: 'unable to load user' })
    })

  }))

  passport.use(new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {

    return User.where({ email: username }).fetch().then(user => {

      if(!user) {
        return done(null, false, { message: 'cannot find user' })
      }

      if(!user.authenticate(password)) {
        return done(null, false, { message: 'invalid password' })
      }

      done(null, user)

      return null

    }).catch(err => {
      done(null, false, { message: 'unable to load user' })
    })

  }))

  return passport

}
