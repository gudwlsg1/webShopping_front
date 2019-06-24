import {observable, action} from "mobx";
import axios from "axios";

class CategoryStore{
    static __instance = null;

    static getinstance(){
        if(CategoryStore.__instance === null){
            CategoryStore.__instance = new CategoryStore();
        }
        return CategoryStore.__instance;
    }

    constructor(){
        CategoryStore.__instance = this;
    }

    @observable items = null;
    @action fetchItems = async () => {
        try{
            this.items = null;
            let response = await axios({
                url : "http://localhost:8080/category",
                method : "get",
                headers : {
                    'Content-type' : 'application/json;charset=UTF-8'
                },
                timeout : 3000
            });

            if(response.status === 200){
                this.items = response.data;
            }
        }catch (ex) {
            console.log(ex);
        }
    }
}

export default CategoryStore.getinstance();