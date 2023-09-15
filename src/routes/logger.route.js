import { Router } from "express";

const loggerRouter = Router();

loggerRouter.get('/', async (req,res)=>{
    req.logger.warning ('prueba logger lvl warn');
    res.send('prueba de endpoint loggerTest')
})

export default loggerRouter;