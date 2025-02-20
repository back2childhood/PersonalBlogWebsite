const path = require('path')

module.exports = {
    webpack: {
        alias: {
            // use @ stands for the src folder
            '@': path.resolve(__dirname, 'src')
        }
    }
}