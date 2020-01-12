
import React from "react";

import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Form, Input, Button, Spin, Table } from "antd";
import NotificationAlert from "react-notification-alert";
import { etablissement,setEtablissement } from "../providers/index";



const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 8, offset: 1 },
};
class Typography extends React.Component {
  constructor(props){
    super(props)
    this.state={
      loading: false,
      isLoading:true,
      info:[],
      name:"",
      userManage:[],
    sortedInfo: null,
    }
    
  }

  edit(e){
    this.setState({
      [e.target.name]:e.target.value
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
    setTimeout(()=>{
      this.setState({loading: !this.state.loading});
    },1500)
  }
  prints(e){
    console.log(e);
  }

  async componentDidMount(){
    const token =  await localStorage.getItem("tokenCore");
    const block = await etablissement(token);
    if(block.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
      localStorage.removeItem('level'); 
      localStorage.removeItem('tokenCore'); 
      this.props.history.push('/admin/login')
    }
    else {
      const blocks = block.map((value)=>{
        return {
        id: value.id,
        name: value.name,
        register_date: value.register_date.replace(/T/gi, ' à ').substring(0,18),
        action: <Button type="primary" icon="print" onClick={()=>this.prints(value.id)}>Supprimer</Button>
        }
  
      })
      this.setState({
        info:block,
        isLoading:false,
        userManage:blocks
      });
    }
    
  }

  async handleSubmit(){
    if(this.state.name.length > 3){
      this.setState({loading: !this.state.loading});
      const token =  await localStorage.getItem("tokenCore");
      const eta = await setEtablissement(this.state.name, token )
      console.log(eta);
      const blocks = eta.etablissement.map((value)=>{
        return {
        id: value.id,
        name: value.name,
        register_date: value.register_date.replace(/T/gi, ' à ').substring(0,18),
        action: <Button type="primary" icon="print" onClick={()=>this.prints(value.id)}>Supprimer</Button>
        }
  
      })
      this.notify(1);
      this.setState({
        info:eta.etablissement,
        userManage:blocks,
        loading: false
      });
    }
    else this.notify(3);
  }

  render() {
    if(!this.state.isLoading){
      let { sortedInfo } = this.state;
      sortedInfo = sortedInfo || {};
      const columns = [
        {
          title: 'Nom',
          dataIndex: 'name',
          key: 'name',
          sorter: (a, b) => a.name.length - b.name.length,
          sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
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
        <NotificationAlert ref={this.notificationAlert} />
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Enregistrement </h5>
                </CardHeader>
                <CardBody>
                <Form>
                <Row>
                  <Col md="9">
                    <Form.Item label="Formation Sanitaire" {...formItemLayout}>
                          <Input name="name" onChange={(e)=>this.edit(e)} placeholder="entrez un nom d'établissement" />
                    </Form.Item>
                  </Col>
                  <Col md="3">
                        <Button type="primary" icon="download" loading={this.state.loading} onClick={()=>this.handleSubmit()}>
                          Enregistrer
                        </Button>
                  </Col>

                </Row>
                </Form>
                </CardBody>
                </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Liste </h5>
                </CardHeader>
                <CardBody>
                <Table columns={columns} dataSource={this.state.userManage} />

                </CardBody>
                </Card>
            </Col>
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

export default Typography;
