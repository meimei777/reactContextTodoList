const open             = require('open');
const webpack          = require('webpack');
const internalIP       = require('internal-ip');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack.config.js');
const portal = config.devServer.https ? 'https' : 'http';
const port   = config.devServer.port;
const ip     = internalIP.v4.sync();

for (let key in config.entry) {
    let ar = config.entry[key];
    if (key != "common" && key != "manifest") {
        ar.unshift("webpack-dev-server/client?" + portal + "://" + ip + ":" + port + "/", "webpack/hot/dev-server");
    }
}

config.plugins = config.plugins || [];
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NamedModulesPlugin());

new WebpackDevServer(webpack(config), config.devServer)
.listen(port, ip, (err) => {
    if (err) { console.log(err); }
    console.log('Listening at localhost:' + port);
    console.log('Opening your system browser...');
    open(portal + '://' + (ip || '127.0.0.1') + ':' + port + '/static/index.html?debug=true');
});
