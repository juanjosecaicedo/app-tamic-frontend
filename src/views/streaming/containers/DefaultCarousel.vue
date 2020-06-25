<template>
  <hooper :infiniteScroll="true" :settings="hooperSettings" :wheelControl="false" :mouseDrag="false"
    :keysControl="false" :shortDrag="false">
    <slide v-for="(item, indx) in items" :key="indx" :index="indx">
      <div class="item_container">
        <div class="card_item">
          <div class="card_img lazyloaded">
            <button @click="fnt_streaming(item)" type="button" aria-label="Ver" class="play_video">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                width="50" height="50" viewBox="0 0 16 16">
                <path fill="#ffffff"
                  d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z" />
                <path fill="#ffffff" d="M6 4v8l6-4z" />
              </svg>
            </button>
            <b-link @click="fnt_detail(item)">
              <img v-lazy="fnt_img(item)" />
            </b-link>
          </div>
          <h6 class="card_name default_title">{{item.title}}</h6>
          <rate :value="item.popularity" size="12px" />
        </div>
      </div>
    </slide>
    <hooper-navigation slot="hooper-addons"></hooper-navigation>
  </hooper>
</template>
<script>
  import {
    fnt_control
  } from "@/shared/utils";

  export default {
    props: {
      category: {
        required: true
      },
      type: {
        required: true
      },
      index: {
        required: true
      }
    },
    mounted() {
      this.fnt_get_streaming();
    },
    data: () => {
      return {
        items: [],
        hooperSettings: {
          itemsToShow: 3,
          breakpoints: {
            800: {
              centerMode: false,
              itemsToShow: 4
            },
            1000: {
              itemsToShow: 6
            },
            1200: {
              itemsToShow: 6
            }
          }
        }
      };
    },
    methods: {
      fnt_img(item) {
        if (item.img_streaming) {
          return item.img_streaming;
        } else {
          return false;
        }
      },
      fnt_get_streaming() {
        let identifier = this.index + "-" + this.type;
        if (localStorage.getItem(identifier) == null) {
          Promise.all([
            axios.get("streaming/" + this.category, {
              params: {
                type: this.type
              }
            })
          ]).then(([resultStreaming]) => {
            this.items = resultStreaming.data;
            localStorage.setItem(identifier, JSON.stringify(this.items));
          });
        } else {
          this.items = JSON.parse(localStorage.getItem(identifier));
        }
      },
      fnt_detail(item) {
        localStorage.item = CryptoJS.AES.encrypt(JSON.stringify(item), token).toString();
        this.$router.push({
          name: "Detail"         
        });
      },
      fnt_streaming(item) {
        if (this.type == "25caf9e6-7023-442f-b2fc-f33230b219e3") {
          this.fnt_detail(item);
        } else {          
          localStorage.time = 0;
          if (JSON.parse(localStorage.sessionData).control) {
            this.fnt_control(item);
          } else {
            this.$router.push({
              name: "Watch",
              params: {
                item: CryptoJS.AES.encrypt(JSON.stringify(item), token).toString()
              }
            });
          }
        }
      },
      fnt_control
    }
  };
</script>