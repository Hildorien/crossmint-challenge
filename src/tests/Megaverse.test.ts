import _ from 'lodash';
import LocalMegaverse from '../model/megaverses/local';
import ShapeDrawer from '../service/shapedrawer';
import { MegaverseSpace } from '../model/megaverses/megaverse';
import AstralObjectFactory from '../service/astralobject';
import Polyanet from '../model/astralobjects/polyanet';
import Space from '../model/astralobjects/space';



describe('Phase 1 Megaverse', () => {
    let megaverse: LocalMegaverse;
    let shapeDrawer: ShapeDrawer;
    let cleanMap: MegaverseSpace;
    let astralObjectFactory: AstralObjectFactory;

    beforeEach(() => {

        // Initialize Services
        AstralObjectFactory.initialize();
        ShapeDrawer.initialize(LocalMegaverse.initialize(11, 11));

        megaverse = LocalMegaverse.getInstance();
        shapeDrawer = ShapeDrawer.getInstance();
        astralObjectFactory = AstralObjectFactory.getInstance();
        cleanMap = {
            goal: Array.from({ length: 11 }, (_, row) =>
                Array.from({ length: 11 }, (_, column) => new Space({ x: row, y: column }).toString())
            )
        };
    });


    describe('Phase 1: getGoalMap', () => {
        it('should return the goal map from Phase 1', async () => {
            const map = Array.from({ length: 11 }, (_, i) =>
                Array.from({ length: 11 },
                    (_, j) => (i >= 2 && i <= 8 && j >= 2 && j <= 8 && (i === j || i + j === 10)) ?
                        new Polyanet({ x: i, y: j }).toString() :
                        new Space({ x: i, y: j }).toString()));
            const mockGoalMap: MegaverseSpace = { goal: map };

            await shapeDrawer.drawPolyanetCross();
            const goalMap = await megaverse.getGoalMap();

            // Use loadash to compare the two objects that contain nested arrays
            expect(_.isEqual(goalMap, mockGoalMap)).toBeTruthy();

            // Clean up the map
            await shapeDrawer.clearPolyanetCross();
            const cleanGoalMap = await megaverse.getGoalMap();
            expect(_.isEqual(cleanGoalMap, cleanMap)).toBeTruthy();

        });
    });
});