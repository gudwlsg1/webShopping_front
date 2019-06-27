import React, {Component } from 'react';
import {inject, observer} from "mobx-react";

import './Product.css';

@inject('stores')
@observer
class SubMenuItem extends Component {
    render() {
        let {product} = this.props;
        console.log(product);
        return (
            <div className='product-view'>
                <div><img src={`http://localhost:8080/product/image/${product.id}`}></img></div>
                <div>{product.name}</div>
                <div>{product.information}</div>
                <div>{product.price}</div>
            </div>
        );
    }
};

export default SubMenuItem;