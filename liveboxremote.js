var cfgLiveBox = Config.modules.LiveboxRemote,
    sendLiveBox = require('sendLiveBox'),
    ipCmd = require('ipCmd'),
    lbSock,
    lbState;

exports.init = function () {
    info('[ LiveboxRemote ] is initializing... (v%s)', cfgLiveBox.version);
    var ipReg = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm;

    if (!ipReg.test(cfgLiveBox.IP)) return error('\033[91m[ LiveboxRemote ]\033[0m Invalid IP: %s ! ...', cfgLiveBox.IP);
    sendLiveBox('getState', cfgLiveBox, function (clbk) {
        lbState = clbk;
    });
}

exports.socket = function (io, socket) {
    lbSock = socket;
    lbSock.emit('lb-connected', function (msg) {
        info('[ LiveboxRemote ] %s ...', msg);
        lbSock.emit('lb-state', lbState);
    });
}

exports.action = function (data, next) {
    info('[ LiveboxRemote ] is called ...', data.cmd || data.epg);
    var tts;

    sendLiveBox('getState', cfgLiveBox, function (clbk) {
        lbState = clbk;
        if (data.cmd && data.confidence && lbState == 1 && data.cmd != 'Shutdown')
            next({'tts': ipCmd.stby[3].toString()});
        else if (data.stby == lbState)
            next({ 'tts': ipCmd.stby[lbState].toString() });
        else {
            var tts = data.cmd ? 'cmd' : 'epg';
            var ttsNum = Math.floor( Math.random() * ipCmd[tts].length ); 
            next ({ tts:ipCmd[tts][ttsNum] });
            sendLiveBox(data, cfgLiveBox, function (clbk) {
                lbState = clbk;
                lbSock.emit('lb-state',lbState);
            });
        }
    });
}

exports.dispose = function () {
    info('[ LiveboxRemote ] is disposed ...');
}
