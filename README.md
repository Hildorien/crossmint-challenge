# Crossmint Challenge

This repository contains the solution for the Crossmint Challenge.

## Getting Started

To get started, follow these steps:

1. Clone the repository
2. Install packages with `npm i`
3. Run with `npm run start`

Alternatively, the project is containerized in a Docker file.

Run in terminal:

1. `docker build -t crossmint-challenge .`
2. `docker run -p 5000:5000 crossmint-challenge`

An `.env` file is provided to consume environment variables for the API.

## Usage

This challenge was done in NodeJS using Express. The following endpoints represent the phases of the challenge:

- `POST /shapedrawer/cross` for Phase 1: Draws a cross using Polyanets in the Megaverse.
- `DELETE /shapedrawer/cross` for Phase 1: Deletes the cross drawn using Polyanets in the Megaverse.
- `POST /shapedrawer/logo` for Phase 2: Draws the Crossmint logo in the Megaverse.
- `DELETE /shapedrawer/logo` for Phase 2: Deletes the Crossmint logo drawn in the Megaverse.

## Models and Abstractions

- `AstralObject`: Represents the abstract concept of an astral object that can be drawn into a `Megaverse`. Concrete representations of `AstralObject` are the following:
  - `Space`
  - `Polyanets`
  - `Comeths`
  - `Soloons`

- `Megaverse`: Represents the concept of Megaverse where a user can draw `AstralObjects` in its space. Concrete representations of a `Megaverse` are the following:
  - `CrossMintMegaverse`: The Megaverse accessed through HTTP requests to validate the challenges.
  - `LocalMegaverse`: Local Megaverse for testing purposes.

- `ShapeDrawer`: Draws shapes in the Megaverse.

## Testing

Testing was done using `jest`. There are two tests that represent each Phase of the challenge:

1. **Phase 1 Test**: Mocks a cross of Polyanets in the LocalMegaverse to simulate the goal in CrossMintMegaverse. Then attempts to draw it and compares the result.
2. **Phase 2 Test**: Mocks the Crossmint logo in the LocalMegaverse to simulate the goal in CrossMintMegaverse. Then attempts to draw it and compares the result.
