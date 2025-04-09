import { Router, Request, Response, NextFunction } from "express"

import accountController from "../../controller/accounts/accountController";
import authenticated from "../../middlewares/authenticated";

const router = Router(); 

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("I'm at the account router.")
})

router.post("/new_account", async (req: Request, res: Response, next: NextFunction) => {
    /* const data = req.body;

    const responseFromController = await userController.createUser(data)

    res.send(responseFromController.message).status(responseFromController.status.valueOf()) */

    const data = req.body; 

    console.log(data)

    const responseFromController = await accountController.createAccount(data) 

    res.send(responseFromController).status(responseFromController.status.valueOf())
})

export default router; 