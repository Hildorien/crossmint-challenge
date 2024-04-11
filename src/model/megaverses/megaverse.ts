import CrossMintMegaverse from "./crossmint";
import AstralObject from "../astralobjects/astralobject";
import { Point } from "../point";
import Space from "../astralobjects/space";
import Polyanet from "../astralobjects/polyanet";
import Cometh from "../astralobjects/cometh";
import AstralObjectFactory from "../../service/astralobject";

export interface MegaverseSpace {
    goal: AstralObject[][];
}

abstract class Megaverse {

    // Megaverse is a Singleton
    protected static instance: Megaverse;

    protected constructor() {
    }

    public static getInstance(): Megaverse {
        if (!this.instance) {
            throw new Error("Must be implemented by subclasses");
        }
        return this.instance;
    }

    abstract setAstralObject(astralObject: AstralObject): Promise<void>;
    abstract deleteAstralObject(astralObject: AstralObject): Promise<void>;
    abstract getGoalMap(): Promise<MegaverseSpace>;

}

export default Megaverse;