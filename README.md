# Hermetic Multiplace Template
A template for a fully hermetic-built & automatically deployed multiplace Roblox-TS experience.

## Branches
- ``prod`` - The currently live source code, automatically published to the production game via rbxcloud and GitHub Actions. Only staging should be merged into this branch after thorough QA testing.
- ``staging`` - The next release candidate, may be unstable, and automatically published to the staging game via rbxcloud and GitHub actions.
- ``*`` - Feature branches, not automatically published anywhere and should only be merged into ``staging``.

## Tooling & Libraries
- [Roblox TS](https://roblox-ts.com) for TS-Luau transpilation & API typings
- [Rokit](https://github.com/rojo-rbx/rokit) for toolchain management
- [Rojo](https:/rojo.space) for studio-sync and hermetic builds
- [NPM](https://www.npmjs.com) for TS package & toolchain management 
- [Vide](https://centau.github.io/vide/) for user interface
- [UI Labs](https://ui-labs.luau.page) for user interface design & development previews
- [Charm](https://github.com/littensy/charm/) for state management
- [RSML](https://rsml.style) for user interface styling
- [rbxts-orchestra](https://github.com/camren-m/orchestra) and [custom build scripts]("./scripts") for project management, building, and development
- Custom CI workflows with:
  - [eslint](https://eslint.style) and [prettier](https://prettier.io) for code style linting
  - [rbxcloud](https://sleitnick.github.io/rbxcloud/) for automatic deployments to staging & production experiences
  - [GitHub CLI](https://cli.github.com) for build artifact uploads to [releases](https://github.com/camren-m/hermetic-multiplace/releases)
