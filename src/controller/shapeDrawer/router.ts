import { Router, Request, Response } from "express";
import ShapeDrawer from "../../service/shapedrawer";

let router = Router();

router.post('/cross', async (req: Request, res: Response, next: Function) => {
    try {
        await ShapeDrawer.getInstance().drawPolyanetCross();

        return res.json({ message: "Cross drawn" });
    } catch (error) {
        // Call errorHandling middleware
        next(error);
    }
});

router.delete('/cross', async (req: Request, res: Response, next: Function) => {
    try {
        await ShapeDrawer.getInstance().clearPolyanetCross();

        return res.json({ message: "Cross cleared" });
    } catch (error) {
        // Call errorHandling middleware
        next(error);
    }
});

router.post('/logo', async (req: Request, res: Response, next: Function) => {
    try {

        await ShapeDrawer.getInstance().drawCrossMintLogo();

        return res.json({ message: "Logo drawn" });
    } catch (error) {
        // Call errorHandling middleware
        next(error);
    }
});

router.delete('/logo', async (req: Request, res: Response, next: Function) => {
    try {
        await ShapeDrawer.getInstance().clearCrossMintLogo();

        return res.json({ message: "Logo cleared" });
    } catch (error) {
        // Call errorHandling middleware
        next(error);
    }
});


export default router;