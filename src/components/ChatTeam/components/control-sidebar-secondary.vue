<template>
    <li><a class="sidebar-control sidebar-secondary-hide hidden-xs" @click="showNav2"><i class="icon-transmission"></i></a></li>
</template>
<script>
export default {
  methods: {
    showNav2 () {
      let element, name, arr
      element = document.body
      name = 'sidebar-secondary-hidden'
      arr = element.className.split(' ')
      element.className = 'sidebar-xs sidebar-xs-indicator'
      if (arr.indexOf(name) === -1) {
        element.className += ' ' + name
      } else {
        element.className = 'sidebar-xs sidebar-xs-indicator'
      }
    }
  }
}
</script>
