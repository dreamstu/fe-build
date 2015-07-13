var path = require('path');
var root = path.join(__dirname,'..','node_modules','quick-build-core');
var settings = {
	root:root,
	tmp:path.join(root,'tmp')
}
module.exports = settings;