<template>
  <div>
    <div class="logo">
      <img src="img/brand/logo.svg" alt="Logo" />
    </div>
    <div class="text-center">
      <h1 class="profile_title mb-5">¿Quién está viendo ahora?</h1>
      <div class="mb-5">
        <hooper :settings="hooperSettings" :infiniteScroll="false">
          <slide v-for="(item, indx) in result" :key="indx" :index="indx">
            <a @click="fnt_browser(item)" class="profile_switcher">
              <img v-lazy="'img/avatars/'+item.img" class="profile_switcher_img" />
              <br />
              <h2 class="perfil">{{item.name}}</h2>
            </a>
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper>
      </div>
      <b-button size="lg" variant="outline-secondary" class="btn_profile" @click="fnt_manage">Administrar perfiles
      </b-button>     
    </div>
  </div>
</template>
<script>
  export default {
    name: "Profiles",
    props: {
      ["isLogin"]: {
        required: false
      }
    },
    beforeCreate: function () {
      document.body.className = "body-streaming";
    },
    data: () => {
      return {
        result: [],
        boton: false,
        hooperSettings: {
          centerMode: false,
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
        text: ""
      };
    },
    async mounted() {
      if (localStorage.getItem("sessionData") != undefined) {
        var session = JSON.parse(localStorage.getItem("sessionData"));
        localStorage.clear();
        localStorage.setItem("sessionData", JSON.stringify(session));
        try {
          await axios.get("/profile/" + session.user_id)
            .then(result => {
              this.result = result.data;
              this.text = "" + this.result.length
            });
        } catch (error) {
          this.text += error
        }
        
        if (this.isLogin == false || this.isLogin == undefined) {
          try {
            await axios
              .post("create/session", {
                user_id: session.user_id,
                email_footprint: session.email_footprint,
                tbl_roles_role_id: session.tbl_roles_role_id,
                tbl_countries_country_id: session.tbl_countries_country_id,
                name: session.name,
                lastname: session.lastname,
                activeServices: session.activeServices,
                email: session.email
              }).then(result => {
                this.text += result.data
              }).catch(error => {
                this.text += result.data
              })
          } catch (error) {
            this.text += error
          }
        }
      } else {
        localStorage.clear();
        this.$router.push({
          name: "Login"
        });
      }
    },
    created() {
      if (JSON.parse(localStorage.sessionData).activeServices < 1) {
        this.$router.push({
          name: "Setting"
        })
      }
    },
    methods: {
      fnt_browser(item) {
        localStorage.profile = JSON.stringify({
          display_id: item.display_id,
          name: item.name,
          img: item.img
        });
        if (JSON.parse(localStorage.sessionData).activeServices > 0) {
          this.$router.push({
            name: "Browse"
          });
        } else {
          this.$router.push({
            name: "Setting"
          });
        }
      },
      fnt_manage() {
        this.$router.push({
          name: "Manage_Profile"
        });
      }
    }
  };
</script>