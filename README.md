
## Installation

### Build (advanced)

Museeks is built upon:

- [Node.js](https://nodejs.org/en/)
- [Electron](https://github.com/atom/electron/) (formerly atom-shell)
- [React.js](https://facebook.github.io/react/) as UI library and [Flux](https://facebook.github.io/flux/) with [Redux](http://redux.js.org/) as data-flow pattern

Requirements:

- `node` > 16
- `npm` > 6
- `yarn` 1

Please consider that **`master` is unstable**.

- `git clone git@github.com:martpie/museeks.git`
- `cd museeks`
- `yarn install --frozen-lockfile`
- `yarn build` or `yarn dev`

### Package binaries (advanced)

- `rm -rf node_modules dist build`
- `yarn install --frozen-lockfile`
- `yarn build`
- to test the production build:
  - `yarn museeks` or `yarn museeks:debug`
- to test packaging `yarn package:lmw`, or:
  - `yarn package:l` (linux-only)
  - `yarn package:m` (mac-only)
  - `yarn package:w` (windows-only)

## Troubleshooting

Museeks is currently in development. This implies some things can break after an update (database schemes changes, config...).

If you encounter freezes or crashes when using the app, you can reset Museeks by following these steps:

- Go to the Museeks folder directory
  - Windows: `%AppData%\museeks`
  - OSX: `~/Library/Application Support/museeks`
  - Linux: `~/.config/museeks/` or `$XDG_CONFIG_HOME/museeks`
- Delete:
  - `IndexedDB` folder
  - `config.json` file
- Restart Museeks
