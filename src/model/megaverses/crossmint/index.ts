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

  // CrossMintMegaverse is a Singleton
  protected static instance: CrossMintMegaverse;

  // Private properties
  private axiosInstance: AxiosInstance;
  private candidateId: string;
  private static RETRY_DELAY_MS = 3000;
  private static MAX_RETRIES = 3;

  private constructor(config: CrossMintAPIConfig) {
    super();
    this.axiosInstance = axios.create({
      baseURL: config.crossMintApiUrl,
    });
    // We will use axios-retry to retry requests in case of failure
    axiosRetry(this.axiosInstance, {
      retries: CrossMintMegaverse.MAX_RETRIES, retryDelay: (retryCount) => {
        let interval = CrossMintMegaverse.RETRY_DELAY_MS * retryCount;
        console.log(`Crossmint API request failed. Attempt #${retryCount} will occur after ${interval}ms`);
        return interval;
      }, retryCondition: (error) => {
        return error.response?.status === 429;
      }
    })
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
        return AstralObjectFactory.getInstance().initializeAstralObject(item, { x: i, y: j }).toString();
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
}

export default CrossMintMegaverse;