<template>
  <div>
    <hooper :infiniteScroll="config.infiniteScroll" :autoPlay="config.autoPlay"
      :playSpeed="config.playSpeed !== undefined ? config.playSpeed: 5000"
      :wheelControl="config.wheelControl !== undefined ? config.wheelControl : false"
      :mouseDrag="item.length > 1 ? true : false" :touchDrag="item.length > 1 ? true : false"
      :keysControl="item.length > 1 ? true : false" :shortDrag="item.length > 1 ? true : false">
      {{item.length}}
      <slide v-for="(item, indx) in item" :key="indx" :index="indx">
        <div class="slider">
          {{item.length}}
          <div class="backdrop_slider" v-if="item != null">
            <button @click="fnt_streaming(item)" type="button" aria-label="Ver" class="play_slider">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                width="60" height="60" viewBox="0 0 16 16">
                <path fill="#ffffff"
                  d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z" />
                <path fill="#ffffff" d="M6 4v8l6-4z" />
              </svg>
            </button>
            <img class="image_slider" v-lazy="fnt_img(item)" />
          </div>
          <div class="pane_slider">
            <div>
              <h1 class="name_slider">{{item.title}}</h1>
              <div class="meta_slider">
                <div class="info_slider">
                  <rate :value="item.popularity" size="22px" />
                  <span>{{item.year}}</span>
                  <span>{{item.duration}}</span>
                </div>
              </div>
              <div class="desc_slider" v-if="$route.name != 'Detail'">{{item.description}}</div>
              <b-button-group>
                <button @click="fnt_streaming(item)" type="button" class="button trailer_slider">
                  <span class="icon txt">
                    <li class="fa fa-play"></li>
                  </span>
                  <span class="icon txt">Ver ahora</span>
                </button>&nbsp;
                <button @click="fnt_favorite_list(item)" type="button" class="button btn-list trailer_slider_list">
                  <span class="icon txt">
                    <li class="fa fa-plus"></li>
                  </span>
                  <span class="icon txt">Mi lista</span>
                </button>&nbsp;
                <button @click="$bvModal.show('bv-modal')" class="button btn-list trailer_slider_list btn-tv"
                  style="background: #202124 !important"><span class="icon txt">
                    <li class="fa fa-tv"></li>
                  </span>
                  <span class="icon txt">Ver TV</span>
                </button>
              </b-button-group>
            </div>
          </div>
        </div>
      </slide>
    </hooper>
    <b-modal id="bv-modal" hide-backdrop title="Tamic TV" cancelTitle="Cancelar" okTitle="Aceptar">
      <b>Opción 1:</b>
      <p>Ingresa la siguiente dirección en el navegador de tu Smart TV <a href="#">www.apptamic.com/tv</a> pon tus datos
        de correo y contraseña y disfruta</p>
      <b>Opción 2:</b>
      <p>Comparte la pantalla de tu celular con tu Smart TV y disfruta</p>
      <!--<b-form-radio-group v-model="selected" :options="options" plain name="plain-inline"></b-form-radio-group>-->
    </b-modal>
  </div>
</template>
<script>
  import {
    fnt_control,
    fnt_toast
  } from "@/shared/utils";
  export default {
    props: {
      item: {
        type: Array,
        required: true
      },
      config: {
        type: Object,
        required: true
      }
    },
    data: () => {
      return {
        selected: 'market://details?id=com.soomapps.screenmirroring',
        options: [{
          text: 'Duplicar pantalla - Android',
          value: 'market://details?id=com.soomapps.screenmirroring'
        }]
      }
    },
    methods: {
      fnt_img(item) {
        if (item.img_banner) {
          return item.img_banner;
        } else {
          return false;
        }
      },
      fnt_streaming(item) {
        localStorage.time = 0;
        if (JSON.parse(localStorage.sessionData).control) {
          this.fnt_control(item);
        } else {
          if (item.tbl_types_type_id == "9608482c-a6c4-4694-8478-16cb9b59c45e") {
            axios.get("create/visit/" + item.streaming_id);
            window.location.href = "http://apptamic.herokuapp.com/watch.html?item=" + item.streaming_id +
              "&token=" + JSON.parse(localStorage.sessionData).email_footprint
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
      fnt_open_link() {
        this.$bvModal.hide('bv-modal')
        window.open(this.selected,
          '_blank');
      },
      fnt_favorite_list(item) {
        let isNew = true;
        for (const j in this.$store.state.favorite_list) {
          if (
            item.streaming_id == this.$store.state.favorite_list[j].streaming_id
          ) {
            isNew = false;
            break;
          }
        }
        if (isNew) {
          if (localStorage.getItem("profile") != undefined) {
            axios.post("create/favorite/list", {
              display: JSON.parse(localStorage.profile).display_id,
              streaming: item.streaming_id
            });
            this.$store.state.favorite_list.push(item);
            localStorage["list-" + item.tbl_types_type_id] = JSON.stringify(
              this.$store.state.favorite_list
            );
          } else {
            fnt_toast("Debe tener un perfil seleccionado, por favor, ir a administrar perfiles o volver a ingresar",
              this.$bvToast);
          }
        }
      },
      fnt_control
    }
  };
</script>