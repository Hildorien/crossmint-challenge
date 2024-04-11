import { Router } from "express";
import shapeDrawerRouter from "./shapeDrawer/router";
import mapRouter from "./map/router";
import { handleError } from "./middleware/error";

export let router = Router();

/**
 * Health route for all methods
 */
router.all('/health', (req, res) => {
    res.status(200).send('OK');
});

/**
 * Map routes
 */
router.use('/map', mapRouter);

/**
 * ShapeDrawer routes
 */
router.use('/shapedrawer', shapeDrawerRouter);


// Error handler to all routes above
router.use(handleError);
