# Meme
The source code for Project Meme: "Don't Think."

## Branches
- ``prod`` - The currently live source code, automatically published to the [production game](https://www.roblox.com/games/89746346109474/) via rbxcloud and GitHub Actions. Only staging should be merged into this branch after thorough QA testing.
- ``staging`` - The next release candidate, may be unstable, and automatically published to the [staging game](https://www.roblox.com/games/97047225573202) via rbxcloud and GitHub actions.
- ``*`` - Feature branches, not automatically published anywhere and should only be merged into ``staging``.

## Tooling
- Roblox TS
- Rokit
- Rojo
- NPM
- GitHub actions workflow (hermetic build & deploy w/ rbxcloud)
