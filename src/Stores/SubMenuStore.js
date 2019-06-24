import {observable, action} from "mobx";
import axios from "axios";

class SubMenuStore{
    static __instance = null;

    static getinstance(){
        if(SubMenuStore.__instance === null){
            SubMenuStore.__instance = new SubMenuStore();
        }
        return SubMenuStore.__instance;
    }

    constructor(){
        SubMenuStore.__instance = this;
    }

    @observable items = null;
    @action getSubItems = async (categoryId) => {
        try{
            this.items = null;
            let response = await axios({
                url : "http://localhost:8080/submenu/" + categoryId,
                method : "get",
                headers : {
                    'Content-type' : 'application/json;charset=UTF-8'
                },
                timeout : 3000
            });

            if(response.status === 200){
                this.items = response.data;
                return true;
            }
            return false;
        }catch (ex) {
            console.log(ex);
            return false;
        }
    }
}

export default SubMenuStore.getinstance();