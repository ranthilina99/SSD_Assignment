import React, { Component } from "react";

import swat from "sweetalert2";
import axios from "axios";
import FileBase from "react-file-base64";
import { SERVER_ADDRESS } from "../../../Constants/Constants";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { Form } from "react-bootstrap";
import logo from "../../../images/new.png";

const FileAlert = () => {
  swat.fire({
    position: "center",
    icon: "success",
    title: "File Upload successful",
    showConfirmButton: false,
    timer: 3000,
  });
};

const FileFail = (message) => {
  swat.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
};

export default class sentFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      token: "",
      id: "",
      isLoggedIn: "",
      PImage: "",
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
    this.setState({ [e.target.name]: e.target.value });
  }

  clear() {
    this.setState({
      message: "",
      afterReset: true,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let file = {
      imageUrl: this.state.PImage,
      user: this.state.id,
    };
    console.log("DATA TO SEND", file);
    if ((this.state.imageUrl = "")) {
      let message = "File Error";
      FileFail(message);
    } else {
      axios
        .post(SERVER_ADDRESS + "/file_upload/create_file", file, {
          headers: { Authorization: this.state.token },
        })
        .then((response) => {
          FileAlert();
          this.clear();
        })
        .catch((error) => {
          console.log(error.message);
          let message = "File Error";
          FileFail(message);
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
          <h3 className="reset_title">NEW FILE UPLOAD</h3>
          <FormGroup>
            <Label for="exampleEmail">Please Upload the Image</Label>
            <div className="mb-3">
              <div>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => (this.state.PImage = base64)}
                />
              </div>
            </div>
          </FormGroup>
          &nbsp;
          <button className="reset_button btn btn-primary">Submit</button>
        </Form>
      </div>
    );
  }
}
