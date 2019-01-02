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

Content.findWhere = function(content,callback){
    mongodb.open(function(err,db){
        if(err) return callback(err);
        db.collection('content',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.find({
                type:content.type
            }).toArray(function(err,result){
                mongodb.close();
                if(err) return callback(err);
                return callback(null,result);
            })
        })
    })
};

Content.findPage = function(content,skip,callback){
    mongodb.open(function(err,db){
        if(err) return callback(err);
        db.collection('content',function(err,collection){
            if(err){
                mongodb.close();
                return callback(result({err:err}));
            }
            collection.find({
                type:content.type
            }).skip(parseInt(skip)).limit(6).toArray(function(err,proInfo){
                mongodb.close();
                return callback(result({
                    err:err,
                    info:proInfo
                }))
            })
        })
    })
};