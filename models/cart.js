var mongodb = require('./db');
var result = require('./result');

function Cart(cart){
    this.id = cart.id;
    this.name = cart.name;
    this.image = cart.image;
    this.price = cart.price;
    this.num = cart.num;
}
module.exports = Cart;

Cart.insertOne = function(cart,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('cart',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.insertOne({
                id:cart.id,
                image:cart.image,
                name:cart.name,
                price:cart.price,
                num:cart.num
            },function(err,result){
                mongodb.close();
                if(err)
                    return callback(err);
            })
        })
    })
};
Cart.findAll = function(callback){
    mongodb.open(function(err,db){
        if(err) return callback(err);
        db.collection('cart',function(err,collection){
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
Cart.findWhere = function(cart,callback){
    mongodb.open(function(err,db){
        if(err) return callback(err);
        db.collection('cart',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.find({
                id:cart.id
            }).toArray(function(err,result){
                mongodb.close();
                if(err) return callback(err);
                return callback(null,result);
            })
        })
    })
};
Cart.deleteMany = function(where,callback){
    mongodb.open(function(err,db){
        if(err) return callback(err);
        db.collection('cart',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //如果有要查询的对象，就在find({})里加内容
            collection.deleteMany({
                //where最好是对象，便于处理
                // name : where.name
            },function(err,result){
                mongodb.close();
                if(err) return callback(err);
                return callback(null,result);
            })
        })
    })
};
Cart.deleteOne = function(where,callback){
    mongodb.open(function(err,db){
        if(err) return callback(err);
        db.collection('cart',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //如果有要查询的对象，就在find({})里加内容
            collection.deleteOne({
                //where最好是对象，便于处理
                name : where.name
            },function(err,result){
                mongodb.close();
                if(err) return callback(err);
                return callback(null,result);
            })
        })
    })
};
Cart.distinct = function(cart,callback){
    mongodb.open(function(err,db) {
        if (err)
            return callback(result({
                err: err,
                isSuccess: 0
            }));
        db.collection('cart', function (er, collection) {
            if (err) {
                mongodb.close();
                return callback(result({
                    err: err,
                    isSuccess: 0
                }));
            }
            collection.findOne({
                name: cart.name
            }, function (err, numResult) {
                if (numResult != null) {
                    mongodb.close();
                    return callback(result({
                        err: "该商品已在购物车中",
                        isSuccess: 0
                    }));
                }
                collection.insertOne({
                    id: cart.id,
                    name: cart.name,
                    image: cart.image,
                    price: cart.price,
                    num: cart.num
                }, function (err, info) {
                    mongodb.close();
                    return callback(result({
                        err: err,
                        info: info,
                        isSuccess: err == null && info.insertedCount == 1 ? 1 : 0
                    }))
                })
            })
        })
    })
}