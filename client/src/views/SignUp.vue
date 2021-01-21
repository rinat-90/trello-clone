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
                v-model="user.displayName"
                :counter="10"
                :rules="displayNameRules"
                label="Display name"
                required
            ></v-text-field>
            <v-text-field
                v-model="user.password"
                :rules="passwordRules"
                label="Password"
                type="password"
                required
            ></v-text-field>
            <v-text-field
                v-model="user.confirmPassword"
                :rules="confirmPasswordRules"
                type="password"
                label="Confirm password"
                required
            ></v-text-field>
            <v-text-field
                v-model="user.imageUrl"
                :rules="imageUrlRules"
                label="Image url"
                required
            ></v-text-field>

            <v-btn class="mr-4" @click="signUpHandler" :loading="isCreatePending" :disabled="!valid">Sign up</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { models } from 'feathers-vuex'
import { mapState } from 'vuex'
export default {
  name: "SignUp",
  data: (vm) => ({
    valid: true,
    user: {
      username: '',
      password: '',
      confirmPassword: '',
      displayName: '',
      imageUrl: '',
    },
    usernameRules: [
      v => !!v || 'Username is required',
      v => (v && v.length <= 10) || 'Username must be less than 10 characters',
    ],
    displayNameRules: [
      v => !!v || 'Display name is required',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length > 4) || 'Password must at least 4 character',
    ],
    confirmPasswordRules: [
      v => !!v || 'Password confirmation required',
      v => (v && v === vm.user.password) || 'Password doesnt match',
    ],
    imageUrlRules: [
      v => !!v || 'Name is required',
    ],
  }),

  computed: {
      ...mapState('users', { isCreatePending: 'isCreatePending' })
  },

  methods: {
    signUpHandler(){
      if (this.$refs.form.validate()){
        const user = new models.api.User(this.user)
        user.save()
        .then(user => {
          console.log(user)
          this.$router.push('/signin')
        })
      }
    }
  },
}
</script>
