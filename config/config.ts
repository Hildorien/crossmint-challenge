import dotenv from 'dotenv';
import { Config } from './types';
dotenv.config();

let config: Config = {
    crossmint: {
        candidateId: process.env.CANDIDATE_ID || "",
        crossMintApiUrl: process.env.MEGAVERSE_API_URL || "https://challenge.crossmint.io/api"
    }
};

export default config;