<template>
  <div class="user-app">
    <NavBar
    @createUser="createUser"
    @navigateHome="userForm = false"
    />
      <div class="row">
        <h1> Welcome! </h1>
      </div>
      <div>
        <button 
          @click="createUser" 
          v-if="!userForm"
          class="create-user-btn"
          >
          create new User
        </button>
        <UserList 
          v-if="!userForm"
          @updateSelectedUser="updateSelectedUser" 
        />
        <UserForm 
        v-if="userForm"
        :selectedUser="selectedUser"
        :update="update"
        :userIdList="getAllUserIds"
        @cancel="cancel"
        @updated="cancel"
        />
      </div>
  </div>
</template>

<script>
import NavBar from './shared/NavBar.vue';
import UserList from './UserList.vue';
import UserForm from './UserForm.vue'
import { mapActions, mapState } from 'pinia'
import { userUserStore } from '../stores/UserListStore';
import { User } from '../domain/User.model'

export default {
  name: 'UserApp',
  components: {
    NavBar,
    UserList,
    UserForm,
  },
  data(){
    return {
      userForm: false,
      selectedUser: User,
      update: false,
    }
  },
  computed: {
    ...mapActions(userUserStore, ['setUserListInitialization']),
    ...mapState(userUserStore, ['userList', 'getUserById', 'getAllUserIds']),
  },
  methods: {
    updateSelectedUser(userId) {
      this.selectedUser = this.getUserById(userId)
      this.userForm = true
      this.update = true
    },
    cancel(){
      this.selectedUser = null
      this.userForm = false
    }, 
    createUser(){
      this.update = false
      this.selectedUser = null
      this.userForm = true
    }
  }
}
</script>

<style>
.create-user-btn{ 
  margin-bottom: 5px
}
</style>