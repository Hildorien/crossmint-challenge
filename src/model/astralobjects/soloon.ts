import { Point } from "../point";
import AstralObject, { Color } from "./astralobject";

class Soloon extends AstralObject {
    public color: Color;

    constructor(position: Point, color: Color) {
        super(position);
        this.color = color;
    }

    public getRow(): number {
        return this.position.x;
    }
    public getColumn(): number {
        return this.position.y;
    }
    public getName(): string {
        return "soloon";
    }
    public getProperties(): { [key: string]: any } {
        return {
            color: this.color
        };
    }
}

export default Soloon;