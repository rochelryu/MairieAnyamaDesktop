
import React from "react";

import { Card, CardHeader, CardBody, CardTitle, Row, Col} from "reactstrap";
import NotificationAlert from "react-notification-alert";

import { Form, Input, Select, DatePicker, TimePicker, Radio, Checkbox, Button} from 'antd';
import 'antd/dist/antd.css';

import { bool } from "prop-types";
import { etablissement, setNaissance } from "../providers/index";



const { Option } = Select;

const format = 'HH:mm';





const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 1  },
};

const formItemLayouts = {
  labelCol: { span: 13 },
  wrapperCol: { span: 11 },
};


class Icons extends React.Component {
  constructor(props){
    super(props)
    this.state={
      loading: false,
      etablissement:[],
      Circonscription:'',
      centre:'',
      numeroAccouche:'',
      sousigne:'',
      accoucheDate:'',
      accoucheDateTwo:'',
      accoucheDateThree:'',
      accoucheTime:'',
      accoucheTimeTwo:'',
      accoucheTimeThree:'',
      sexe:'',
      checked:true,
      nameEnfant:'',
      firstNameEnfant:'',
      namePere:'',
      datePere:'',
      lieuPere:'',
      lieuMere:'',
      contactMere:'',
      contactPere:'',
      professionPere:'',
      professionMere:'',
      domicileMere:'',
      domicilePere:'',
      nationMere:'',
      nationPere:'',
      dateMere:'',
      nameMere:'',
      eta:'',
      faitAt:'',
      titreMere:'',
      titrePere:'',

    }
  }

  onChangeEta(value) {
    this.setState({
      eta:value,
    })
  }

  edit(e){
    this.setState({
      [e.target.name]:e.target.value,
    })
  }
  onChangeAccouch(value, valueString){
    
    this.setState({
      accoucheDate:new Date(valueString)
    })
  }
  onChangeAccouchTwo(value, valueString){
    
    this.setState({
      accoucheDateTwo:new Date(valueString)
    })
  }

  onMakeAt(value, valueString){
    
    this.setState({
      faitAt:new Date(valueString)
    })
  }

  onDatePere(value, valueString){
    
    this.setState({
      datePere:new Date(valueString)
    })
  }
  onDateMere(value, valueString){
    
    this.setState({
      dateMere:new Date(valueString)
    })
  }

  onChangeTimeAccouch(value, valueString){
    console.log(valueString);
    
    this.setState({
      accoucheTime:valueString
    })
  }
  onChangeTimeAccouchTwo(value, valueString){
    console.log(valueString);
    
    this.setState({
      accoucheTime:valueString
    })
  }

  onChangeTimeAccouchThree(value, valueString){
    console.log(valueString);
    
    this.setState({
      accoucheTime:valueString
    })
  }

  onChangeAccouchThree(value, valueString){
    console.log(valueString);
    
    this.setState({
      accoucheDateThree:new Date(valueString)
    })
  }

  onChangeVivant = e => {
    this.setState({
      checked: e.target.checked,
    });
  };

  async componentDidMount(){
    const token =  await localStorage.getItem("tokenCore");
    const block = await etablissement(token);
    this.setState({
      etablissement:block
    })
  }

  notificationAlert = React.createRef();
  notify(color) {
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
            <p><b> Succès </b> - Enregistrement effectué.</p>
          </div>
        </div>
      ):(
        <div>
          <div>
            <p><b> Echec </b> - Veillez ressayer une autre fois.</p>
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7
    };
    this.notificationAlert.current.notificationAlert(options);
    
  }

  async send(){
    this.setState({loading: !this.state.loading});
    const meta = await setNaissance(this.state, localStorage.getItem('tokenCore'))
    if(meta.etat){
      this.notify(1)
      this.setState({
        Circonscription:'',
      centre:'',
      numeroAccouche:'',
      sousigne:'',
      accoucheDate:'',
      accoucheDateTwo:'',
      accoucheDateThree:'',
      accoucheTime:'',
      accoucheTimeTwo:'',
      accoucheTimeThree:'',
      sexe:'',
      checked:true,
      nameEnfant:'',
      firstNameEnfant:'',
      namePere:'',
      datePere:'',
      lieuPere:'',
      lieuMere:'',
      contactMere:'',
      contactPere:'',
      professionPere:'',
      professionMere:'',
      domicileMere:'',
      domicilePere:'',
      nationMere:'',
      nationPere:'',
      dateMere:'',
      nameMere:'',
      eta:'',
      faitAt:'',
      titreMere:'',
      titrePere:'',
      dateInLetter:'',
        loading: false
      });
    }
    else {
      this.notify(3)
    setTimeout(()=>{
      this.setState({loading: !this.state.loading});
    },1500)
    }
    
  }
  render() {
   
    return (
      <>
        <div className="content">
        <NotificationAlert ref={this.notificationAlert} />
        <Form onSubmit={this.handleSubmit}>
          
            <Row>
              <Col md="12">
                <Card className="demo-icons">
                  <CardHeader>
                  <h3>Enregistrement des Naissances</h3>
                  
                  </CardHeader>
                  <CardBody>
                    <div>
                      <Form.Item label="Formation sanitaire" {...formItemLayout}>
                      <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Selectionné une clinique"
                      optionFilterProp="children"
                      onChange={(value)=>this.onChangeEta(value)}
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                    {this.state.etablissement.map(value=><Option key={value.id} value={value.id}>{ value.name }</Option>)}
                    </Select>
                      </Form.Item>
                      <Form.Item label="Circonscription d'Etat" {...formItemLayout}>
                        <Input placeholder="entrez Circonscription" onChange={(e)=>this.edit(e)} name="Circonscription" />
                      </Form.Item>
                      <Form.Item label="Centre d'Etat Civil" {...formItemLayout}>
                        <Input placeholder="entrez un centre" name="centre" onChange={(e)=>this.edit(e)} />
                      </Form.Item>
                    </div>
                  </CardBody>
                
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <Card className="demo-icons">

                  <CardBody>

                      <div>
                        <Form.Item label="N Accouchement" {...formItemLayout}>
                          <Input name="numeroAccouche" onChange={(e)=>this.edit(e)} />
                        </Form.Item>
                        <Form.Item label="Je sousigné" {...formItemLayout}>
                          <Input placeholder="ex: Mme John Doé, Sage-Femme Diplomée d'état" name="sousigne" onChange={(e)=>this.edit(e)} />
                        </Form.Item>
                        <Row>
                          <Col md="4">
                            <Form.Item label="Certifie avoir accouché le" {...formItemLayouts}>
                              <DatePicker placeholder={new Date().toLocaleDateString()} onChange={(value, valueString)=>this.onChangeAccouch(value,valueString)} />
                              <Input placeholder="La date en Lettre" name="dateInLetter" onChange={(e)=>this.edit(e)} />
                            </Form.Item>
                          </Col>
                          <Col md="4">
                            <Form.Item label="à" {...formItemLayouts}>
                            <TimePicker placeholder={new Date().getHours()+':'+new Date().getMinutes()} onChange={(value, valueString)=>this.onChangeTimeAccouch(value,valueString)}  format={format} />
                            </Form.Item>
                          </Col>
                          <Col md="4">
                            <Form.Item label=" et reçu le " {...formItemLayouts}>
                              <DatePicker placeholder={new Date().toLocaleDateString()} onChange={(value, valueString)=>this.onChangeAccouchTwo(value,valueString)}  />
                            </Form.Item>
                          </Col>
                          <Col md="4">
                            <Form.Item label="à" {...formItemLayouts}>
                              <TimePicker placeholder={new Date().getHours()+':'+new Date().getMinutes()} onChange={(value, valueString)=>this.onChangeTimeAccouchTwo(value,valueString)}  format={format} />
                            </Form.Item>
                          </Col>
                          <Col md="4">
                            <Form.Item label="un enfant qui serait né le " {...formItemLayouts}>
                              <DatePicker placeholder={new Date().toLocaleDateString()} onChange={(value, valueString)=>this.onChangeAccouchThree(value,valueString)} />
                            </Form.Item>
                          </Col>
                          <Col md="4">
                            <Form.Item label="à" {...formItemLayouts}>
                              <TimePicker placeholder={new Date().getHours()+':'+new Date().getMinutes()} onChange={(value, valueString)=>this.onChangeTimeAccouchThree(value,valueString)}  format={format} />
                            </Form.Item>
                          </Col>
                        </Row>
                      <p>Présentant les caractéristiques suivantes:</p>
                      <Row>
                        <Col md="6">
                        <Form.Item label="Sexe" {...formItemLayouts}>
                        <Radio.Group buttonStyle="solid" name="sexe" onChange={(e)=>this.edit(e)}>
                          <Radio.Button value="masculin">Masculin</Radio.Button>
                          <Radio.Button value="feminin">Feminin</Radio.Button>
                        </Radio.Group>
                        </Form.Item>
                        </Col>
                        <Col md="3">
                        <Form.Item label="Etat de vie" {...formItemLayouts}>
                        <Checkbox  onChange={this.onChangeVivant} checked={this.state.checked}> Vivant</Checkbox>
                        </Form.Item>
                        </Col>
                      </Row>
                      </div>
                    
                  </CardBody>
                
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <Card className="demo-icons">
                <CardBody>
                    <CardTitle tag="h5">Enfant</CardTitle>
                    <Form.Item label="Nom" {...formItemLayout}>
                        <Input placeholder="entrez un nom" name="nameEnfant" onChange={(e)=>this.edit(e)} />
                    </Form.Item>
                    <Form.Item label="Prénoms" {...formItemLayout}>
                        <Input placeholder="Entrer un prénom" name="firstNameEnfant"  onChange={(e)=>this.edit(e)}/>
                    </Form.Item>

                    <CardTitle tag="h5">Père</CardTitle>
                    <Form.Item label="Nom et prénoms" {...formItemLayout}>
                        <Input placeholder="entrez un nom et prénoms" name="namePere"  onChange={(e)=>this.edit(e)} />
                    </Form.Item>
                    <Form.Item label="Date et Lieu de naissance" {...formItemLayout}>
                        <DatePicker placeholder="la date de naissance" onChange={(value, valueString)=>this.onDatePere(value,valueString)}  />
                        <Input placeholder="le lieu de naissance" name="lieuPere"  onChange={(e)=>this.edit(e)} />
                    </Form.Item>
                    <Form.Item label="Profession" {...formItemLayout}>
                        <Input placeholder="entrez une profession" name="professionPere"  onChange={(e)=>this.edit(e)} />
                    </Form.Item>
                    <Form.Item label="Domicile" {...formItemLayout}>
                        <Input placeholder="entrez un domicile" name="domicilePere"  onChange={(e)=>this.edit(e)} />
                    </Form.Item>
                    <Form.Item label="Nationalité" {...formItemLayout}>
                        <Input placeholder="entrez une Nationalité" name="nationPere"  onChange={(e)=>this.edit(e)}/>
                    </Form.Item>
                    <Form.Item label="Type d'identité" {...formItemLayout}>
                        <Input placeholder="Extrait d'acte de naissance" name="titrePere"  onChange={(e)=>this.edit(e)} />
                    </Form.Item>
                    <Form.Item label="Contact(s) téléphonique(s)" {...formItemLayout}>
                        <Input placeholder="xxxxxxxx/xxxxxxxx" name="contactPere"  onChange={(e)=>this.edit(e)}/>
                    </Form.Item>
                    <CardTitle tag="h5">Mère</CardTitle>

                    <Form.Item label="Nom et prénoms" {...formItemLayout}>
                        <Input placeholder="entrez un nom et prénoms" name="nameMere"  onChange={(e)=>this.edit(e)}/>
                    </Form.Item>
                    <Form.Item label="Date et Lieu de naissance" {...formItemLayout}>
                        <DatePicker placeholder="la date de naissance" onChange={(value, valueString)=>this.onDateMere(value,valueString)}  />
                        <Input placeholder="le lieu de naissance" name="lieuMere"  onChange={(e)=>this.edit(e)}/>
                    </Form.Item>
                    <Form.Item label="Profession" {...formItemLayout}>
                        <Input placeholder="entrez une profession" name="professionMere"  onChange={(e)=>this.edit(e)}/>
                    </Form.Item>
                    <Form.Item label="Domicile" {...formItemLayout}>
                        <Input placeholder="entrez un domicile" name="domicileMere"  onChange={(e)=>this.edit(e)} />
                    </Form.Item>
                    <Form.Item label="Nationalité" {...formItemLayout}>
                        <Input placeholder="entrez une Nationalité" name="nationMere"  onChange={(e)=>this.edit(e)} />
                    </Form.Item>
                    <Form.Item label="Type d'identité" {...formItemLayout}>
                        <Input placeholder="Extrait d'acte de naissance" name="titreMere"  onChange={(e)=>this.edit(e)} />
                    </Form.Item>
                    <Form.Item label="Contact(s) téléphonique(s)" {...formItemLayout}>
                        <Input placeholder="xxxxxxxx/xxxxxxxx" name="contactMere"  onChange={(e)=>this.edit(e)} />
                    </Form.Item>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <div className="pd-30">
            <Row>
              <Col md="6">
                <Form.Item label="Fait à" {...formItemLayout}>
                      <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Selectionné une clinique"
                      optionFilterProp="children"
                      onChange={(value)=>this.onChangeEta(value)}
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                                          {this.state.etablissement.map(value=><Option key={value.id} value={value.id}>{ value.name }</Option>)}
                    </Select>
                      </Form.Item>
              </Col>
              <Col md="4">
                <Form.Item label="le" {...formItemLayout}>
                  <DatePicker placeholder={new Date().toLocaleDateString()} onChange={(value, valueString)=> this.onMakeAt(value, valueString)} />
                </Form.Item>
              </Col>
              <Col md="2">
              <Button type="primary" icon="download" loading={this.state.loading} onClick={()=>this.send()}>
                Enregistrer
              </Button>
              </Col>
            </Row>
          
            </div>
        </Form>
        </div>
        
      </>
    );
  }
}

Icons.propTypes = {
  loading:bool
};

export default Icons;
