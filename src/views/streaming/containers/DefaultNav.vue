<template>
  <div v-if="($route.name != 'Profiles' && $route.name != 'Watch' && $route.name != 'Manage_Profile')">
    <transition name="slidedown">
      <DefaultSearch v-if="show" />
    </transition>
    <nav class="default_nav">
      <ul class="default_list">
        <li>
          <router-link :to="{name: 'Browse'}">
            <svg class="svg_icons" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="true" width="24"
              height="24"
              style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
              preserveAspectRatio="xMidYMid meet" viewBox="0 0 1056 1024">
              <path
                d="M1033 513L552 10q-4-5-10-7.5T529 0q-13 0-23 10L23 513q-6 7-8 15t.5 16.5T24 559q5 4 11 6.5t12 2t12-3t10-6.5l44-45v479q0 13 9 22.5t23 9.5h223q4 0 7.5-1t6.5-2.5t6-4t5-5t3.5-5.5t2.5-7t1-7l1-320h255v320q0 13 9.5 22.5t22.5 9.5h224q13 0 22.5-9.5T944 992V513l43 45q9 10 23 10q13 0 22-9q9-10 9.5-23t-8.5-23zm-153-58v505H720V640q0-13-9.5-22.5T688 608H369q-13 0-22.5 9.5T337 640l-1 320H177V455q0-4-1-8L529 79l352 368q-1 4-1 8z" />
            </svg>
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'Series'}">
            <svg class="svg_icons" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="24"
              height="24"
              style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
              preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 896">
              <path
                d="M638 159q2 0 2 3v127q0 39 34 57q3 1 5.5 2l5 2l5 1.5l5 1l5 .5h4.5q10 0 20-2.5t18-8.5l218-123v457L741 556q-16-11-37-11h-6l-6 .5l-6 1.5l-5.5 2l-5.5 3q-6 3-11.5 7.5t-10 10t-7 12t-4.5 13t-2 14.5v125q0 1-.5 2t-1.5 1H66l-2-3V162q0-1 .5-2t1.5-1h572zm352-32q-4 0-8.5 1t-10 3t-9.5 6L704 289V162q0-14-5-26t-14-21t-21-14.5t-26-5.5H66q-27 0-46.5 19.5T0 162v572q0 28 19.5 47.5T66 801h572q27 0 46.5-19.5T704 734V609l263 153q7 7 24 7q7 0 13-3q20-8 20-30V161q0-23-20-31q-6-3-14-3z" />
            </svg>
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'Channels'}">
            <svg class="svg_icons" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="24"
              height="24"
              style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
              preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 896">
              <path
                d="M960 32H64q-26 0-45 18.5T0 96v544q0 26 19 45t45 19h416v96H320q-13 0-22.5 9.5T288 832t9.5 22.5T320 864h384q13 0 22.5-9.5T736 832t-9.5-22.5T704 800H544v-96h416q26 0 45-19t19-45V96q0-27-19-45.5T960 32zm0 608H64V96h896v544z" />
            </svg>
          </router-link>
        </li>
        <li>
          <b-link @click="fnt_toggle_menu">
            <svg class="svg_icons" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="24"
              height="24"
              style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
              preserveAspectRatio="xMidYMid meet" viewBox="0 0 1040 1024">
              <path
                d="M1031 969L720 656q93-111 93-256q0-109-53.5-201t-146-145.5T412.5 0T212 53.5T66.5 199T13 400t53.5 201T212 746.5T413 800q149 0 262-98l310 312q10 10 23 10t22.5-9.5t9.5-23t-9-22.5zM413 737q-92 0-169.5-45.5T121 568.5T76 400t45-168.5t122.5-123t169-45.5t169 45.5t122.5 123T749 400q0 39-9 77t-25.5 71t-39.5 62.5t-52 52.5t-62 39.5t-71 25.5t-77 9z" />
            </svg>
          </b-link>
        </li>
        <li>
          <router-link :to="{name: 'Setting'}">
            <svg class="svg_icons" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="24"
              height="24"
              style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
              preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024">
              <path
                d="M960 415l-82-18q-9-29-24-59l44-74q9-14 13.5-29.5T913 202t-15-29l-45-45q-9-9-21.5-13.5t-25-4T782 115t-22 10l-72 46l-8-4l-8-4l-8-3.5l-8.5-3.5l-8.5-3.5l-8.5-3l-8.5-2.5l-18-84q-5-24-24-43.5T544 0h-64q-25 0-41.5 19T416 64l-21 82q-16 5-31.5 11.5T333 172l-74-47q-13-9-29.5-12.5t-33.5 0t-29 15.5l-46 45q-17 22-15.5 45t15.5 46l47 78q-14 29-22 55l-82 18q-25 5-44.5 23.5T0 483v64q0 24 19 41t45 23l83 20q8 25 21 51l-47 78q-14 23-15.5 46t15.5 45l46 45q20 18 46 17.5t46-14.5l74-47l12 6l12.5 5.5l13 5l13 5L396 878l20 82q6 26 23 45t41 19h64q17 0 32-9.5t24-24t12-30.5l18-83q30-9 58-24l72 46q21 14 47 14.5t46-17.5l45-45q17-22 15.5-45T898 760l-44-74q14-27 23-55l83-20q26-6 45-23t19-41v-64q0-39-41-60q-11-6-23-8zm0 127q-1 1-3 2t-5 2l-6 2l-119 30l-11 33q-4 12-8.5 23.5T797 657l-16 32l63 104q5 9 6 16l-42 42q-4-1-7-2.5t-4-2.5l-105-67l-33 17q-8 4-16 7.5l-16 7l-16 5.5l-35 12l-26 119q-1 4-3 7.5t-4 5.5h-58q-4-6-6-14l-30-118l-34-11q-3-1-5.5-2t-5.5-2l-6-2l-6-2.5l-6-2.5l-6-2.5l-5.5-2.5l-5.5-2.5l-6-3.5l-33-17l-105 67q-7 5-13 5l-42-41q1-7 6-15l65-109l-15-31q-11-22-18-42l-11-34l-117-30q-10-2-16-6v-59q1 0 2.5-1t4-2.5T75 478l121-27l11-35q6-21 18-46l16-31l-65-108q-2-4-4-8.5t-2-7.5l42-42l11 5l107 68l33-17q25-13 52-22l34-11l29-116q2-10 7-16h59l1 3q1 1 1.5 2t1 3t1.5 3l26 121l35 12q25 8 49 20l33 17l103-66q7-4 13-4l42 41q-1 2-2 6t-4 8l-63 105l16 32q7 13 12 25t8 24l11 35l119 27q11 2 14 7zM512.5 320q-79.5 0-136 56T320 512t56.5 136T512 704q40 0 75.5-15t61.5-41t41-61.5t15-74.5q0-80-56.5-136t-136-56zm-.5 320q-53 0-90.5-37.5T384 512t37.5-90.5T512 384t90.5 37.5T640 512t-37.5 90.5T512 640z" />
            </svg>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
  import VueScriptComponent from "vue-script-component";
  import DefaultSearch from "./DefaultSearch";
  export default {
    components: {
      DefaultSearch,
      VueScriptComponent
    },
    computed: {
      show() {
        if (this.$route.name != "Search" && this.$route.name != "Control") {
          this.$store.state.name = this.$route.name;
        }
        return this.$store.state.isVisible;
      }
    },
    methods: {
      fnt_toggle_menu() {
        if (!this.$store.state.isVisible) {
          this.$store.state.isVisible = true;
        } else {
          this.$store.state.isVisible = false;
        }
      }
    }
  };
</script>