import { Router, Request, Response, NextFunction, response } from "express"
import userController from "../../controller/users/userController";
import authenticated from "../../middlewares/authenticated";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("I'm at the user router.")
})

router.post("/create_user", async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    const responseFromController = await userController.createUser(data)

    res.send(responseFromController.message).status(responseFromController.status.valueOf())
})

router.delete("/delete_user", async (req: Request, res: Response, next: NextFunction) => {
    //
    // 
})

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    const responseFromController = await userController.loginUser(data)

    res.send(responseFromController).status(responseFromController.status.valueOf())
})

router.get("/profile", authenticated, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.send("I'm at the profile route.")
});

export default router; 