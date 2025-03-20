import { Router, Request, Response, NextFunction, response } from "express"
import userController from "../../controller/users/userController";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("I'm at the user router.")
})

router.post("/create_user", async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    const responseFromController = await userController.createUser(data)

    res.send(responseFromController.message).status(responseFromController.status)
})

router.delete("/delete_user", async (req: Request, res: Response, next: NextFunction) => {
    //
    // 
})

export default router; 