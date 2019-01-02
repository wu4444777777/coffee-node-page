var mongodb = require('./db');
var result = require('./result');
function Content(content){
    this.id = content.id;
    this.prior = content.prior
}
module.exports = Content;
Content.findAll = function(callback){
    mongodb.open(function(err,db){
        if(err) return callback(err);
        db.collection('content',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //如果有要查询的对象，就在find({})里加内容
            collection.find().toArray(function(err,result){
                mongodb.close();
                if(err) return callback(err);
                return callback(null,result);
            })
        })
    })
};

Content.findPage = function(skip,callback){
    mongodb.open(function(err,db){
        if(err) return callback(err);
        db.collection('content',function(err,collection){
            if(err){
                mongodb.close();
                return callback(result({err:err}));
            }
            collection.find({}).sort().skip(parseInt(skip)).limit(2).toArray(function(err,proInfo){
                mongodb.close();
                return callback(result({
                    err:err,
                    info:proInfo
                }))
            })
        })
    })
};
Content.findWhere = function(content,callback){
    mongodb.open(function(err,db){
        if(err) return callback(err);
        db.collection('content',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.find({
                prior:content.prior
            }).toArray(function(err,result){
                mongodb.close();
                if(err) return callback(err);
                return callback(null,result);
            })
        })
    })
};
