import { Point } from "../point";
import AstralObject from "./astralobject";

class Space extends AstralObject {
    constructor(position: Point) {
        super(position);
    }

    public getRow(): number {
        return this.position.x;
    }
    public getColumn(): number {
        return this.position.y;
    }
    public getName(): string {
        return "space";
    }
    public getProperties(): { [key: string]: any; } {
        return {};
    }
    public toString(): string {
        return "SPACE";
    }
}

export default Space;