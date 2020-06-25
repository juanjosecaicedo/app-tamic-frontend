<template>
  <div>
    <DefaultSlider :item="slider" :config="{
      infiniteScroll:false,
      autoPlay:false
      }" />
    <div class="spacing info_detail">
      <div class="left_detail-">
        <div class="poster_detail">
          <img :src="item.img_streaming" />
        </div>
      </div>
      <div class="right_detail">
        <div class="float-right">
          <b-button size="sm" variant="outline-secondary" v-b-modal.modal-support>
            <li class="fa fa-wrench"></li>&nbsp;Soporte</span>
          </b-button>
          <b-modal title="Soporte técnico" id="modal-support" hide-footer centered>
            <div class="d-block">
              <form @submit.prevent="fnt_send_support(item)">
                <b-form-group label="Seleccionar una opción:" class="my-1 mb-3">
                  <b-form-checkbox-group size="sm" stacked v-model="option" :options="options" name="flavour-1" />
                  <br>
                  <b-form-input placeholder="Otro" v-model="other" />
                </b-form-group>
                <div class="my-1 mb-3 text-center">
                  <b-button type="submit" class="mt-3 text-center" variant="primary" block>Enviar</b-button>
                </div>
              </form>
            </div>
          </b-modal>
        </div>
        <div class="overview_detail">
          <h2 class="title_detail">General</h2>
          <div>{{item.description}}</div>
        </div>
        <div class="stats_detail">
          <ul class="default_list">
            <li>
              <div class="label_detail">País</div>
              <div class="value_detail">{{item.country_name}}</div>
            </li>
            <li>
              <div class="label_detail">Duración</div>
              <div class="value_detail">{{item.duration}}</div>
            </li>
            <li>
              <div class="label_detail">Año</div>
              <div class="value_detail">{{item.year}}</div>
            </li>
            <li>
              <div class="label_detail">Popularidad</div>
              <div class="value_detail">&nbsp;{{item.popularity}}</div>
            </li>
          </ul>
          <br>
          <select v-if="item.tbl_types_type_id == '25caf9e6-7023-442f-b2fc-f33230b219e3'" v-model="selected"
            @change="fnt_on_change">
            <option v-for="option in season" :value="option.season" :key="option.season">Temporada {{ option.season }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div v-if="item.tbl_types_type_id == '25caf9e6-7023-442f-b2fc-f33230b219e3'">
      <div class="chapters_carousel">
        <hooper :infiniteScroll="true" :settings="hooperSettings">
          <slide v-for="(chapter, indx) in chapters" :key="indx" :index="indx">
            <div class="item_detail">
              <b-link @click="fnt_streaming(chapter)" class="card_link">
                <div class="image_detail lazyloaded card_img">
                  <button type="button" aria-label="Ver" class="play_video">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                      width="50" height="50" viewBox="0 0 16 16">
                      <path fill="#ffffff"
                        d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z" />
                      <path fill="#ffffff" d="M6 4v8l6-4z" />
                    </svg>
                  </button>
                  <img v-lazy="fnt_img(chapter)" />
                </div>
              </b-link>
              <div class="name_detail">
                <strong>Episodio {{chapter.consecutive}}</strong>
              </div>
            </div>
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    fnt_toast,
    fnt_control
  } from "@/shared/utils";
  import DefaultSlider from "./containers/DefaultSlider";
  export default {
    components: {
      DefaultSlider
    },
    data: () => {
      return {
        slider: [],
        season: [],
        chapters: [],
        selected: "1",
        option: "",
        other: "",
        item: Object,
        hooperSettings: {
          itemsToShow: 3,
          breakpoints: {
            800: {
              itemsToShow: 4
            },
            1000: {
              itemsToShow: 5
            },
            1200: {
              itemsToShow: 5
            }
          }
        },
        options: [{
            text: 'El video no se reproduce',
            value: 'El video no se reproduce'
          },
          {
            text: 'No permite ingresar al video',
            value: 'No permite ingresar al video'
          },
          {
            text: 'El video se demora en cargar',
            value: 'El video se demora en cargar'
          }
        ]
      };
    },
    mounted() {
      this.$store.state.isLoading = false;
      this.fnt_validate();
      this.fnt_slider();
      if (this.item.tbl_types_type_id == '25caf9e6-7023-442f-b2fc-f33230b219e3') {
        this.fnt_season();
        this.fnt_get_chapters();
      }
    },
    methods: {
      fnt_img(item) {
        if (item.img_chapter) {
          return item.img_chapter;
        } else {
          return false;
        }
      },
      fnt_season() {
        Promise.all([axios.get("season/" + this.item.streaming_id)]).then(
          ([result]) => {
            this.season = result.data;
          }
        );
      },
      fnt_on_change() {
        if (this.selected <= 0 || this.selected == null) {
          this.selected = 1;
        }
        this.fnt_get_chapters();
      },
      fnt_get_chapters() {
        Promise.all([
          axios.get("season/chapters/" + this.item.streaming_id, {
            params: {
              season: this.selected
            }
          })
        ]).then(([result]) => {
          this.chapters = result.data;
        });
      },
      fnt_slider() {
        for (const i in this.item) {
          this.slider.push(this.item);
        }
      },
      fnt_validate() {
        if (localStorage.getItem("item") === undefined || localStorage.getItem("item") === null) {
          this.$router.push({
            name: "Setting"
          });
        } else {
          this.item = JSON.parse(CryptoJS.AES.decrypt(localStorage.item, token).toString(CryptoJS.enc.Utf8));
        }
      },
      fnt_streaming(item) {
        localStorage.time = 0;
        item.img_streaming = this.item.img_streaming;
        item.title = this.item.title;
        item.tbl_types_type_id = this.item.tbl_types_type_id;
        if (JSON.parse(localStorage.sessionData).control) {
          item.streaming_id = item.tbl_streaming_streaming_id;
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
      fnt_send_support(item) {
        if (this.option == "" && this.other == "") {
          fnt_toast("Debe ingresar toda la información", this.$bvToast);
        } else {
          axios.post("send/email", {
            name: JSON.parse(localStorage.sessionData).name,
            from: JSON.parse(localStorage.sessionData).email,
            message: this.option + "<br>" + this.other + "<br>Error en el streaming: " + item.streaming_id
          }).then(result => {
            if (result.status == 200) {
              fnt_toast("Hola, " + JSON.parse(localStorage.sessionData).name + " revisaremos tu solicitud", this
                .$bvToast);
              this.$bvModal.hide('modal-support')
            } else {
              fnt_toast("Error en el envío, intentar nuevamente", this.$bvToast);
            }
            this.option = "";
            this.other = "";
          })
        }
      },
      fnt_control
    }
  };
</script>