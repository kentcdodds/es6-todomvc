var path = require('path');

var config = {
	entry: './app.js',
	output: {
		filename: 'bundle.js',
		path: here()
	},
	context: here('js'),
	devtool: 'eval',
	module: {
		loaders: [
			{test: /\.css$/, loader: 'style!css'}
		]
	}
};
config.module.loaders = getJSLoaders().concat(config.module.loaders);

if (process.env.NODE_ENV === 'test') {
	config.entry = './ControllerSpec.js';
	config.context = here('test');
}

module.exports = config;

function getJSLoaders() {
	var jsLoaders = [];
	if (process.env.NODE_ENV === 'test') {
		jsLoaders.push({test: /js\/.*\.js$/, loader: 'isparta', exclude: /node_modules/});
		jsLoaders.push({test: /test\/.*\.js$/, loader: 'babel', exclude: /node_modules/});
	} else {
		jsLoaders.push({test: /\.js$/, loader: 'babel', exclude: /node_modules/});
	}
	return jsLoaders;
}

function here(d) {
	return d ? path.join(__dirname, d) : __dirname;
}
