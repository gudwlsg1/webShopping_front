import {observable, action} from "mobx";
import axios from "axios";

class CommentStore{
    static __instance = null;

    static getinstance(){
        if(CommentStore.__instance === null){
            CommentStore.__instance = new CommentStore();
        }
        return CommentStore.__instance;
    }

    constructor(){
        CommentStore.__instance = this;
    }

    @observable Item = null;
    @action fetchItems = async (productId) => {
        try{
            this.Item = null;
            let response = await axios({
                url : `http://localhost:8080/product/comment/${productId}`,
                method : "get",

                headers : {
                    'Content-type' : 'application/json;charset=UTF-8'
                },
                timeout : 3000
            });
            if(response.status === 200){
                this.Item = response.data;
                console.log(this.Item);
            }
        }catch (ex) {
            console.log(ex);
        }
    }

    @action deleteComment = async (comment)=> {
        try{
            let response = await axios({
                url : `http://localhost:8080/product/comment/${comment.id}`,
                method : "delete",
                headers : {
                    'Content-Type' : 'application/json; charset=UTF-8'
                },
                timeout : 3000
            });

            if(response.status === 200 && response.data){
                this.fetchItems(comment.productId);
                return true;
            }
            return false;
        }catch (ex) {
            console.log(ex);
            return false;
        }
    };

    @action addComment = async (comment)=> {
        console.log(comment);
        try{
            let response = await axios({
                url : `http://localhost:8080/product/comment`,
                method : "post",
                headers : {
                    'Content-Type' : 'application/json; charset=UTF-8'
                },
                timeout : 3000,
                data : comment
            });

            if(response.status === 200 && response.data){
                this.fetchItems(comment.productId);
                return true;
            }
            return false;
        }catch (ex) {
            console.log(ex);
            return false;
        }
    };
}

export default CommentStore.getinstance();