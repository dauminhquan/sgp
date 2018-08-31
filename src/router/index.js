import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Common from '@/components/common'
import Group from '@/components/Group'
import ChatTeam from '@/components/ChatTeam/index'
import SidebarSecondary from '@/components/ChatTeam/components/sidebar-secondary'
import ControlSidebarSecondary from '@/components/ChatTeam/components/control-sidebar-secondary'
import sidebarMobileSecondaryToggle from '@/components/ChatTeam/components/sidebar-mobile-secondary-toggle'
import $ from 'jquery'
import 'bootstrap'
import 'block-ui'
import 'pace'
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
    $(document).on('click', '.dropdown-content', function (e) {
      e.stopPropagation()
    })

    // Disabled links
    $('.navbar-nav .disabled a').on('click', function (e) {
      e.preventDefault()
      e.stopPropagation()
    })

    // Show tabs inside dropdowns
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
    $('.panel [data-action=close]').click(function (e) {
      e.preventDefault()
      var $panelClose = $(this).parent().parent().parent().parent().parent()

      containerHeight() // recalculate page height

      $panelClose.slideUp(150, function () {
        $(this).remove()
      })
    })

    // Sidebar categories
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

    // Collapsible functionality
    // -------------------------

    // Main navigation

    // ========================================
    //
    // Sidebars
    //
    // ========================================

    // Mini sidebar
    // -------------------------

    // Sidebar controls
    // -------------------------

    // Disable click in disabled navigation items
    $(document).on('click', '.navigation .disabled a', function (e) {
      e.preventDefault()
    })

    // Hide main sidebar in Dual Sidebar
    $(document).on('click', '.sidebar-main-hide', function (e) {
      e.preventDefault()
      $('body').toggleClass('sidebar-main-hidden')
    })

    $(document).on('click', '.sidebar-detached-hide', function (e) {
      e.preventDefault()
      $('body').toggleClass('sidebar-detached-hidden')
    })

    // Hide all sidebars
    $(document).on('click', '.sidebar-all-hide', function (e) {
      e.preventDefault()

      $('body').toggleClass('sidebar-all-hidden')
    })

    //
    // Opposite sidebar
    //

    // Collapse main sidebar if opposite sidebar is visible
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
          path: 'chat-team',
          name: 'chat-team',
          components: {
            default: ChatTeam,
            'sidebar-secondary': SidebarSecondary,
            'control-sidebar-secondary': ControlSidebarSecondary,
            'sidebar-mobile-secondary-toggle': sidebarMobileSecondaryToggle
          }
        }
      ]
    }
  ]
  /* mode: 'history' */
})
RT.afterEach((to, from) => {
  init()
})
export default RT
