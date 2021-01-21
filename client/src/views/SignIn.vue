<template>
  <v-container>
    <v-layout justify-center>
      <v-card width="800">
        <v-card-text>
          <v-form v-model="valid" ref="form">
            <v-text-field
                v-model="user.username"
                :counter="10"
                :rules="usernameRules"
                label="Username"
                required
            ></v-text-field>
            <v-text-field
                v-model="user.password"
                :rules="passwordRules"
                label="Password"
                type="password"
                required
            ></v-text-field>

            <v-btn class="mr-4" @click="signInHandler" :loading="isAuthenticatePending" :disabled="!valid">Sign in</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { models } from 'feathers-vuex'
import { mapState, mapActions } from "vuex";

export default {
  name: "SignUp",
  data: () => ({
    valid: true,
    user: {
      username: '',
      password: '',
    },
    usernameRules: [
      v => !!v || 'Username is required',
      v => (v && v.length <= 10) || 'Username must be less than 10 characters',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length > 4) || 'Password must at least 4 character',
    ],
  }),

  computed: {
    ...mapState('auth', { isAuthenticatePending: 'isAuthenticatePending' } )
  },

  methods: {
    ...mapActions('auth',['authenticate']),
    signInHandler(){
      if (this.$refs.form.validate()){
        console.log(this.user)
        this.authenticate({
          strategy: 'local',
          ...this.user
        }).then(() => {
          this.$router.push('/boards')
        }).catch(e => {
          console.log(e)
        })
      }
    }
  },
}
</script>
