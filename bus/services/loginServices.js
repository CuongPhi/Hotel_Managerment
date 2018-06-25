const fs =require('fs');
var list_Account = JSON.parse(fs.readFileSync(__dirname + '/account.json','utf-8'));
var session=[];

function checkAuth(key){
    console.log(session)
    for(var i = 0; i < session.length; i++){
        if(key == session[i].key){
            return session[i].type;
        }
    }
    return -1;
}

function deleteSession(key){
    for(var i = 0; i < session.length; i++){
        if(key == session[i].key){
            session.splice(i,1);
            console.log('Xoa session  ---> OK')
            return true;
        }
    }
    return false;
}
function addToSession(obj){
    session.push(obj)
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
    getLenght:getLenght,
    deleteSession:deleteSession
}