import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

import BasketList from './BasketList';

@inject('stores')
@observer
class Basket extends Component {
    state = {
        goToLogin : false
    }
    componentDidMount() {
        if(this.props.stores.UserStore.user_data){
            this.props.stores.BasketStore.fetchItems(this.props.stores.UserStore.user_data);
        }
    }

    render() {
        let b = this.props.stores.BasketStore;

        if(this.state.goToLogin){
            return <Redirect to='/user'/>;
        }

        if(!this.props.stores.UserStore.user_data){
            alert("로그인 후 이용해주세요!");

            this.setState({
                goToLogin : true
            });
        }

        if(b.items){
            return <BasketList items={b.items}/>
        }

        return (
            <div>
                장바구니
            </div>
        );
    }
}

export default Basket;