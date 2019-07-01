import React, {Component } from 'react';
import {inject, observer} from "mobx-react";
import {Link} from 'react-router-dom';

import './Product.css';

@inject('stores')
@observer
class CategoryItem extends Component {
    render() {
        let {product} = this.props;
        return (

                <div className='product-view'>
                    <Link to={`/product/detail/${product.id}`}>
                    <div><img src={`http://localhost:8080/product/image/${product.id}`}></img> </div>
                    <div>{product.name}</div>
                    <div>{product.information}</div>
                    <div>{product.price}</div>
                    </Link>
                </div>

        );
    }
};

export default CategoryItem;