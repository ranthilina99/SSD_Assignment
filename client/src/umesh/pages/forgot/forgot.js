import React, {Component} from 'react';
import swat from "sweetalert2";
import axios from "axios";
import {SERVER_ADDRESS} from "../../../Constants/Constants";
import {FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import './forgot.css';
import logo from '../../../images/new.png'

const ForgotAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'The email has sent',
        showConfirmButton: false,
        timer: 5000
    });
}

const ForgotFail = (message) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    })
}
class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:'',
            viewForgot:true,
            afterForgot:false,
            touched: {
                email:false
            }
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }
    validate =(email)=> {
        const errors = {
            email:''
        };

        const reg1 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(this.state.touched.email && !reg1.test(email))
            errors.email = 'Email should contain a abc@gmail.com';

        return errors;
    }
    onSubmit(e) {
        e.preventDefault();
        let forgot = {
            email: this.state.email,
        }
        console.log('DATA TO SEND', forgot);
        if (this.state.email.split('').filter(x => x === '@').length !== 1) {
            this.validate(this.state.email);
            let message = "Forgot Error"
            ForgotFail(message);
        }else {
            axios.post(SERVER_ADDRESS + '/users/forgot_password', forgot)
                .then(response => {
                    ForgotAlert();
                    this.setState({
                        viewForgot: false,
                        afterForgot: true
                    })
                })
                .catch(error => {
                    console.log(error.message);
                    let message = "Forgot Error"
                    ForgotFail(message);
                })
        }
    }
    render() {
        const errors=this.validate(this.state.email);
        return (
            <div>
                <Form className="forgot_wrapper" onSubmit={this.onSubmit}>
                    {this.state.viewForgot ?
                        <>

                            <div className="forgot_img">
                                <img
                                    alt=""
                                    src={logo}
                                    width="250"
                                    height="100"
                                    align="center"
                                />
                            </div>
                            &nbsp;
                            <h3 className="forgot_title">FORGOT PASSWORD</h3>
                            <FormGroup>
                                <Label for="exampleEmail">Email address</Label>
                                <div>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        placeholder="Enter Your Email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        valid={errors.email === ''}
                                        invalid={errors.email !== ''}
                                        onBlur={this.handleBlur('email')}
                                        required
                                    />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </div>
                            </FormGroup>
                            &nbsp;
                            <button className="forgot_button btn btn-primary">Submit</button>
                            <FormGroup>
                                <div className="w-50 register">
                                    <h6>Login Page <Link to="/login">Login</Link></h6>
                                </div>
                            </FormGroup>
                        </>
                        :
                        null
                    }
                    {this.state.afterForgot ?
                        <>
                            <h3 className="forgot_title">FORGOT PASSWORD</h3>
                            <h6 className="forgot_title">An email has been sent. Please click the link when you get it</h6>
                        </>
                        :
                        null
                    }
                </Form>
                <br/><br/>
            </div>
        );
    }
}

export default Forgot;