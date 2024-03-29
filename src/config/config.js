import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program 
    .option('-d','variable para debug', false)
    .option('-p <port>','puerto del servidor', 8080)
    .option('--persist <mode>', 'Modo de persistencia', "mongodb")
    .option('--mode <mode>', 'modo de trabajo', 'develop')
program.parse();

console.log("Mode Option: ", program.opts().mode);
console.log("Persistence Mode Option: ", program.opts().persist);

const environment = program.opts().mode;

dotenv.config(
    {
        path:environment === "production"?"./src/config/.env.production":"./src/config/.env.development"

    }
);
export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    persistence: program.opts().persist,
    gmailAccount:process.env.GMAIL_ACCOUNT,
    gmailAppPassword:process.env.GMAIL_APP_PASSW,
    environment: environment

}