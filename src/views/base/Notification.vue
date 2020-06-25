<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card header-tag="header" footer-tag="footer">
            <div slot="header">
              <i class="icon-bell" />
              Notificaciones
              <div class="card-header-actions"></div>
            </div>
            <h4>Notificaciones enviadas</h4>
            <div class="pa-2 mt-10 mb-3"
              style="max-height: 35vh;overflow-y: scroll; border: 1px solid silver; border-radius: 5px; padding: 5px;">
              <ul class="list-unstyled">
                <b-media tag="li" v-for="(item, i) in list_message" :key="i"
                  style="padding: 5px;border: 1px solid silver;border-radius: 10px;margin-top: 5px;">
                  <template v-slot:aside>
                    <b-img style="margin-top: 25%;" src="./img/logo.png" blank-color="#abc" width="64"
                      alt="placeholder"></b-img>
                  </template>
                  <h5 class="mt-0 mb-1">
                    {{item.title}}
                    <small style="color:#999;">({{item.created_at}})</small>
                  </h5>

                  <p class="mb-0">{{item.message}}</p>
                </b-media>
              </ul>
            </div>
            <h4>Enviar nueva notificacion</h4>
            <div class="pa-2 mt-2">
              <b-form-textarea id="textarea" v-model="message" placeholder="Mensaje..." rows="3" max-rows="6">
              </b-form-textarea>
              <b-button class="mt-2" variant="outline-primary" @click="fnt_send_notification">Enviar Notificacion
              </b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
  export default {    
    data: () => {
      return {
        message: "",
        list_message: []
      }
    },
    mounted() {
      setTimeout(() => {
        socket.on('notification', (response) => {
          this.list_message.push({
            title: `Notificacion ${this.list_message.length + 1}`,
            message: this.message,
            created_at: new Date()
          });
          console.log('Response', response);
        });
      }, 1000);
    },
    methods: {
      fnt_get_list_notifications() {
        axios.post('/listNotifications').then((response) => {
          this.list_message = response.data;
        });
      },
      fnt_send_notification() {
        console.log('Notificacion', {
          message: this.message
        });
        socket.emit('notification', {
          message: this.message
        });
      }
    }
  };
</script>