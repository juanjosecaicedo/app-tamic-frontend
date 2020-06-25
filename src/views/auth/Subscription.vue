<template>
  <div class="app flex-row align-items-center landing_page" lazy="loaded">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8" class="d-lg-none">
          <hooper :infiniteScroll="true">
            <slide :itemsToShow="2" v-for="(item, indx) in plans" :key="indx" :index="indx">
              <b-card no-body
                :class="[item.dispositives > 3 && item.interval_count <= 30 ? 'text-white bg-primary' : item.dispositives > 3 && item.interval_count > 30 ? 'text-white bg-warning' : '']">
                <b-card-body class="card-body justify-content-center">
                  <div class="text-center">
                    <h1 class="card-title">{{item.name}}</h1>
                    <br />
                    <h2>
                      <sup>$</sup>
                      {{fnt_format_price(item.value)}}
                      <small style="font-size: 19px">/ {{item.interval_count}}
                        {{fnt_get_interval(item.interval_type)}}</small>
                    </h2>
                  </div>
                  <br />
                  <hr class="mt-0" />
                  <br />
                  <ul class="fa-ul">
                    <div v-for="list in fnt_splited_list(item.description)" :key="list.id">
                      <li>
                        <i class="fa fa-check"></i>
                        {{list}}
                      </li>
                      <br />
                    </div>
                    <li class="fa fa-check" />
                    Dispositivos disponibles: {{item.dispositives}}
                    <br />
                  </ul>
                  <br />
                  <div align="center">
                    <b-col md="8">
                      <router-link
                        :class="[item.dispositives >= 3 ? 'btn btn-outline-light btn-block mt-3' : 'btn btn-outline-primary btn-block mt-3']"
                        :to="{ name: 'Register', params: { 
                      plan_id: item.plan_id, 
                      name:  item.name,
                      description: item.description,
                      interval_type: item.interval_type,
                      interval_count: item.interval_count,
                      value: item.value,
                      }}">Empezar</router-link>
                    </b-col>
                  </div>
                </b-card-body>
              </b-card>
            </slide>
            <hooper-pagination slot="hooper-addons"></hooper-pagination>
          </hooper>
        </b-col>
        <b-col md="9" class="d-md-down-none">
          <b-card-group>
            <b-card v-for="item in plans" :key="item.plan_id" no-body
              :class="[item.dispositives > 3 && item.interval_count <= 30 ? 'text-white bg-primary' : item.dispositives > 3 && item.interval_count > 30 ? 'text-white bg-warning' : '']">
              <b-card-body class="card-body justify-content-center">
                <div class="text-center">
                  <h1 class="card-title">{{item.name}}</h1>
                  <br />
                  <h2>
                    <sup>$</sup>
                    {{fnt_format_price(item.value)}}
                    <small style="font-size: 19px">/ {{item.interval_count}}
                      {{fnt_get_interval(item.interval_type)}}</small>
                  </h2>
                </div>
                <br />
                <hr class="mt-0" />
                <br />
                <ul class="fa-ul">
                  <div v-for="list in fnt_splited_list(item.description)" :key="list.id">
                    <li>
                      <i class="fa fa-check"></i>
                      {{list}}
                    </li>
                    <br />
                  </div>
                  <li class="fa fa-check" />
                  Dispositivos disponibles: {{item.dispositives}}
                  <br />
                </ul>
                <br />
                <div align="center">
                  <b-col md="8">
                    <router-link
                      :class="[item.dispositives >= 3 ? 'btn btn-outline-light btn-block mt-3' : 'btn btn-outline-primary btn-block mt-3']"
                      :to="{ name: 'Register', params: { 
                      plan_id: item.plan_id, 
                      name:  item.name,
                      description: item.description,
                      interval_type: item.interval_type,
                      interval_count: item.interval_count,
                      value: item.value,
                      }}">Empezar</router-link>
                  </b-col>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
  import {
    fnt_toast,
    fnt_format_price,
    fnt_get_interval,
    fnt_splited_list
  } from "@/shared/utils";
  export default {    
    beforeCreate: function () {
      document.body.className = "subscription";
      fnt_toast("Selecciona un plan", this.$bvToast);
      Promise.all([axios.get("plan/active")]).then(([resultPlan]) => {
        this.plans = resultPlan.data;
      });
    },
    data: () => {
      return {
        plans: []
      };
    },
    methods: {
      fnt_format_price,
      fnt_splited_list,
      fnt_get_interval
    }
  }
</script>