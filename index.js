'use strict'

var getUUID = require('./webwx.js').getUUID;
var checkAndParseUUID = require('./webwx.js').checkAndParseUUID;
var showQRImage = require('./webwx.js').showQRImage;
var checkLogin = require('./webwx.js').checkLogin;
var parseRedirectUrl = require('./webwx.js').parseRedirectUrl;
var login = require('./webwx.js').login;
var getbaseRequest = require('./webwx.js').getbaseRequest;
var webwxinit = require('./webwx.js').webwxinit;

var wechatLogger = require('./logger.js').wechatLogger;
var generateReplys = require('./reply.js').generateReplys;

var getContact = require('./webwx.js').getContact;
var robot = require('./webwx.js').robot;

// display, which is a stream
// var child_process = require('child_process');
// var display = child_process.spawn('display');
var display = require('qrcode-terminal');
qrcode.generate('https://login.weixin.qq.com/l/' + self.uuid, function (qrcode) {
    console.log(qrcode);
});

getUUID
  .then(checkAndParseUUID)
  .then(showQRImage(display))
  .then(checkLogin)
  .then(parseRedirectUrl)
  .then(login)
  .then(getbaseRequest)
  .then(webwxinit)
  .then(getContact)
  .then(robot(
    [(obj)=>o=>true],
    [wechatLogger, generateReplys]
  ))
  .catch((e)=>{
    console.error(e);
    process.exit(1);
  });

