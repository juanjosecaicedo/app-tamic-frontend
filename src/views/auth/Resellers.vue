<template>
  <div class="app flex-row align-items-center landing_page" lazy="loaded">
    <div class="container">
        <b-row class="justify-content-center">
            <b-col md="12">
                <div class="header_resellers">
                    <h1 class="card-title">RESELLERS</h1>
                    <p>
                        Elige tu plan de preferencia para resellers y genera altas ganancias vendiendo cuentas de <span>TAMIC</span>, con
                        Demos ilimintados, efectúa el pago y envíanos tus datos nombres, apellidos, correo electrónico, teléfono fijo o celular, 
                        ciudad y país con el soporte de pago al correo 
                        <a :href="fnt_convert_email('pagos@apptamic.com')" >{{fnt_convert_email('pagos@apptamic.com')}}</a>.
                        Las cuentas no tienen vencimiento y estan autorizadas para su venta en cualquier pais.
                        <br>
                        <br>
                        Enviaremos la información de las cuentas adquiridas a tu correo electrónico una vez recibamos tu información y el 
                        soporte del pago.
                    </p>
                </div>
            </b-col>
        </b-row>
        <b-row class="justify-content-center">
            <b-col md="8" class="d-lg-none">
                <hooper :infiniteScroll="true">
                    <slide :itemsToShow="2" v-for="(item, indx) in plans" :key="indx" :index="indx">
                        <b-card no-body
                            :class="[ (item.type_plan == 'basic') ? '' :  (item.type_plan == 'premium') ? 'text-white bg-primary' : 'text-white bg-warning'    ]" >
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
                            <br/>
                            <div align="center">
                                <b-col md="8">
                                    <div>
                                        <b-form>
                                            <VueScriptComponent
                                            :script="fnt_get_buttom_payment(item)" 
                                            />
                                        </b-form>
                                    </div>
                                </b-col>
                            </div>
                            </b-card-body>
                        </b-card no-body>
                    </slide>
                    <hooper-pagination slot="hooper-addons"></hooper-pagination>
                </hooper>
            </b-col>
            <b-col md="12" class="d-md-down-none">
                <b-card-group>
                    <b-card v-for="item in plans" :key="item.plan_id" no-body v-if="item.type_plan == 'basic'">
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
                            <hr class="mt-1" />
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
                                    <div>
                                        <b-form>
                                            <VueScriptComponent
                                            :script="fnt_get_buttom_payment(item)" 
                                            />
                                        </b-form>
                                    </div>
                                </b-col>
                            </div>
                        </b-card-body>
                    </b-card>                    
                </b-card-group>
                <br>
                <b-card-group>
                    <b-card v-for="item in plans" :key="item.plan_id" no-body v-if="item.type_plan == 'premium'" class="text-white bg-primary">
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
                            <hr class="mt-1" />
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
                                    <div>
                                        <b-form>
                                            <VueScriptComponent
                                            :script="fnt_get_buttom_payment(item)" 
                                            />
                                        </b-form>
                                    </div>
                                </b-col>
                            </div>
                        </b-card-body>
                    </b-card>                    
                </b-card-group>
                <br>
                <b-card-group>
                    <b-card v-for="item in plans" :key="item.plan_id" no-body v-if="item.type_plan == 'adult'" class="text-white bg-warning">
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
                            <hr class="mt-1" />
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
                                    <div>
                                        <b-form>
                                            <VueScriptComponent
                                            :script="fnt_get_buttom_payment(item)" 
                                            />
                                        </b-form>
                                    </div>
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
    fnt_splited_list,
    fnt_convert_email
  } from "@/shared/utils";
  import VueScriptComponent from "vue-script-component";
  export default {    
    beforeCreate: function () {
      document.body.className = "resellers";
      fnt_toast("Selecciona un plan para Reseller", this.$bvToast);     
    },
    components: {
      VueScriptComponent
    },
    data: () => {
      let dataAditional = "; Contenido HD; Multidispositivo: portátil, TV, teléfono y Tableta; Todas las película, series y canales de deseos";
      return {
        plans: [
            {
                plan_id: 0, 
                name:  "Plan Reseller Basico 1",
                description: "40 Cuentas" + dataAditional,
                description_payment: "Plan Resseller 40 Cuentas",
                interval_type: "day",
                interval_count: "30",
                value: "72",
                dispositives: "2",
                type_plan: "basic"
            },
            {
                plan_id: 1, 
                name:  "Plan Reseller Basico 2",
                description: "80 Cuentas" + dataAditional,
                description_payment: "Plan Resseller 80 Cuentas",
                interval_type: "day",
                interval_count: "30",
                value: "144",
                dispositives: "2",
                type_plan: "basic"
            },
            {
                plan_id: 2, 
                name:  "Plan Reseller Basico 3",
                description: "120 Cuentas" + dataAditional,
                description_payment: "Plan Resseller 120 Cuentas",
                interval_type: "day",
                interval_count: "30",
                value: "216",
                dispositives: "2",
                type_plan: "basic"
            },
            {
                plan_id: 3, 
                name:  "Plan Reseller Premium 1",
                description: "40 Cuentas" + dataAditional,
                description_payment: "Plan Resseller Premium 40 Cuentas",
                interval_type: "day",
                interval_count: "30",
                value: "120",
                dispositives: "4",
                type_plan: "premium"
            },
            {
                plan_id: 4, 
                name:  "Plan Reseller Premium 2",
                description: "80 Cuentas" + dataAditional,
                description_payment: "Plan Resseller Premium 80 Cuentas",
                interval_type: "day",
                interval_count: "30",
                value: "240",
                dispositives: "4",
                type_plan: "premium"
            },
            {
                plan_id: 5, 
                name:  "Plan Reseller Premium 3",
                description: "120 Cuentas" + dataAditional,
                description_payment: "Plan Resseller Premium 120 Cuentas",
                interval_type: "day",
                interval_count: "30",
                value: "360",
                dispositives: "4",
                type_plan: "premium"
            },
            {
                plan_id: 6, 
                name:  "Plan Reseller Adultos 1",
                description: "10 Cuentas" + dataAditional,
                description_payment: "Plan Resseller Adultos 10 Cuentas",
                interval_type: "day",
                interval_count: "30",
                value: "15",
                dispositives: "4",
                type_plan: "adult"
            },
            {
                plan_id: 7, 
                name:  "Plan Reseller Adultos 2",
                description: "20 Cuentas" + dataAditional,
                description_payment: "Plan Resseller Adultos 20 Cuentas",
                interval_type: "day",
                interval_count: "30",
                value: "30",
                dispositives: "4",
                type_plan: "adult"
            }
        ]
      };
    },
    methods: {
      fnt_format_price,
      fnt_splited_list,
      fnt_get_interval,
      fnt_convert_email,
      fnt_get_buttom_payment(item) {
          return "<script type='text/javascript' src='https://checkout.epayco.co/checkout.js' " +
                "    data-epayco-key='3c8ba2dbb12edd2aaee6d2de756c68a5' " +
                "    class='epayco-button' " +
                "    data-epayco-amount='" + item.value + "'" +
                "    data-epayco-tax='0'" +
                "    data-epayco-tax-base='" + item.value + "'" +
                "    data-epayco-name='" + item.description_payment + "' " +
                "    data-epayco-description='" + item.description_payment + "' " +
                "    data-epayco-currency='usd'    " +
                "    data-epayco-country='CO' " +
                "    data-epayco-test='false' " +
                "    data-epayco-external='false' " +
                "    data-epayco-response=''  " +
                "    data-epayco-confirmation='' " +
                "    data-epayco-button='https://369969691f476073508a-60bf0867add971908d4f26a64519c2aa.ssl.cf5.rackcdn.com/btns/boton_carro_de_compras_epayco2.png' "  +
                "><\/script>";
      }
    }
  }
</script>