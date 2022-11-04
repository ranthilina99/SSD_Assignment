import React, {Component} from 'react';
import swat from "sweetalert2";
import axios from "axios";
import {SERVER_ADDRESS} from "../../../Constants/Constants";
import {Input, Label, Form, FormGroup, Button, FormFeedback} from "reactstrap";
import FileBase from 'react-file-base64'
import './profile.css'
import Avatar from "react-avatar";
import zxcvbn from "zxcvbn";
import {isEmail, isEmpty, isLengthMobile, isMobile} from "../../../Utils/validations";

const SuccessAlert = (res) => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: res +" "+ 'Successfully',
        showConfirmButton: false,
        timer: 3000
    });
}

const FailAlert = (res) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: res
    })
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            mobile: '',
            address: '',
            dob: '',
            gender: '',
            position: "",
            passwordFields: '',
            updateFields: true,
            token: '',
            newPassword: '',
            confirmPassword: '',
            image: '',
            PImage: '',
            id: '',
            user1: "",
            type: '',
            isLoggedIn:false,
            touched: {
                firstname: false,
                address:false,
                mobile:false,
                email:false,
                lastname:false,
                dob:false,
                gender:false,
                newPassword:false,
                confirmPassword:false,
                image:false
            }
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmitHandler=this.onSubmitHandler.bind(this);
        this.onDelete=this.onDelete.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.logoutOnClick=this.logoutOnClick.bind(this);
    }
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }
    validate =(firstname,lastname,address,mobile,dob,gender,image)=> {
        const errors1 = {
            firstname: '',
            address:'',
            mobile:'',
            email:'',
            lastname:'',
            dob:'',
            gender:'',
            newPassword:'',
            confirmPassword:'',
            image:''
        };
        if (this.state.touched.firstname && firstname.length < 3)
            errors1.firstname = 'First Name should be >= 3 characters';

        if (this.state.touched.lastname && lastname.length < 3)
            errors1.lastname = 'First Name should be >= 3 characters';

        if (this.state.touched.address && address.length < 3)
            errors1.address = 'First Name should be >= 3 characters';

        if (this.state.touched.mobileNo && mobile.length<10 || mobile.length >=11)
            errors1.mobileNo = 'Tel. Number should contain only 10 digit number';

        const reg = /^\d+$/;
        if (this.state.touched.mobileNo && !reg.test(mobile))
            errors1.mobileNo = 'Tel. Number should contain only numbers'

        const reg3=/^(?:7|0|(?:\+94))[0-9]{9,10}$/
        if (this.state.touched.mobile && !reg3.test(mobile))
            errors1.mobile = 'Tel. please the match request format '

        if(this.state.touched.image  && image==='')
            errors1.image = 'No file chosen';

        if(this.state.touched.dob && (dob===''))
            errors1.DOB = 'Field is Empty';

        if(this.state.touched.gender && (gender===''))
            errors1.gender = 'Field is Empty';

        return errors1;

    }
    validatePassword =(newPassword,confirmPassword)=> {
        const errors = {
            newPassword:'',
            confirmPassword:'',
            image:''
        };
        const reg2 =new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        if(this.state.touched.newPassword && (newPassword.length < 8) && !reg2.test(newPassword))
            errors.newPassword = 'Enter the at least 8 characters ';

        if(this.state.touched.confirmPassword && (confirmPassword.length< 8) && !reg2.test(confirmPassword))
            errors.confirmPassword = 'Enter the at least 8 characters ';

        if(newPassword!==confirmPassword)
            errors.confirmPassword = 'Password is not match';

        return errors;

    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }
    componentDidMount() {
        const token = localStorage.getItem('token');
        if (!token) {
            this.setState({
                user: null
            });
            return;
        }
        this.setState({
            token:token,
        })
        axios({
            method: 'get',
            url: SERVER_ADDRESS +'/users/',
            headers: {
                Authorization: token
            },
            data: {}
        }).then(res => {
            this.setState({
                image: res.data.imageUrl,
                lastname: res.data.lastName,
                firstname: res.data.firstName,
                email: res.data.email,
                mobile: res.data.mobileNo,
                address: res.data.address,
                dob: res.data.DOB,
                gender: res.data.Gender,
                id:res.data._id,
                isLoggedIn: true
            })
        }).catch(err => {
            console.log(err.message);
        })
    }
    logoutOnClick = e => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('userPosition');
        this.setState({
            isLoggedIn: false,
            user1: ''
        })
        window.location.replace('/login')
    }
    onSubmitHandler (e) {
        e.preventDefault();
        let user = {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email,
            mobileNo: this.state.mobile,
            DOB: this.state.dob,
            address: this.state.address,
            Gender: this.state.gender,
            imageUrl: this.state.PImage,
        }
        console.log('DATA TO SEND', user);
        if (this.state.firstname.length < 3 || this.state.address.length < 3 ||
            this.state.mobile.length < 10 || this.state.mobile.length >= 11 ||
            this.state.lastname.length < 3 ){
            this.validate(this.state.firstname,this.state.lastname,this.state.address,this.state.mobile,
                this.state.DOB,this.state.Gender)
            let message = "Update failed"
            FailAlert(message);
        }else if(!isMobile(this.state.mobile)){
            let message = "Tel. please the match request format"
            FailAlert(message);
        }else if(!isLengthMobile(this.state.mobile)) {
            let message = "Tel. Number should contain only 10 digit number"
            FailAlert(message);
        }else {

            axios.put(SERVER_ADDRESS + '/users/update', user, {
                headers: {Authorization: this.state.token}
            }).then(response => {
                let message = "User Update"
                SuccessAlert(message)
                window.location.replace('/profile')

            }).catch(error => {
                let message = "Update failed"
                console.log(error);
                FailAlert(message)
                this.setState({
                    firstname: '',
                    lastname: '',
                    email: '',
                    mobile: '',
                    dob: '',
                    address: '',
                    gender: '',
                    PImage: ''
                })
            });
        }

    }

    onDelete = async (id) =>{
        try {
            let message = "User Delete"
            SuccessAlert(message)
            if(window.confirm("Are you sure you want to delete this account?")) {
                await axios.delete(SERVER_ADDRESS +`/users/delete/${id}`, {
                    headers: {Authorization: this.state.token}

                })
                window.location.replace('/')
            }
        } catch (err) {
            let message = " Delete"
            console.log(err);
            FailAlert(message)
        }
    }
    onSubmit(e) {
        e.preventDefault();
        let user = {
            new_password:this.state.newPassword
        }
        if (this.state.newPassword.length < 8 || this.state.confirmPassword.length < 8 || this.state.confirmPassword !==this.state.newPassword) {
            this.validatePassword(this.state.newPassword,this.state.confirmPassword);
            let message = "Password Error"
            FailAlert(message);
        }else {
            console.log('DATA TO SEND', user);
            axios.post(SERVER_ADDRESS + `/users/admin_update_password/${this.state.id}`, user, {
                headers: {Authorization: this.state.token}
            })
                .then(response => {
                    let message = "Password Change"
                    SuccessAlert(message);
                    window.location.replace("/profile");
                })
                .catch(error => {
                    console.log(error.message);
                    let message = "Password Error"
                    FailAlert(message);
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
        const testedResult = zxcvbn(this.state.newPassword);
        const errors1=this.validate(this.state.firstname,this.state.lastname,this.state.address,this.state.mobile,
            this.state.DOB,this.state.Gender)
        const errors=this.validatePassword(this.state.newPassword,this.state.confirmPassword);
        return (
            <>
                <Form >
                    <div className="profile_page">

                        <div className="col-left">
                            <div className="avatar1">
                                <Avatar size="150px" round={true}
                                        name={this.state.firstname+ " " +this.state.lastname}
                                        src={this.state.image}/>
                            </div>
                            {this.state.updateFields &&
                            <>
                                <h2 className="profile_title">User Profile</h2>
                                <hr/>
                                <div className="row">
                                    <FormGroup className="col-6">
                                        <Label for="exampleEmail">First Name</Label>
                                        <div>
                                            <Input
                                                type="text"
                                                name="firstname"
                                                id="exampleFirstname"
                                                placeholder="First Name"
                                                value={this.state.firstname}
                                                onChange={this.onChange}
                                                required
                                                valid={errors1.firstname === ''}
                                                invalid={errors1.firstname !== ''}
                                                onBlur={this.handleBlur('firstname')}/>
                                            <FormFeedback>{errors1.firstname}</FormFeedback>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="col-6">
                                        <Label for="exampleLastName">Last Name</Label>
                                        <div>
                                            <Input
                                                type="text"
                                                name="lastname"
                                                id="exampleLastname"
                                                placeholder="Last Name"
                                                value={this.state.lastname}
                                                onChange={this.onChange}
                                                required valid={errors1.lastname === ''}
                                                invalid={errors1.lastname !== ''}
                                                onBlur={this.handleBlur('lastname')}
                                            />
                                            <FormFeedback>{errors1.lastname}</FormFeedback>
                                        </div>
                                    </FormGroup>
                                </div>
                                <FormGroup>
                                    <Label for="exampleEmail">Email</Label>
                                    <div>
                                        <Input disabled
                                               type="email"
                                               name="email"
                                               id="exampleEmail"
                                               placeholder="abc@gmail.com"
                                               value={this.state.email}
                                               onChange={this.onChange}/>
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Mobile No</Label>
                                    <div>
                                        <Input
                                            type="tel"
                                            name="mobile"
                                            id="exampleMobile"
                                            placeholder="Mobile Number"
                                            value={this.state.mobile}
                                            onChange={this.onChange}
                                            required valid={errors1.mobile === ''}
                                            invalid={errors1.mobile !== ''}
                                            onBlur={this.handleBlur('mobile')}/>
                                        <FormFeedback>{errors1.mobile}</FormFeedback>
                                    </div>
                                </FormGroup>
                                <div className="row">
                                    <FormGroup className="col-6">
                                        <Label for="exampleEmail">Date Of Birth</Label>
                                        <div>
                                            <Input
                                                type="date"
                                                name="dob"
                                                id="exampleDate"
                                                placeholder="Date Of Birth"
                                                value={this.state.dob}
                                                onChange={this.onChange}
                                                required
                                                valid={errors1.dob === ''}
                                                invalid={errors1.dob !== ''}
                                                onBlur={this.handleBlur('DOB')}/>
                                            <FormFeedback>{errors1.dob}</FormFeedback>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="col-6">
                                        <Label for="exampleSelect">Gender</Label>
                                        <Input
                                            type="select"
                                            name="gender"
                                            id="exampleSelect"
                                            value={this.state.gender}
                                            onChange={this.onChange}
                                            valid={errors1.gender === ''}
                                            invalid={errors1.gender !== ''}
                                            onBlur={this.handleBlur('gender')}>
                                            <option value="" disabled>Select Gender</option>
                                            <option value={'male'}>Male</option>
                                            <option value={'female'}>Female</option>
                                        </Input>
                                        <FormFeedback>{errors1.gender}</FormFeedback>
                                    </FormGroup>
                                </div>
                                <FormGroup>
                                    <Label for="exampleText">Address</Label>
                                    <div>
                                        <Input
                                            type="textarea"
                                            name="address"
                                            id="exampleText"
                                            value={this.state.address}
                                            onChange={this.onChange}
                                            required
                                            valid={errors1.address === ''}
                                            invalid={errors1.address !== ''}
                                            onBlur={this.handleBlur('address')}/>
                                        <FormFeedback>{errors1.address}</FormFeedback>
                                    </div>
                                </FormGroup>
                                <div className="mb-3">
                                    <Label htmlFor="res_img" className="form-label">Picture</Label>
                                    <div>
                                        <FileBase type="file"  multiple={false} onDone={({base64}) => this.state.PImage = base64}  />
                                    </div>
                                </div>
                            </>
                            }
                            {this.state.updateFields &&
                            <Button size="lg" block color="primary" onClick={this.onSubmitHandler}>Update Profile</Button>
                            }
                            {this.state.passwordFields &&
                            <Form>
                                <h2 className="profile_title">Change Password</h2>
                                <hr/>
                                <FormGroup>
                                    <Label for="exampleText">New Password</Label>
                                    <Input type="password"
                                           name="newPassword"
                                           placeholder="New Password"
                                           value={this.state.newPassword}
                                           onChange={this.onChange}
                                           valid={errors.newPassword === ''}
                                           invalid={errors.newPassword !== ''}
                                           onBlur={this.handleBlur('newPassword')}
                                           required/>
                                    <FormFeedback>{errors.newPassword}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleText">Confirm Password</Label>
                                    <Input type="password"
                                           name="confirmPassword"
                                           placeholder="Confirm Password"
                                           value={this.state.confirmPassword}
                                           onChange={this.onChange}
                                           valid={errors.confirmPassword === ''}
                                           invalid={errors.confirmPassword !== ''}
                                           onBlur={this.handleBlur('confirmPassword')}
                                           required/>
                                    <FormFeedback>{errors.confirmPassword}</FormFeedback>
                                    {this.state.newPassword ?
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
                                                    {this.state.newPassword &&
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
                                <FormGroup>
                                    <Button size="lg" block color="success" type="button"
                                            onClick={this.onSubmit}>Update Password</Button>
                                </FormGroup>
                                <FormGroup>
                                    <Button size="lg" block color="warning" type="button"
                                            onClick={this.passwordFieldHide}>Cancel</Button>
                                </FormGroup>
                            </Form>
                            }
                            {!this.state.passwordFields &&
                            <Button size="lg" block color="success" type="button"
                                    onClick={this.passwordFieldShow}>Change Password</Button>
                            }
                            <div>
                                {this.state.updateFields &&
                                <div>
                                    <h6>Delete Profile</h6>
                                    <Button className="btn  btn-danger float-right" block href="/"
                                            onClick={() => this.onDelete(this.state.id)}>
                                        <i className="fas fa-trash">Delete</i>&nbsp;
                                    </Button>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </Form>
            </>
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
}

export default Profile;