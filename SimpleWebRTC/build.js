var bundle = require('browserify')(),
    fs = require('fs'),
    request = require('request'),
    uglify = require('uglify-js');

bundle.add('./simplewebrtc');
bundle.bundle({standalone: 'SimpleWebRTC'}, function (err, source) {
    if (err) console.error(err);
    fs.writeFileSync('simplewebrtc.bundle.js', source);
    request.get('https://54.79.14.231:8857/node_modules/socket.io/lib/socket.io.js', function (err, res, body) {
        if (!err && body && body.length) {
            fs.writeFile('latest.js', uglify.minify(source + body, {fromString: true}).code, function (err) {
                if (err) throw err;
            });
        }
    });
});
