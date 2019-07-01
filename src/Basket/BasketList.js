import React,{Component} from 'react';
import {inject, observer} from "mobx-react";
import BasketListItem from "./BasketListItem";

import './Basket.css';

@inject('stores')
@observer
class BasketList extends Component{
    render() {
        return (
            <div className='basket-info'>
                <div>장바구니</div>
                <ul>
                    <li>고객님께서 주문하신 상품내역을 변경하시거나 삭제하실 수가 있습니다.</li>
                    <li>계속주문을 원하시면 [쇼핑하기]을 클릭하세요.</li>
                    <li>주문하신 상품에 대해 마일리지가 계속적으로 누적됩니다.</li>
                    <li>마일리지의 누적점수에 따라 사은품이 적용되며 추후 주문 시 동봉하여 발송됩니다.</li>
                </ul>
                <div className='basket-header'>
                    <div className='product-info'>
                        <div className='orderProduct'>주문상품</div>
                        <div className='price'>가격</div>
                        <div className='orderNumber'>주문수</div>
                        <div className='sum'>합계</div>
                    </div>
                </div>
                {this.props.stores.BasketStore.items.map(item => <BasketListItem key={item.id} Basket={item}/>)}
                <div>
                    주문 총 가격 : {this.props.stores.BasketStore.sum}
                </div>
            </div>
        );
    }


};

export default BasketList;