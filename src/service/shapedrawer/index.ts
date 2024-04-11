import Polyanet from "../../model/astralobjects/polyanet";
import Megaverse from "../../model/megaverses/megaverse";
import { Point } from "../../model/point";

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


    const map = await this.megaverse.getGoalMap();
    // We will copy the goal map and draw it in the megaverse

    // Loop through each row and column of the goal map and parse the AstralObject.
    // Depending on the AstralObject, we will call the respective method to draw the shape.


  }

}
export default ShapeDrawer;