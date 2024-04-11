import { Point } from "../point";
import AstralObject from "./astralobject";

class Polyanet extends AstralObject {
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
        return "polyanet";
    }
    public getProperties(): { [key: string]: any; } {
        return {};
    }
}

export default Polyanet;