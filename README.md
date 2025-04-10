# Ethereum Escrow dApp
This is a Escrow dApp developed for ethereum blockchain.

## User flow

```mermaid
flowchart LR
    User((User)) --> Authenticates[Authenticates]
    Authenticates --> Deploys[Deploys the contract]
    Deploys --> DB[(Persists in a database)]
    Authenticates --> Views[Views list of contracts user is involved in]
```
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
