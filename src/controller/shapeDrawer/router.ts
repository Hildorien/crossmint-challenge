import { Router, Request, Response } from "express";
import CrossMintMegaverse from "../../model/megaverses/crossmint";
import ShapeDrawer from "../../service/shapedrawer";
import config from "../../../config/config";

let router = Router();

/**
 * This will get the goal map from the CrossMint Megaverse in the current Phase. 
 * After validating the goal map in phase one, it will change the value of the goal map to phase two.
 * This is not and idemponent function. 
 * For testing purposes we will create another Local Megaverse to test the goal map.
 */
router.get('/', async (req: Request, res: Response, next: Function) => {
    try {
        const megaverseAPI = new CrossMintMegaverse(config.crossmint);
        const map = await megaverseAPI.getGoalMap();
        return res.json(map);

    } catch (error) {
        // Call errorHandling middleware
        next(error);
    }
});

router.post('/cross', async (req: Request, res: Response, next: Function) => {
    try {
        const megaverseAPI = new CrossMintMegaverse(config.crossmint);
        const shapeDrawer = new ShapeDrawer(megaverseAPI);
        await shapeDrawer.drawPolyanetCross();

        return res.json({ message: "Cross drawn" });
    } catch (error) {
        // Call errorHandling middleware
        next(error);
    }
});

router.delete('/cross', async (req: Request, res: Response, next: Function) => {
    try {
        const megaverseAPI = new CrossMintMegaverse(config.crossmint);
        const shapeDrawer = new ShapeDrawer(megaverseAPI);
        await shapeDrawer.clearPolyanetCross();

        return res.json({ message: "Cross cleared" });
    } catch (error) {
        // Call errorHandling middleware
        next(error);
    }
});

router.post('/logo', async (req: Request, res: Response, next: Function) => {
    try {
        const megaverseAPI = new CrossMintMegaverse(config.crossmint);
        const shapeDrawer = new ShapeDrawer(megaverseAPI);


        return res.json({ message: "Logo drawn" });
    } catch (error) {
        // Call errorHandling middleware
        next(error);
    }
});

router.delete('/logo', async (req: Request, res: Response, next: Function) => {
    try {
        const megaverseAPI = new CrossMintMegaverse(config.crossmint);
        const shapeDrawer = new ShapeDrawer(megaverseAPI);


        return res.json({ message: "Logo cleared" });
    } catch (error) {
        // Call errorHandling middleware
        next(error);
    }
});


export default router;