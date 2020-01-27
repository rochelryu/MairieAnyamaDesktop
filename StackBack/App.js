let mysql = require('promise-mysql');
let jwt = require('jsonwebtoken');
let express = require('express');
let validator = require('express-validator');
let cors = require('cors');
let morgan = require('morgan');
let config = require('./config');
let bodyParser = require('body-parser');

mysql.createConnection({
    host     : config.db.host,
    port     : config.db.port,
    user     : config.db.user,
    password : config.db.password,
    database : config.db.database
  }).then(db=>{
      const app = express();
      let Admin = express.Router();
      app.use(morgan('dev'));
      app.use(cors());
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      const User =  require('./Models/Users')(db);

      Admin.route('/:tt')
      .get(async(req,res)=>{
          let info = new Map();
          let moment = new Date().getDate();
          let begin;
          switch(1==1){
              case(moment>=1 && moment <= 7):
              begin = 1;
                break;
              case(moment>=8 && moment <= 14):
              begin = 8;
                break;
              case(moment>=15 && moment <= 21):
              begin = 15;
                break;
              case(moment>=22 && moment <= 29):
              begin = 22;
                break;
              default:
                  begin = 1;
                break;
          }
          info.naissanceTotal = await User.getNumberNaissance(req.params.tt);
          info.mariageTotal = Math.round(Math.random()*99);
          info.decesTotal = Math.round(Math.random()*99);
          info.divorceTotal = Math.round(Math.random()*99);
          info.naissanceAnnuel = new Array(Math.round(Math.random()*18), Math.round(Math.random()*19), Math.round(Math.random()*99), Math.round(Math.random()*99), Math.round(Math.random()*99));
          info.mariageAnnuel = new Array(Math.round(Math.random()*18), Math.round(Math.random()*19), Math.round(Math.random()*99), Math.round(Math.random()*99), Math.round(Math.random()*99));
          info.decesAnnuel = new Array(Math.round(Math.random()*18), Math.round(Math.random()*19), Math.round(Math.random()*99), Math.round(Math.random()*99), Math.round(Math.random()*99));
          info.divorceAnnuel = new Array(Math.round(Math.random()*18), Math.round(Math.random()*19), Math.round(Math.random()*99), Math.round(Math.random()*99), Math.round(Math.random()*99));
          info.totalSexeAllTime = new Array(await User.getNumberNaissanceByGenre(req.params.tt, 'masculin'), await User.getNumberNaissanceByGenre(req.params.tt, 'feminin'));
          info.naiss = new Array(Math.round(Math.random()*77), Math.round(Math.random()*77),Math.round(Math.random()*77), Math.round(Math.random()*77), Math.round(Math.random()*77), Math.round(Math.random()*77), Math.round(Math.random()*77));
          info.mar = new Array(Math.round(Math.random()*77), Math.round(Math.random()*77),Math.round(Math.random()*77), Math.round(Math.random()*77), Math.round(Math.random()*77), Math.round(Math.random()*77), Math.round(Math.random()*77));
          info.desc = new Array(Math.round(Math.random()*77), Math.round(Math.random()*77),Math.round(Math.random()*77), Math.round(Math.random()*77), Math.round(Math.random()*77), Math.round(Math.random()*77), Math.round(Math.random()*77));
          info.div = new Array(Math.round(Math.random()*77), Math.round(Math.random()*77),Math.round(Math.random()*77), Math.round(Math.random()*77), Math.round(Math.random()*77), Math.round(Math.random()*77), Math.round(Math.random()*77));
          let userManager = await User.getAllUser(req.params.tt);
          
          for (let i in userManager){
            userManager[i].nombreService = await User.getNumberServiceByUser(req.params.tt,userManager[i].id);
          }
          let cliniqueManage = await User.getNumberServiceByClinique(req.params.tt)
          for(let i in cliniqueManage){
            cliniqueManage[i].nombreHomme = await User.getNumberSexeByClinique(req.params.tt,cliniqueManage[i].id, "masculin");
            cliniqueManage[i].nombreFemme = await User.getNumberSexeByClinique(req.params.tt,cliniqueManage[i].id, "feminin");
          }
          info.userManager = userManager;
          info.cliniqueManage = cliniqueManage;
          let inter = [];
          for(let i = 0; i < 7; i++){
              inter = [...inter, begin + i];
          }
          info.interval = inter;
          res.json({info:info});
      });

Admin.route('/login')
      .post( async (req,res) => {
        const beta = await User.userExist(req.body.name,req.body.password);
        res.json(beta);
      });

      Admin.route('/createAdmin')
      .post( async (req,res)=>{
        console.log(req.body);
        const beta = await User.setUser(req.body.pseudo,req.body.name,req.body.firstname,req.body.prefix+req.body.phone,req.body.email,req.body.password,req.body.address,req.body.agreement,req.body.token);
        res.json(beta);
      });

      Admin.route('/etablissements/:tt')
      .get(async (req,res)=>{
        const etablissement = await User.getAllEtablissement(req.params.tt);
        res.json({etablissement:etablissement});
      });
      Admin.route('/naissance/:tt')
      .get(async (req,res)=>{
        const naiss = await User.getAllNaissance(req.params.tt);
        res.json({naiss:naiss});
      });
      Admin.route('/extrait')
      .post(async (req, res)=>{
        const naiss = await User.getNaissanceById(req.body.tt,req.body.ite);
        let mariage = await User.getMariageByName(req.body.tt,`${naiss.nameEnfant} ${naiss.firstnameEnfant}`);
        let decess = await User.getDecesByName(req.body.tt,`${naiss.nameEnfant} ${naiss.firstnameEnfant}`);
        mariage = mariage ? mariage : {nameFirst:"", nameSecond:"",verbe:"",status:4,dateMariage:"N/A", registerDate:""};
        res.json({info:naiss, mariage , decess});
      });

      Admin.route('/etabliss')
      .post( async (req,res)=>{

        const beta = await User.setEtablissement(req.body.name, req.body.tt);
        const etablissement = await User.getAllEtablissement(req.body.tt);
        res.json({etablissement:etablissement});
      });
      Admin.route('/naissance')
      .post( async (req,res)=>{
        const item = req.body.item;
        const tt = req.body.tt;
        const {Circonscription, centre, numeroAccouche, sousigne, accoucheDate, accoucheDateTwo, accoucheDateThree, accoucheTime, accoucheTimeTwo, accoucheTimeThree, sexe, checked, nameEnfant, firstNameEnfant, namePere, datePere, lieuPere, lieuMere, contactMere, contactPere, professionPere, professionMere, domicileMere, domicilePere, nationMere, nationPere, dateMere, nameMere, faitAt, eta, titreMere, titrePere, dateInLetter} = item;
        const create = await User.setNaissance(tt,Circonscription, centre, numeroAccouche, sousigne, accoucheDate, accoucheDateTwo, accoucheDateThree, accoucheTime, accoucheTimeTwo, accoucheTimeThree, sexe, checked, nameEnfant, firstNameEnfant, namePere, datePere, lieuPere, lieuMere, contactMere, contactPere, professionPere, professionMere, domicileMere, domicilePere, nationMere, nationPere, dateMere, nameMere, faitAt, eta, titreMere, titrePere, dateInLetter)
        res.json(create)
      });

      app.use('/ryu', Admin);

      app.listen(config.port, ()=>console.log("yes"));
  }).catch(e=>{
      throw e;
    });