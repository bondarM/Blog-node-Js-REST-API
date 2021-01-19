<template>
<div class="main__container">
<div class="container">
      <ul >
        <div class="li__wrap">
          <li class="li__container">
            <img
            v-if="this.list.imgLink"
              class="img img__expand"
              :src="this.list.imgLink"
              alt=""
            />
             <div v-else> <img class="img img__expand" src="https://i.pinimg.com/originals/71/32/cb/7132cb4077342978a29c6fdceb0fed37.png" alt=""></div>
            <div v-if="this.list" class="post__block post__expand">
              <h1  class="title">{{ this.list.title }}</h1>
              <h2 class="category">{{this.list.category }}</h2>
              <p class="content">{{this.list.content }}</p>
              <div class="bottom__block">
           <p class="time__block">  <img class="time" src="../style/img/logo-png-transparent.png" alt=""> {{ this.list.reading }}</p>
                <p>{{ this.list.date.substr(0, 10) }}</p>
              </div>
            </div>
          </li>
          <hr />
          <div class="setting__block">
             <router-link to="/">
  <button class="btn btn__view" >
              back 
              <i class="fa fa-eye" aria-hidden="true"></i>
            </button>
  </router-link>

               
          </div>
        </div>
      </ul>
    </div>


</div>
     
</template>


<script>
import axios from "axios";

export default {
    props:{
        id:String,
    },
    data(){
        return{
            nameId:null,
            list:null
        }
    },
    beforeMount(){
        if(this.id){
             this.renderPost()
        }
       
    },
    methods:{
        renderPost(){
            this.nameId = this.id
      
            axios
        .get(`http://localhost:4000/api/blog/${this.nameId}`)
        .then((res) => {
          this.list = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
        }
    }
}
</script>