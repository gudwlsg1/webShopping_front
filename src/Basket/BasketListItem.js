import React, {Component } from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';

import './Basket.css';

@inject('stores')
@observer
class BasketListItem extends Component {
    state = {
        id : -1,
        orderNumber : 0,
        addOrderNumber : 0,
        sum : 0,
        type : 'add',
        price : 0,
        userId : 0,
        goToBasket : false
    };

    render() {
        let {Basket} = this.props;

        if(this.state.goToBasket){
            return <Redirect to='/basket'/>
        }

        if(Basket){
            this.state.orderNumber = Basket.orderNumber + this.state.addOrderNumber;
            this.state.sum = this.state.orderNumber * Basket.price;
            this.state.price = Basket.price;
            this.state.id = Basket.id;
            this.userId = this.props.stores.UserStore.user_data.id;
        }

        return (
            <div className='basket-view'>
                <div className='orderProduct'>
                    <div><img src={`http://localhost:8080/product/image/${Basket.productId}`}/></div>
                    {Basket.name}
                </div>
                <div className='price'>{Basket.price}</div>
                <div className='orderNumber'>
                    <input type='number' value={this.state.orderNumber}
                                         onChange={this.updateOrderNumber} min='0'>
                    </input>
                </div>
                <div className='sum'>{this.state.sum}</div>
                <button onClick={this.deleteBasket}>삭제</button>
            </div>
        );
    }

    updateOrderNumber = async (event) => {
        console.log(event.target.value);
        if(this.state.orderNumber >= event.target.value){
            await this.setState({
                addOrderNumber : this.state.addOrderNumber - 1,
                type : 'sub'
            });
        }else {
            await this.setState({
                addOrderNumber : this.state.addOrderNumber + 1,
                type : 'add'
            });
        }
        if(await this.props.stores.BasketStore.modifyBasket(this.state)){
            console.log(this.state);
        }
    };

    deleteBasket = async () => {
      if(await this.props.stores.BasketStore.deleteBasket(this.state)){
          this.setState({
              goToBasket : true
          })
      }
    }
}

export default BasketListItem;