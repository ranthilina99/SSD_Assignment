import React, {Component} from 'react';
import swat from "sweetalert2";
import axios from "axios";
import {SERVER_ADDRESS} from "../../../Constants/Constants";
import {FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import './reset.css'
import zxcvbn from "zxcvbn";
import logo from "../../../images/new.png";
const RegisteredAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: ' Password Update successful',
        showConfirmButton: false,
        timer: 3000
    });
}

const RegisterFail = (message) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    })
}
class Reset extends Component {
    constructor(props) {
        super(props);
        this.state={
            password:'',
            confirm_password:'',
            token:'',
            afterReset:false,
            showMeter:true,
            touched: {
                password:false,
                confirm_password:false
            }
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.clear=this.clear.bind(this);
    }
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }
    validate =(password,confirm_password)=> {
        const errors = {
            password:'',
            confirm_password:''
        };
        const reg2 =new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        if(this.state.touched.password && (password.length < 8) && !reg2.test(password))
            errors.password = 'Enter the at least 8 characters ';

        if(this.state.touched.confirm_password && (confirm_password.length< 8) && !reg2.test(confirm_password))
            errors.confirm_password = 'Enter the at least 8 characters ';

        if(password!==confirm_password)
            errors.confirm_password = 'Password is not match';

        return errors;
    }
    componentDidMount() {
        let token1= this.props.match.params.id
        console.log(token1)
        this.setState({
            token:token1
        })
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }
    clear(){
        this.setState({
            password:'',
            confirm_password:'',
            afterReset:true
        })
    }
    onSubmit(e) {
        e.preventDefault();
        let user = {
            password: this.state.password
        }
        console.log('DATA TO SEND', user);
        if (this.state.password.length < 8 || this.state.confirm_password.length < 8 || this.state.confirm_password !==this.state.password) {
            this.validate(this.state.password,this.state.confirm_password);
            let message = "Password Error"
            RegisterFail(message);
        }else {
            axios.post(SERVER_ADDRESS + '/users/reset_password', user, {
                headers: {Authorization: this.state.token}
            })
                .then(response => {
                    RegisteredAlert();
                    this.clear();
                })
                .catch(error => {
                    console.log(error.message);
                    let message = "Password Error"
                    RegisterFail(message);
                })
        }
    }
    createPasswordLabel = (result) => {
        switch (result.score) {
            case 0:
                return 'Weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return 'Weak';
        }
    }
    render() {
        const testedResult = zxcvbn(this.state.password);
        const errors=this.validate(this.state.password,this.state.confirm_password);
        return (
            <div>
                <Form className="reset_wrapper" onSubmit={this.onSubmit}>
                    <div className="reset_img">
                        <img
                            alt=""
                            src={logo}
                            width="250"
                            height="100"
                            align="center"
                        />
                    </div>
                    &nbsp;
                    <h3 className="reset_title">RESET PASSWORD</h3>
                    <FormGroup>
                        <Label for="exampleEmail">New Password</Label>
                        <div>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                id="password"
                                placeholder="New Password"
                                value={this.state.password}
                                onChange={this.onChange}
                                valid={errors.password === ''}
                                invalid={errors.password !== ''}
                                onBlur={this.handleBlur('password')}
                                required/>
                            <FormFeedback>{errors.password}</FormFeedback>
                        </div>
                    </FormGroup>
                    <FormGroup className="password-strength-meter">
                        <Label for="exampleEmail">Confirm Password</Label>
                        <div>
                            <Input
                                type="password"
                                className="form-control"
                                name="confirm_password"
                                id="confirm_password"
                                placeholder="Confirm Password"
                                value={this.state.confirm_password}
                                onChange={this.onChange}
                                valid={errors.confirm_password === ''}
                                invalid={errors.confirm_password !== ''}
                                onBlur={this.handleBlur('confirm_password')}
                                required/>
                            <FormFeedback>{errors.confirm_password}</FormFeedback>
                        </div>
                        &nbsp;
                        {this.state.password ?
                            <>
                                <progress
                                    className={`password-strength-meter-progress strength-${this.createPasswordLabel(testedResult)}`}
                                    value={testedResult.score}
                                    max="4"
                                />
                                <FormGroup>
                                    <Label
                                        className="password-strength-meter-label"
                                    >
                                        {this.state.password &&
                                        <>
                                            <strong>Password strength:</strong> {this.createPasswordLabel(testedResult)}
                                        </>
                                        }
                                    </Label>
                                </FormGroup>
                            </>
                            :
                            null
                        }
                    </FormGroup>
                    <button className="reset_button btn btn-primary">Submit</button>
                    <FormGroup>
                        <div className="w-50 register" >
                            <h6>Login Page <Link to="/login">Login</Link></h6>
                        </div>
                    </FormGroup>
                    <br/>
                    {this.state.afterReset ?
                        <FormGroup>
                            <div className="w-50 reset" >
                                <h6 style={{color:"red"}}>Password Reset Successfully.</h6>
                            </div>
                        </FormGroup>
                        :
                        null
                    }
                </Form>
            </div>
        );
    }
}

export default Reset;