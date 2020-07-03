<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                          label="Login"
                          v-model="email"
                          prepend-icon="mdi-account"
                          type="text"
                  />

                  <v-text-field
                          id="password"
                          label="Password"
                          v-model="password"
                          prepend-icon="mdi-lock"
                          type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="submit" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Fetcher from "@/utils/fetch"

  @Component
  export default class extends Vue {

    email = '';
    password = '';

    submit() {
      Fetcher.fetch('http://api.chat.local/authentication_token', 'POST', {
        email : this.email, password: this.password
      }).then(success => {
        if (200 === success.status) {
          success.json().then(data => {
            localStorage.setItem('jwt', data.token);
            this.$router.push({name: 'home'})
          });
        }
      })
    }

  }
</script>
