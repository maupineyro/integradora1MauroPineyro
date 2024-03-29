import config from "./config.js";
import mongoose from "mongoose";

export default class MongoSingleton {
    static #instance;
    constructor(){
        this.#connectMongoDB();
    }

     static getInstance(){
        if (this.#instance) {
            console.log("Ya se ha abierto una conexion a MongoDB.");
        } else {
            this.#instance = new MongoSingleton();
        }
        return this.#instance;
    };

      #connectMongoDB = async ()=>{
        try {
            await mongoose.connect(
                config.mongoUrl,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    w: 1,
                }    
            );
            console.log("Conectado con exito a MongoDB usando Mongoose(Singleton pattern).");
        } catch (error) {
            console.error("No se pudo conectar a la BD usando Mongoose: " + error);
            process.exit();
        }
    };


}