<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <b-row class="justify-content-center">
                <b-col md="6">
                    <div class="clearfix">
                        <div class="float-left display-3 mr-4"><img width="150" heigth="100" src="img/brand/logo.svg"
                                alt="Logo" /></div>
                        <h1 class="pt-3">Procesando pago</h1>
                        <p class="text-muted">Estamos validando la información</p>
                    </div>
                    <br />
                </b-col>
            </b-row>
        </div>
    </div>
</template>
<script>
    import {
        fnt_toast
    } from "@/shared/utils";
    export default {
        beforeCreate: function () {
            this.$store.state.isLoading = true;
            document.body.className = "transaction";
            if (localStorage.sessionData == null || localStorage.sessionData == undefined) {
                setTimeout(() => {
                    this.$router.push({
                        name: "Login",
                        query: {
                            state: this.$route.query.state
                        }
                    })
                    this.$store.state.isLoading = false;
                }, 3000);
            } else {
                fnt_toast("Transacción " + this.$route.query.state, this.$bvToast);
                setTimeout(() => {
                    let session = JSON.parse(localStorage.sessionData)
                    let profile = null;
                    if (localStorage.getItem("profile") != undefined) {
                        profile = JSON.parse(localStorage.profile)
                    }
                    session.activeServices = 1;
                    localStorage.clear();
                    localStorage.sessionData = JSON.stringify(session);
                    if (profile != null) {
                        localStorage.profile = JSON.stringify(profile);
                    }
                    this.$store.state.isLoading = false;
                    this.$router.push({
                        name: "Setting"
                    })
                }, 3000);
            }
        }
    }
</script>