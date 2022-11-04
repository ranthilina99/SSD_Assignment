import React, {Component} from 'react';
import axios from 'axios';
import {SERVER_ADDRESS} from "../../../Constants/Constants";
import swat from "sweetalert2";
import {FormGroup, Input} from "@material-ui/core";
import {Label} from "reactstrap";
import {isLength,isEmpty} from "../../../Utils/validations";
import zxcvbn from "zxcvbn";


const UpdateAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Update Successfully',
        showConfirmButton: false,
        timer: 3000
    });
}

const UpdateFail = (message) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    })
}

class AdminEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname:'',
            lastname:'',
            password:'',
            position1:'',
            passwordFields: '',
            updateFields: true,
            token:''
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
    }
    componentDidMount() {
        axios.get(SERVER_ADDRESS+`/users/${this.props.match.params.id}`)
            .then(response=>{
                this.setState({
                    firstname:response.data.data.firstName,
                    lastname:response.data.data.lastName,
                    position1:response.data.data.position,
                });
            }).catch(err=>{
            alert(err.message)
        })
    }


    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }
    onChangePassword(e){
        e.preventDefault();
        let user = {
            new_password: this.state.password
        }
        if(isEmpty(this.state.password)) {
            let message = "Empty Field"
            UpdateFail(message);
        }else if(isLength(this.state.password)) {
            let message = "Password Error"
            UpdateFail(message);
        }else {
            console.log('DATA TO SEND', user);
            axios.post(SERVER_ADDRESS + `/users/admin_update_password/${this.props.match.params.id}`, user)
                .then(response => {
                    UpdateAlert();
                })
                .catch(error => {
                    console.log(error.message);
                    let message = "Password Error"
                    UpdateFail(message);
                }).finally(x => {
                this.setState({
                    password: ''
                })
            })
        }
    }
    onSubmit(e) {
        e.preventDefault();
        let user = {
            position: this.state.position1
        }
        console.log('DATA TO SEND', user);
        axios.put(SERVER_ADDRESS + `/users/admin_update/${this.props.match.params.id}`, user)
            .then(response => {
                UpdateAlert();
                this.props.history.push('/getAll');
            })
            .catch(error => {
                console.log(error.message);
                let message = "Update Failed"
                UpdateFail(message);
            })
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
        return (
            <div>
                {this.state.updateFields &&
                <form className="admin_wrapper" onSubmit={this.onSubmit}>
                    <h2 className="admin_title"> Update Position</h2>
                    <label htmlFor="exampleFormControlInput1" className="form-label">First Name</label>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="firstname"
                            id="firstname"
                            disabled
                            placeholder="First Name"
                            value={this.state.firstname}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Last Name</label>
                    <div className="form-group d-flex">
                        <input
                            type="text"
                            className="form-control"
                            name="lastname"
                            id="lastname"
                            disabled
                            placeholder="Last Name"
                            value={this.state.lastname}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Position</label>
                    <div className="form-group d-flex">
                        <select className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                                name="position1"
                                className="form-control"
                                id="exampleInputPosition"
                                value={this.state.position1}
                                onChange={this.onChange}
                                required>
                            <option value="" selected disabled>Select&nbsp;Position</option>
                            <option value='worker'>Worker</option>
                            <option value='manager'>Manager</option>
                            <option value='admin'>Administrator</option>
                        </select>
                    </div>
                    &nbsp;
                    <div className="form-group">
                        <button type="submit"
                                className="btn-block btn-lg btn btn-primary">Update Details
                        </button>
                    </div>
                    <div className="form-group">
                        <button type="submit"
                                onClick={this.passwordFieldShow} className="btn-block btn-lg btn btn-success">Change Password
                        </button>
                    </div>
                    <div className="form-group">
                        <button type="submit" onClick={this.back} className="btn-block btn-lg btn btn-warning">Cancel</button>
                    </div>
                </form>

                }
                {this.state.passwordFields &&
                <form className="admin_wrapper" onSubmit={this.onChangePassword}>
                    <h2 className="admin_title"> Update Password</h2>
                    <label htmlFor="exampleFormControlInput1" className="form-label">First Name</label>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="firstname"
                            id="firstname"
                            disabled
                            placeholder="First Name"
                            value={this.state.firstname}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Last Name</label>
                    <div className="form-group d-flex">
                        <input
                            type="text"
                            className="form-control"
                            name="lastname"
                            id="lastname"
                            disabled
                            placeholder="Last Name"
                            value={this.state.lastname}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Password</label>
                    <FormGroup className="form-group d-flex">
                        <Input
                            className="form-control"
                            type="password"
                            name="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.onChange}/>
                        {this.state.password &&
                        <progress
                            className={`password-strength-meter-progress strength-${this.createPasswordLabel(testedResult)}`}
                            value={testedResult.score}
                            max="4"
                        />
                        }
                        <FormGroup>
                            <Label
                                className="password-strength-meter-label"
                            >
                                {this.state.password &&  (
                                    <>
                                        <strong>Password strength:</strong> {this.createPasswordLabel(testedResult)}
                                    </>
                                )}
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    <div className="form-group">
                        <button type="submit"
                                className="btn-block  btn-lg btn btn-primary">Update Password
                        </button>
                    </div>
                    <div className="form-group">
                        <button type="submit"
                                onClick={this.passwordFieldHide} className="btn-block btn-lg btn btn-warning">Cancel
                        </button>
                    </div>
                </form>
                }
            </div>

        );
    }
    passwordFieldShow = () =>{
        this.setState({
            passwordFields: true,
            updateFields:false
        })
    }
    passwordFieldHide = () =>{
        this.setState({
            passwordFields: false,
            updateFields:true
        })
    }
    back = () =>{
        window.location.replace('/getAll')
    }
}
export default AdminEditUser;