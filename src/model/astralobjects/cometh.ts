import { Point } from "../point";
import AstralObject, { Direction } from "./astralobject";

class Cometh extends AstralObject {
    public direction: Direction;

    constructor(position: Point, direction: Direction) {
        super(position);
        this.direction = direction;
    }

    public getRow(): number {
        return this.position.x;
    }
    public getColumn(): number {
        return this.position.y;
    }
    public getName(): string {
        return "comeths";
    }
    public getProperties(): { [key: string]: any } {
        return {
            direction: this.direction.toLowerCase()
        };
    }
    public toString(): string {
        return `${this.direction.toUpperCase()}_COMETH`;
    }
}

export default Cometh;