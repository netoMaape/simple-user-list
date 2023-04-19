<template>
  <div class="user-form">
    <h3 v-if="update">Update {{ user.firstName }} {{ user.lastName }}</h3>
    <h3 v-if="!update">Create User</h3>    
    <p>
      <input 
        v-model="user.id"
        type="number"
        placeholder="Enter your ID" 
        :disabled="update"
        min="0"
      />
    </p>
    <p>
      <input 
        v-model="user.firstName"
        type="text"
        placeholder="Enter your name" 
    />
    </p>
    <p>
      <input 
        v-model="user.lastName"
        type="text"
        placeholder="Enter your last name" 
      />
    </p>
    <p>
      <input 
        v-model="user.email"
        type="text"
        placeholder="Enter your email" 
      />
    </p>
    <div class="button-group">
      <button class="action-button" @click="submit">Submit</button>
      <button class="action-button" @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
import { User } from '../domain/User.model'
import { mapActions } from 'pinia'
import { userUserStore } from '../stores/UserListStore';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

export default {
  name: 'UserForm',
  props: ['selectedUser', 'update', 'userIdList'],
  emit: ['cancel'],
  data(){
    return {
      v$: useVuelidate(),
      user: new User (),
    }
  },
  validations() {
    const { userIdList, update } = this
    return {
        user: { 
          id: { required: helpers.withMessage('is required', required),
                idExists: helpers.withMessage('is already in use', (value) => {
                  return !update ? (!userIdList.includes(value)) : true
                })
          }
        }
    }
  },
  mounted(){
    if(this.selectedUser && this.update) {
      this.user = new User (this.selectedUser)
    }
  },
  methods:{
    ...mapActions(userUserStore, ['updateUser']),
    cancel(){
      this.user = null
      this.$emit('cancel')
    },
    async submit(){     
      try {
        await this.v$.$validate()
        if (this.v$.$error) {
          alert(`${this.v$.$errors[0].$property} ${this.v$.$errors[0].$message}`)
          this.v$.$reset()
          return
        }
        
        this.updateUser(this.user)
        this.$emit('updated')
        this.user = null
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    },
  },
}
</script>

<style>
.user-form {
  width: 400px; 
  margin: 0 auto;
  background-color: #aeaeae;
  padding: 30px;
  border-radius: 20px;
}
</style>