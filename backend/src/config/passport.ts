import passport, { use } from "passport";

import passportJWT, { Strategy } from "passport-jwt";

import  User from "../models/user.model";

var JwtStrategy = passportJWT.Strategy;
var ExtractJwt = passportJWT.ExtractJwt;

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secrect'
},
  function (jwtPayload: any, cb: any) {
    return User.findOne({ id: jwtPayload.id }, function (err: any, user: any) {
      if (err) {
        return cb(err, false);
      }
      if (user) {
        return cb(null, user);
      }
      else {
        return cb(null, false);
      }
    });
  }));