<template>
    <div>
        <div class="wrapper">
            <header id="header" class="menu-top-left">
                <div class="container">
                    <div class="row">
                        <div class="col-md-7 col-sm-6 col-xs-4">
                            <a :href="VUE_APP_HOST" id="logo" title="Tamic" class="logo-image"
                                style="background-image: url('img/logo.png')" />
                        </div>
                        <div class="col-md-5 col-sm-6 col-xs-12 phl0">
                            <div class="header_author">
                                <button :onclick="'window.location=\''+ envirotment.VUE_APP_HOST +'#/auth/login\''"
                                    class="button fill rectangle">Iniciar Sesión
                                </button>&nbsp;
                                <button :onclick="'window.location=\''+ envirotment.VUE_APP_HOST +'#/auth/register\''"
                                    class="button fill rectangle">Crear Cuenta
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section class="section-content">
                <div id="experience" class="section-content service pvb0">
                    <div class="container pv12">
                        <div class="row">
                            <div class="col-sm-12">
                                <h3 class="heading text-center mb9">Términos y Condiciones</h3>
                            </div>
                        </div>
                        <div class="row">
                            <DefaultTerms />
                        </div>
                    </div>
                </div>
            </section>
            <DefaultFooter />
        </div>
    </div>
</template>
<script>
    import DefaultTerms from "../streaming/containers/DefaultTerms";
    import DefaultFooter from "../streaming/containers/DefaultFooter";
    export default {
        beforeCreate: function () {
            document.body.className = "sticky-menu";
        },
        data: () => {
            return {
                envirotment: process.env
            }
        },
        components: {
            DefaultTerms,
            DefaultFooter
        }
    }
</script>