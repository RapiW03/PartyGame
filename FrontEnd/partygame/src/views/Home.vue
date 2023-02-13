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
              background-color="black"
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
                            @click="loginUser"
                            class="buttonsMenu"
                            >Login
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
                            @click="registerUser"
                            class="buttonsMenu"
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
<style>
.buttonsMenu {
  appearance: button;
  background-color: #000;
  background-image: none;
  border: 1px solid #000;
  border-radius: 4px;
  box-shadow: #fff 4px 4px 0 0, #000 4px 4px 0 1px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: ITCAvantGardeStd-Bk, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin: 0 5px 10px 0;
  overflow: visible;
  padding: 12px 40px;
  text-align: center;
  text-transform: none;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
}

.buttonsMenu:focus {
  text-decoration: none;
}

.buttonsMenu:hover {
  text-decoration: none;
}

.buttonsMenu:active {
  box-shadow: rgba(0, 0, 0, 0.125) 0 3px 5px inset;
  outline: 0;
}

.buttonsMenu:not([disabled]):active {
  box-shadow: #fff 2px 2px 0 0, #000 2px 2px 0 1px;
  transform: translate(2px, 2px);
}

@media (min-width: 768px) {
  .buttonsMenu {
    padding: 12px 50px;
  }
}
</style>
