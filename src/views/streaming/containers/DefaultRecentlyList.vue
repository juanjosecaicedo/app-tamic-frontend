<template>
  <div v-if="$store.state.recently_list.length">
    <div class="listing default_carousel">
      <div class="carousel_head">
        <h2 class="category_title">Continuar viendo</h2>
      </div>
      <hooper :settings="hooperSettings" :wheelControl="false" :mouseDrag="false" :keysControl="false"
        :shortDrag="false">
        <slide v-for="(item, indx) in list" :key="indx" :index="indx">
          <div class="item_container">
            <div class="card_item">
              <div class="card_img lazyloaded">
                <button @click="fnt_delete_item(item)" type="button" aria-label="Eliminar" class="delete">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                      width="20" height="20" viewBox="0 0 47.971 47.971"
                        style="enable-background:new 0 0 47.971 47.971;" xml:space="preserve">
                        <path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
                        c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
                        C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
                        s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z" fill="#ffffff" />
                    </svg>
                </button>
                <button @click="fnt_streaming(item)" type="button" aria-label="Ver" class="play_video">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="50" height="50" viewBox="0 0 16 16">
                    <path fill="#ffffff"
                      d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z" />
                    <path fill="#ffffff" d="M6 4v8l6-4z" />
                  </svg>
                </button>
                <!-- <b-link> -->
                <img v-lazy="item.img_streaming" />
                <!-- </b-link> -->
                <b-progress class="progress-xs mt-2 loading_video" :precision="1" :value="(item.time/70)"
                  variant="danger"></b-progress>
              </div>
              <h6 class="card_name default_title">{{item.title}}</h6>
            </div>
          </div>
        </slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
      </hooper>
    </div>
  </div>
</template>
<script>
  import {
    fnt_control
  } from "@/shared/utils";

  export default {
    props: {
      type: {
        required: true
      }
    },
    computed: {
      list() {
        return this.$store.state.recently_list;
      }
    },
    mounted() {
      this.fnt_get_streaming();
    },
    data: () => {
      return {
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
      fnt_get_streaming() {
        let identifier = "list-" + this.type;
        if (localStorage.getItem(identifier) == null) {
          if (localStorage.getItem("profile") != undefined) {
            Promise.all([
              axios.get(
                "recently/list/" + JSON.parse(localStorage.profile).display_id, {
                  params: {
                    type: this.type
                  }
                }
              )
            ]).then(([resultStreaming]) => {
              this.$store.state.recently_list = resultStreaming.data;
              if (this.$store.state.recently_list.length) {
                localStorage.setItem(
                  identifier,
                  JSON.stringify(this.$store.state.recently_list)
                );
              }
            });
          }
        } else {
          this.$store.state.recently_list = JSON.parse(
            localStorage.getItem(identifier)
          );
        }
      },
      fnt_streaming(item) {
        if (item.time != null) {
          localStorage.time = item.time;
        } else {
          localStorage.time = 0;
        }
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
      },      
      fnt_delete_item(value) {
        axios.post("delete/recently/list", {
          display: JSON.parse(localStorage.profile).display_id,
          streaming: value.streaming_id
        });
        let identifier = "list-" + this.type;
        this.$store.state.recently_list = this.$store.state.recently_list.filter(
          item => item.streaming_id !== value.streaming_id
        );
        localStorage[identifier] = JSON.stringify(
          this.$store.state.recently_list
        );
      },
      fnt_control
    }
  };
</script>