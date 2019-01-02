var mongodb = require('./db');
var result = require('./result');

function Content(content){
    this.id = content.id;
    this.name = content.name;
    this.image = content.image;
    this.price = content.price;
    this.birthplace = content.birthplace;
    this.deadline = content.deadline;
    this.series = content.series;
    this.image1 = content.image1;
    this.image2 = content.image2;
    this.image3 = content.image3;
    this.type = content.type;
}
module.exports = Content;

Content.findOne = function(content,callback){
    mongodb.open(function(err,db){
        if(err){
            callback(err);
        }
        db.collection('content',function(err,collection){
            if(err){
                mongodb.close();
                callback(err);
            }
            collection.findOne({
                id : content.id
                // name : content.name,
                // image : content.image,
                // price : content.price,
                // birthplace : content.birthplace,
                // deadline : content.deadline,
                // series : content.series,
                // image1 : content.image1,
                // image2 : content.image2,
                // image3 : content.image3
            },function(err,result){
                mongodb.close();
                if(err) return callback(err);
                return callback(null,result);
            })
        })
    })
};

Content.findAll = function(callback){
    mongodb.open(function(err,db){
        if(err) return callback(err);
        db.collection('content',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //如果有要查询的对象，就在find({})里加内容
            collection.find({}).toArray(function(err,result){
                mongodb.close();
                if(err) return callback(err);
                return callback(null,result);
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
                id:content.id
            }).toArray(function(err,result){
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
            collection.find({}).sort().skip(parseInt(skip)).limit(1).toArray(function(err,proInfo){
                mongodb.close();
                return callback(result({
                    err:err,
                    info:proInfo
                }))
            })
        })
    })
};

