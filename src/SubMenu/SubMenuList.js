import React from 'react';
import {Link} from "react-router-dom";
import SubMenuListItem from "./SubMenuListItem";
// './CategoryList.css';

const SubMenuList = (props)=> {
    console.log(props);
    return (
        <div>
            <ul className='subMenu-list'>
                {props.items.map(item => <SubMenuListItem key={item.id} subMenu={item}/>)}
            </ul>
        </div>
    );


};

export default SubMenuList;