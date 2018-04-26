<template>
  <section class="el-container" :class="{'is-vertical' : isVertical}">
      <slot></slot>
  </section>
</template>
<script>
export default {
  name: 'ElContainer',

  props: {

      // 子元素的排列方向 horizontal/vertical
      // (子元素中有el-header或el-footer时为vertical，否则为horizontal)
      direction: String
  },

  computed: {
      isVertical () {
          if (this.direction === 'vertical') {
              return true;
          } else if (this.direction === 'horizontal') {
              return false;
          }

          return this.$slots && this.$slots.default
            ? this.$slots.default.some(vnode => {
                const tag = vnode.componentOptions && vnode.componentOptions.tag;
                return ['el-header', 'el-footer'].includes(tag);
            })
            : false;
      }
  }
};
</script>
