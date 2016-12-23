/**
 * Created by kevinkreuzer on 23.12.16.
 */

const {resolve} = require('path');

module.exports = () => {
    return {
        context: resolve('src'),
        entry: './bootstrap.js',
        output: {
            filename: 'bundle.js'
        }
    }
};