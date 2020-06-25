<template>
  <div v-if="services >= 1">
    <br />
    <br />
    <div class="listing">
      <div class="carousel_head">
        <h2 class="category_title">Busqueda: {{value}}</h2>
      </div>
      <div class="carousel_items categories">
        <div class="card_item" v-for="item in items" :key="item.title">
          <div class="card_img lazyloaded">
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
  <div v-else>
    <DefaultService :show="show" />
  </div>
</template>
<script>
  import DefaultService from "./containers/DefaultService";
  export default {
    components: {
      DefaultService
    },
    computed: {
      value() {
        this.$store.state.value = this.$route.query.value;
        this.fnt_get_data();
        return this.$store.state.value;
      },
      services() {
        this.show = true;
        return JSON.parse(localStorage.sessionData).activeServices;
      }
    },
    data: () => {
      return {
        items: [],
        show: false
      };
    },
    mounted() {
      this.fnt_validate();
    },
    methods: {
      fnt_validate() {
        this.$store.state.value = this.$route.query.value;
      },
      fnt_get_data() {
        this.$store.state.isLoading = true;
        Promise.all([
          axios.get("streaming/search/" + this.$route.query.value, {
            params: {
              value: this.$route.query.value
            }
          })
        ]).then(([result]) => {
          this.$store.state.isLoading = false;

          this.items = result.data;
        });
      },
      fnt_streaming(item) {
        localStorage.item = item.streaming_id;
        localStorage.time = 0;
        this.$router.push({
          name: "Watch",
          params: {
            item: CryptoJS.AES.encrypt(JSON.stringify(item), token).toString() //item
          }
        });
      },
      fnt_detail(item) {
        localStorage.item = item.streaming_id;
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