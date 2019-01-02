var mongodb = require('./db');//引入db.js，就是引入数据库
function Test(test){//匿名函数，var test= new Test()
    //这个test就是这个匿名函数
    //根据数据库的名字以及值来定义该匿名函数
    // 函数名与数据库集合名字一致，就是Test
    this.id = test.id;
    this.name = test.name;
    this.age = test.age;
    this.email = test.email;
    this.skip = test.skip;
    this.limit = 4;//数量自己决定
}
//公开Test这个函数
module.exports = Test;

//Test.findOne findOne是Test函数调用的匿名函数
Test.findOne = function(test,callback){
    //第一个参数test对象是查询条件,mongodb是第一句所声明的
    //第二个参数是回调函数
    mongodb.open(function(err,db){
        if(err) {
            callback(err);
        }
        //test是集合名称
        //通过db连接集合，db方法的第一个参数是集合名称，第二个参数是一个回调函数
        db.collection('test',function(err,collection){
            if(err){
                mongodb.close();
                callback(err);
            }
            // findOne方法，第一个参数是查询条件，第二个是回调函数
            collection.findOne({
                //此处的test是路由传的，同时name和email是要与数据库保持一致
                name:test.name,
                email:test.email
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

Test.insertOne = function(test,callback){
    mongodb.open(function(err,db){
        if(err) {
            return callback(err);
        }
        //test是集合名称
        //通过db连接集合，db方法的第一个参数是集合名称，第二个参数是一个回调函数
        db.collection('test',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            // findOne方法，第一个参数是查询条件，第二个是回调函数
            collection.insertOne({
                //此处的test是路由传的，同时name和email是要与数据库保持一致
                name : test.name,
                email : test.email,
                age : test.age
                //这里相当于collection.findOne({"name":"1111","email":"22222"},function(err,test))
            },function(err,result){
                //这里的test是自己定义的，这里是查询结果，返回的数据就是test
                mongodb.close();
                // if(test) {
                //     callback(null,test);
                //     return;
                // }
                if(err)
                    return callback(err);
            })
        })
    })
};

Test.insertMany = function(testArray,callback){
    mongodb.open(function(err,db){
        if(err) {
            return callback(err);
        }
        db.collection('test',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            var insertArray = new Array();
            for(var i in testArray){
                insertArray.push({
                    name:testArray[i].name,
                    email:testArray[i].email,
                    age:testArray[i].age
                });
            }
            collection.insertMany(insertArray,function(err,insertNumber){
                mongodb.close();
                if(err)
                    return callback(err);
            })
        })
    })
};

Test.findAll = function(callback){
    mongodb.open(function(err,db){
        if(err) return callback(err);
        db.collection('test',function(err,collection){
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

Test.findWhere = function(test,callback){
    mongodb.open(function(err,db){
        if(err) return callback(err);
        db.collection('test',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //如果有要查询的对象，就在find({})里加内容
            collection.find({
                name : test.name
            }).toArray(function(err,result){
                mongodb.close();
                if(err) return callback(err);
                return callback(null,result);
            })
        })
    })
};

Test.updateOne = function(where,update,callback){
    mongodb.open(function(err,db){
        if(err) return callback(err);
        db.collection('test',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //如果有要查询的对象，就在find({})里加内容
            collection.updateOne({
                name : where.name
            },{
                name:update.name
            },function(err,result){
                mongodb.close();
                if(err) return callback(err);
                return callback(null,result);
            })
        })
    })
};

//db.集合.update(where,update,(如果没有查到数据，是否插入新值，是否修改多条数据，错误类型)
Test.updateMany = function(where,update,callback){
    mongodb.open(function(err,db){
        if(err) return callback(err);
        db.collection('test',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //如果有要查询的对象，就在find({})里加内容
            collection.updateMany({
                name : where.name
            },{
                $set:{
                    name:update.name
                }
            },function(err,result){
                mongodb.close();
                if(err) return callback(err);
                return callback(null,result);
            })
        })
    })
};

Test.deleteOne = function(where,update,callback){
    mongodb.open(function(err,db){
        if(err) return callback(err);
        db.collection('test',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //如果有要查询的对象，就在find({})里加内容
            collection.deleteOne({
                //where最好是对象，便于处理
                name : where.name,
                email:where.name
            },function(err,result){
                mongodb.close();
                if(err) return callback(err);
                return callback(null,result);
            })
        })
    })
};

//排序
Test.findSort = function(callback){
    mongodb.open(function(err,db){
        if(err) return callback(err);
        db.collection('test',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //如果有要查询的对象，就在find({})里加内容
            collection.find().sort({age:1}).toArray(function(err,result){
                // mongodb.close();
                // if(err) return callback(err);
                // return callback(null,result);
                console.log(result);
            })
        })
    })
};

//分页
Test.findLimit = function(test,callback){
    mongodb.open(function(err,db){
        if(err) return callback(err);
        db.collection('test',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //如果有要查询的对象，就在find({})里加内容
            collection.find().sort({age:1}).skip(test.skip).limit(test.limit).toArray(function(err,result){
                console.log(result);
            })
        })
    });
};
    //合并
Test.lookup = function(callback){
    mongodb.open(function(err,db){
        if(err) return callback(err);
        db.collection('order').aggregate([{
            $lookup:{
                from:'pro',
                localField:'pro _id',
                foreignField:'id',
                as:'orderdetails'
            }
        }]).toArray(function(err,result){
            console.log(result);
        })
    })
};

Test.drop = function(){
    mongodb.open(function(err,db){
        if(err) return callback(err);
        db.collection('test').drop(function(err){

        })
    })
};

// Content.findOne = function(content,callback){
//     mongodb.open(function(err,db){
//         if(err){
//             callback(err);
//         }
//         db.collection('content',function(err,collection){
//             if(err){
//                 mongodb.close();
//                 callback(err);
//             }
//             collection.findOne({
//                 id : content.id
//                 // name : content.name,
//                 // image : content.image,
//                 // price : content.price,
//                 // birthplace : content.birthplace,
//                 // deadline : content.deadline,
//                 // series : content.series,
//                 // image1 : content.image1,
//                 // image2 : content.image2,
//                 // image3 : content.image3
//             },function(err,result){
//                 mongodb.close();
//                 if(err) return callback(err);
//                 return callback(null,result);
//             })
//         })
//     })
// };
//
// Content.findAll = function(callback){
//     mongodb.open(function(err,db){
//         if(err) return callback(err);
//         db.collection('content',function(err,collection){
//             if(err){
//                 mongodb.close();
//                 return callback(err);
//             }
//             //如果有要查询的对象，就在find({})里加内容
//             collection.find({}).toArray(function(err,result){
//                 mongodb.close();
//                 if(err) return callback(err);
//                 return callback(null,result);
//             })
//         })
//     })
// };

// Content.findPage = function(skip,callback){
//     mongodb.open(function(err,db){
//         if(err) return callback(err);
//         db.collection('cart',function(err,collection){
//             if(err){
//                 mongodb.close();
//                 return callback(result({err:err}));
//             }
//             collection.find({}).sort().skip(parseInt(skip)).limit(1).toArray(function(err,proInfo){
//                 mongodb.close();
//                 return callback(result({
//                     err:err,
//                     info:proInfo
//                 }))
//             })
//         })
//     })
// };

