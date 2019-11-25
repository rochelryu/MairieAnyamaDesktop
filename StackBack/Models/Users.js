let db;
const {encode, decode} = require('ent');
let { hash, compare } = require('../Tools/utils');
let jwt = require('jsonwebtoken');
let config = require('../config');


module.exports = (_db) =>{
    db = _db;
    return User;
}
let User = class {

    static userExist(_login,_password){
        return new Promise((next) => {
            db.query("SELECT id, password FROM user WHERE email = ? OR pseudo = ?", [_login, _login])
                .then(async (result) =>{
                    if (result[0] !== undefined){
                        const ele = await compare(_password, result[0].password);
                        if(ele){
                            db.query("UPDATE user SET login_date = NOW() WHERE user.id = ?", [parseInt(result[0].id, 10)])
                            .then((results)=>{
                                db.query("SELECT * FROM user WHERE id = ?", [parseInt(result[0].id, 10)])
                                .then((resultss)=> {
                                        var theToken = jwt.sign({ user : resultss[0].cryptEmail, nom : resultss[0].name, prenom:resultss[0].firstname, id:resultss[0].id}, config.code, {expiresIn: 64 * 60 * 60});
                                        next({'token' : theToken, user:resultss[0]});
                                }).catch((error) => {
                                    next(error)
                                })
                            }).catch((error) =>{ 
                            next(error)});
                        }
                        else{
                            next(new Error("Mauvais mo de passe"))
                        }
                    }
                    else{
                        next(new Error("Identification echoué Veuillez Recommencer"))
                    }
                }).catch((err) => {
                    next(err);
            })
        });
    }

    static setEtablissement(name,token){
        return new Promise(next=>{
            jwt.verify(token, config.code, (err, user)=>{
                if(err) next(err);
                db.query("INSERT INTO Etablissement (name) VALUES(?)", [name])
                .then(res=>next(res))
                .catch(errr=>next(errr));
            })
        })
    }

    static setNaissance(token, Circonscription, centre, numeroAccouche, sousigne, accoucheDate, accoucheDateTwo, accoucheDateThree, accoucheTime, accoucheTimeTwo, accoucheTimeThree, sexe, checked, nameEnfant, firstNameEnfant, namePere, datePere, lieuPere, lieuMere, contactMere, contactPere, professionPere, professionMere, domicileMere, domicilePere, nationMere, nationPere, dateMere, nameMere, faitAt, eta, titreMere, titrePere, dateInLetter){
        return new Promise(next=>{
            jwt.verify(token, config.code, (err, user)=>{
                if(err) next(err);
                db.query("INSERT INTO ActeNaissance (circonscrit,centre,numeroAccouchement,sousigne, dateAccouche, recuLe, dateNe, timeAccouche,recuA, dateA,sexe, vivant, nameEnfant, firstnameEnfant,namePapa,dateNaissancePapa,lieuNassancePapa, lieuNassanceMaman,contactMaman, contactPapa, professionPapa, professionMaman, domicileMaman, domicilePapa, nationnaliteMaman, nationnalitePapa, dateNaissanceMaman, nameMaman, register_date, etablissement_id, titrePapa,titreMaman,user_id, dateInLetter) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?)", [Circonscription, centre, numeroAccouche, sousigne, new Date(accoucheDate), new Date(accoucheDateTwo), new Date(accoucheDateThree), accoucheTime, accoucheTimeTwo, accoucheTimeThree, sexe, checked, nameEnfant, firstNameEnfant, namePere, new Date(datePere), lieuPere, lieuMere, contactMere, contactPere, professionPere, professionMere, domicileMere, domicilePere, nationMere, nationPere, new Date(dateMere), nameMere, new Date(faitAt), eta, titreMere, titrePere, user.id, dateInLetter])
                .then(res=>next({etat:true,info:res}))
                .catch(errr=>next({etat:false,info:errr}));
            })
        })
    }
    static getAllEtablissement(token){
        return new Promise(next=>{
            jwt.verify(token, config.code, (err, user)=>{
                if(err) {
                    console.log(err)
                    next(err)
                }
                else{
                    db.query("SELECT * FROM Etablissement ORDER BY name ASC")
                    .then(res=>{
                        next(res);
                    })
                    .catch(err=>{
                        console.log(err);
                        next(err);
                    });
                }
                })
        });
    }

    static getAllNaissance(token){
        return new Promise(next=>{
            jwt.verify(token, config.code, (err, user)=>{
                if(err) {
                    console.log(err)
                    next(err)
                }
                else{
                    db.query("SELECT * FROM ActeNaissance ORDER BY register_date DESC")
                    .then(res=>{
                        next(res);
                    })
                    .catch(err=>{
                        console.log(err);
                        next(err);
                    });
                }
                })
        });
    }

    static getNaissanceById(token,id){
        return new Promise(next=>{
            jwt.verify(token, config.code, (err, user)=>{
                if(err) {
                    console.log(err)
                    next(err)
                }
                else{
                    db.query("SELECT * FROM ActeNaissance WHERE id = ?", [parseInt(id,10)])
                    .then(res=>{
                        next(res[0]);
                    })
                    .catch(err=>{
                        console.log(err);
                        next(err);
                    });
                }
                })
        });
    }
    static getNumberNaissance(token){
        return new Promise(next=>{
            jwt.verify(token, config.code, (err, user)=>{
                if(err) {
                    console.log(err)
                    next(err)
                }
                else{
                    db.query("SELECT COUNT(id) num FROM ActeNaissance")
                    .then(res=>{
                        next(res[0].num);
                    })
                    .catch(err=>{
                        console.log(err);
                        next(err);
                    });
                }
                })
        });
    }
    static getNumberNaissanceByGenre(token, genre){
        return new Promise(next=>{
            jwt.verify(token, config.code, (err, user)=>{
                if(err) {
                    console.log(err)
                    next(err)
                }
                else{
                    db.query("SELECT COUNT(id) num FROM ActeNaissance WHERE sexe = ?", [genre])
                    .then(res=>{
                        next(res[0].num);
                    })
                    .catch(err=>{
                        console.log(err);
                        next(err);
                    });
                }
                })
        });
    }

    static getAllUser(token){
        return new Promise(next=>{
            jwt.verify(token, config.code, (err, user)=>{
                if(err) next(err);
                    db.query("SELECT id,CONCAT(name,' ', firstname) nom ,contact, CONCAT(DAY(login_date),'/', MONTH(login_date),'/', YEAR(login_date), ' ',HOUR(login_date),'h:', MINUTE(login_date)) login FROM user ORDER BY name ASC")
                    .then(res=>{
                        next(res);
                    })
                    .catch(err=>next(err));
                })
        })
    }

    static getNumberServiceByUser(token,userId){
        let block = [new Array()];
        return new Promise(next=>{
            jwt.verify(token, config.code, (err, user)=>{
                if(err) next(err);
                db.query("SELECT COUNT(id) nombreService FROM ActeNaissance WHERE user_id = ?", [parseInt(userId,10)])
                .then(ress=>{
                    next(ress[0].nombreService)
                }).catch(err=>next(err));
                })
        })
    }
}