import passport from "passport";
import local from "passport-local";
import UserManagerMongo from "../dao/managers/mongoDB/UserManagerMongo.js";
import { createHash, isValidPassword } from "./bcrypt.js";
import {Strategy as GithubStrategy} from "passport-github2"
import userModel from "../dao/models/users.model.js";

const userManager = new UserManagerMongo();
const localStrategy = local.Strategy
//local
export const InitPassport = () =>{
    passport.use('register', new localStrategy(
        {passReqToCallback: true, usernameField:'email'},
        async(req, username, password, done)=>{
        try {
            let userData= req.body;
            const user = await userManager.getUserByEmail(username)
            const role = (userData.email === 'adminCoder@coder.com' && userData.password === 'admin2023') ? 'admin' : 'user';
            if(user) return done(null,false) // si lo encuentra, no se puede volver a registrar
            const newUser = {
                name: userData.name,
                lastname: userData.lastname,
                email: userData.email,
                password: createHash(userData.password),
                role: role
            }
            let result = await userManager.addUser(newUser)
            return done (null, result)
        } catch (error) {
            return done('error al crear el usuario' + error)
            
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

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id)
        done(null, user)
    })
}


//github
export const initPassportGithub = ()=>{

}