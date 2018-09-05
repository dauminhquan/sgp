<template>
    <div>
        <!-- Main navbar -->
        <div class="navbar navbar-inverse">
            <div class="navbar-header">
                <a class="navbar-brand" href="index.html"><img src="assets/images/logo_light.png" alt=""></a>

                <ul class="nav navbar-nav pull-right visible-xs-block">
                    <li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
                </ul>
            </div>

            <div class="navbar-collapse collapse" id="navbar-mobile">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="#">
                            <i class="icon-display4"></i> <span class="visible-xs-inline-block position-right"> Go to website</span>
                        </a>
                    </li>

                    <li>
                        <a href="#">
                            <i class="icon-user-tie"></i> <span class="visible-xs-inline-block position-right"> Contact admin</span>
                        </a>
                    </li>

                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown">
                            <i class="icon-cog3"></i>
                            <span class="visible-xs-inline-block position-right"> Options</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- /main navbar -->

        <!-- Page container -->
        <div class="page-container">

            <!-- Page content -->
            <div class="page-content">

                <!-- Main content -->
                <div class="content-wrapper">

                    <!-- Content area -->
                    <div class="content">

                        <!-- Advanced login -->
                        <form @submit.prevent="login">
                            <div class="panel panel-body login-form">
                                <div class="text-center">
                                    <div :class="waitingLogin == false?'icon-object border-slate-300 text-slate-300': 'icon-object border-slate-300 text-slate-300 waiting-login'"><i class="icon-reading"></i></div>
                                    <h5 class="content-group">Login <small class="display-block text-danger-400" v-if="textError != null">{{textError}}</small></h5>
                                </div>

                                <div class="form-group has-feedback has-feedback-left">
                                    <input type="email" v-model="email" class="form-control" placeholder="Username" required>
                                    <div class="form-control-feedback">
                                        <i class="icon-user text-muted"></i>
                                    </div>
                                </div>

                                <div class="form-group has-feedback has-feedback-left">
                                    <input type="password" v-model="password" class="form-control" placeholder="Password" required>
                                    <div class="form-control-feedback">
                                        <i class="icon-lock2 text-muted"></i>
                                    </div>
                                </div>

                                <div class="form-group login-options">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <label class="checkbox-inline">
                                                <div class="checker">
                                                    <span :class="checked">
                                                        <input v-model="remember" type="checkbox" class="styled">
                                                    </span>
                                                </div>
                                                Remember
                                            </label>
                                        </div>

                                        <div class="col-sm-6 text-right">
                                            <a href="login_password_recover.html">Forgot password?</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <button type="submit" class="btn bg-blue btn-block">Login <i class="icon-arrow-right14 position-right"></i></button>
                                </div>

                                <div class="content-divider text-muted form-group"><span>or sign in with</span></div>
                                <ul class="list-inline form-group list-inline-condensed text-center">
                                    <li><a href="#" class="btn border-indigo text-indigo btn-flat btn-icon btn-rounded"><i class="icon-facebook"></i></a></li>
                                    <li><a href="#" class="btn border-pink-300 text-pink-300 btn-flat btn-icon btn-rounded"><i class="icon-dribbble3"></i></a></li>
                                    <li><a href="#" class="btn border-slate-600 text-slate-600 btn-flat btn-icon btn-rounded"><i class="icon-github"></i></a></li>
                                    <li><a href="#" class="btn border-info text-info btn-flat btn-icon btn-rounded"><i class="icon-twitter"></i></a></li>
                                </ul>

                                <div class="content-divider text-muted form-group"><span>Don't have an account?</span></div>
                                <a href="login_registration.html" class="btn btn-default btn-block content-group">Sign up</a>
                                <span class="help-block text-center no-margin">By continuing, you're confirming that you've read our <a href="#">Terms &amp; Conditions</a> and <a href="#">Cookie Policy</a></span>
                            </div>
                        </form>
                        <!-- /advanced login -->

                        <!-- Footer -->
                        <div class="footer text-muted text-center">
                            &copy; 2015. <a href="#">Limitless Web App Kit</a> by <a href="http://themeforest.net/user/Kopyov" target="_blank">Eugene Kopyov</a>
                        </div>
                        <!-- /footer -->

                    </div>
                    <!-- /content area -->

                </div>
                <!-- /main content -->

            </div>
            <!-- /page content -->

        </div>
        <!-- /page container -->
    </div>
</template>
<script>
    import $ from 'jquery'
    import axios from './../../axios'
    import qs from 'qs'
    export default {
        computed: {
            checked () {
                if (this.remember == true) {
                    return 'checked'
                }
                return null
            }
        },
        mounted () {
            if (!$('body').hasClass('login-container')) {
                $('body').addClass('login-container')
            }
        },
        data () {
            return {
                remember: false,
                email: null,
                password: null,
                textError: null,
                waitingLogin: false
            }
        },
        methods: {
            pushHome () {
                this.$router.push({name: 'home'})
            },
            login () {
                let vm = this
                vm.waitingLogin = true
                vm.textError = null
                console.log(vm.$store.getters.getLocation)
                axios({
                    url: 'http://localhost:3000/login',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: qs.stringify({
                        email: vm.email,
                        password: vm.password
                    })
                }).then(data => {
                    localStorage.setItem('Auth-Token', data.data.user.token)
                    vm.$store.commit('setToken', data.data.user.token)
                    vm.$store.commit('setUser',data.data.user)
                    vm.pushHome()
                    vm.waitingLogin = false
                }).catch(err => {
                    console.log(err)
                    vm.textError = 'Tài khoản hoặc mật khẩu không đúng'
                    vm.waitingLogin = false
                })
            },
            getGroups () {
            }
        }
    }
</script>
<style>
    .waiting-login{
        animation: spin 2s linear infinite;
    }
    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
