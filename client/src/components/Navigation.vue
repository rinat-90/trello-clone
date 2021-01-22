<template>
  <v-app-bar
      app
      color="light-blue darken-3"
      dark
      dense
  >
    <div class="d-flex align-center">
      <v-btn  color="rgba(255,255,255, .24)" class="mr-1 px-1 " >
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn to="/"  color="rgba(255,255,255, .24)" class="mr-1 hidden-xs-only">
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>
      <v-btn to="/boards"  color="rgba(255,255,255, .24)" class="mr-1">
        <v-icon>mdi-trello</v-icon>
        <span class="hidden-sm-and-down ml-2">boards</span>
      </v-btn>
      <v-btn color="rgba(255,255,255, .24)" class="mr-1 hidden-md-and-up">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <div class="search-input hidden-sm-and-down">
        <input type="text" />
      </div>
    </div>
    <v-spacer></v-spacer>
    <v-toolbar-title @click="$router.push('/boards')" style="cursor: pointer">
      <div class="font-weight-bold font-italic">
        <LogoSVG width="80px" height="30px" fill="#fff" />
      </div>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items v-if="!user">
      <v-btn text to="/signin">
        Sign In
      </v-btn>
      <v-btn text to="/signup">
        Sign Up
      </v-btn>
    </v-toolbar-items>
    <div v-else class="d-flex align-center">
      <MenuPopOver icon="mdi-plus" title="Create">
        <v-list dense three-line>
          <v-list-item link @click="dialog = true">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon left small>mdi-trello</v-icon>
                Create board
              </v-list-item-title>
              <div class="grey--text darken-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequatur dolor eum ex fugiat ipsam laborum quisquam ratione reprehenderit ullam?
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </MenuPopOver>
      <MenuPopOver icon="mdi-information-outline" title="Information">
        <v-card-text>
          <v-card flat elevation="0">
            <v-img height="150px" src="../assets/info-image.png"></v-img>
            <div class="headline text-center font-weight-bold">Get Inspired by Dozens Of Different Trello Workflows </div>
          </v-card>
        </v-card-text>
      </MenuPopOver>
      <MenuPopOver icon="mdi-bell-outline" title="Notifications">
        card
      </MenuPopOver>
      <!--        <div class="font-weight-bold mr-2">{{ user.displayName }}</div>-->
      <v-avatar size="36" color="grey">
        <img :src="user.imageUrl" alt="">
      </v-avatar>


      <!--        <v-btn text @click="signOutHandler">-->
      <!--          Sign out-->
      <!--        </v-btn>-->
    </div>
  </v-app-bar>
</template>

<script>
import MenuPopOver from "@/components/MenuPopOver";
import LogoSVG from "@/components/LogoSVG";
import {mapActions, mapState} from "vuex";
export default {
  name: "Navigation",
  components: { LogoSVG, MenuPopOver },
  computed: {
    ...mapState('auth', { user: 'user'})
  },
  inject: ['dialog'],
  mounted() {
    console.log(this.dialog)
  },
  methods: {
    ...mapActions('auth', ['logout']),
    signOutHandler() {
      this.logout().then(() => {
        this.$router.push('/signin')
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>

<style scoped>
.search-input{
  height: 36px;
  position: relative;
}

.search-input:after {
  content: '\e801';
  position: absolute;
  font-size: 13px;
  font-family: 'fontello';
  color: #fff;
  z-index: 1;
  top: 50%;
  margin-top: -10px;
  right: 10px;
  max-width: 280px;
}

.search-input input {
  position: relative;
  outline: none;
  font-size: 13px;
  height: 100%;
  color: #fff;
  padding: 8px 30px 8px 8px;
  border-radius: 3px;
  background-color: rgba(255,255,255, .24);
}


.search-input input:focus{
  background-color: #fff;
  color: #000;
  outline: none;
  border: none;
}
</style>
