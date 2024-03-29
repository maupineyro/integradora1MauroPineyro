import passport from "passport";
import local from "passport-local";
//import UserManagerMongo from "../utils/paraBorrar/UserManagerMongo.js";
import UserService from "../services/dao/db/users.service.js";
import { createHash, isValidPassword } from "./bcrypt.js";
import GithubStrategy from "passport-github2";
import userModel from "../services/dao/db/models/users.model.js";
import cartModel from "../services/dao/db/models/carts.model.js";
import dotenv from 'dotenv';
import fetch from "node-fetch";

dotenv.config();
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

//const userManager = new UserManagerMongo();
const userService = new UserService();
const localStrategy = local.Strategy
//local
export const InitPassport = () =>{
    passport.use(
        'register',
        new localStrategy(
            {passReqToCallback: true,
             usernameField:'email'},
        async(req, username, password, done)=>{
            try {
            let userData= req.body;
            const user = await userService.getUserByEmail(username);
            const newCart = new cartModel({products:[]})
            const role = (userData.email === 'adminCoder@coder.com' && userData.password === 'admin2023') ? 'admin' : 'user';
            if(user) return done(null,false) // si lo encuentra, no se puede volver a registrar
            let newUser = {
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                age: userData.age,
                password: createHash(userData.password),
                cart: await newCart.save() ,
                role: role
            }
            let result = await userService.addUsers(newUser)
            return done (null, result)
            } catch (error) {
            return done('error al crear el usuario' + error)
            
        }
    }
    ))

    passport.use (
        'login', 
        new localStrategy( 
            {usernameField: 'email'},
        async (username, password, done) =>{
        const userDB = await userModel.findOne({email: username});
        try {
            if(!userDB) return done(null,false) // si no lo encuentra, no se puede loguear
            if(!isValidPassword(password, userDB)) return done (null,false)
            return done (null, userDB)

        } catch (error) {
            return done (error)
        }
    }
    ))
    passport.use(
        'github',
         new GithubStrategy(
            {
                clientID: GITHUB_CLIENT_ID,
                clientSecret: GITHUB_CLIENT_SECRET,
                callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
            },
            async(accessToken, _, refreshToken, profile, done)=>{
              try {
                const res = await fetch('https://api.github.com/user/emails',{
                    headers:{
                        Accept:'application/vnd.github+json',
                        Authorization: 'Bearer ' + accessToken,
                        'X-Github-Api-Version': '2022-11-28',
                    },
                });
                const emails = await res.json();
                const emailDetail = emails.find((email)=> email.verified == true);

                if (!emailDetail){
                    return done (new Error('cannot get a valid email for this user'));
                }
                profile.email = emailDetail.email;

                let user = await userModel.findOne({email: profile.email});
                //console.log (`github user: ${user}`)
                const newCart = new cartModel({products:[]})
                const role = (profile.email === 'adminCoder@coder.com' && profile.password === 'admin2023') ? 'admin' : 'user';
                if (!user) {
                    const newUser ={
                        first_name:profile._json.name || profile._json.login || 'noname',
                        last_name: 'nolast',
                        email: profile.email,
                        age: profile._json.age || 99,
                        password: 'nopass',
                        cart: await newCart.save(),
                        role:role
                    };
                    let userCreated = await userModel.create(newUser);
                    return done (null, userCreated)
                }else{
                    return done(null, user)
                }
              } catch (error) {
                return done (error)
              }  
            }
         ));


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id)
        done(null, user)
    })
}



