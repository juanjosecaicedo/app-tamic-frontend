<template>
  <div v-if="services >= 1">
    <DefaultSlider :item="slider" :config="{infiniteScroll:true,autoPlay:true, wheelControl:false}" />
    <DefaultFavoriteList :type="type" />
    <div class="listing default_carousel" v-for="(item, indx)  in categories" :key="item.title">
      <DefaultCategories :category="item" :type="type" />
    </div>
  </div>
  <div v-else>
    <DefaultService :show="show" />
  </div>
</template>
<script>
  import DefaultSlider from "./containers/DefaultSlider";
  import DefaultFavoriteList from "./containers/DefaultFavoriteList";
  import DefaultService from "./containers/DefaultService";
  import DefaultCategories from "./containers/DefaultCategories";
  export default {
    components: {
      DefaultSlider,
      DefaultFavoriteList,
      DefaultService,
      DefaultCategories
    },
    computed: {
      services() {
        this.show = true;
        return JSON.parse(localStorage.sessionData).activeServices;
      }
    },
    data: () => {
      return {
        slider: [],
        categories: [],
        show: false,
        type: "9608482c-a6c4-4694-8478-16cb9b59c45e",
        plan: null
      };
    },
    mounted() {
      this.plan = JSON.parse(localStorage.sessionData).plans;
      if (!this.plan.length) {
        axios.get("getPlansActives").then(result => {
          this.plan = result.data;
          let session = JSON.parse(localStorage.sessionData);
          session.plans = this.plan;
          localStorage.sessionData = JSON.stringify(session);
          this.plan = JSON.parse(localStorage.sessionData).plans;
          this.fnt_get_slider();
        });
      }
      this.fnt_get_slider();
    },
    methods: {
      fnt_get_slider() {
        this.$store.state.isLoading = true;
        let array = [];
        const map = new Map();
        if (
          localStorage.channel_slider == null &&
          localStorage.channel_categories == null
        ) {
          for (const i in this.plan) {
            Promise.all([
              axios.get("slider", {
                params: {
                  type: this.type,
                  plan: this.plan[i]
                }
              }),
              axios.get("categories/" + this.plan[i], {
                params: {
                  type: this.type
                }
              })
            ]).then(([resultSlider, resultCategories]) => {
              array = resultSlider.data;
              for (const j in array) {
                if (!map.has(array[j].streaming_id)) {
                  map.set(array[j].streaming_id);
                  this.slider.push(array[j]);
                }
              }
              array = resultCategories.data;
              for (const j in array) {
                if (!map.has(array[j].category_id)) {
                  map.set(array[j].category_id);
                  this.categories.push(array[j]);
                }
              }
              localStorage.channel_slider = JSON.stringify(this.slider);
              localStorage.channel_categories = JSON.stringify(this.categories);
              setTimeout(() => {
                this.$store.state.isLoading = false;
              }, 1300);
            });
          }
        } else {
          this.slider = JSON.parse(localStorage.channel_slider);
          this.categories = JSON.parse(localStorage.channel_categories);
          this.$store.state.isLoading = false;

        }
      },
      fnt_send_data(item) {
        this.$router.push({
          name: "Categories",
          params: {
            category: item,
            type: this.type
          }
        });
      }
    }
  };
</script>