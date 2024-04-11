import AstralObject from "../astralobjects/astralobject";
export interface MegaverseSpace {
    goal: string[][];
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