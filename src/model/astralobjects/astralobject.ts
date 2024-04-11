import { Point } from "../point";

import Space from "./space";
import Polyanet from "./polyanet";

export enum Direction {
    UP = "UP",
    DOWN = "DOWN",
    RIGHT = "RIGHT",
    LEFT = "LEFT"

}

export enum Color {
    WHITE = "WHITE",
    RED = "RED",
    PURPLE = "PURPLE",
    BLUE = "BLUE"
}

abstract class AstralObject {
    public position: Point;

    constructor(position: Point) {
        this.position = position;

    }

    public abstract getRow(): number;
    public abstract getColumn(): number;
    public abstract getName(): string;
    public abstract getProperties(): { [key: string]: any };
    public abstract toString(): string;

}

export default AstralObject;