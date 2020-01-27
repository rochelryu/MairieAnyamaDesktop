import React from 'react';
import { Link } from "react-router-dom";
import { login } from "../providers/index";
import NotificationAlert from "react-notification-alert";
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
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            Name:"",
            Password:"",
            isLoading:false,
        }
        if(localStorage.getItem('tokenCore')){
          this.props.history.push('/admin/dashboard');
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

    edit(e){
        this.setState(
            {
                [e.target.name]:e.target.value
            }
        )
    }

    submit = async (e) => {
        e.preventDefault();
        this.setState({isLoading: !this.state.isLoading});
        const {Name, Password} = this.state;
        if(Name.length > 4 && Password.length > 4){
            const logg = await login(Name,Password);
            console.log(logg.user)
            if(logg.token){
              this.notify(1,logg.user.name + ' ' + logg.user.firstname);
              this.setState({isLoading: false});
              setTimeout(()=>{
                localStorage.setItem("tokenCore", logg.token)
                localStorage.setItem("level", logg.user.nom)
                if (logg.user.nom !== "Agent") {
                  this.props.history.push('/admin/dashboard')
                } else { this.props.history.push('/admin/dash') }
              },1500)

            }
            else{
              this.notify(3,"");
              this.setState({isLoading: false});
            }
            

        }
        else{
            this.notify(3,"");
            this.setState({isLoading: false});
        }
    }




    render(){
        return(
            <>
                <div className="login">
                <NotificationAlert ref={this.notificationAlert} />
                    <h1>Ma Mairie</h1>
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

export default Login;