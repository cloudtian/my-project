<template>
  <div id="main">
    <template v-if="showHeaderFooter">
      <ct-header></ct-header>
    </template>

    <router-view />

    <template v-if="showHeaderFooter">
     <ct-footer></ct-footer>  
    </template>
  </div>
</template>

<script>

import CtHeader from './header.vue';
import CtFooter from './Footer.vue';

export default {
  name: 'main',

  components: {
      CtHeader,
      CtFooter
  },

  computed: {
    showHeaderFooter () {
      return !['Sign', 'Login'].includes(this.$route.name);
    }
  }
};
</script>