<template>
    <li><a @click="showMenu2" class="sidebar-mobile-secondary-toggle"><i class="icon-more"></i></a></li>
</template>
<script>
export default {
  methods: {
    showMenu2 () {
      let element, name, arr
      element = document.body
      name = 'sidebar-mobile-secondary'
      arr = element.className.split(' ')
      if (arr.indexOf(name) === -1) {
        element.className += ' ' + name
      } else {
        element.className = 'sidebar-xs sidebar-xs-indicator'
      }
    }
  }
}
</script>
