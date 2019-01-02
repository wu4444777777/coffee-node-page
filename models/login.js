var mongodb = require('./db');

function Custom(custom){
    this.id = custom.id;
    this.username = custom.username;
    this.password = custom.password;
    this.secPass = custom.secPass;
    this.telephone = custom.telephone;
    this.email = custom.email;
    this.qq = custom.qq;
}
module.exports = Custom;
Custom.findOne = function(custom,callback){
    //第一个参数test对象是查询条件,mongodb是第一句所声明的
    //第二个参数是回调函数
    mongodb.open(function(err,db){
        if(err) {
            callback(err);
        }
        //test是集合名称
        //通过db连接集合，db方法的第一个参数是集合名称，第二个参数是一个回调函数
        db.collection('custom',function(err,collection){
            if(err){
                mongodb.close();
                callback(err);
            }
            // findOne方法，第一个参数是查询条件，第二个是回调函数
            collection.findOne({
                //此处的test是路由传的，同时name和email是要与数据库保持一致
                username:custom.username,
                password:custom.password
                //这里相当于collection.findOne({"name":"1111","email":"22222"},function(err,test))
            },function(err,test){
                //这里的test是自己定义的，这里是查询结果，返回的数据就是test
                mongodb.close();
                if(test) {
                    callback(null,test);
                    return;
                }
                return callback(err);
            })
        })
    })
};