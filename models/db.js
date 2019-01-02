var settings = require('../settings');
var Db = require('mongodb').Db;//获取mongodb提供的db对象
var Server = require('mongodb').Server;
//引入外部实例
module.exports = new Db(settings.db, new Server(settings.host, "27017", {}));
//连接mongo数据库，将实例返回给module使用，就是将该数据库封装，将其抽出，便于使用
//settings.db就是调用数据库，后面的是端口