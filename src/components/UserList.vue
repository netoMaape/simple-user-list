<template>
  <div class="user-list">
    <UserListItem
      v-for="(user, index) in getAllUsers"
      :index="index"
      :key="user.id"
      :user="user"
      @updateUser="updateUser" 
      @deleteUser="deleteUser"
      /> 
  </div>
</template>

<script>
import UserListItem from './UserListItem.vue';
import { mapState, mapActions } from 'pinia'
import { userUserStore } from '../stores/UserListStore';
import { User } from '../domain/User.model'


export default {
  name: 'UserList',
  components: {
    UserListItem,
  },
  data(){
    return {
      selectedUser: User
    }
  },
  emits: [ 'updateSelectedUser' ],
  computed: {
    ...mapState(userUserStore, ['userList', 'getAllUsers']),
  },
  methods: {
    ...mapActions(userUserStore, ['deletSelectedeUser']),
    deleteUser(userId) {
      this.deletSelectedeUser(userId)
    },
    updateUser(userId) {
      this.$emit('updateSelectedUser', userId)
    }
  }
}
</script>