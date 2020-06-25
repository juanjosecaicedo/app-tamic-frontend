<template>
    <footer id="footer">
        <div class="container footer-container">
            <div class="row">
                <div class="col-md-2 col-sm-6">
                    <div class="widget">
                        <h5 class="widget-title">Menú</h5>
                        <ul class="menu">
                            <li><a href="#header">Inicio</a></li>
                            <li><a href="#experience">Experiencia</a></li>
                            <li><a href="#premieres">Estrenos</a></li>
                            <li><a :href="envirotment.VUE_APP_HOST+'#/auth/subscription'">Precios</a></li>
                            <li><a :href="envirotment.VUE_APP_HOST+'#/auth/terms'">Términos</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="widget">
                        <h5 class="widget-title">Información</h5>
                        info@apptamic.com<br>
                        <i class="fa fa-phone"></i>&nbsp;&nbsp;3503100590<br>
                    </div>
                </div>
                <div class="col-md-1"></div>
                <div id="contactenos" class="col-md-6">
                    <div  class="widget">
                        <h5 class="widget-title">Contáctanos</h5>
                        <form class="contact_form transparent" @submit.prevent="fnt_send_email()">
                            <div class="row">
                                <div class="col-sm-12">
                                    <input
                                        style="border: 1px solid rgba(110, 110, 110, 0.68); padding-left: 20px; color: white"
                                        v-model="name" type="text" class="inputValidation" name="name"
                                        placeholder="Nombre" required>
                                </div>
                                <div class="col-sm-12">
                                    <input
                                        style="border: 1px solid rgba(110, 110, 110, 0.68); padding-left: 20px; color: white"
                                        v-model="email" type="text" class="inputValidation" name="email"
                                        placeholder="Correo" required>
                                </div>
                                <div class="col-sm-12 ">
                                    <textarea style="border: 1px solid rgba(110, 110, 110, 0.68);" v-model="message"
                                        class="inputValidation" placeholder="Mensaje" required></textarea>
                                    <VueRecaptcha ref="recaptcha" sitekey="6LcsrN8UAAAAALGgrfG0DZzjSN-5dnGX_YikRaZl"
                                        :loadRecaptchaScript="true" @expired="fnt_expired" @verify="fnt_validate">
                                    </VueRecaptcha>
                                    <button type="submit" class="button fill rectangle">Enviar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="sub-footer">
            <div class="container">
                <div class="row copyright-text">
                    <div class="col-sm-12 text-center">
                        <p class="mv3 mvt0">&copy; Copyright 2019 Tamic. Todos los derechos reservados</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
    import VueRecaptcha from 'vue-recaptcha';
    import {
        fnt_toast
    } from "@/shared/utils";
    export default {
        data: () => {
            return {
                envirotment: process.env,
                name: "",
                email: "",
                message: "",
                recaptcha: ""
            }
        },
        components: {
            VueRecaptcha
        },
        methods: {
            fnt_send_email() {
                if (this.recaptcha != "") {
                    if (this.email != "" && this.name != "" && this.message != "") {
                        axios.post("send/email", {
                            name: this.name,
                            from: this.email,
                            message: this.message,
                        }).then(result => {
                            if (result.status == 200) {
                                fnt_toast("Hola, " + this.name + " revisaremos tu solicitud", this.$bvToast);
                                this.$refs.recaptcha.reset();
                            } else {
                                fnt_toast("Error en el envío, intentar nuevamente", this.$bvToast);
                            }
                            this.name = ""
                            this.email = ""
                            this.message = ""
                        })
                    } else {
                        fnt_toast("Debe ingresar toda la información", this.$bvToast);
                    }
                } else {
                    fnt_toast("Por favor, complete el reCAPTCHA", this.$bvToast);
                }
            },
            fnt_on_submit() {
                this.$refs.recaptcha.execute()
            },
            fnt_validate(response) {
                this.recaptcha = response
            },
            fnt_expired() {
                this.$refs.recaptcha.reset();
            }
        }
    }
</script>