<template>
  <v-app>
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      app
      overflow
    >

      <v-list dense nav class="py-0">
        <v-list-item v-for="(user, k) in users" :key="k" link>
          <v-list-item-content>
            <v-list-item-title>{{ user.email }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="primaryDrawer.clipped" app>
      <v-app-bar-nav-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      />
      <v-toolbar-title>Mini Chat</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer :inset="footer.inset" app>
      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, } from "vue-property-decorator";
import User from "@/model/user";

@Component
export default class extends Vue {
  drawers = ["Default (no property)", "Permanent", "Temporary"];
  primaryDrawer = {
    model: null,
    type: "default (no property)",
    clipped: false,
    floating: false,
    mini: false
  };
  footer = {
    inset: false
  };
  users: Array<User> = [];
  mounted() {
    User.findAll().then(() => (this.users = User.all()),);
  }
}
</script>
