import React from "react";
import {
    Row
  } from 'antd';
import { WrappedRegistrationForm } from './RegistrationForm' 

export default class Create extends React.Component {


    render(){
        return(
            <>
                <div className="content">
                    <Row>
                        <WrappedRegistrationForm />
                    </Row>
                </div>
            </>
        )
    }
}