import { Router } from "express";
import shapeDrawerRouter from "./shapeDrawer/router";
import { handleError } from "./middleware/error";

export let router = Router();

/**
 * Health route for all methods
 */
router.all('/health', (req, res) => {
    res.status(200).send('OK');
});

/**
 * ShapeDrawer routes
 */
router.use('/shapedrawer/', shapeDrawerRouter);


// Error handler to all routes above
router.use(handleError);
