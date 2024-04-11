import { Router, Request, Response } from "express";
import CrossMintMegaverse from "../../model/megaverses/crossmint";

let router = Router();

/**
 * This will get the goal map from the CrossMint Megaverse in the current Phase. 
 * After validating the goal map in phase one, it will change the value of the goal map to phase two.
 * This is not and idemponent function. 
 * For testing purposes we will create another Local Megaverse to test the goal map.
 */
router.get('/', async (req: Request, res: Response, next: Function) => {
    try {
        const map = await CrossMintMegaverse.getInstance().getGoalMap();
        return res.json(map);

    } catch (error) {
        // Call errorHandling middleware
        next(error);
    }
});

export default router;