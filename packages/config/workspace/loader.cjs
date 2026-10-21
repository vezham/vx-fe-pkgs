const { createJiti } = require('jiti')

// vx-bot/NOTE: Workspace-only loading supports synchronous tools; npm exports use built ESM.
exports.loadConfig = createJiti(__filename, { tryNative: true, jsx: true })
