const fs =require('fs');
var list_Account = JSON.parse(fs.readFileSync(__dirname + '/account.json','utf-8'));
var session=[];

function checkAuth(key){
    for(var i = 0; i < session.length; i++){
        if(key == session[i]){
            return true
        }
    }
    return false
}
function addToSession(key){
    session.push(key)
}
var getSession =(min,max)=>{
    return Math.floor(Math.random() * (max - min) + min)
}
var isExistAccount = (userName, passWord)=>{
   for (let i in list_Account){
        if(userName === list_Account[i].userName){
            if(passWord ===list_Account[i].passWord)
                return list_Account[i].type;
       }
   }
   return null;
}
 
var getLenght=()=>{
    return session.length;
}
module.exports ={
    isExistAccount: isExistAccount,
    checkAuth:checkAuth,
    getSession:getSession,
    addToSession :addToSession,
    getLenght:getLenght
}