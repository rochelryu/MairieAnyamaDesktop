
import React from "react";
import DownloadButton from "../components/DownloadButton";
import {  Pie, Bar } from "react-chartjs-2";
import { all } from "../providers/index";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";


//ant component
import { DatePicker, Select , Button, Spin, Table} from 'antd';
import 'antd/dist/antd.css';
import 'assets/css/table.css';

const { RangePicker } = DatePicker;
const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';



class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading:true,
      info:{},
      userManage:[],
      cliniqueManage: [],
      yearsManage: [],
      sortedInfo: null,
    }
    this.headersClinique = [
      { label: "Numero", key: "id" },
      { label: "Etablissement", key: "nom" },
      { label: "Naissance Total", key: "nombreService" },
      { label: "Naissance sexe masculin", key: "nombreHomme" },
      { label: "Naissance sexe feminin", key: "nombreFemme" },
    ];
    this.headersUsers = [
      { label: "Numero", key: "id" },
      { label: "Nom de l'agent", key: "nom" },
      { label: "Contact", key: "contact" },
      { label: "Fonction", key: "name" },
      { label: "Nombre de Enregistrement de Naissance", key: "nombreService" }
    ];
    this.headersAnnuel = [
      { label: "Année", key: "years" },
      { label: "Naissance", key: "naissance" },
      { label: "Mariage", key: "mariage" },
      { label: "Deces", key: "deces" },
      { label: "Divorce", key: "divorce" },
    ];
    
    this.dashboardNASDAQChart = {
      data: canvas => {
        return {
          labels: [
            "Jour1",
            "Jour2",
            "Jour3",
            "Jour4",
            "Jour5",
            "Jour6",
            "Jour7",
            
          ],
          datasets: [
            {
              borderColor: "#51cbce",
              backgroundColor: "#51cbce",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: this.state.info.naiss,
            },
            {
              borderColor: "#fbc658",
              backgroundColor: "#fbc658",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: this.state.info.mar,
            },
            {
              borderColor: "#f17e5d",
              backgroundColor: "#f17e5d",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: this.state.info.desc,
            },
            {
              borderColor: "#E3E3E3",
              backgroundColor: "#E3E3E3",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: this.state.info.div,
            }
          ]
        };
      },
      options: {
        legend: {
          display: false
        },
    
        tooltips: {
          enabled: true
        },
    
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 5
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: "rgba(255,255,255,0.05)"
              }
            }
          ],
    
          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent",
                display: false
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f"
              }
            }
          ]
        }
      }
    };
    this.dashboardEmailStatisticsChart = {
      data: canvas => {
        return {
          labels: ["Homme", "Femme"],
          datasets: [
            {
              label: "Par Sexe",
              pointRadius: 10,
              pointHoverRadius: 10,
              backgroundColor: [ "#4acccd", "#fcc468"],
              borderWidth: 0,
              data: this.state.info.totalSexeAllTime,
            }
          ]
        };
      },
      options: {
        legend: {
          display: true
        },
    
        pieceLabel: {
          render: "percentage",
          fontColor: ["white"],
          precision: 2
        },
    
        tooltips: {
          enabled: true
        },
    
        scales: {
          yAxes: [
            {
              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: "rgba(255,255,255,0.05)"
              }
            }
          ],
    
          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false
              }
            }
          ]
        }
      }
    };
     this.dashboard24HoursPerformanceChart = {
      data: canvas => {
        return {
          labels: [
            new Date().getFullYear() - 4,
            new Date().getFullYear() - 3,
            new Date().getFullYear() - 2,
            new Date().getFullYear() - 1,
            new Date().getFullYear(),
            
          ],
          datasets: [
            {
              borderColor: "#51cbce",
              backgroundColor: "#51cbce",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: this.state.info.naissanceAnnuel,
            },
            {
              borderColor: "#fbc658",
              backgroundColor: "#fbc658",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: this.state.info.mariageAnnuel,
            },
            {
              borderColor: "#f17e5d",
              backgroundColor: "#f17e5d",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: this.state.info.decesAnnuel,
            },
            {
              borderColor: "#E3E3E3",
              backgroundColor: "#E3E3E3",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: this.state.info.divorceAnnuel,
            }
          ]
        };
      },
      options: {
        legend: {
          display: false
        },
    
        tooltips: {
          enabled: true
        },
    
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 5
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: "rgba(255,255,255,0.05)"
              }
            }
          ],
    
          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent",
                display: false
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f"
              }
            }
          ]
        }
      }
    }
  }

  async componentWillMount() {
   const role = await localStorage.getItem("level") || 'Agent'
    if(role === 'Agent') {
      this.props.history.push('/admin/icons');
    }
  }
  prints(e){
    console.log(e);
  }

  async componentDidMount(){
    const tok = await localStorage.getItem('tokenCore');
    const djake = await all(tok);
    if(djake.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
      localStorage.removeItem('level'); 
      localStorage.removeItem('tokenCore'); 
      this.props.history.push('/admin/login')
    }
    else {
      const blocks = djake.userManager.map((value)=>{
        return {
          id: value.id,
        nom: value.nom,
        contact: value.contact,
        nombreService: value.nombreService,
        login: value.login,
        action: <Button type="primary" icon="print" onClick={()=>this.prints(value.id)}>Voir</Button>
        }
  
      })
      const block = djake.cliniqueManage.map((value)=>{
        return {
          id: value.id,
        nom: value.nom,
        nombreService: value.nombreService,
        action: <Button type="primary" icon="print" onClick={()=>this.prints(value.id)}>Voir</Button>
        }
  
      })
      const years = djake.naissanceAnnuel.map((value,index) => {
        return {
          years: new Date().getFullYear() - index,
          naissance: value,
          mariage: djake.mariageAnnuel[index],
          deces: djake.decesAnnuel[index],
          divorce: djake.divorceAnnuel[index],
        }
      })
      this.setState({
        info: djake,
        userManage:blocks,
        cliniqueManage: block,
        yearsManage: years,
        loading: !this.state.loading
      })
    }
  }

  onChange(date, dateString) {
    console.log(date, dateString);
  }

  onChangeSelect(value) {
    console.log(`selected ${value}`);
  }
  

  
  onSearch(val) {
    console.log('search:', val);
  }

  handleChange = (pagination, sorter) => {
    console.log('Various parameters', pagination, sorter);
    this.setState({
      sortedInfo: sorter,
    });
  };


  clearAll = () => {
    this.setState({
      sortedInfo: null,
    });
  };


  render() {
    if(!this.state.loading){

      let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const columns = [
      {
        title: 'Nom',
        dataIndex: 'nom',
        key: 'nom',
        sorter: (a, b) => a.nom.length - b.nom.length,
        sortOrder: sortedInfo.columnKey === 'nom' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'contact',
        dataIndex: 'contact',
        key: 'contact',
        sorter: (a, b) => a.contact - b.contact,
        sortOrder: sortedInfo.columnKey === 'contact' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Nombre se Service Effectué',
        dataIndex: 'nombreService',
        key: 'nombreService',
        sorter: (a, b) => a.nombreService.length - b.nombreService.length,
        sortOrder: sortedInfo.columnKey === 'nombreService' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Date de dernière connexion',
        dataIndex: 'login',
        key: 'login',
        sorter: (a, b) => a.login.length - b.login.length,
        sortOrder: sortedInfo.columnKey === 'login' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        ellipsis: true,
      },
    ];
    const column = [
      {
        title: 'Nom',
        dataIndex: 'nom',
        key: 'nom',
        sorter: (a, b) => a.nom.length - b.nom.length,
        sortOrder: sortedInfo.columnKey === 'nom' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Nombre se Service Effectué',
        dataIndex: 'nombreService',
        key: 'nombreService',
        sorter: (a, b) => a.nombreService.length - b.nombreService.length,
        sortOrder: sortedInfo.columnKey === 'nombreService' && sortedInfo.order,
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
              <Col lg="3" md="6" sm="6">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col md="4" xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-globe text-warning" />
                        </div>
                      </Col>
                      <Col md="8" xs="7">
                        <div className="numbers">
                          <p className="card-category">Total</p>
                          <CardTitle tag="p">{this.state.info.naissanceTotal}</CardTitle>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      Certificat de Naissance
                    </div>
                  </CardFooter>
                </Card>
              </Col>
              <Col lg="3" md="6" sm="6">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col md="4" xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-favourite-28 text-success" />
                        </div>
                      </Col>
                      <Col md="8" xs="7">
                        <div className="numbers">
                          <p className="card-category">Total</p>
                          <CardTitle tag="p">{this.state.info.decesTotal}</CardTitle>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                    Certificat de Mariage
                    </div>
                  </CardFooter>
                </Card>
              </Col>
              <Col lg="3" md="6" sm="6">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col md="4" xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-vector text-danger" />
                        </div>
                      </Col>
                      <Col md="8" xs="7">
                        <div className="numbers">
                          <p className="card-category">Total</p>
                          <CardTitle tag="p">{this.state.info.mariageTotal}</CardTitle>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      Certificat de Divorce
                    </div>
                  </CardFooter>
                </Card>
              </Col>
              <Col lg="3" md="6" sm="6">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col md="4" xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-money-coins text-primary" />
                        </div>
                      </Col>
                    <Col md="8" xs="7">
                        <div className="numbers">
                          <p className="card-category">Total</p>
                          <CardTitle tag="p">{this.state.info.divorceTotal}</CardTitle>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                    Certificat de Décès
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <Card>
                <DownloadButton data={this.state.yearsManage} headers={this.headersAnnuel}  />
                  <CardHeader>
                    <CardTitle tag="h5">Statistiques Annuels</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Bar
                      data={this.dashboard24HoursPerformanceChart.data}
                      options={this.dashboard24HoursPerformanceChart.options}
                      width={400}
                      height={100}
                    />
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="legend">
                      <i className="fa fa-circle text-primary" /> Naissance{" "}
                      <i className="fa fa-circle text-warning" /> Mariage{" "}
                      <i className="fa fa-circle text-danger" /> Divorce{" "}
                      <i className="fa fa-circle text-gray" /> Déccès
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <Card>
                <DownloadButton data={this.state.cliniqueManage} headers={this.headersClinique}  />
                  <CardHeader>
                    <CardTitle tag="h5">Statique par Genre</CardTitle>
                    <p className="card-category">Filtrer par Genre, par date et par type de certificat</p>
                    <div>
                      
                      <RangePicker format={dateFormat} onChange={this.onChange} placeholder={['Début Date', 'Fin Date']}/>

                      <br/>
                      <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Selection de type"
      optionFilterProp="children"
      onChange={this.onChangeSelect}
      onSearch={this.onSearch}
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Option value="jack">Acte de Naissance</Option>
      <Option value="lucy">Acte de Décès</Option>
      <Option value="tom">Acte de Mariage</Option>
      <Option value="tom">Acte de Divorce</Option>
    </Select>
                      
                    </div>
                    
                  </CardHeader>
                  <CardBody>
                    <Pie
                      data={this.dashboardEmailStatisticsChart.data}
                      options={this.dashboardEmailStatisticsChart.options}
                    />
                  </CardBody>
                  
                </Card>
              </Col>
              <Col md="8">
                <Card className="card-chart">
                <DownloadButton data={this.state.cliniqueManage} headers={this.headersClinique}  />
                  <CardHeader>
                    <CardTitle tag="h5">Satistique enregistrement</CardTitle>
                    <p className="card-category">filtrer par semaine</p><br/>
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Selectionné une date"
                      optionFilterProp="children"
                      onChange={this.onChangeSelect}
                      onSearch={this.onSearch}
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="1-7">1 - 7</Option>
                      <Option value="8-14">8 - 14</Option>
                      <Option value="15-21">15 - 21</Option>
                      <Option value="22-29">22 - 29</Option>
                    </Select>
                  </CardHeader>
                  <CardBody>
                  <Bar
                      data={this.dashboardNASDAQChart.data}
                      options={this.dashboardNASDAQChart.options}
                      width={400}
                      height={100}
                    />
                    
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="legend">
                      <i className="fa fa-circle text-primary" /> Naissance{" "}
                      <i className="fa fa-circle text-warning" /> Mariage{" "}
                      <i className="fa fa-circle text-danger" /> Divorce{" "}
                      <i className="fa fa-circle text-gray" /> Déccès
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="12">
              <Card className="card-chart">
              <DownloadButton data={this.state.userManage} headers={this.headersUsers}  />
                  <CardHeader>
                    <CardTitle tag="h5">Satistique enregistrement par Agent</CardTitle>                    
                  </CardHeader>
                  <CardBody>
                  <Table columns={columns} dataSource={this.state.userManage} onChange={this.handleChange} rowKey={record => record.id} />
                  </CardBody>
                  
                </Card>
              
              </Col>
            </Row>
            <Row>
              <Col md="12">
              <Card className="card-chart">
              <DownloadButton data={this.state.cliniqueManage} headers={this.headersClinique}  />
                  <CardHeader>
                    <CardTitle tag="h5">Satistique enregistrement Par clinique</CardTitle>                    
                  </CardHeader>
                  <CardBody>
                  <Table columns={column} dataSource={this.state.cliniqueManage} onChange={this.handleChange} rowKey={record => record.id} />
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

export default Dashboard;
