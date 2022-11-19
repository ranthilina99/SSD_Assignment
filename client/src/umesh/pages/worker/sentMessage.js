import React, { Component } from "react";

import swat from "sweetalert2";
import axios from "axios";
import { SERVER_ADDRESS } from "../../../Constants/Constants";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { Form } from "react-bootstrap";
import logo from "../../../images/new.png";
import CryptoJS from 'crypto-js';

const MessageAlert = (message) => {
  swat.fire({
    position: "center",
    icon: "success",
    title: " Message Created successful",
    showConfirmButton: false,
    timer: 3000,
  });
 
};

const MessageFail = (message) => {
  swat.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
};
const secretPass = "XkhZG4fW2t2W";
const encryptData = (text) => {
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      secretPass
    ).toString();

    return data
  };

export default class sentMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      message1: "",
      token: "",
      id:"",
      isLoggedIn:"",
      touched: {
        password: false,
        confirm_password: false,
      },
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clear = this.clear.bind(this);
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  componentDidMount() {
    let token1 = this.props.match.params.id;
    const token = localStorage.getItem("token");
    if (!token) {
      this.setState({
        user: null,
      });
      return;
    }
    this.setState({
      token: token,
    });
    axios({
      method: "get",
      url: "https://localhost:5000/users/",
      headers: {
        Authorization: token,
      },
      data: {},
    })
      .then((res) => {
        this.setState({
          id: res.data._id,
          isLoggedIn: true,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });

    this.setState({
      token: token1,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, message1: e.target.value });
  }

  clear() {
    this.setState({
      message: "",
      afterReset: true,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let encryptMessage = encryptData(this.state.message)
    let user = {
      message: encryptMessage,
      user: this.state.id,
    };
    console.log("DATA TO SEND", user);
  
    if ((this.state.message = "")) {
      let message = "Message Error";
      MessageFail(message);
    } else {
      axios
        .post(SERVER_ADDRESS + "/messages/create_message", user, {
          headers: { Authorization: this.state.token },
        })
        .then((response) => {
          MessageAlert(this.state.message);
          this.clear();
          setTimeout(() => {
            window.confirm(this.state.message1)
          }, 4000);
        })
        .catch((error) => {
          console.log(error.message);
          let message = "Message Error";
          MessageFail(message);
        });
    }
  }

  render() {
    return (
      <div>
        <Form className="reset_wrapper" onSubmit={this.onSubmit}>
          <div className="reset_img">
            <img alt="" src={logo} width="250" height="100" align="center" />
          </div>
          &nbsp;
          <h3 className="reset_title">NEW MESSAGE</h3>
          <FormGroup>
            <Label for="exampleEmail">New Enter The Message</Label>
            <div>
              <Input
                type="textarea"
                className="form-control"
                name="message"
                rows="5"
                id="message"
                placeholder="Enter Message"
                value={this.state.message}
                onChange={this.onChange}
                required
              />
            </div>
          </FormGroup>
          &nbsp;
          <button className="reset_button btn btn-primary">Submit</button>
        </Form>
      </div>
    );
  }
}
