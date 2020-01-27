const bcrypt = require('bcrypt');

const saltRounds = 10;

function hash(password){
    return new Promise( async next=>{
        await bcrypt.hash(password, saltRounds)
        .then(hash => {
            next(hash);
        })
        .catch(err => {
            next(err);
        });
    });
}
function compare(newPass, hashPass){
    return new Promise(async next=>{
        await bcrypt.compare(newPass, hashPass).then(res => {
            next(res);
        })
        .catch(err=>next(err));
    });
}

module.exports = {
    hash,
    compare,
}