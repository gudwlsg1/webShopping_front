import React, {Component } from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react";

@inject('stores')
@observer
class SubMenuListItem extends Component {
    render() {
        let {subMenu} = this.props;
        let product = `/product/submenu/${subMenu.id}`;
        return (
            <Link to={product}>
                    <li>{subMenu.name}</li>
            </Link>
        );
    }
};

export default SubMenuListItem;