<template>
  <div>
    <a href="https://api.whatsapp.com/send?phone=573223055922" target="_blank" class="flBtn-a">
      <div class="flBtn flBtn-position-r">
        <i class="fa fa-whatsapp fa-lg my-float"></i>
      </div>
    </a>
    <div class="wrapper">
      <header id="header" class="menu-top-left">
        <div class="containers">
          <div class="row">
            <div class="col-md-2 col-sm-2 col-xs-12">
              <a :href="envirotment.VUE_APP_HOST" id="logo" title="Tamic" class="logo-image"
                style="background-image: url('img/logo.png')" />
            </div>
            <div class="col-md-10 col-sm-10 col-xs-12 phl0 d-md-down-none">
              <div class="d-none d-md-block header_author">
                <button onclick="window.location.href='#headerslider'" class="button fill rectangle"><i class="fa fa-lg fa-home" aria-hidden="true"></i>
                </button>&nbsp;
                <!-- <button :onclick="'window.location=\'' + envirotment.VUE_APP_HOST+ '#/auth/register?code=DEMO\''"
                  class="button fill rectangle">Demo
                </button>&nbsp; -->
                <button :onclick="'window.location=\'' + envirotment.VUE_APP_HOST+ '#/auth/subscription\''"
                  class="button fill rectangle">Precios
                </button>&nbsp;
                <button :onclick="'window.location=\'' + envirotment.VUE_APP_HOST+ '#/auth/resellers\''"
                  class="button fill rectangle">Resellers
                </button>&nbsp;
                <button onclick="window.location.href='#tutorials'" class="button fill rectangle">Tutorial
                </button>&nbsp;
                </button>&nbsp;
                <button onclick="window.location.href='#footer'" class="button fill rectangle">Contácnetos
                </button>&nbsp;
                <span class="order_btn"></span>
                &nbsp;
                <button :onclick="'window.location=\'' + envirotment.VUE_APP_HOST+ '#/auth/login\''"
                  class="button fill rectangle">Iniciar Sesión
                </button>&nbsp;
                <button :onclick="'window.location=\'' + envirotment.VUE_APP_HOST+ '#/auth/register\''"
                  class="button fill rectangle">Crear Cuenta
                </button>
              </div>
            </div>
            <div class="col-md-9 col-sm-9 col-xs-12 phl0 d-lg-none">
              <div :class="[isActive ? 'button_container activeSpan' : 'button_container hiddeSpan']"
                @click="fnt_menu()" id="toggle">
                <span class="top"></span>
                <span  class="middle"></span>
                <span  class="bottom"></span>
              </div>
              <div @click="fnt_menu()" :class="[isActive ? 'overlay activeMenu' : 'overlay hiddeMenu']" id="overlay">
                <a href="javascript:;" class="close-window"></a>
                <nav class="overlay-menu">
                  <ul>
                    <li>
                      <a onclick="window.location.href='#headerslider'" class="a fill rectangle">Inicio
                      </a>
                    </li>
                    <!-- <li>
                      <a :onclick="'window.location=\'' + envirotment.VUE_APP_HOST+ '#/auth/register?code=DEMO\''" class="a fill rectangle">Demo
                      </a> -->
                    </li>
                    <li>
                      <a :onclick="'window.location=\'' + envirotment.VUE_APP_HOST+ '#/auth/subscription\''" class="a fill rectangle">Precios
                      </a>
                    </li>
                    <li>
                      <a :onclick="'window.location=\'' + envirotment.VUE_APP_HOST+ '#/auth/resellers\''" class="a fill rectangle">Resellers
                      </a>
                    </li>
                    <li>
                      <a onclick="window.location.href='#tutorials'" class="a fill rectangle">Tutorial
                      </a>
                    </li>
                    <li>
                      <a  onclick="window.location.href='#footer'" class="a fill rectangle">Contácnetos
                      </a>
                    </li>
                    <li>
                      <a  :onclick="'window.location=\'' + envirotment.VUE_APP_HOST+ '#/auth/login\''" class="a fill rectangle">Iniciar Sesión
                      </a>
                    </li>
                    <li>
                      <a :onclick="'window.location=\'' + envirotment.VUE_APP_HOST+ '#/auth/register\''" class="a fill rectangle">Crear Sesión
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div><!-- fin -->
        </div>
      </header>
      <div class="fullwidth-slider">
        <div id="headerslider" class="carousel slide">
          <div class="carousel-inner" role="listbox">
            <hooper :infiniteScroll="true" :playSpeed="5000" :autoPlay="true" :wheelControl="false" :mouseDrag="false"
              :keysControl="false" :shortDrag="false">
              <slide v-for="(item, indx) in items" :key="indx" :index="indx">
                <div class="item active">
                  <div class="fill carousel-img" v-lazy:background-image="item.img_banner">
                    <div class="bs-slider-overlay"></div>
                    <div class="container movie-slider-container">
                      <div class="row">
                        <div class="col-sm-12 movie-slider-content">
                          <div class="slider-content">
                            <div class="title" data-animation="animated bounceInRight">{{item.title}}
                              <i><b>{{item.year}}</b></i></div>
                            <div class="slide_right" data-animation="animated bounceInRight">
                              <a target="_blank" :href="[item.url_trailer]" class="btn-trailer">Trailer</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </slide>
              <hooper-pagination slot="hooper-addons"></hooper-pagination>
              <hooper-navigation slot="hooper-addons"></hooper-navigation>
            </hooper>
          </div>
        </div>
      </div>
      <section class="section-content">
        <div id="experience" class="section-content service pvb0 divider">
          <div class="container phl0">
            <div class="row">
              <div class="col-sm-12">
                <h3 class="heading text-center mb9">Tu experiencia será emocionante</h3>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-4 ph0">
                <h2 class="card-title">Contenido HD</h2>
                <p>Proporciona películas, series, canales y emisoras de alta calidad</p>
              </div>
              <div class="col-sm-4 ph0">
                <h2 class="card-title">Dispositivos</h2>
                <p>Administra la cantidad de dispositivos conectados de acuerdo a tu plan</p>
              </div>
              <div class="col-sm-4 ph0">
                <h2 class="card-title">Lista de favoritos</h2>
                <p>Guarda todo el contenido que desees en la lista de favoritos de cada perfil</p>
              </div>
            </div>
            <div class="row mt8">
              <div class="col-sm-4 ph0">
                <h2 class="card-title">Panel de control</h2>
                <p>Gestiona tus ingresos y códigos como aliado de <b>Tamic</b></p>
              </div>
              <div class="col-sm-4 ph0">
                <h2 class="card-title">Pago seguro</h2>
                <p>Tenemos un sistema que te permitirá tener diferentes medios de pago en todo el país</p>
              </div>
              <div class="col-sm-4 ph0">
                <h2 class="card-title">DEMO</h2>
                <p>Ofrecemos 1 hora de contenido gratuito para que seas parte de Tamic, <a
                    :href="envirotment.VUE_APP_HOST+ '#/auth/register?code=DEMO'">dar clic aquí</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="premieres" class="fullscreen-section bg-black-degrade pvb0">
          <div class="container wpc-boxoffice pv8 divider">
            <div class="row">
              <div class="col-sm-12 col-xs-12">
                <h3 class="text-bold text-shadow-orange">Estrenos</h3>
                <div class="rwo">
                  <ul class="wpc-box-list">
                    <li class="wpc-box-item col-sm-6 col-xs-12" v-for="(item, indx) in items" :key="indx" :index="indx">
                      <ol>
                        <li class="bx-item-t" style="background: none !important"><img width="158" height="197"
                            v-lazy="item.img_streaming" alt="thumb"></li>
                        <li class="bx-item-title">
                          <h4>{{item.title}}</h4>
                          <p style="opacity: .4;">{{item.year}} - {{item.country_name}}</p>
                        </li>
                      </ol>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section-content">
        <div id="questions" class="section-content service pvb0 divider">
          <div class="container  pv12">
            <div class="row">
              <div class="col-sm-12">
                <h3 class="heading text-center mb9">Preguntas frecuentes</h3>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 ph0">
                <b-card no-body class="mb-1 ">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block href="#" v-b-toggle.question-1 variant="light" class="question text-left">
                      <i class="fa fa-question-circle" aria-hidden="true"></i>&nbsp;&nbsp;¿Que es Tamic?
                    </b-button>
                  </b-card-header>
                  <b-collapse id="question-1" role="tabpanel">
                    <b-card-body class="text-left">
                      <b-card-text>
                        Tamic es un servicio de streaming que ofrece una gran variedad de programas, películas y
                        documentales en casi cualquier pantalla conectada a internet.Todo lo que quieras ver, sin
                        límites ni comerciales, a un costo muy accesible. Siempre hay
                        algo nuevo por descubrir, ¡y todas las semanas se agregan más programas y películas!
                      </b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
              <div class="col-sm-12 ph0">
                <b-card no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block href="#" v-b-toggle.question-2 variant="light" class="question text-left">
                      <i class="fa fa-question-circle" aria-hidden="true"></i>&nbsp;&nbsp;¿Cómo activo mi Demo?
                    </b-button>
                  </b-card-header>
                  <b-collapse id="question-2" role="tabpanel">
                    <b-card-body class="text-left">
                      <b-card-text>Regístrate y en el espacio de cupón coloca la palabra <code>DEMO</code> (Mayúscula) y
                        después
                        inicia sesión con tu correo y contraseña. <a
                          :href="envirotment.VUE_APP_HOST+ '#/auth/register?code=DEMO'">Enlace</a>
                      </b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
              <div class="col-sm-12 ph0">
                <b-card no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block href="#" v-b-toggle.question-3 variant="light" class="question text-left">
                      <i class="fa fa-question-circle" aria-hidden="true"></i>&nbsp;&nbsp;¿Como pago mi suscripción?
                    </b-button>
                  </b-card-header>
                  <b-collapse id="question-3" role="tabpanel">
                    <b-card-body class="text-left">
                      <b-card-text>
                        Escoge el plan, espera a que aparezca la venta de opciones de pago y escoge el medio que mas te
                        convenga, contamos con todos los medios existentes.
                        <a :href="envirotment.VUE_APP_HOST + '#/auth/subscription'">Enlace</a>
                      </b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
              <div class="col-sm-12 ph0">
                <b-card no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block href="#" v-b-toggle.question-4 variant="light" class="question text-left">
                      <i class="fa fa-question-circle" aria-hidden="true"></i>&nbsp;&nbsp;¿Cuánto cuesta Tamic?
                    </b-button>
                  </b-card-header>
                  <b-collapse id="question-4" role="tabpanel">
                    <b-card-body class="text-left">
                      <b-card-text>
                        Ve Tamic en tu smartphone, tablet, smart TV, laptop o dispositivo de streaming, todo por una
                        tarifa plana mensual muy accesible.Planes desde <code>$15.000</code> al mes. Sin costos
                        adicionales ni
                        contratos.
                      </b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
              <div class="col-sm-12 ph0">
                <b-card no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block href="#" v-b-toggle.question-5 variant="light" class="question text-left">
                      <i class="fa fa-question-circle" aria-hidden="true"></i>&nbsp;&nbsp;¿Cómo cancelo Tamic?
                    </b-button>
                  </b-card-header>
                  <b-collapse id="question-5" role="tabpanel">
                    <b-card-body class="text-left">
                      <b-card-text>Tamic es flexible. Sin contratos molestos ni compromisos. Cancela la membresía online
                        con solo dos clics. No hay cargos por cancelación. Empieza y termina cuando quieras.
                      </b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
              <div class="col-sm-12 ph0">
                <b-card no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block href="#" v-b-toggle.question-6 variant="light" class="question text-left">
                      <i class="fa fa-question-circle" aria-hidden="true"></i>&nbsp;&nbsp;¿Qué puedo ver en Tamic?
                    </b-button>
                  </b-card-header>
                  <b-collapse id="question-6" role="tabpanel">
                    <b-card-body class="text-left">
                      <b-card-text>Tamic tiene un amplio catálogo de programas, películas, documentales, animes,
                        originales premiados y más. Todo lo que quieras ver, cuando quieras.</b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
              <div class="col-sm-12 ph0">
                <b-card no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block href="#" v-b-toggle.question-7 variant="light" class="question text-left">
                      <i class="fa fa-question-circle" aria-hidden="true"></i>&nbsp;&nbsp;¿Como puedo vender Tamic y ganar dinero?
                    </b-button>
                  </b-card-header>
                  <b-collapse id="question-7" role="tabpanel">
                    <b-card-body class="text-left">
                      <b-card-text>Te contactas con uno de nuestros asesores al correo <a
                          href="mailto:gerenciacomercial@apptamic.com">gerenciacomercial@apptamic.com</a> y
                        envías los siguientes datos: País, ciudad, nombre, teléfono de contacto y las preguntas que
                        tengas, un asesor se comunicara en breve contigo.</b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
              <div class="col-sm-12 ph0">
                <b-card no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block href="#" v-b-toggle.question-8 variant="light" class="question text-left">
                      <i class="fa fa-question-circle" aria-hidden="true"></i>&nbsp;&nbsp;¿Como puedo ver Tamic en Smart TV?
                    </b-button>
                  </b-card-header>
                  <b-collapse id="question-8" role="tabpanel">
                    <b-card-body class="text-left">
                      <b>Opción 1:</b>
                      <p>Ingresa la siguiente dirección en el navegador de tu Smart TV <b>www.apptamic.com/tv</b> pon
                        tus datos de correo y contraseña y disfruta</p>
                      <b>Opción 2:</b>
                      <p>Comparte la pantalla de tu celular con tu Smart TV y disfruta</p>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section-content">
        <div id="tutorials" class="fullscreen-section bg-black-degrade pvb0">
          <div class="container wpc-boxoffice pv12 divider">
            <div class="row">
              <div class="col-sm-12 col-xs-12">
                <h3 class="text-shadow-blue text-bold">Tutorial</h3>
                <div class="row">
                  <div class="col-sm-12 ph0">
                    <b-card no-body class="mb-1">
                      <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-button block href="#" v-b-toggle.question-11 variant="light" class="q-information text-left" >
                          <i class="fa fa-play" aria-hidden="true"></i>&nbsp;&nbsp;Como crear tu Demo
                        </b-button>
                      </b-card-header>
                      <b-collapse id="question-11" role="tabpanel">
                        <b-card-body>
                          <iframe width="100%" height="400" src="https://www.youtube.com/embed/SWexdzjdCkE"
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                        </b-card-body>
                      </b-collapse>
                    </b-card>
                  </div>
                  <div class="col-sm-12 ph0">
                    <b-card no-body class="mb-1">
                      <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-button block href="#" v-b-toggle.question-12 variant="light" class="q-information text-left">
                          <i class="fa fa-play" aria-hidden="true"></i>&nbsp;&nbsp;Como pagar tu suscripción
                        </b-button>
                      </b-card-header>
                      <b-collapse id="question-12" role="tabpanel">
                        <b-card-body>
                          <iframe width="100%" height="400" src="https://www.youtube.com/embed/J6p2sXysSlE"
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                        </b-card-body>
                      </b-collapse>
                    </b-card>
                  </div>
                  <div class="col-sm-12 ph0">
                    <b-card no-body class="mb-1">
                      <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-button block href="#" v-b-toggle.question-13 variant="light" class="q-information text-left">
                          <i class="fa fa-play" aria-hidden="true"></i>&nbsp;&nbsp;Pagar suscripción y redimir con códigos
                        </b-button>
                      </b-card-header>
                      <b-collapse id="question-13" role="tabpanel">
                        <b-card-body>
                          <iframe width="100%" height="400" src="https://www.youtube.com/embed/e1MZBCoHbL8"
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                        </b-card-body>
                      </b-collapse>
                    </b-card>
                  </div>
                  <div class="col-sm-12 ph0">
                    <b-card no-body class="mb-1">
                      <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-button block href="#" v-b-toggle.question-14 variant="light" class="q-information text-left">
                          <i class="fa fa-play" aria-hidden="true"></i>&nbsp;&nbsp;¿Como puedo ver Tamic en Smart TV?
                        </b-button>
                      </b-card-header>
                      <b-collapse id="question-14" role="tabpanel">
                        <b-card-body style="text-align: justify">
                          <b>Opción 1:</b><br>
                          <p>Ingresa la siguiente dirección en el navegador de tu Smart TV <b>www.apptamic.com/tv</b>
                            pon tus datos de correo y contraseña y disfruta</p>
                          <b>Opción 2:</b><br>
                          <p>Comparte la pantalla de tu celular con tu Smart TV y disfruta</p>
                        </b-card-body>
                      </b-collapse>
                    </b-card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DefaultFooter />
    </div>
  </div>
</template>
<script>
  import DefaultFooter from "../streaming/containers/DefaultFooter";
  export default {
    name: "Welcome",
    beforeCreate: function () {
      document.body.className = "sticky-menu";
    },
    components: {
      DefaultFooter
    },
    data: () => {
      return {
        envirotment: process.env,
        items: [],
        hooperSettings: {
          itemsToShow: 3,
          breakpoints: {
            800: {
              itemsToShow: 1
            },
            1000: {
              itemsToShow: 1,
            }
          }
        },
        isActive: false
      }
    },
    mounted() {
      // this.fnt_get_streaming();    
    },
    created(){
      this.fnt_get_streaming();
    },
    methods: {
      fnt_get_streaming() {              
        if (localStorage.getItem("premieres") == null) {
          axios.get("premieres").then(result => {
            this.items = result.data;
            console.log(result.data);
            localStorage.setItem("premieres", JSON.stringify(this.items));
          })
        } else {
          this.items = JSON.parse(localStorage.getItem("premieres"));
        }
      },
      fnt_menu() {
        this.isActive = !this.isActive
      }
    }
  }
</script>