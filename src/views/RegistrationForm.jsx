import React from "react";
import { setUser } from "../providers/index";
import NotificationAlert from "react-notification-alert";

import {
    Form,
    Input,
    Select,
    Checkbox,
    Button,
  } from 'antd';
  import "../assets/css/style.css";

  const { Option } = Select;
  
  
  class RegistrationForm extends React.Component {
    state = {
      confirmDirty: false,
    };
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
        message: (type !== "warning") ? (
          <div>
            <div>
              <p><b> Succès </b> - Cet Utilisateur a été crée</p>
            </div>
          </div>
        ):(
          <div>
            <div>
              <p><b> Echec </b> - Cet pseudo existe déjà ou une erreur de la base vient d'être rencontrée</p>
            </div>
          </div>
        ),
        type: type,
        icon: "nc-icon nc-bell-55",
        autoDismiss: 7
      };
      this.notificationAlert.current.notificationAlert(options);
    }

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          const { confirm, ...rest} = values;
          const token = await localStorage.getItem('tokenCore');
          const result = await setUser(rest,token);
          this.notify(result.etat ? 2:4)
        }
      });
    };
  
    handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  
    compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('Le mot de passe ne correspond pas à celui de la confirmation!');
      } else {
        callback();
      }
    };
  
    validateToNextPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };
  
  
    render() {
      const { getFieldDecorator } = this.props.form;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '+225',
      })(
        <Select style={{ width: 70 }}>
          <Option value="+225">+225</Option>
        </Select>,
      );

  
      return (
        <>
          <NotificationAlert ref={this.notificationAlert} />
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'Email invalide!',
                  },
                  
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Mot de Passe" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Mot de passe invalide!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="Confirmé Mot de Passe" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Veuillez confirmer le mot de passe!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Nom utilisateur
                </span>
              }
            >
              {getFieldDecorator('pseudo', {
                rules: [{ required: true, message: "S'il vous plait veuillez entrer le pseudo !", whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Numero de téléphone">
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: "S'il vous plait veuillez entrer le contact!" }],
              })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
            </Form.Item>
            <Form.Item label="Nom">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: "S'il vous plait veuillez entrer un nom" }],
              })(
                  <Input />
              )}
            </Form.Item>
            <Form.Item label="Prénoms">
              {getFieldDecorator('firstname', {
                rules: [{ required: true, message: "S'il vous plait veuillez entrer un prénom" }],
              })(
                  <Input />
              )}
            </Form.Item>
            <Form.Item label="Departement/Service">
              {getFieldDecorator('address', {
                rules: [{ message: "S'il vous plait veuillez entrer une addrèsse" }],
              })(
                  <Input />
              )}
            </Form.Item>
            
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>
                  Est il un Administrateur qui as tous les droits ?
                </Checkbox>,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Enregistrer
              </Button>
            </Form.Item>
          </Form>
        </>
      );
    }
  }
  
  export const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);