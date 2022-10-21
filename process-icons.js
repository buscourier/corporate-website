const glob = require('glob')
const {processIcons} = require('@taiga-ui/icons/scripts')

glob('./src/assets/icons/**/*.svg', {}, (_err, files) => processIcons(files))
