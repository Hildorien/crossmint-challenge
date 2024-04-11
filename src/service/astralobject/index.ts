import AstralObject, { Direction, Color } from "../../model/astralobjects/astralobject";
import Cometh from "../../model/astralobjects/cometh";
import Polyanet from "../../model/astralobjects/polyanet";
import Soloon from "../../model/astralobjects/soloon";
import Space from "../../model/astralobjects/space";
import { Point } from "../../model/point";

/**
 * The purpose of this class is to create astral objects based on their name and position to avoid having to use a switch statement when parsing a goal map.
 */
class AstralObjectFactory {

    private static instance: AstralObjectFactory;

    // This is a map of astral object names to their respective constructors
    private static astralObjectMap: { [key: string]: (position: Point) => AstralObject } = {
        "SPACE": (position) => new Space(position),
        "POLYANET": (position) => new Polyanet(position),
        "UP_COMETH": (position) => new Cometh(position, Direction.UP),
        "DOWN_COMETH": (position) => new Cometh(position, Direction.DOWN),
        "RIGHT_COMETH": (position) => new Cometh(position, Direction.RIGHT),
        "LEFT_COMETH": (position) => new Cometh(position, Direction.LEFT),
        "WHITE_SOLOON": (position) => new Soloon(position, Color.WHITE),
        "RED_SOLOON": (position) => new Soloon(position, Color.RED),
        "PURPLE_SOLOON": (position) => new Soloon(position, Color.PURPLE),
        "BLUE_SOLOON": (position) => new Soloon(position, Color.BLUE),
    };

    public constructor() { }

    public static getInstance(): AstralObjectFactory {
        if (!this.instance) {
            this.instance = new AstralObjectFactory();
        }
        return this.instance;
    }

    public static initialize(): AstralObjectFactory {
        if (!this.instance) {
            this.instance = new AstralObjectFactory();
        }
        return this.instance;
    }

    // This method initializes an astral object based on its name and position
    public initializeAstralObject(objectName: string, position: Point): AstralObject {
        const astralObjectFactory = AstralObjectFactory.astralObjectMap[objectName];
        if (!astralObjectFactory) {
            throw new Error(`Invalid astral object name: ${objectName}`);
        }

        return astralObjectFactory(position);
    }

}

export default AstralObjectFactory;