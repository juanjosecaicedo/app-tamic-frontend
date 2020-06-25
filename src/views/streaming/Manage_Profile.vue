<template>
  <div v-if="edit==false">
    <div class="logo">
      <img src="img/brand/logo.svg" alt="Logo" />
    </div>
    <div class="text-center">
      <h1 class="profile_title mb-5">Elegir perfil</h1>
      <div class="mb-5">
        <hooper :settings="hooperSettings" :infiniteScroll="false">
          <slide v-for="(item, indx) in result" :key="indx" :index="indx">
            <a @click="fnt_browser(item)" style="background: none !important" class="profile_switcher">
              <img v-lazy="'img/avatars/'+item.img" class="profile_switcher_img" />
              <br />
              <span class="fa-stack fa-sm profile_switcher_edit">
                <i class="fa fa-pencil fa-stack-1x"></i>
              </span>
              <h2 class="perfil">{{item.name}}</h2>
            </a>
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper>
      </div>
      <b-button size="lg" variant="outline-secondary" class="btn_profile" @click="fnt_manage">Listo</b-button>
    </div>
  </div>
  <div v-else-if="edit=true">
    <div class="logo">
      <img src="/img/logo.png" alt="Logo" />
      </a>
    </div>
    <div class="container">
      <center>
        <form method="post" id="form" v-if="change_img == false">
          <div class="col-lg-8 col-lg-offset-2">
            <div style="clear: both">
              <h1 style="color:#fff">Editar Perfil</h1>
              <br>
            </div>
            <hr style="border-top:1px solid #333;">
            <a @click="$store.state.change_img = true" v-b-modal.staticBackdrop class="mb-5 profile_switcher"
              style="background: none !important">
              <img v-lazy="'img/avatars/'+this.img" class="profile_switcher_img manage_profile" />
              <br />
              <span class="fa-stack fa-sm profile_switcher_edit">
                <i class="fa fa-pencil fa-stack-1x"></i>
              </span>
              <br>
            </a>
            <div class="mb-2">
              <b-input type="text" class="input_black" v-model="name" />
            </div>
            <hr style="border-top:1px solid #333;">
            <b-row>
              <b-col class="mb-2" lg="6" sm="5">
                <div v-if="this.name==null">
                  <b-button size="lg" variant="outline-secondary" class="btn_profile" disabled @click="change()">Guardar
                  </b-button>
                </div>
                <div v-else-if="this.name!= null ">
                  <b-button size="lg" variant="outline-secondary" class="btn_profile" @click="change()">Guardar
                  </b-button>
                </div>
              </b-col>
              <b-col lg="6" sm="6">
                <b-button size="lg" variant="outline-secondary" class="btn_profile" @click="edit=false">Volver
                </b-button>
              </b-col>
            </b-row>
          </div>
        </form>
        <br>
        <div v-if="change_img == true">
          <h1 style="color:#fff">Elegir imagen</h1>
          <br>
          <hooper :itemsToShow="4" :settings="hooperSettings" :infiniteScroll="false">
            <slide v-for="(item, indx) in item_img" :key="indx" :index="indx">
              <b-link @click="img = item, $store.state.change_img = false" style="background: none !important">
                <img v-lazy="'img/avatars/'+item" class="profile_switcher_img" />
              </b-link>
            </slide>
            <hooper-navigation slot="hooper-addons"></hooper-navigation>
          </hooper>
        </div>
      </center>
    </div>
  </div>
</template>
<script>
  export default {
    computed: {
      change_img() {
        return this.$store.state.change_img
      }
    },
    data: () => {
      return {
        result: [],
        edit: false,
        img: "",
        item_img: ['thumb1.png', 'thumb2.png', 'thumb3.png', 'thumb4.png'],
        name_profile: "",
        display_id: "",
        hooperSettings: {
          itemsToShow: 1,
          breakpoints: {
            800: {
              itemsToShow: 4
            },
            1000: {
              itemsToShow: 4
            },
            1200: {
              itemsToShow: 4
            }
          }
        },
      };
    },
    mounted() {
      Promise.all([
        axios.get("/profile/" + JSON.parse(localStorage.sessionData).user_id)
      ]).then(([result]) => {
        this.result = result.data;
      });
    },
    methods: {
      get_profile() {
        Promise.all([
          axios.get("/profile/" + JSON.parse(localStorage.sessionData).user_id)
        ]).then(([result]) => {
          this.result = result.data;
        });
      },
      change() {
        Promise.all([
          axios.post("/profile_change", {
            display_id: this.display_id,
            img: this.img,
            name: this.name
          })
        ]).then((result) => {
          this.get_profile();
          this.edit = false;
        });
      },
      fnt_browser(item) {
        this.img = item.img
        this.name = item.name
        this.display_id = item.display_id
        this.edit = true
      },
      fnt_manage() {
        this.$router.push({
          name: "Profiles"
        });
      }
    }
  };
</script>