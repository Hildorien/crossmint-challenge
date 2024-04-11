import express from 'express';
import * as routes from "./controller/routes";
import CrossMintMegaverse from './model/megaverses/crossmint';
import config from '../config/config';
import ShapeDrawer from './service/shapedrawer';
import AstralObjectFactory from './service/astralobject';

const app: express.Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

// Error handling
process.on('unhandledRejection', reason => {
    console.error(`Unhandled Rejection at: Promise, reason: ${reason}`);
});

process.on('uncaughtException', uncaughtException => {
    console.error(`Uncaught Exception thrown at: ${uncaughtException.stack} - message: ${uncaughtException.message}`);
});

// Configure routes
app.use(routes.router);

// Serve the application at the given port
app.listen(port, (): void => {
    // Initialize Services
    AstralObjectFactory.initialize();
    CrossMintMegaverse.initialize(config.crossmint);
    ShapeDrawer.initialize(CrossMintMegaverse.getInstance());
    console.log(`Listening at http://localhost:${port}/`);
});