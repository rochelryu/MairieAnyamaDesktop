
import React from "react";

import { Button, Spin, Table, Modal, Icon, Input} from "antd";
import { naissance, viewExtrait } from "../providers/index";
import ReactToPrint from "react-to-print";
import Highlighter from 'react-highlight-words';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import "../assets/css/style.css";
let anterieur = 0;
const Monthss = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
class ExtraitImprime extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      info:{},
      mariage:{},
      decess:{},
    }
  }

  async componentWillMount(){
    const id = this.props.id;

    const block = await viewExtrait(localStorage.getItem("tokenCore"),id);
    this.setState({
      info:block.info,
      mariage:block.mariage,
      decess:block.decess,
    });
  }

  async componentDidUpdate(){
    const id = this.props.id;

    if(parseInt(id, 10) !== anterieur){
      const block = await viewExtrait(localStorage.getItem("tokenCore"),id);
      this.setState({
        info:block.info,
        mariage:block.mariage,
        decess:block.decess,
      });
      anterieur = parseInt(id, 10);
    }
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
                  <p>{this.state.info.dateInLetter} <br/> est {(this.state.info.sexe ==="masculin")? "né":"née"} {this.state.info.nameEnfant} - {this.state.info.firstnameEnfant} <br/> à {this.state.info.circonscrit} <br/> <span>Fils de</span> {this.state.info.namePapa}<br/><hr size="5" width="180"/><br/> <span>et de </span>{this.state.info.nameMaman}</p>
              </div>
              
            </div>
          </div>
          <hr className="dernier" size="10"/>
          <div className="Mention">
            <h2>MENTIONS (Eventuellement)</h2>
            
          </div>
    <p className="paragrapheMention">Marié(e) le {(this.state.mariage.dateMariage === "N/A") ? "......................................................................................................................................................": `${new Date(this.state.mariage.dateMariage).toLocaleDateString()} ${this.state.mariage.verbe} ................................................................................................` } <br/>
   Avec { (this.state.mariage !== {} && this.state.mariage.dateMariage !== "N/A") ? (this.state.info.sexe === "masculin") ? `Mlle ${this.state.mariage.nameSecond} .....................................................................................................`: `M. ${this.state.mariage.nameSecond} ....................................................................................................................................................................................` : "..........................................................................................................................................................." } <br/>
   Divorce le ....................................................................................................................................................... <br/>
    </p>
    <p className="paragrapheMention">Décédé(e) le ....................................................................................... à ........................................................ <br/>
   
    </p>

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
      selectedRowKeys: [],
      searchText: '',
      searchedColumn: '',
      loadingForMultiple: false,
    }
    
  }

  start = () => {
    this.setState({ loadingForMultiple: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loadingForMultiple: false,
      });
    }, 1000);
  };
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Recherche ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Annuler
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };


  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

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

  async componentDidMount(){
    const token =  await localStorage.getItem("tokenCore");
    const block = await naissance(token);
    if(block.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
      localStorage.removeItem('level'); 
      localStorage.removeItem('tokenCore'); 
      this.props.history.push('/admin/login')
    }
    else {
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
    
  }
  render() {

    if(!this.state.isLoading){

      let { loadingForMultiple, selectedRowKeys } = this.state;
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true,
        selections: [
          {
            key: 'all-data',
            text: 'Tout le tableau',
            onSelect: () => {
              this.setState({
                selectedRowKeys: [...Array(this.state.userManage.length).keys()], // 0...45
              });
            },
          },
          {
            key: 'odd',
            text: "Pas encore imprimés",
            onSelect: changableRowKeys => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                console.log(key, index)
                if (index % 2 !== 0) {
                  return false;
                }
                return true;
              });
              this.setState({ selectedRowKeys: newSelectedRowKeys });
            },
          },
          {
            key: 'even',
            text: 'Déjà imprimés',
            onSelect: changableRowKeys => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                if (index % 2 !== 0) {
                  return true;
                }
                return false;
              });
              this.setState({ selectedRowKeys: newSelectedRowKeys });
            },
          },
        ],
      };
      const columns = [
        {
          title: 'Nº Extrait',
          dataIndex: 'id',
          key: 'id',
          width:'7%',
        },
        {
          title: 'Nom',
          dataIndex: 'nameEnfant',
          key: 'nameEnfant',
          width:'8%',
          ...this.getColumnSearchProps('nameEnfant'),
        },
        {
          title: 'Prénom',
          dataIndex: 'firstnameEnfant',
          key: 'firstnameEnfant',
          width:'18%',
          ...this.getColumnSearchProps('firstnameEnfant'),
        },{
          title: 'Sexe',
          dataIndex: 'sexe',
          key: 'sexe',
          width:'10%',
          ...this.getColumnSearchProps('sexe'),
        },{
          title: 'Nom Père',
          dataIndex: 'namePapa',
          key: 'namePapa',
          width:'11%',
          ...this.getColumnSearchProps('namePapa'),
        },{
          title: 'Nom Mère',
          dataIndex: 'nameMaman',
          key: 'nameMaman',
          width:'11%',
          ...this.getColumnSearchProps('nameMaman'),
        },
        {
          title: 'Date enregistrement',
          dataIndex: 'register_date',
          key: 'register_date',
          width:'14%',
          ...this.getColumnSearchProps('register_date'),
        },
        
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          ellipsis: true,
        },
      ];
      const hasSelected = selectedRowKeys.length > 0;
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Liste des Actes</CardTitle>
                  <div style={{ marginBottom: 16 }}>
                    <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loadingForMultiple}>
                      Imprimer
                    </Button>
                    <span style={{ marginLeft: 8 }}>
                      {hasSelected ? `${selectedRowKeys.length} élements Selectionnés` : ''}
                    </span>
                  </div>
                </CardHeader>
                <CardBody>
                
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.userManage} />
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
