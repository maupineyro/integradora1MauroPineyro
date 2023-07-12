import passport from "passport";
import local from "passport-local";
import UserManagerMongo from "../dao/managers/mongoDB/UserManagerMongo.js";
import { createHash, isValidPassword } from "./bcrypt.js";
import {Strategy as GithubStrategy} from "passport-github2"

const userManager = new UserManagerMongo();
const localStrategy= local.Strategy
//local
export const InitPassport = () =>{
    passport.use('register', new localStrategy({passReqToCallback: true, usernameField:'email'},
    async(req, username, password, done)=>{
        const {email, password}= req.body;
        try {
            const user = await userManager.getUserByEmail(username)
            if(user) return done(null,false) // si lo encuentra, no se puede volver a registrar
            const newUser = {
                email: email,
                password: createHash(password)
            }
            let result = await userManager.addUser(newUser)
            return done (null, result)
        } catch (error) {
            return done(error)
            
        }
    }
    ))

    passport.use ('login', new localStrategy( {usernameField: 'email'},
    async (username, password, done) =>{
        const userDB = await userManager.getUserByEmail(username);
        try {
            if(!userDB) return done(null,false) // si no lo encuentra, no se puede loguear
            if(!isValidPassword(password, userDB)) return done (null,false)
            return done (null, userDB)

        } catch (error) {
            return done (error)
        }
    }

    ))
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (_id, done) => {
        let user = await userManager.getUserById(_id)
        done(null, user)
    })
}


//github
export const initPassportGithub = ()=>{
    
}