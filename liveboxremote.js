var cfgLiveBox = Config.modules.LiveboxRemote,
    sendLiveBox = require ('sendLiveBox'),
    ipCmd = require ('ipCmd'),
    lbSock = false,
    lbState;

exports.init = function () {
    info ('[ LiveboxRemote ] is initializing... (v%s)', cfgLiveBox.version);
    var ipReg = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm;

    if (!ipReg.test (cfgLiveBox.IP)) return error ('\033[91m[ LiveboxRemote ]\033[0m Invalid IP: %s ! ...', cfgLiveBox.IP);

    sendLiveBox ('getState', cfgLiveBox, function (clbk) {
        lbState = clbk;
    });
}

exports.socket = function (io, socket) {
    socket.on ('lb-connect', function (msg) { //if (!lbSock) {}
        lbSock = socket;
        info ('[ LiveboxRemote ]', msg);
        socket.emit ('lb-state', lbState);
    })
    .on('disconnect', function () {
        info ('[ LiveboxRemote ] Disconnected from portlet ...');
        lbSock = false;
    });
}

exports.action = function (data, next) {
    info('[ LiveboxRemote ] is called ...', data.cmd || data.epg);

    sendLiveBox ('getState', cfgLiveBox, function (clbk) {
        lbState = clbk;

        if (data.hasOwnProperty ('cmd') && data.hasOwnProperty ('confidence') && lbState == 1 && data.cmd != 'Shutdown') {
            next ({ 'tts': ipCmd.stby[3].toString() });
        }

        else {
            var tts = data.cmd ? 'cmd' : 'epg';
            var ttsNum = Math.floor ( Math.random() * ipCmd[tts].length ); 
            sendLiveBox (data, cfgLiveBox, function (clbk) {
                lbState = clbk;
                if (lbSock) lbSock.emit('lb-state', lbState);
            });
            next ({ tts: ipCmd[tts][ttsNum] });
        }
    });
}

exports.dispose = function () {
    info ('[ LiveboxRemote ] is disposed ...');
}
