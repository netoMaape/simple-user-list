<template>
  <div class="nav-bar">
    <header>
      <nav>
        <div class="col" >
          <RouterLink class-active="active" to="/" @click="$emit('navigateHome')">Home</RouterLink>
        </div>
        <div class="col" >
          <RouterLink class-active="active" @click="$emit('createUser')" to="/">Create user</RouterLink>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'NavBar',
  components: {
    RouterLink
  },
  emits: ['createUser', 'navigateHome'],
}
</script>

<style>
nav{
  display: inline-flex
}

.col {
  margin-right: 10px;
  padding: 1px auto;
}
</style>