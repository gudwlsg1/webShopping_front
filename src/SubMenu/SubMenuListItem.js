import React, {Component } from 'react';
import {inject, observer} from "mobx-react";

@inject('stores')
@observer
class SubMenuListItem extends Component {
    render() {
        let {subMenu} = this.props;
        return (
            <div>
                <li>{subMenu.name}</li>
            </div>
        );
    }
};

export default SubMenuListItem;