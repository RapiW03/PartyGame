<template>
  <div>
    <div id="app">
      <v-app>
        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
          min-width="360px"
        >
          <div>
            <v-tabs
              v-model="tab"
              show-arrows
              background-color="deep-purple accent-4"
              icons-and-text
              dark
              grow
            >
              <v-tabs-slider color="purple darken-4"></v-tabs-slider>
              <v-tab>
                <v-icon large>mdi-account</v-icon>
                <div class="caption py-1">Login</div>
              </v-tab>
              <v-tab>
                <v-icon large>mdi-account-outline</v-icon>
                <div class="caption py-1">Register</div>
              </v-tab>
              <v-tab-item>
                <v-card class="px-4">
                  <v-card-text>
                    <v-form ref="loginForm">
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="loginUsername"
                            label="Benutzername"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="loginPassword"
                            :append-icon="show1 ? 'eye' : 'eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            label="Password"
                            counter
                            @click:append="show1 = !show1"
                          ></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col
                          class="d-flex"
                          cols="12"
                          sm="3"
                          xsm="12"
                          align-end
                        >
                          <v-btn
                            x-large
                            block
                            color="success"
                            @click="loginUser"
                          >
                            Login
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card class="px-4">
                  <v-card-text>
                    <v-form ref="registerForm">
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="username"
                            label="Benutzername"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            label="Password"
                            counter
                            @click:append="show1 = !show1"
                          ></v-text-field>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                          <v-btn
                            x-large
                            block
                            color="success"
                            @click="registerUser"
                            >Register</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </div>
        </v-dialog>
      </v-app>
    </div>
  </div>
</template>
<script>
// import axios from 'axios';
import server from '@/serverInterface';
export default {
  data: () => ({
    dialog: true,
    tab: 0,
    valid: true,
    username: '',
    password: '',
    loginUsername: '',
    loginPassword: '',
    show1: false,
  }),
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    async registerUser() {
      console.log('1');
      await server.post(`http://localhost:3000/user/create`, {
        username: this.username,
        password: this.password,
        admin: false,
      });
      let user = (
        await server.post(`http://localhost:3000/user/login`, {
          username: this.username,
          password: this.password,
        })
      ).data;
      if (user.User_ID != undefined) {
        this.$router.replace('/mainmenu');
      }
    },
    async loginUser() {
      console.log(1);
      let user = (
        await server.post(`http://localhost:3000/user/login`, {
          username: this.loginUsername,
          password: this.loginPassword,
        })
      ).data;
      if (user.User_ID != undefined) {
        this.$router.replace('/mainmenu');
      }
    },
  },
};
</script>
