<template>
  <div>
    <div v-if="item != null && !modal">
      <div id="streaming"></div>
      <VueScriptComponent
        script="<script type='text/javascript' src='https://cdn.jwplayer.com/libraries/EmOoxjWK.js'></script>" />
      <VueScriptComponent :script="data" />
      <VueScriptComponent v-if="stop" script="<script type='text/javascript'>jwplayer('streaming').stop()</script>" />
    </div>
    <b-modal id="bv-modal-example" hide-footer>
      <template v-slot:modal-title>
        No hay pantallas disponibles
      </template>
      <div class="d-block text-center">
        <h3>Tienes un plan de {{displays}} pantallas.</h3>
      </div>
      <div class="d-block text-left">
        <p>Hay <strong>{{displays}}</strong> usuarios viendo contenido.</p>
      </div>
      <b-button variant="outline-secondary" class="mt-3" block @click="fnt_back_browser">Volver</b-button>
    </b-modal>
  </div>
</template>
<script>
  import VueScriptComponent from "vue-script-component";
  export default {
    components: {
      VueScriptComponent
    },
    beforeCreate: function () {
      this.$store.state.stop = false;
      document.body.className = "watch";
      axios.post('/WatchMovie').then((response) => {
        if (response.data[0].screen_available) {
          this.fnt_validate();
        } else {
          this.modal = true;
          this.displays = response.data[0].dispositives;
          this.$bvModal.show('bv-modal-example');
        }
      });
    },
    computed: {
      stop() {
        return this.$store.state.stop;
      }
    },
    mounted() {
      this.fnt_validate();
      this.fnt_get_data();
    },
    beforeUpdate: function () {
      axios.get("create/visit/" + this.item.streaming_id);
    },
    beforeDestroy() {
      document.body.className = "";
      this.$store.state.stop = true;
      axios.post('/NotWatchMovie');
      if (this.item != null && this.item.tbl_types_type_id != "9608482c-a6c4-4694-8478-16cb9b59c45e") {
        if ((this.item.tbl_types_type_id == "3850baec-fdae-4c39-bf30-33e82a363755" && this.item.chapter_id == null) || (
            this.item.tbl_types_type_id == "25caf9e6-7023-442f-b2fc-f33230b219e3" && this.item.chapter_id != null)) {
          let isNew = true,
            data = null;
          if (this.type == "chapter") {
            this.item.streaming_id = this.item.tbl_streaming_streaming_id;
            data = JSON.stringify({
              watch: {
                time: JSON.parse(localStorage.JWPlayerPosition),
                chapter: this.item.chapter_id
              },
              chapters: [{
                chapter_id: this.item.chapter_id,
                time: JSON.parse(localStorage.JWPlayerPosition)
              }]
            });
          }
          for (const j in this.$store.state.recently_list) {
            if (this.item.streaming_id == this.$store.state.recently_list[j].streaming_id) {
              isNew = false;
              this.$store.state.recently_list[j] = this.item;
              this.$store.state.recently_list[j].time = JSON.parse(localStorage.JWPlayerPosition);
              localStorage["list-" + this.type] = JSON.stringify(this.$store.state.recently_list);
              axios.post("update/recently/list", {
                time: JSON.parse(localStorage.JWPlayerPosition),
                chapter: this.item.chapter_id,
                streaming: this.item.streaming_id,
                display: JSON.parse(localStorage.profile).display_id
              });
              break;
            }
          }
          if (isNew) {
            if (localStorage.getItem("profile") != undefined) {
              axios.post("create/recently/list", {
                type: this.type,
                streaming: this.item.streaming_id,
                time: JSON.parse(localStorage.JWPlayerPosition),
                display: JSON.parse(localStorage.profile).display_id,
                data: data
              });
              this.item.time = JSON.parse(localStorage.JWPlayerPosition);
              this.$store.state.recently_list.push(this.item);
              localStorage["list-" + this.type] = JSON.stringify(this.$store.state.recently_list);
            }
          }
        }
      }
    },
    data() {
      return {
        envirotment: process.env,
        modal: false,
        displays: 0,
        data: "",
        type: "",
        item: null
      };
    },
    methods: {
      fnt_back_browser() {
        this.$bvModal.hide('bv-modal-example');
        this.$router.push({
          name: "Browse"
        });
      },
      fnt_get_data() {
        if (this.item != null && this.item != undefined) {
          if (this.item.chapter_id != null) {
            this.item.url_streaming = this.item.url_chapter;
            this.item.streaming_id = this.item.chapter_id;
            this.type = "chapter";
            // localStorage.item = this.item.tbl_streaming_streaming_id;
          } else {
            this.type = "streaming";
          }          


          this.data =
            "<script type='text/javascript'>" +
            "jwplayer('streaming').setup({" +
            "playlist:'" +  process.env.VUE_APP_ROOT_API + "get/link/" + this.item.streaming_id + "?email=" + JSON
            .parse(
              localStorage.sessionData).email_footprint + "&type=" + this.type + "'," +
            "title: '" + this.item.title + "'," +
            "image: '" + this.item.img_banner + "'," +
            "logo: {file: '"+ process.env.VUE_APP_HOST + "img/brand/logo.svg', position: 'top-right', hide:true,  link: '"+process.env.VUE_APP_HOST+"#/streaming/browse', linktarget: '_self'}," +
            "autostart:true," + "});" +
            "jwplayer('streaming').on('ready', function(){jwplayer('streaming').seek(" + JSON.parse(localStorage
              .time) +
            ")});" +
            "jwplayer('streaming').on('time', function(){localStorage['JWPlayerPosition'] = jwplayer('streaming').getPosition()});" +
            "jwplayer('streaming').on('setupError', function(){jwplayer('streaming').stop()});" +
            "jwplayer('streaming').on('error', function(){jwplayer('streaming').stop()});" +
            "jwplayer('streaming').on('all', function(){" +
               "var botonRegresar = document.getElementById('video_regresar_1');" +
               "if(botonRegresar == undefined){ " +
                    "var ht = document.getElementById('streaming').getElementsByClassName('jw-wrapper jw-reset');" +
                    "if(ht != undefined){ " +
                        "ht[0].insertAdjacentHTML('beforeend', '<div id=\"video_regresar_1\" class=\"jw-logo jw-logo-top-left jw-hide jw-reset\" tabindex=\"0\"><a href=\""+process.env.VUE_APP_HOST+"#/streaming/browse\" type=\"button\" style=\"color: white;\"><i class=\"fa fa-arrow-left fa-lg\" style=\"margin: 4px;\" aria-hidden=\"true\"></i>Regresar</div>');" +
                    "}" +
                "}" +
            "})"+
            "<\/script>";
        } else {
          this.$router.push({
            name: "Detail"
          });
        }
      },
      fnt_validate() {
        if (this.$route.params.item === undefined || this.$route.params.item === null) {
          this.$router.push({
            name: "Setting"
          });
        } else {
          try {
            this.item = JSON.parse(CryptoJS.AES.decrypt(this.$route.params.item, token).toString(CryptoJS.enc.Utf8));
          } catch (error) {
            this.$router.push({
              name: "Setting"
            });
          }
        }
      }
    }
  };
</script>