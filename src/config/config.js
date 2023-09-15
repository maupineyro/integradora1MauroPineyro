import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program 
    .option('-d','variable para debug', false)
    .option('-p <port>','puerto del servidor', 8080)
    .option('--mode <mode>', 'modo de trabajo', 'develop')
program.parse();

console.log("Mode Option: ", program.opts().mode);

const environment = program.opts().mode;

dotenv.config(
    {
        path:environment === "production"?"./src/config/.env.production":"./src/config/.env.development"

    }
);
export default {
    persistence:process.env.PERSISTENCE,
    environment: environment

}