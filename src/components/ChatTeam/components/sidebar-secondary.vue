<template>
    <div class="sidebar sidebar-secondary sidebar-default">
        <div class="sidebar-content">

            <!-- Search messages -->
            <div class="sidebar-category">
                <div class="category-title">
                    <span>Search messages</span>
                    <ul class="icons-list">
                        <li><a href="#" data-action="collapse"></a></li>
                    </ul>
                </div>

                <div class="category-content">
                    <form action="#">
                        <div class="has-feedback has-feedback-left">
                            <input type="search" class="form-control" placeholder="Type and hit Enter">
                            <div class="form-control-feedback">
                                <i class="icon-search4 text-size-base text-muted"></i>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <!-- /search messages -->

            <!-- Sub navigation -->
            <div class="sidebar-category">
                <div class="category-title">
                    <span>Navigation</span>
                    <ul class="icons-list">
                        <li><a href="#" data-action="collapse"></a></li>
                    </ul>
                </div>

                <div class="category-content no-padding">
                    <ul class="navigation navigation-alt navigation-accordion">
                        <li class="navigation-header">Actions</li>
                        <li><a href="#"><i class="icon-compose"></i> Compose message</a></li>
                        <li><a href="#"><i class="icon-collaboration"></i> Conference</a></li>
                        <li><a href="#"><i class="icon-user-plus"></i> Add users <span class="label label-success">32 online</span></a></li>
                        <li><a href="#"><i class="icon-users"></i> Create team</a></li>
                        <li class="navigation-divider"></li>
                        <li><a href="#"><i class="icon-files-empty"></i> All messages <span class="badge badge-danger">99+</span></a></li>
                        <li><a href="#"><i class="icon-file-plus"></i> Active discussions <span class="badge badge-default">32</span></a></li>
                        <li><a href="#"><i class="icon-file-locked"></i> Closed discussions</a></li>
                        <li class="navigation-header">Options</li>
                        <li><a href="#"><i class="icon-reading"></i> Message history</a></li>
                        <li><a href="#"><i class="icon-cog3"></i> Settings</a></li>
                    </ul>
                </div>
            </div>
            <!-- /sub navigation -->

            <!-- Latest updates -->
            <div class="sidebar-category">
                <div class="category-title">
                    <span>new issue</span>
                    <ul class="icons-list">
                        <li><a href="#" data-action="collapse"></a></li>
                    </ul>
                </div>

                <div class="category-content">
                    <ul class="media-list">
                        <li class="media">
                            <div class="media-left"><a href="#" class="btn border-success text-success btn-flat btn-icon btn-sm btn-rounded"><i class="icon-checkmark3"></i></a></div>
                            <div class="media-body">
                                <a href="#">Richard Vango</a> has been registered
                                <div class="media-annotation">4 minutes ago</div>
                            </div>
                        </li>

                        <li class="media">
                            <div class="media-left"><a href="#" class="btn border-slate text-slate btn-flat btn-icon btn-sm btn-rounded"><i class="icon-infinite"></i></a></div>
                            <div class="media-body">
                                Server went offline for monthly maintenance
                                <div class="media-annotation">36 minutes ago</div>
                            </div>
                        </li>

                        <li class="media">
                            <div class="media-left"><a href="#" class="btn border-success text-success btn-flat btn-icon btn-sm btn-rounded"><i class="icon-checkmark3"></i></a></div>
                            <div class="media-body">
                                <a href="#">Chris Arney</a> has been registered
                                <div class="media-annotation">2 hours ago</div>
                            </div>
                        </li>

                        <li class="media">
                            <div class="media-left"><a href="#" class="btn border-danger text-danger btn-flat btn-icon btn-sm btn-rounded"><i class="icon-cross2"></i></a></div>
                            <div class="media-body">
                                <a href="#">Chris Arney</a> left main conversation
                                <div class="media-annotation">Dec 18, 18:36</div>
                            </div>
                        </li>

                        <li class="media">
                            <div class="media-left"><a href="#" class="btn border-primary text-primary btn-flat btn-icon btn-sm btn-rounded"><i class="icon-plus3"></i></a></div>
                            <div class="media-body">
                                <a href="#">Beatrix Diaz</a> just joined conversation
                                <div class="media-annotation">Dec 12, 05:46</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- /latest updates -->

            <!-- Online users -->
            <div class="sidebar-category">
                <div class="category-title">
                    <span>Online users</span>
                    <ul class="icons-list">
                        <li><a href="#" data-action="collapse"></a></li>
                    </ul>
                </div>

                <div class="category-content no-padding">
                    <ul class="media-list media-list-linked">
                        <li class="media">
                            <a href="#" class="media-link">
                                <div class="media-left"><img src="assets/images/placeholder.jpg" class="img-circle" alt=""></div>
                                <div class="media-body">
                                    <span class="media-heading text-semibold">James Alexander</span>
                                    <span class="text-size-small text-muted display-block">UI/UX expert</span>
                                </div>
                                <div class="media-right media-middle">
                                    <span class="status-mark bg-success"></span>
                                </div>
                            </a>
                        </li>

                        <li class="media">
                            <a href="#" class="media-link">
                                <div class="media-left"><img src="assets/images/placeholder.jpg" class="img-circle" alt=""></div>
                                <div class="media-body">
                                    <span class="media-heading text-semibold">Jeremy Victorino</span>
                                    <span class="text-size-small text-muted display-block">Senior designer</span>
                                </div>
                                <div class="media-right media-middle">
                                    <span class="status-mark bg-danger"></span>
                                </div>
                            </a>
                        </li>

                        <li class="media">
                            <a href="#" class="media-link">
                                <div class="media-left"><img src="assets/images/placeholder.jpg" class="img-circle" alt=""></div>
                                <div class="media-body">
                                    <div class="media-heading"><span class="text-semibold">Jordana Mills</span></div>
                                    <span class="text-muted">Sales consultant</span>
                                </div>
                                <div class="media-right media-middle">
                                    <span class="status-mark bg-grey-300"></span>
                                </div>
                            </a>
                        </li>

                        <li class="media">
                            <a href="#" class="media-link">
                                <div class="media-left"><img src="assets/images/placeholder.jpg" class="img-circle" alt=""></div>
                                <div class="media-body">
                                    <div class="media-heading"><span class="text-semibold">William Miles</span></div>
                                    <span class="text-muted">SEO expert</span>
                                </div>
                                <div class="media-right media-middle">
                                    <span class="status-mark bg-success"></span>
                                </div>
                            </a>
                        </li>

                        <li class="media">
                            <a href="#" class="media-link">
                                <div class="media-left"><img src="assets/images/placeholder.jpg" class="img-circle" alt=""></div>
                                <div class="media-body">
                                    <span class="media-heading text-semibold">Margo Baker</span>
                                    <span class="text-size-small text-muted display-block">Google</span>
                                </div>
                                <div class="media-right media-middle">
                                    <span class="status-mark bg-success"></span>
                                </div>
                            </a>
                        </li>

                        <li class="media">
                            <a href="#" class="media-link">
                                <div class="media-left"><img src="assets/images/placeholder.jpg" class="img-circle" alt=""></div>
                                <div class="media-body">
                                    <span class="media-heading text-semibold">Beatrix Diaz</span>
                                    <span class="text-size-small text-muted display-block">Facebook</span>
                                </div>
                                <div class="media-right media-middle">
                                    <span class="status-mark bg-warning-400"></span>
                                </div>
                            </a>
                        </li>

                        <li class="media">
                            <a href="#" class="media-link">
                                <div class="media-left"><img src="assets/images/placeholder.jpg" class="img-circle" alt=""></div>
                                <div class="media-body">
                                    <span class="media-heading text-semibold">Richard Vango</span>
                                    <span class="text-size-small text-muted display-block">Microsoft</span>
                                </div>
                                <div class="media-right media-middle">
                                    <span class="status-mark bg-grey-300"></span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- /online users -->

            <!-- Latest messages -->
            <div class="sidebar-category">
                <div class="category-title">
                    <span>Latest messages</span>
                    <ul class="icons-list">
                        <li><a href="#" data-action="collapse"></a></li>
                    </ul>
                </div>

                <div class="category-content no-padding">
                    <ul class="media-list media-list-linked">
                        <li class="media">
                            <a href="#" class="media-link">
                                <div class="media-left"><img src="assets/images/placeholder.jpg" class="img-circle" alt=""></div>
                                <div class="media-body">
                                    <span class="media-heading text-semibold">Will Samuel</span>
                                    <span class="text-muted">And he looked over at the alarm clock, ticking..</span>
                                </div>
                            </a>
                        </li>

                        <li class="media">
                            <a href="#" class="media-link">
                                <div class="media-left"><img src="assets/images/placeholder.jpg" class="img-circle" alt=""></div>
                                <div class="media-body">
                                    <span class="media-heading text-semibold">Margo Baker</span>
                                    <span class="text-muted">However hard he threw himself onto..</span>
                                </div>
                            </a>
                        </li>

                        <li class="media">
                            <a href="#" class="media-link">
                                <div class="media-left"><img src="assets/images/placeholder.jpg" class="img-circle" alt=""></div>
                                <div class="media-body">
                                    <span class="media-heading text-semibold">Monica Smith</span>
                                    <span class="text-muted">Yes, but was it spanossible to quietly sleep through..</span>
                                </div>
                            </a>
                        </li>

                        <li class="media">
                            <a href="#" class="media-link">
                                <div class="media-left"><img src="assets/images/placeholder.jpg" class="img-circle" alt=""></div>
                                <div class="media-body">
                                    <span class="media-heading text-semibold">Jordana Mills</span>
                                    <span class="text-muted">What should he do now? The next train went at..</span>
                                </div>
                            </a>
                        </li>

                        <li class="media">
                            <a href="#" class="media-link">
                                <div class="media-left"><img src="assets/images/placeholder.jpg" class="img-circle" alt=""></div>
                                <div class="media-body">
                                    <span class="media-heading text-semibold">John Craving</span>
                                    <span class="text-muted">Gregor then turned to look out the window..</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- /latest messages -->

        </div>
    </div>
</template>
