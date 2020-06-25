<template>
  <div v-if="categories != null">
    <div class="listing">
      <div class="carousel_head">
        <h2 class="category_title">{{categories.name}}</h2>
      </div>
      <div class="carousel_items categories">
        <div class="card_item" v-for="item in streaming" :key="item.title">
          <div class="card_img  lazyloaded">
            <button @click="fnt_streaming(item)" type="button" aria-label="Ver" class="play_video">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                width="50" height="50" viewBox="0 0 16 16">
                <path fill="#ffffff"
                  d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z" />
                <path fill="#ffffff" d="M6 4v8l6-4z" />
              </svg>
            </button>
            <b-link @click="fnt_detail(item)" class="card_link">
              <img v-lazy="item.img_streaming" />
            </b-link>
          </div>
          <h6 class="card_name default_title">{{item.title}}</h6>
          <rate :value="item.popularity" size="12px" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Categories",
    props: {
      ["category"]: {
        required: false
      },
      ["type"]: {
        required: false
      }
    },
    data: () => {
      return {
        streaming: [],
        categories: null
      };
    },
    mounted() {
      this.fnt_validate();
      this.fnt_get_streaming();
    },
    methods: {
      fnt_get_streaming() {
        if (this.category != null) {
          this.categories = this.category;
          this.categories.types = this.type;
          localStorage.category = JSON.stringify(this.categories);
        } else if (localStorage.getItem("category") != undefined) {
          this.categories = JSON.parse(localStorage.category);
        }
        if (localStorage.getItem("category") != undefined) {
          Promise.all([
            axios.get("streaming/categories/" + JSON.parse(localStorage.category).category_id, {
              params: {
                type: JSON.parse(localStorage.category).types
              }
            })
          ]).then(([result]) => {
            this.streaming = result.data;
          });
        }
      },
      fnt_validate() {
        if (localStorage.getItem("category") == undefined) {
          if (this.category == null || this.category.category_id == null) {
            this.$router.push({
              name: "Browse"
            });
          }
        }
      },
      fnt_streaming(item) {
        localStorage.item = item.streaming_id;
        localStorage.time = 0;
        this.$router.push({
          name: "Watch",
          params: {
            item: CryptoJS.AES.encrypt(JSON.stringify(item), token).toString()
          }
        });
      },
      fnt_detail(item) {
        localStorage.item = CryptoJS.AES.encrypt(JSON.stringify(item), token).toString();
        this.$router.push({
          name: "Detail"
        });
      }
    }
  };
</script>