
<template>
  <div class="main__container">
    <h1 class="logo">BlogNews</h1>
    <div
      v-on:click="selectCategory($event.target), activeButton($event.target)"
      class="category__block"
    >
      <!-- <div v-on:click="allPosts()" class="category__name active">All</div> -->
      <div :data-category="'Technologies'" class="category__name">Technologies</div>
      <div :data-category="'Сulture'" class="category__name">Сulture</div>
      <div :data-category="'Politics'" class="category__name">Politics</div>
      <div :data-category="'Business'" class="category__name">Business</div>
      <div :data-category="'Art'" class="category__name">Art</div>
      <div :data-category="'Sport'" class="category__name">Sport</div>
      <div :data-category="'Hot'" class="category__name">Hot</div>
      <div :data-category="'Movie'" class="category__name">Movie</div>
    </div>
    <h1 class="new__post">
      Add new post
      <h1 v-on:click="openAddForm()">+</h1>
    </h1>
    <h2></h2>
    <form
      v-if="open"
      class="add__new__Post"
      method="POST"
      v-on:submit.prevent="addPost"
    >
      <div>
        <input
          required
          v-model="titleVal"
          placeholder="add title"
          type="text"
        />
        <input
          required
          v-model="imgVal"
          placeholder="add link IMG"
          type="text"
        />

        <input
          required
          v-model="categoryVal"
          list="category"
          placeholder="Select Category"
        />

        <datalist id="category">
          <option value="Technologies" />
          <option value="Сulture" />
          <option value="Politics" />
          <option value="Business" />
          <option value="Art" />
          <option value="Sport" />
          <option value="Hot" />
          <option value="Movie" />
        </datalist>
        <button class="btn btn__addpost" type="submit">Add</button>
      </div>
      <textarea
        required
        v-model="contentVal"
        placeholder="add content"
        type="text"
      >
      </textarea>
    </form>

    <div class="container">
      <ul v-for="el in list" :key="el.id">
        <div class="li__wrap">
          <li>
            <img v-if="el.imgLink" class="img" :src="el.imgLink" alt="" />
            <div v-else>
              <img
                class="img"
                src="https://i.pinimg.com/originals/71/32/cb/7132cb4077342978a29c6fdceb0fed37.png"
                alt=""
              />
            </div>
            <div class="post__block">
              <h1 class="title">{{ el.title.substr(0, 40) }}...</h1>
              <h2 class="category">{{ el.category }}</h2>
              <p class="content">{{ el.content.substr(0, 45) }}...</p>
              <div class="bottom__block">
                <p class="time__block">
                  <img
                    class="time"
                    src="../style/img/logo-png-transparent.png"
                    alt=""
                  />
                  {{ el.reading }}
                </p>
                <p>{{ el.date.substr(0, 10) }}</p>
              </div>
            </div>
          </li>
          <hr />
          <div class="setting__block">
            <div class="d-flex">
              <button
                class="btn btn__delete"
                :data-id="el._id"
                v-on:click="deletePost($event.target)"
              >
                Delete
              </button>

              <button
                class="btn btn__setting"
                :data-id="el._id"
                v-on:click="viewButton($event.target)"
              >
                <i class="fa fa-cog" aria-hidden="true"></i>
              </button>
            </div>
            <router-link
              target="_blank"
              :data-slug="el._id"
              :to="{
                name: 'postexpand',
                params: { id: el._id },
              }"
            >
              <button class="btn btn__view" :data-id="el._id">
                View
                <i class="fa fa-eye" aria-hidden="true"></i>
              </button>
            </router-link>
          </div>
        </div>
      </ul>
    </div>
    <div class="circle"></div>
    <div class="circle2"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      list: null,
      titleVal: null,
      contentVal: null,
      categoryVal: null,
      imgVal: null,
      open: false,
    };
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get("http://localhost:4000/api/blog")
        .then((res) => {
          this.list = res.data;
          this.list = this.list.reverse()
        })
        .catch((err) => {
          console.log(err);
        });
    },

    allPosts(){
       this.getData();
    },

    addPost() {
      axios
        .post("http://localhost:4000/api/blog", {
          title: this.titleVal,
          category: this.categoryVal,
          content: this.contentVal,
          date: new Date(),
          reading: "2 minutes",
          imgLink: this.imgVal,
        })
        .then((res) => {
          console.log(res.data);
          this.list.unshift(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      this.titleVal = "";
      this.contentVal = "";
      this.imgVal = "";
      this.categoryVal = "";
    },

    deletePost(e) {
      let id = e.dataset.id;
      axios
        .delete(`http://localhost:4000/api/blog/${id}`)
        .then((res) => {
          res;
          this.list = this.list.filter((el) => el._id !== id);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    selectCategory(e) {
      let select = e.dataset.category;
      axios
        .get(`http://localhost:4000/api/blog/category/${select}`)
        .then((res) => {
          this.list = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    openAddForm() {
      this.open = !this.open;
    },

    viewButton(e) {
      let ev = e.parentElement.previousElementSibling;
      if (ev.style.display == "block") {
        ev.style.display = "none";
      } else {
        ev.style.display = "block";
      }
    },

    activeButton(e) {
      if (e.classList.contains("category__name")) {
        let cat = document.querySelectorAll(".category__name");
        if (!e.classList.contains("active")) {
          cat = cat.forEach((el) => {
            el.classList.remove("active");
          });
          e.classList.add("active");
        }
      }
    },
  },
};
</script>

<style scoped>
@import url("../style/main.css");
</style>