import Polyanet from "../../model/astralobjects/polyanet";
import Space from "../../model/astralobjects/space";
import Megaverse from "../../model/megaverses/megaverse";
import AstralObjectFactory from "../astralobject";

/**
 * This class is responsible for drawing shapes in the Megaverse.
 */
class ShapeDrawer {
  private megaverse: Megaverse;

  private static instance: ShapeDrawer;

  constructor(megaverse: Megaverse) {
    this.megaverse = megaverse;
  }

  public static initialize(megaverseAPI: Megaverse): ShapeDrawer {
    if (!ShapeDrawer.instance) {
      ShapeDrawer.instance = new ShapeDrawer(megaverseAPI);
    }

    return ShapeDrawer.instance;
  }

  public static getInstance(): ShapeDrawer {
    return this.instance;
  }

  public static isInitialized(): boolean {
    return this.instance !== undefined;
  }

  /**
   * Draws a Polyanet cross in the Megaverse.
   */
  async drawPolyanetCross(): Promise<void> {

    // There is no need to get the goal map from the Crossmint API and copy it to the Megaverse.
    // The reason behind it's because a cross has a pattern that can be easily drawn without the need of the goal map.
    // We will draw the cross by setting Polyanets in the 1st and 2nd diagonal [from ranges 2-8].

    // First diagonal goes from (2, 2) to (8, 8)
    // Second diagonal goes from (2, 8) to (8, 2)
    for (let i = 2; i <= 8; i++) {
      // First diagonal
      await this.megaverse.setAstralObject(new Polyanet({ x: i, y: i }));
      // Second diagonal
      await this.megaverse.setAstralObject(new Polyanet({ x: i, y: 8 - (i - 2) }));
    }

    return;
  }

  /**
   * Clears the Polyanet cross from the Megaverse.
   */
  async clearPolyanetCross(): Promise<void> {
    // First diagonal goes from (2, 2) to (8, 8)
    // Second diagonal goes from (2, 8) to (8, 2)
    for (let i = 2; i <= 8; i++) {
      // First diagonal
      await this.megaverse.deleteAstralObject(new Polyanet({ x: i, y: i }));
      // Second diagonal
      await this.megaverse.deleteAstralObject(new Polyanet({ x: i, y: 8 - (i - 2) }));
    }

    return;
  }

  async drawCrossMintLogo(): Promise<void> {

    // For the Phase 2, it's necessary to get the goal map from the Crossmint API and copy it to the Megaverse, since the logo is a complex shape.
    // We will copy the goal map and draw it in the megaverse
    const map = (await this.megaverse.getGoalMap()).goal;

    // Loop through each row and column of the goal map and parse the string representing the astral object to an actual astral object.
    // Then, set the astral object in the Megaverse.
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const astralObject = AstralObjectFactory.getInstance().initializeAstralObject(map[i][j], { x: i, y: j });
        // Skip the Space objects, since they are already set in the Megaverse.
        if (astralObject instanceof Space) continue;

        await this.megaverse.setAstralObject(astralObject);
      }
    }
  }

  async clearCrossMintLogo(): Promise<void> {

    // For the Phase 2, it's necessary to get the goal map from the Crossmint API and copy it to the Megaverse, since the logo is a complex shape.
    // We will copy the goal map and draw it in the megaverse
    const map = (await this.megaverse.getGoalMap()).goal;

    // Loop through each row and column of the goal map and parse the string representing the astral object to an actual astral object.
    // Then, set the astral object in the Megaverse.
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const astralObject = AstralObjectFactory.getInstance().initializeAstralObject(map[i][j], { x: i, y: j });
        // Skip the Space objects, since they are already set in the Megaverse.
        if (astralObject instanceof Space) continue;

        await this.megaverse.deleteAstralObject(astralObject);
      }
    }
  }

}
export default ShapeDrawer;