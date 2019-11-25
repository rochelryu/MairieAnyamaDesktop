
import React from "react";

import { Form, Input, Button, Spin, Table, Modal} from "antd";
import { naissance, viewExtrait } from "../providers/index";
import ReactToPrint from "react-to-print";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";
const Monthss = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
class ExtraitImprime extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      info:{}
    }
  }

  async componentWillMount(){
    const id = this.props.id;

    const block = await viewExtrait(localStorage.getItem("tokenCore"),id);
    this.setState({
      info:block.info,
    });
  }

  async componentDidUpdate(){
    const id = this.props.id;

    const block = await viewExtrait(localStorage.getItem("tokenCore"),id);
    this.setState({
      info:block.info,
    });
  }
  


   render(){
    
    return(
      <>
        <div className="extrait">
          <div className="roww">
            <div className="flex4">
              <div className="flexx">
                <h3>COMMUNE D'ANYAMA</h3>
                <img
                    alt="..."
                    src={require("assets/img/log.jpeg")}
                  />
                  <h2>ETAT CIVIL</h2>
                  <hr size="5" width="90"/>
              </div>
            </div>
            <div className="flex8">
              <div className="flexx">
                  <h3>REPUBLIQUE DE CÔTE D'IVOIRE</h3>
                    <h1>EXTRAIT</h1>
                    <h3>du Registre des Actes de L'Etat Civil <br/> Pour l'Année <span>{new Date(this.state.info.dateAccouche).getFullYear()}</span></h3>
              </div>
              
            </div>
          </div>
          <div className="roww">
            <div className="flex4">
            <div className="flexx">
            <h1>MAIRIE D'ANYAMA</h1>
                  <h3>Nº {this.state.info.id} du {new Date(this.state.info.register_date).toLocaleDateString()} du registre</h3>
                  <hr size="5" width="90"/>
                  <p>NAISSANCE DE <br/> {this.state.info.nameEnfant} <br/> {this.state.info.firstnameEnfant}</p>

                  <hr size="15" width="90"/>
                  <p>H-D <br/> Loi Nº 86-1357 du 15/12/86</p>
              </div>
            </div>
            <div className="flex8">
              <div className="flexxx">
                  <p>{this.state.info.dateInLetter} <br/> est {(this.state.info.sexe ==="masculin")? "né":"née"} {this.state.info.nameEnfant} - {this.state.info.firstnameEnfant} <br/> à {this.state.info.circonscrit} <br/> <span>Fils de</span> {this.state.info.namePapa}<br/><hr size="5" width="180"/><br/> <span>et de</span>{this.state.info.nameMaman}</p>
              </div>
              
            </div>
          </div>
          <hr className="dernier" size="10"/>
          <div className="Mention">
            <h2>MENTIONS (Eventuellement)</h2>
            <p>**********Néant**********</p>
          </div>
          <p>Certifié le présent extrait conforme aux indications portées au registre</p>

          <div className="bott">
            <div className="timbre">
              <p>Timbre fiscal</p>
            </div>
            <p>Sceau</p>
            <div className="deli">
              <p>Délivré à {this.state.info.centre}, le {new Date().getDate()} {Monthss[new Date().getMonth()]} {new Date().getFullYear()} <br/> L'officier de l'Etat Civil <br/> (Signature)</p>
            </div>
          </div>
        </div>
      </>
    )
  }
}

class Tables extends React.Component {
  constructor(props){
    super(props)
    this.state={
      modal1Visible: false,
      loading: false,
      isLoading:true,
      choice:0,
      info:[],
      name:"",
      userManage:[],
    sortedInfo: null,
    }
    
  }

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }
  prints(e){
    this.setState({
      choice:e
    })
    this.setModal1Visible(true);
    //window.open(`${uriFront}print/${e}`, '_bank');
  }

  handleChange(value){
    console.log(value)
  }

  async componentDidMount(){
    const token =  await localStorage.getItem("tokenCore");
    const block = await naissance(token);
    const blocks = block.map((value)=>{
      return {
      id: value.id,
      nameEnfant: value.nameEnfant,
      firstnameEnfant: value.firstnameEnfant,
      sexe: value.sexe,
      namePapa: value.namePapa,
      nameMaman: value.nameMaman,
      register_date: value.register_date.replace(/T/gi, '').substring(0,10),
      action: <Button type="primary" icon="printer" onClick={()=>this.prints(value.id)}>Imprimer</Button>
      }

    })
    this.setState({
      info:block,
      isLoading:false,
      userManage:blocks
    });
  }
  render() {
    if(!this.state.isLoading){
      let { sortedInfo } = this.state;
      sortedInfo = sortedInfo || {};
      const columns = [
        {
          title: 'Nº Extrait',
          dataIndex: 'id',
          key: 'id',
          sorter: (a, b) => a.id.length - b.id.length,
          sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
          ellipsis: true,
        },
        {
          title: 'Nom',
          dataIndex: 'nameEnfant',
          key: 'nameEnfant',
          sorter: (a, b) => a.nameEnfant.length - b.nameEnfant.length,
          sortOrder: sortedInfo.columnKey === 'nameEnfant' && sortedInfo.order,
          ellipsis: true,
        },
        {
          title: 'Prénom',
          dataIndex: 'firstnameEnfant',
          key: 'firstnameEnfant',
          sorter: (a, b) => a.firstnameEnfant.length - b.firstnameEnfant.length,
          sortOrder: sortedInfo.columnKey === 'firstnameEnfant' && sortedInfo.order,
          ellipsis: true,
        },{
          title: 'Sexe',
          dataIndex: 'sexe',
          key: 'sexe',
          sorter: (a, b) => a.sexe.length - b.sexe.length,
          sortOrder: sortedInfo.columnKey === 'sexe' && sortedInfo.order,
          ellipsis: true,
        },{
          title: 'Nom Père',
          dataIndex: 'namePapa',
          key: 'namePapa',
          sorter: (a, b) => a.namePapa.length - b.namePapa.length,
          sortOrder: sortedInfo.columnKey === 'namePapa' && sortedInfo.order,
          ellipsis: true,
        },{
          title: 'Nom Mère',
          dataIndex: 'nameMaman',
          key: 'nameMaman',
          sorter: (a, b) => a.nameMaman.length - b.nameMaman.length,
          sortOrder: sortedInfo.columnKey === 'nameMaman' && sortedInfo.order,
          ellipsis: true,
        },
        {
          title: 'Date enregistrement',
          dataIndex: 'register_date',
          key: 'register_date',
          sorter: (a, b) => a.register_date.length - b.register_date.length,
          sortOrder: sortedInfo.columnKey === 'register_date' && sortedInfo.order,
          ellipsis: true,
        },
        
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          ellipsis: true,
        },
      ];
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Liste des Actes</CardTitle>
                </CardHeader>
                <CardBody>
                
                <Table columns={columns} dataSource={this.state.userManage} />
                </CardBody>
              </Card>
            </Col>
            
            <Modal
          style={{marginTop:70}}
          width={800}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
          footer={[

          ]}
        >
          <ReactToPrint
          trigger={() => <Button type="primary" icon="printer" >Imprimer</Button>}
          content={() => this.componentRef}
        />
        <ExtraitImprime id={this.state.choice} ref={el => (this.componentRef = el)} />
        </Modal>
          </Row>
        </div>
      </>
    );
    }
    else{
      return (
        <div className="content">
          <div className="flex">
            <Spin size="large" />
          </div>
        </div>
     );
    }
  }
}

export default Tables;
