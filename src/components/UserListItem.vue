<template>
  <div class="user-list-item container">
    <div>
      <div class="col1">
        id: {{ user.id }}
      </div>
      <div class="col1">
        <h1> {{ user.firstName }} {{ user.lastName }}</h1>
      </div>
      <div class="col1">
        email: {{ user.email }}
      </div>
      <button class="action-button" @click="updateUser(user.id)">update</button>
      <button class="action-button" @click="deleteUser(user.id)">delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserListItem',
  props: ['user'],
  emits: [ 'deleteUser', 'updateUser' ],
  methods: {
    updateUser(userId){
      this.$emit('updateUser', userId)
    },
    deleteUser(userId){
      this.$emit('deleteUser', userId)
    }
  }
}
</script>

<style>
.container {
    width: 400px; 
    margin: 0 auto;
    padding: 30px;
    max-width:600px;
    border:2px solid black;
    margin: 5px auto;
    padding:10px;
    border-radius: 20px;
    background-color: #aeaeae;
}
.col1 {
    width:100%;
    height:100%;
}
.container:hover {
  background-color: rgb(147, 200, 200);
}
.action-button{
  margin: 8px auto;
  margin-right: 10px;
  padding: 3px;
}

</style>