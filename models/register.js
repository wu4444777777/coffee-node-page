var mongodb = require('./db');
var result = require('./result');
function Custom(custom){
    this._id = custom._id;
    this.username = custom.username;
    this.password = custom.password;
    this.secPass = custom.secPass;
    this.telephone = custom.telephone;
    this.email = custom.email;
    this.qq = custom.qq;
}
module.exports = Custom;
Custom.register = function(custom,callback){
    mongodb.open(function(err,db) {
        if (err)
            return callback(result({
                err:err,
                isSuccess:0
            }));
        db.collection('custom', function (err, collection) {
            if(err){
                mongodb.close();
                return callback(result({
                    err:err,
                    isSuccess:0
                }));
            }
            collection.findOne({
                username : custom.username
            },function(err,userResult){
                if(userResult != null){
                    mongodb.close();
                    return callback(result({
                        error:"注册用户已经存在",
                        isSuccess:0
                    }));
                }
                collection.insertOne({
                    username : custom.username,
                    password : custom.password,
                    secPass : custom.secPass,
                    telephone : custom.telephone,
                    email : custom.email,
                    qq : custom.qq
                },function(err,info){
                    mongodb.close();
                    return callback(result({
                        err:err,
                        info:info,
                        isSuccess:err == null && info.insertedCount == 1 ? 1 : 0
                    }));
                })
            })
        })
    })
};
