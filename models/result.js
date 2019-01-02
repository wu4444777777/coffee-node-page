function Result(result){
    var myResult = new Object();
    myResult.err = result.err;
    myResult.error = result.error;
    myResult.info = result.info;
    myResult.isSuccess = result.isSuccess;
    return myResult;
}
module.exports = Result;