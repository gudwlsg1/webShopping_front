import React, {Component} from 'react'
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

import './Product.css'
import CommentViewList from "./CommentViewList";

@inject('stores')
@observer
class ProductView extends Component {
    componentDidMount() {
        this.props.stores.ProductStore.fetchItem(this.props.productId);
        this.props.stores.CommentStore.fetchItems(this.props.productId);
    }
    state = {
        orderNumber : 0,
        goToLogin : false,
        goToHome : false,
        userId : -1,
        productId : -1,
        title : null
    };
    render() {
        if(this.state.goToLogin){
            return <Redirect to='/user/login' />;
        }

        if(this.state.goToHome){
            return <Redirect to='/'/>
        }

        let product = this.props.stores.ProductStore.Item;
        if(!product){
            return (<div> </div>) ;
        }

        if(this.props.stores.UserStore.user_data){
            this.state.userId = this.props.stores.UserStore.user_data.id;
        }
        this.state.productId = product.id;

        return(
            <div className='detail-product'>
                <div>{product.name}</div>
                <div><img src={`http://localhost:8080/product/image/${product.id}`}></img>
                    <div className='product-info'> <div>제조사 : {product.manufacturer}</div>
                        <div>마일리지 : {product.mileage}</div>
                        <div>주문 수량 : <input  type='number' value={this.state.orderNumber}
                                                onChange={this.updateOrder} min='0' /> </div>
                        <div>시중가격 : {product.original_price}</div>
                        <div>판매가격 : {product.price}</div>
                        <button onClick={this.addBasket}>장바구니에 담기</button>
                    </div>
                </div>
                <div className='preface'>제품상세정보</div>
                <div>{product.description}</div>
                <div className='preface'>구매정보</div>
                <div>{product.information}</div>
                <div className='preface'>고객의 상품평</div>
                <div> <input placeholder='댓글' onChange={this.updateComment}/> <button onClick={this.AddComment}>확인</button> </div>
                <div>{this.props.stores.CommentStore.Item && <CommentViewList items={this.props.stores.CommentStore.Item}/>}</div>
            </div>
        );
    }
    addBasket = async () => {
        if(this.props.stores.UserStore.user_data === null){
            alert("로그인 후 이용해주세요!");

            this.setState({
                goToLogin : true
            });
            return;
        }
        await this.setState({
            ...this.state,
            productId : this.props.stores.ProductStore.Item.id,
            userId : this.props.stores.UserStore.user_data.id
        });

        if(this.state.orderNumber <= 0){
            alert('1개 이상 선택해주세요');
            return;
        }

        if(await this.props.stores.BasketStore.addBasket(this.state)){
            this.setState({
                goToHome: true
            });
        }

    };

    updateOrder = event => {
      this.setState({
          orderNumber : event.target.value
      });
    };

    updateComment = event => {
        this.setState({
            title : event.target.value
        });
    };

    AddComment = async () => {
        if(this.state.userId === -1){
            alert('로그인 후 이용해주세요!');
            return;
        }

        if(await this.props.stores.CommentStore.addComment(this.state)){

        }
    }
}

export default ProductView;