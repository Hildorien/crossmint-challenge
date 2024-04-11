import AstralObject from "../../astralobjects/astralobject";
import Space from "../../astralobjects/space";
import Megaverse, { MegaverseSpace } from "../megaverse";


/**
 * This class is a local implementation of the Megaverse interface that simulates the behavior of Crossmint API.
 * It is used for testing purposes.
 */
class LocalMegaverse extends Megaverse {

    // LocalMegaverse is a Singleton
    protected static instance: LocalMegaverse;

    // Private properties
    private goalMap: MegaverseSpace = { goal: [] }
    private maxRow: number;
    private maxColumns: number;

    private constructor(maxRow: number, maxColumns: number) {
        super();
        this.maxRow = maxRow;
        this.maxColumns = maxColumns;
        this.goalMap = {
            goal:
                Array.from({ length: maxRow }, (_, row) =>
                    Array.from({ length: maxColumns }, (_, column) => new Space({ x: row, y: column }).toString())
                )
        }
    }

    public static initialize(maxRow: number, maxColumns: number): LocalMegaverse {
        if (!this.instance) {
            this.instance = new LocalMegaverse(maxRow, maxColumns);
        }
        return this.instance;
    }

    public static getInstance(): LocalMegaverse {
        if (!this.instance) {
            throw new Error("Must be implemented by subclasses");
        }
        return this.instance;
    }

    // Megaverse Interface

    async setAstralObject(astralObject: AstralObject): Promise<void> {
        return new Promise((resolve, reject) => {
            const row = astralObject.getRow();
            const column = astralObject.getColumn();
            if (row < 0 || row > this.maxRow || column < 0 || column > this.maxColumns) {
                reject(new Error("Invalid row or column"));
            }

            this.goalMap.goal[row][column] = astralObject.toString();
            resolve();
        });
    }

    async deleteAstralObject(astralObject: AstralObject): Promise<void> {
        return new Promise((resolve, reject) => {
            const row = astralObject.getRow();
            const column = astralObject.getColumn();
            if (row < 0 || row > 10 || column < 0 || column > 10) {
                reject(new Error("Invalid row or column"));
            }

            this.goalMap.goal[row][column] = new Space({ x: row, y: column }).toString();
            resolve();
        });
    }

    // Goal Map
    async getGoalMap(): Promise<MegaverseSpace> {
        return new Promise((resolve) => {
            resolve(this.goalMap);
        });
    }

}

export default LocalMegaverse;