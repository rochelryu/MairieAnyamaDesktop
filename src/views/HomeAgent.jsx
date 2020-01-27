import React from "react";
// import {
//     Row
//   } from 'antd';
import Particles from 'react-particles-js';
import logo from '../assets/img/bg.jpg';
import jwt from 'jwt-decode';
import "../assets/css/style.css";


export default class HomeAgent extends React.Component {
    constructor(props){
        super(props)
        this.name = jwt(localStorage.getItem("tokenCore")).nom;
        this.prenom = jwt(localStorage.getItem("tokenCore")).prenom;
    
      }
    render(){
        const mairie ="à la mairie d'Anyama"
        return(
            <>
                <div className="containerFull">
                    <div className="absoluteCenter" >
                        <div class="sp-container">
                            <div class="sp-content">
                                <div class="sp-globe"></div>
                                <h2 class="frame-1">BIENVENUE</h2>
                                <h2 class="frame-2">{this.name.toUpperCase()} {this.prenom.toUpperCase()}</h2>
                                <h2 class="frame-3">{mairie.toUpperCase()}</h2>
                                <h2 class="frame-4">DEVISE !</h2>
                                <h2 class="frame-5">
                                    <span>UNION,</span>
                                    <span>DISCIPLINE,</span>
                                    <span>TRAVAIL.</span>
                                </h2>
                                
                            </div>
                        </div>
                    </div>
                        <Particles
                            style={{
                                minHeight: '100vh',
                                backgroundImage: `url(${logo})` 
                            }}
                         />
                </div>
            </>
        )
    }
}