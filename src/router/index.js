import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Common from '@/components/common'
import Group from '@/components/Group'
import ChatTeam from '@/components/ChatTeam/index'

import SidebarSecondary from '@/components/ChatTeam/components/sidebar-secondary'
import ControlSidebarSecondary from '@/components/ChatTeam/components/control-sidebar-secondary'
import sidebarMobileSecondaryToggle from '@/components/ChatTeam/components/sidebar-mobile-secondary-toggle'

import Messages from '@/components/Message/index'
import SidebarSecondaryMessage from '@/components/Message/components/sidebar-secondary'
import Login from '@/components/Auth/Login'

import $ from 'jquery'
import 'bootstrap'
import 'block-ui'
import 'pace'
import axios from './../axios'
import store from './../store'
const keyTokenStore = 'Auth-Token'
Vue.use(Router)
function init () {
  $(window).on('load', function () {
    $('body').removeClass('no-transitions')
  })
  $(document).ready(function () {
    $('.panel-footer').has('> .heading-elements:not(.not-collapsible)').prepend('<a class="heading-elements-toggle"><i class="icon-more"></i></a>')
    $('.page-title, .panel-title').parent().has('> .heading-elements:not(.not-collapsible)').children('.page-title, .panel-title').append('<a class="heading-elements-toggle"><i class="icon-more"></i></a>')

    // Toggle visible state of heading elements
    $('.page-title .heading-elements-toggle, .panel-title .heading-elements-toggle').on('click', function () {
      $(this).parent().parent().toggleClass('has-visible-elements').children('.heading-elements').toggleClass('visible-elements')
    })
    $('.panel-footer .heading-elements-toggle').on('click', function () {
      $(this).parent().toggleClass('has-visible-elements').children('.heading-elements').toggleClass('visible-elements')
    })

    // Breadcrumb elements toggler
    // -------------------------

    // Add control button toggler to breadcrumbs if has elements
    $('.breadcrumb-line').has('.breadcrumb-elements').prepend('<a class="breadcrumb-elements-toggle"><i class="icon-menu-open"></i></a>')

    // Toggle visible state of breadcrumb elements
    $('.breadcrumb-elements-toggle').on('click', function () {
      $(this).parent().children('.breadcrumb-elements').toggleClass('visible-elements')
    })

    // ========================================
    //
    // Navbar
    //
    // ========================================

    // Navbar navigation
    // -------------------------

    // Prevent dropdown from closing on click
      $('.dropdown-content').unbind('click')
    $(document).on('click', '.dropdown-content', function (e) {
      e.stopPropagation()
    })

    // Disabled links
      $('.navbar-nav .disabled a').unbind('click')
    $('.navbar-nav .disabled a').on('click', function (e) {
      e.preventDefault()
      e.stopPropagation()
    })

    // Show tabs inside dropdowns
      $('.dropdown-content a[data-toggle="tab"]').unbind('click')
    $('.dropdown-content a[data-toggle="tab"]').on('click', function (e) {
      $(this).tab('show')
    })
    function containerHeight () {
      var availableHeight = $(window).height() - $('.page-container').offset().top - $('.navbar-fixed-bottom').outerHeight()
      $('.page-container').attr('style', 'min-height:' + availableHeight + 'px')
    }

    // ========================================
    //
    // Element controls
    //
    // ========================================

    // Reload elements
    // -------------------------

    // Panels
      $('.panel [data-action=reload]').unbind('click')
    $('.panel [data-action=reload]').click(function (e) {
      e.preventDefault()
      var block = $(this).parent().parent().parent().parent().parent()
      $(block).block({
        message: '<i class="icon-spinner2 spinner"></i>',
        overlayCSS: {
          backgroundColor: '#fff',
          opacity: 0.8,
          cursor: 'wait',
          'box-shadow': '0 0 0 1px #ddd'
        },
        css: {
          border: 0,
          padding: 0,
          backgroundColor: 'none'
        }
      })

      // For demo purposes
      window.setTimeout(function () {
        $(block).unblock()
      }, 2000)
    })

    // Sidebar categories
      $('.category-title [data-action=reload]').unbind('click')
    $('.category-title [data-action=reload]').click(function (e) {
      e.preventDefault()
      var block = $(this).parent().parent().parent().parent()
      $(block).block({
        message: '<i class="icon-spinner2 spinner"></i>',
        overlayCSS: {
          backgroundColor: '#000',
          opacity: 0.5,
          cursor: 'wait',
          'box-shadow': '0 0 0 1px #000'
        },
        css: {
          border: 0,
          padding: 0,
          backgroundColor: 'none',
          color: '#fff'
        }
      })

      // For demo purposes
      window.setTimeout(function () {
        $(block).unblock()
      }, 2000)
    })

    // Light sidebar categories
      $('.sidebar-default .category-title [data-action=reload]').unbind('click')
    $('.sidebar-default .category-title [data-action=reload]').click(function (e) {
      e.preventDefault()
      var block = $(this).parent().parent().parent().parent()
      $(block).block({
        message: '<i class="icon-spinner2 spinner"></i>',
        overlayCSS: {
          backgroundColor: '#fff',
          opacity: 0.8,
          cursor: 'wait',
          'box-shadow': '0 0 0 1px #ddd'
        },
        css: {
          border: 0,
          padding: 0,
          backgroundColor: 'none'
        }
      })

      // For demo purposes
      window.setTimeout(function () {
        $(block).unblock()
      }, 2000)
    })

    // Collapse elements
    // -------------------------

    //
    // Sidebar categories
    //

    // Hide if collapsed by default
    $('.category-collapsed').children('.category-content').hide()

    // Rotate icon if collapsed by default
    $('.category-collapsed').find('[data-action=collapse]').addClass('rotate-180')

    // Collapse on click
      $('.category-title [data-action=collapse]').unbind('click')
    $('.category-title [data-action=collapse]').click(function (e) {
      e.preventDefault()
      var $categoryCollapse = $(this).parent().parent().parent().nextAll()
      $(this).parents('.category-title').toggleClass('category-collapsed')
      $(this).toggleClass('rotate-180')

      containerHeight() // adjust page height

      $categoryCollapse.slideToggle(150)
    })

    //
    // Panels
    //

    // Hide if collapsed by default
    $('.panel-collapsed').children('.panel-heading').nextAll().hide()

    // Rotate icon if collapsed by default
    $('.panel-collapsed').find('[data-action=collapse]').addClass('rotate-180')

    // Collapse on click
      $('.panel [data-action=collapse]').unbind('click')
    $('.panel [data-action=collapse]').click(function (e) {
      e.preventDefault()
      var $panelCollapse = $(this).parent().parent().parent().parent().nextAll()
      $(this).parents('.panel').toggleClass('panel-collapsed')
      $(this).toggleClass('rotate-180')

      containerHeight() // recalculate page height

      $panelCollapse.slideToggle(150)
    })

    // Remove elements
    // -------------------------

    // Panels
      $('.panel [data-action=close]').unbind('click')
    $('.panel [data-action=close]').click(function (e) {
      e.preventDefault()
      var $panelClose = $(this).parent().parent().parent().parent().parent()

      containerHeight() // recalculate page height

      $panelClose.slideUp(150, function () {
        $(this).remove()
      })
    })

    // Sidebar categories
      $('.category-title [data-action=close]').unbind('click')
    $('.category-title [data-action=close]').click(function (e) {
      e.preventDefault()
      var $categoryClose = $(this).parent().parent().parent().parent()

      containerHeight() // recalculate page height

      $categoryClose.slideUp(150, function () {
        $(this).remove()
      })
    })

    // ========================================
    //
    // Main navigation
    //
    // ========================================

    // Main navigation
    // -------------------------

    // Add 'active' class to parent list item in all levels
    $('.navigation').find('li.active').parents('li').addClass('active')

    // Hide all nested lists
    $('.navigation').find('li').not('.active, .category-title').has('ul').children('ul').addClass('hidden-ul')

    // Highlight children links
    $('.navigation').find('li').has('ul').children('a').addClass('has-ul')

    // Add active state to all dropdown parent levels
    $('.dropdown-menu:not(.dropdown-content), .dropdown-menu:not(.dropdown-content) .dropdown-submenu').has('li.active').addClass('active').parents('.navbar-nav .dropdown:not(.language-switch), .navbar-nav .dropup:not(.language-switch)').addClass('active')

    // Main navigation tooltips positioning
    // -------------------------

    // Left sidebar
    $('.navigation-main > .navigation-header > i').tooltip({
      placement: 'right',
      container: 'body'
    })
      $('.navigation-alt').find('li').has('ul').children('a').unbind('click')
    $('.navigation-alt').find('li').has('ul').children('a').on('click', function (e) {
      e.preventDefault()

      $(this).parent('li').not('.disabled').toggleClass('active').children('ul').slideToggle(200)

      // Accordion
      if ($('.navigation-alt').hasClass('navigation-accordion')) {
        $(this).parent('li').not('.disabled').siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(200)
      }
    })

    // Disable click in disabled navigation items
      $('.navigation .disabled a').unbind('click')
    $(document).on('click', '.navigation .disabled a', function (e) {
      e.preventDefault()
    })

    // Hide main sidebar in Dual Sidebar
      $('.sidebar-main-hide').unbind('click')
    $(document).on('click', '.sidebar-main-hide', function (e) {
      e.preventDefault()
      $('body').toggleClass('sidebar-main-hidden')
    })
      $('.sidebar-detached-hide').unbind('click')
    $(document).on('click', '.sidebar-detached-hide', function (e) {
      e.preventDefault()
      $('body').toggleClass('sidebar-detached-hidden')
    })

    // Hide all sidebars
      $('.sidebar-all-hide').unbind('click')
    $(document).on('click', '.sidebar-all-hide', function (e) {
      e.preventDefault()

      $('body').toggleClass('sidebar-all-hidden')
    })

    //
    // Opposite sidebar
    //

    // Collapse main sidebar if opposite sidebar is visible
      $('.sidebar-opposite-toggle').unbind('click')
    $(document).on('click', '.sidebar-opposite-toggle', function (e) {
      e.preventDefault()

      // Opposite sidebar visibility
      $('body').toggleClass('sidebar-opposite-visible')

      // If visible
      if ($('body').hasClass('sidebar-opposite-visible')) {
        // Make main sidebar mini
        $('body').addClass('sidebar-xs')

        // Hide children lists
        $('.navigation-main').children('li').children('ul').css('display', '')
      } else {
        // Make main sidebar default
        $('body').removeClass('sidebar-xs')
      }
    })

    // Hide main sidebar if opposite sidebar is shown
      $('.sidebar-opposite-main-hide').unbind('click')
    $(document).on('click', '.sidebar-opposite-main-hide', function (e) {
      e.preventDefault()

      // Opposite sidebar visibility
      $('body').toggleClass('sidebar-opposite-visible')

      // If visible
      if ($('body').hasClass('sidebar-opposite-visible')) {
        // Hide main sidebar
        $('body').addClass('sidebar-main-hidden')
      } else {
        // Show main sidebar
        $('body').removeClass('sidebar-main-hidden')
      }
    })

    // Hide secondary sidebar if opposite sidebar is shown
      $('.sidebar-opposite-secondary-hide').unbind('click')
    $(document).on('click', '.sidebar-opposite-secondary-hide', function (e) {
      e.preventDefault()

      // Opposite sidebar visibility
      $('body').toggleClass('sidebar-opposite-visible')

      // If visible
      if ($('body').hasClass('sidebar-opposite-visible')) {
        // Hide secondary
        $('body').addClass('sidebar-secondary-hidden')
      } else {
        // Show secondary
        $('body').removeClass('sidebar-secondary-hidden')
      }
    })

    // Hide all sidebars if opposite sidebar is shown
      $('.sidebar-opposite-hide').unbind('click')
    $(document).on('click', '.sidebar-opposite-hide', function (e) {
      e.preventDefault()

      // Toggle sidebars visibility
      $('body').toggleClass('sidebar-all-hidden')

      // If hidden
      if ($('body').hasClass('sidebar-all-hidden')) {
        // Show opposite
        $('body').addClass('sidebar-opposite-visible')

        // Hide children lists
        $('.navigation-main').children('li').children('ul').css('display', '')
      } else {
        // Hide opposite
        $('body').removeClass('sidebar-opposite-visible')
      }
    })

    // Keep the width of the main sidebar if opposite sidebar is visible
      $('.sidebar-opposite-fix').unbind('click')
    $(document).on('click', '.sidebar-opposite-fix', function (e) {
      e.preventDefault()

      // Toggle opposite sidebar visibility
      $('body').toggleClass('sidebar-opposite-visible')
    })

    $('[data-popup="popover"]').popover()

    // Tooltip
    $('[data-popup="tooltip"]').tooltip()
  })
}
let RT = new Router({
  routes: [
    {
      path: '/',
      component: Common,
      children: [
        {
          path: '',
          name: 'home',
          component: HelloWorld
        },
        {
          path: 'group',
          name: 'group',
          component: Group
        },
        {
          path: 'chat-team/:id',
          name: 'chat-team',
          components: {
            default: ChatTeam,
            'sidebar-secondary': SidebarSecondary,
            'control-sidebar-secondary': ControlSidebarSecondary,
            'sidebar-mobile-secondary-toggle': sidebarMobileSecondaryToggle
          }
        },
        {
          path: 'messages',
          name: 'messages',
          components: {
            default: Messages,
            'sidebar-secondary': SidebarSecondaryMessage,
            'control-sidebar-secondary': ControlSidebarSecondary,
            'sidebar-mobile-secondary-toggle': sidebarMobileSecondaryToggle
          }
        }
      ]
    },
    {
      path: '/login',
      component: Login,
      name: 'login'
    }
  ]
  /* mode: 'history' */
})
RT.beforeEach((to, from, next) => {
  let token = localStorage.getItem('Auth-Token')
  if (token != undefined && token != null) {
    let user = store.getters.getUser
    if (to.name == 'login') {
      checkLogined(function (user) {
        if (from.name == null || from.name == undefined) {
          RT.push({
            name: 'home'
          })
        } else {
          store.commit('setUser', user)
          store.commit('setToken', localStorage.getItem('Auth-Token'))
          RT.push({
            name: from.name
          })
        }
      },next)
    } else if (user == null) {
      getInforUser(next)
    }
        if (store.getters['room/getGroups'].length == 0) {
            axios.get(`http://localhost:3000/users/groups`).then(data => {
                store.commit('room/setGroups', data.data.groups)
            }).catch(err => {
                console.log(err)
            })
        }
        if(store.getters.getCompanyMembers == null || store.getters.getCompanyMembers.length == 0)
        {
            axios.get(`http://localhost:3000/companies/members`).then(data => {
                store.commit('setCompanyMembers', data.data.members)
            }).catch(err => {
                console.log(err)
            })
        }
      next()

  } else {
    if (to.name == 'login') {
      next()
    } else {
      RT.push({
        name: 'login'
      })
    }
  }
})
RT.afterEach((to, from) => {
  if (to.name != 'login') {
    $('body').removeClass('login-container')
  }
  init()
})
function checkLogined (callBack,next) {
  let vm = this
  axios({
    url: 'http://localhost:3000/auth',
    method: 'post',
    headers: {
      'Auth-Token': localStorage.getItem('Auth-Token')
    }
  }).then(data => {
    callBack(data.data.user)
  }).catch(err => {
    console.dir(err)
    if (err.response.status == 406) {
      localStorage.removeItem('Auth-Token')
      store.commit('removeToken')
    }
    console.log('Token không chính xác')
      next()
  })
}
function getInforUser (next) {
  axios.get('http://localhost:3000/users/info').then(data => {
    store.commit('setUser', data.data)
  }).catch(err => {
    console.log(err)
    RT.push({name: 'login'})
  })
}
export default RT
