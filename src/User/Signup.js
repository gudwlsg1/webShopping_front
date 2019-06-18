import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

@inject('stores')
@observer
class Login extends Component {

    state = {
        account : '',
        password : '',
        pastPassword : '',
        username : '',
        homeNumber : '',
        phoneNumber : '',
        postNumber : '',
        address : '',
        email : '',
        goToUser : false,
        goToHome : false,
        ok : true,
        no : false
    };

    render(){
        if(this.state.goToUser){
            return <Redirect to='/user'/>;
        }

        if(this.state.goToHome){
            return <Redirect to='/'/>;
        }
        return(
            <div>
                <div className='login-container'>
                    <div>희망아이디 : <input value={this.state.account} onChange={this.updateAccount}/></div>
                    <div>희망패스워드 : <input value={this.state.password} onChange={this.updatePassword} type='password'/></div>
                    <div>패스워드확인 : <input value={this.state.pastPassword} onChange={this.updatePaswPassword} type='password'/></div>
                    <div>성명 : <input value={this.state.username} onChange={this.updateUserName}/></div>
                    <div>전화번호 : <input value={this.state.homeNumber} onChange={this.updateHomeNumber} /></div>
                    <div>핸드폰 : <input value={this.state.phoneNumber} onChange={this.updatePhoneNumber} /></div>
                    <div>우편번호 : <input value={this.state.postNumber} onChange={this.updatePostNumber} type="text" pattern="[0-9]{5}"/></div>
                    <div>주소 : <input value={this.state.address} onChange={this.updateAddress} /></div>
                    <div>이메일주소 : <input value={this.state.email} onChange={this.updateEmail} /></div>
                    <button onClick={this.signup}>확인</button><button onClick={this.cancle}>취소</button>
                </div>
            </div>
        );
    }

    updateAccount = event => {
        this.setState({
            ...this.state,
            account : event.target.value
        });
    };

    updatePassword = event => {
        this.setState({
            ...this.state,
            password : event.target.value
        });
    };

    updatePaswPassword = event => {
        this.setState({
            ...this.state,
            pastPassword : event.target.value
        });
    };

    updateUserName = event => {
        this.setState({
            ...this.state,
            username  : event.target.value
        });
    };

    updateHomeNumber = event => {
        this.setState({
            ...this.state,
            homeNumber : event.target.value
        });
    };

    updatePhoneNumber = event => {
        this.setState({
            ...this.state,
            phoneNumber : event.target.value
        });
    };

    updatePostNumber = event => {
        this.setState({
            ...this.state,
            postNumber : event.target.value
        });
    };

    updateAddress = event => {
        this.setState({
            ...this.state,
            address : event.target.value
        });
    };

    updateAgree = event => {
        this.setState({
            ...this.state,
            ok : event.target.value
        });
    };

    updateEmail = event => {
        this.setState({
            ...this.state,
            email : event.target.value
        });
    };

    signup = async () => {
        if(await this.props.stores.UserStore.signup(this.state)) {
            await this.setState({
                ...this.state,
                goToUser: true
            });
        }
        else {
            await this.setState({
                ...this.state,
                password: '',
                goToUser : false
            });
        }
    };
    cancle = async () => {
            await this.setState({
                ...this.state,
                goToHome: true
            });
    };
}

export default Login;