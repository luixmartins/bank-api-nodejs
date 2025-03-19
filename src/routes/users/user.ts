import { Router, Request, Response, NextFunction, response } from "express"
import userController from "../../controller/users/userController";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("I'm at the user router.")
})

router.post("/create_user", async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body; 

    const responseFromController = userController.createUser(data)

    res.send(responseFromController)
})

export default router; 