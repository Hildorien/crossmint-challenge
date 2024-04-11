import axios, { AxiosInstance } from 'axios';
import { CrossMintAPIConfig } from '../../../../config/types';
import axiosRetry from 'axios-retry';
import Megaverse, { MegaverseSpace } from '../megaverse';
import AstralObject from '../../astralobjects/astralobject';
import AstralObjectFactory from '../../../service/astralobject';


/**
 * This class is an implementation of the Megaverse interface that communicates with the Crossmint API.
 */
class CrossMintMegaverse extends Megaverse {

  // LocalMegaverse is a Singleton
  protected static instance: CrossMintMegaverse;

  // Private properties
  private axiosInstance: AxiosInstance;
  private candidateId: string;
  private static RETRY_DELAY_MS = 3000;
  private static MAX_RETRIES = 3;

  public constructor(config: CrossMintAPIConfig) {
    super();
    this.axiosInstance = axios.create({
      baseURL: config.crossMintApiUrl,
    });
    // We will use axios-retry to retry requests in case of failure
    axiosRetry(this.axiosInstance, { retries: CrossMintMegaverse.MAX_RETRIES, retryDelay: () => CrossMintMegaverse.RETRY_DELAY_MS })
    this.candidateId = config.candidateId;
  }

  public static initialize(config: CrossMintAPIConfig): CrossMintMegaverse {
    if (!CrossMintMegaverse.instance) {
      CrossMintMegaverse.instance = new CrossMintMegaverse(config);
    }

    return CrossMintMegaverse.instance;
  }

  public static getInstance(): CrossMintMegaverse {
    return this.instance;
  }

  // Helper method to parse the response from the Crossmint API
  private parseMegaverseSpace(data: any): MegaverseSpace {
    const goal = data.goal.map((row: any[], i: number) =>
      row.map((item: string, j: number) => {
        // We will initialize the AstralObject based on the item name and position in the goal map
        AstralObjectFactory.getInstance().initializeAstralObject(item, { x: i, y: j });
      })
    );
    return { goal };
  }

  // Megaverse Interface

  async setAstralObject(astralObject: AstralObject): Promise<void> {
    return await this.axiosInstance.post(`/${astralObject.getName()}`,
      {
        row: astralObject.getRow(),
        column: astralObject.getColumn(),
        // Spread additional properties of the astralObject
        ...astralObject.getProperties(),
        candidateId: this.candidateId
      });
  }
  async deleteAstralObject(astralObject: AstralObject): Promise<void> {
    return await this.axiosInstance.delete(`/${astralObject.getName()}`,
      {
        params: {
          row: astralObject.getRow(),
          column: astralObject.getColumn(),
          candidateId: this.candidateId
        }
      });
  }
  async getGoalMap(): Promise<MegaverseSpace> {
    return await this.axiosInstance.get(`/map/${this.candidateId}/goal`)
      .then((response) => {
        return this.parseMegaverseSpace(response.data);
      });
  }

  // Polyanet methods
  /*public async setPolyanet(row: number, column: number): Promise<void> {
    await this.axiosInstance.post('/polyanets', { row, column, candidateId: this.candidateId });
  }

  public async deletePolyanet(row: number, column: number): Promise<void> {
    await this.axiosInstance.delete('/polyanets', { params: { row, column, candidateId: this.candidateId } });
  }

  // Soloon methods
  public async setSoloon(row: number, column: number, color: 'blue' | 'red' | 'purple' | 'white'): Promise<void> {
    await this.axiosInstance.post('/soloons', { row, column, color, candidateId: this.candidateId });
  }

  public async deleteSoloon(row: number, column: number): Promise<void> {
    await this.axiosInstance.delete('/soloons', { params: { row, column, candidateId: this.candidateId } });
  }

  // Cometh methods
  public async setCometh(row: number, column: number, direction: 'up' | 'down' | 'right' | 'left'): Promise<void> {
    await this.axiosInstance.post('/comeths', { row, column, direction, candidateId: this.candidateId });
  }

  public async deleteCometh(row: number, column: number): Promise<void> {
    await this.axiosInstance.delete('/comeths', { params: { row, column, candidateId: this.candidateId } });
  }

  // Goal methods
  public async getGoalMap(): Promise<MegaverseSpace> {
    return await this.axiosInstance.get(`/map/${this.candidateId}/goal`)
      .then((response) => {
        return this.parseMegaverseSpace(response.data);
      });

  }*/
}

export default CrossMintMegaverse;