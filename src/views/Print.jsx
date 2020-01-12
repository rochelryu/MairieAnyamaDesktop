import React from 'react';
import { Link } from "react-router-dom";
import { Spin } from 'antd';
import 'antd/dist/antd.css';

import "../assets/css/style.css";

const Tcheck = (props)=>{
    if(props.etat){
        return(
            <Spin size="large" />
        );
    }
    else{
        return(
            <input type="submit" onClick={(e)=>props.submit(e)} value="Connexion"/>
        );
    }
}
class Print extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            Name:"",
            Password:"",
            isLoading:false,
        }
        
    }

    notificationAlert = React.createRef();
  notify(color, name) {
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: "tr",
      message: (type !== "danger") ? (
        <div>
          <div>
            <p><b> Succès </b> - Heureux de vous voir {name}</p>
          </div>
        </div>
      ):(
        <div>
          <div>
            <p><b> Echec </b> - Veillez verifier vos coordonnés</p>
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7
    };
    this.notificationAlert.current.notificationAlert(options);
  }
  // async componentWillMount(){
  //   let {handle} = this.props.match.params;
  //   const handles = handle + '/' + this.props.location.search;
  // }

    edit(e){
        this.setState(
            {
                [e.target.name]:e.target.value
            }
        )
    }




    render(){
        return(
            <>
                <div className="login">
                    <h1>Mairie Anyama</h1>
                    <div className="sub-main-w3">
                        <form action="#" method="post">
                            <div className="form-style-agile">
                                <label>
                                    Pseudo
                                    <i className="fas fa-user"></i>
                                </label>
                                <input onChange={(e)=>this.edit(e)} placeholder="Pseudo" name="Name" type="text" required=""/>
                            </div>
                            <div className="form-style-agile">
                                <label>
                                    Mot de passe
                                    <i className="fas fa-unlock-alt"></i>
                                </label>
                                <input onChange={(e)=>this.edit(e)} placeholder="Mot de passe" name="Password" type="password" required="" />
                            </div>
                            <div className="wthree-text">
                                <ul>
                                    <li>
                                        <Link to="/forget">Mot de passe oublié?</Link>
                                    </li>
                                </ul>
                            </div>
                            <Tcheck submit={this.submit} etat={this.state.isLoading} />
                        </form>
                    </div>
                    <div className="clear"></div>
                </div>
            </>
        );
    }
}

export default Print;