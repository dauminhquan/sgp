<template>
    <div class="content">
        <!-- Dashboard content -->
        <div class="row">
            <div class="col-lg-8">
                <!-- Quick stats boxes -->
                <div class="row">
                    <div class="col-lg-4">

                        <!-- Members online -->
                        <div class="panel bg-teal-400">
                            <div class="panel-body">
                                <div class="heading-elements">
                                    <span class="heading-text badge bg-teal-800">+53,6%</span>
                                </div>

                                <h3 class="no-margin">3,450</h3>
                                Members online
                                <div class="text-muted text-size-small">489 avg</div>
                            </div>

                            <div class="container-fluid">
                                <div id="members-online"></div>
                            </div>
                        </div>
                        <!-- /members online -->

                    </div>

                    <div class="col-lg-4">

                        <!-- Current server load -->
                        <div class="panel bg-pink-400">
                            <div class="panel-body">
                                <div class="heading-elements">
                                    <ul class="icons-list">
                                        <li class="dropdown">
                                            <a :href="null" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-cog3"></i> <span class="caret"></span></a>
                                            <ul class="dropdown-menu dropdown-menu-right">
                                                <li><a :href="null"><i class="icon-sync"></i> Update data</a></li>
                                                <li><a :href="null"><i class="icon-list-unordered"></i> Detailed log</a></li>
                                                <li><a :href="null"><i class="icon-pie5"></i> Statistics</a></li>
                                                <li><a :href="null"><i class="icon-cross3"></i> Clear list</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>

                                <h3 class="no-margin">49.4%</h3>
                                Current server load
                                <div class="text-muted text-size-small">34.6% avg</div>
                            </div>

                            <div id="server-load"></div>
                        </div>
                        <!-- /current server load -->

                    </div>

                    <div class="col-lg-4">

                        <!-- Today's revenue -->
                        <div class="panel bg-blue-400">
                            <div class="panel-body">
                                <div class="heading-elements">
                                    <ul class="icons-list">
                                        <li><a data-action="reload"></a></li>
                                    </ul>
                                </div>

                                <h3 class="no-margin">$18,390</h3>
                                Today's revenue
                                <div class="text-muted text-size-small">$37,578 avg</div>
                            </div>

                            <div id="today-revenue"></div>
                        </div>
                        <!-- /today's revenue -->

                    </div>
                </div>
                <!-- /quick stats boxes -->

                <!-- Support tickets -->
                <div class="panel panel-flat">
                    <div class="panel-heading">
                        <h6 class="panel-title">Support tickets</h6>
                        <div class="heading-elements">
                            <button type="button" class="btn btn-link daterange-ranges heading-btn text-semibold">
                                <date-picker
                                        v-model="dateChoose" range  lang="vi" format="DD/MM/YYYY HH:mm" :confirm="true" :editable="false" range-separator="đến" type="datetime" placeholder="Chọn thời gian"></date-picker>
                            </button>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-xlg text-nowrap">
                            <tbody>
                            <tr>
                                <td class="col-md-4">
                                    <div class="media-left media-middle">
                                        <div id="tickets-status"></div>
                                    </div>

                                    <div class="media-left">
                                        <h5 class="text-semibold no-margin">14,327 <small class="text-success text-size-base"><i class="icon-arrow-up12"></i> (+2.9%)</small></h5>
                                        <span class="text-muted"><span class="status-mark border-success position-left"></span> Jun 16, 10:00 am</span>
                                    </div>
                                </td>

                                <td class="col-md-3">
                                    <div class="media-left media-middle">
                                        <a :href="null" class="btn border-indigo-400 text-indigo-400 btn-flat btn-rounded btn-xs btn-icon"><i class="icon-alarm-add"></i></a>
                                    </div>

                                    <div class="media-left">
                                        <h5 class="text-semibold no-margin">
                                            1,132 <small class="display-block no-margin">total tickets</small>
                                        </h5>
                                    </div>
                                </td>

                                <td class="col-md-3">
                                    <div class="media-left media-middle">
                                        <a :href="null" class="btn border-indigo-400 text-indigo-400 btn-flat btn-rounded btn-xs btn-icon"><i class="icon-spinner11"></i></a>
                                    </div>

                                    <div class="media-left">
                                        <h5 class="text-semibold no-margin">
                                            06:25:00 <small class="display-block no-margin">response time</small>
                                        </h5>
                                    </div>
                                </td>

                                <td class="text-right col-md-2">
                                    <a :href="null" class="btn bg-teal-400"><i class="icon-statistics position-left"></i> Report</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="table-responsive">
                        <table class="table text-nowrap">
                            <thead>
                            <tr>
                                <th style="width: 50px">Due</th>
                                <th style="width: 300px;">User</th>
                                <th>Description</th>
                                <th class="text-center" style="width: 20px;"><i class="icon-arrow-down12"></i></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="active border-double">
                                <td colspan="3">Active tickets</td>
                                <td class="text-right">
                                    <span class="badge bg-blue">24</span>
                                </td>
                            </tr>

                            <tr>
                                <td class="text-center">
                                    <h6 class="no-margin">12 <small class="display-block text-size-small no-margin">hours</small></h6>
                                </td>
                                <td>
                                    <div class="media-left media-middle">
                                        <a :href="null" class="btn bg-teal-400 btn-rounded btn-icon btn-xs">
                                            <span class="letter-icon"></span>
                                        </a>
                                    </div>

                                    <div class="media-body">
                                        <a :href="null" class="display-inline-block text-default text-semibold letter-icon-title">Annabelle Doney</a>
                                        <div class="text-muted text-size-small"><span class="status-mark border-blue position-left"></span> Active</div>
                                    </div>
                                </td>
                                <td>
                                    <a :href="null" class="text-default display-inline-block">
                                        <span class="text-semibold">[#1183] Workaround for OS X selects printing bug</span>
                                        <span class="display-block text-muted">Chrome fixed the bug several versions ago, thus rendering this...</span>
                                    </a>
                                </td>
                                <td class="text-center">
                                    <ul class="icons-list">
                                        <li class="dropdown">
                                            <a :href="null" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-right">
                                                <li><a :href="null"><i class="icon-undo"></i> Quick reply</a></li>
                                                <li><a :href="null"><i class="icon-history"></i> Full history</a></li>
                                                <li class="divider"></li>
                                                <li><a :href="null"><i class="icon-checkmark3 text-success"></i> Resolve issue</a></li>
                                                <li><a :href="null"><i class="icon-cross2 text-danger"></i> Close issue</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </td>
                            </tr>

                            <tr>
                                <td class="text-center">
                                    <h6 class="no-margin">16 <small class="display-block text-size-small no-margin">hours</small></h6>
                                </td>
                                <td>
                                    <div class="media-left media-middle">
                                        <a :href="null"><img src="assets/images/placeholder.jpg" class="img-circle img-xs" alt=""></a>
                                    </div>

                                    <div class="media-body">
                                        <a :href="null" class="display-inline-block text-default text-semibold letter-icon-title">Chris Macintyre</a>
                                        <div class="text-muted text-size-small"><span class="status-mark border-blue position-left"></span> Active</div>
                                    </div>
                                </td>
                                <td>
                                    <a :href="null" class="text-default display-inline-block">
                                        <span class="text-semibold">[#1249] Vertically center carousel controls</span>
                                        <span class="display-block text-muted">Try any carousel control and reduce the screen width below...</span>
                                    </a>
                                </td>
                                <td class="text-center">
                                    <ul class="icons-list">
                                        <li class="dropdown">
                                            <a :href="null" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-right">
                                                <li><a :href="null"><i class="icon-undo"></i> Quick reply</a></li>
                                                <li><a :href="null"><i class="icon-history"></i> Full history</a></li>
                                                <li class="divider"></li>
                                                <li><a :href="null"><i class="icon-checkmark3 text-success"></i> Resolve issue</a></li>
                                                <li><a :href="null"><i class="icon-cross2 text-danger"></i> Close issue</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </td>
                            </tr>

                            <tr>
                                <td class="text-center">
                                    <h6 class="no-margin">20 <small class="display-block text-size-small no-margin">hours</small></h6>
                                </td>
                                <td>
                                    <div class="media-left media-middle">
                                        <a :href="null" class="btn bg-blue btn-rounded btn-icon btn-xs">
                                            <span class="letter-icon"></span>
                                        </a>
                                    </div>

                                    <div class="media-body">
                                        <a :href="null" class="display-inline-block text-default text-semibold letter-icon-title">Robert Hauber</a>
                                        <div class="text-muted text-size-small"><span class="status-mark border-blue position-left"></span> Active</div>
                                    </div>
                                </td>
                                <td>
                                    <a :href="null" class="text-default display-inline-block">
                                        <span class="text-semibold">[#1254] Inaccurate small pagination height</span>
                                        <span class="display-block text-muted">The height of pagination elements is not consistent with...</span>
                                    </a>
                                </td>
                                <td class="text-center">
                                    <ul class="icons-list">
                                        <li class="dropdown">
                                            <a :href="null" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-right">
                                                <li><a :href="null"><i class="icon-undo"></i> Quick reply</a></li>
                                                <li><a :href="null"><i class="icon-history"></i> Full history</a></li>
                                                <li class="divider"></li>
                                                <li><a :href="null"><i class="icon-checkmark3 text-success"></i> Resolve issue</a></li>
                                                <li><a :href="null"><i class="icon-cross2 text-danger"></i> Close issue</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </td>
                            </tr>

                            <tr>
                                <td class="text-center">
                                    <h6 class="no-margin">40 <small class="display-block text-size-small no-margin">hours</small></h6>
                                </td>
                                <td>
                                    <div class="media-left media-middle">
                                        <a :href="null" class="btn bg-warning-400 btn-rounded btn-icon btn-xs">
                                            <span class="letter-icon"></span>
                                        </a>
                                    </div>

                                    <div class="media-body">
                                        <a :href="null" class="display-inline-block text-default text-semibold letter-icon-title">Dex Sponheim</a>
                                        <div class="text-muted text-size-small"><span class="status-mark border-blue position-left"></span> Active</div>
                                    </div>
                                </td>
                                <td>
                                    <a :href="null" class="text-default display-inline-block">
                                        <span class="text-semibold">[#1184] Round grid column gutter operations</span>
                                        <span class="display-block text-muted">Left rounds up, right rounds down. should keep everything...</span>
                                    </a>
                                </td>
                                <td class="text-center">
                                    <ul class="icons-list">
                                        <li class="dropdown">
                                            <a :href="null" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-right">
                                                <li><a :href="null"><i class="icon-undo"></i> Quick reply</a></li>
                                                <li><a :href="null"><i class="icon-history"></i> Full history</a></li>
                                                <li class="divider"></li>
                                                <li><a :href="null"><i class="icon-checkmark3 text-success"></i> Resolve issue</a></li>
                                                <li><a :href="null"><i class="icon-cross2 text-danger"></i> Close issue</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </td>
                            </tr>

                            <tr class="active border-double">
                                <td colspan="3">Resolved tickets</td>
                                <td class="text-right">
                                    <span class="badge bg-success">42</span>
                                </td>
                            </tr>

                            <tr>
                                <td class="text-center">
                                    <i class="icon-checkmark3 text-success"></i>
                                </td>
                                <td>
                                    <div class="media-left media-middle">
                                        <a :href="null" class="btn bg-success-400 btn-rounded btn-icon btn-xs">
                                            <span class="letter-icon"></span>
                                        </a>
                                    </div>

                                    <div class="media-body">
                                        <a :href="null" class="display-inline-block text-default letter-icon-title">Alan Macedo</a>
                                        <div class="text-muted text-size-small"><span class="status-mark border-success position-left"></span> Resolved</div>
                                    </div>
                                </td>
                                <td>
                                    <a :href="null" class="text-default display-inline-block">
                                        [#1046] Avoid some unnecessary HTML string
                                        <span class="display-block text-muted">Rather than building a string of HTML and then parsing it...</span>
                                    </a>
                                </td>
                                <td class="text-center">
                                    <ul class="icons-list">
                                        <li class="dropdown">
                                            <a :href="null" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-right">
                                                <li><a :href="null"><i class="icon-undo"></i> Quick reply</a></li>
                                                <li><a :href="null"><i class="icon-history"></i> Full history</a></li>
                                                <li class="divider"></li>
                                                <li><a :href="null"><i class="icon-plus3 text-blue"></i> Unresolve issue</a></li>
                                                <li><a :href="null"><i class="icon-cross2 text-danger"></i> Close issue</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </td>
                            </tr>

                            <tr>
                                <td class="text-center">
                                    <i class="icon-checkmark3 text-success"></i>
                                </td>
                                <td>
                                    <div class="media-left media-middle">
                                        <a :href="null" class="btn bg-pink-400 btn-rounded btn-icon btn-xs">
                                            <span class="letter-icon"></span>
                                        </a>
                                    </div>

                                    <div class="media-body">
                                        <a :href="null" class="display-inline-block text-default letter-icon-title">Brett Castellano</a>
                                        <div class="text-muted text-size-small"><span class="status-mark border-success position-left"></span> Resolved</div>
                                    </div>
                                </td>
                                <td>
                                    <a :href="null" class="text-default display-inline-block">
                                        [#1038] Update json configuration
                                        <span class="display-block text-muted">The <code>files</code> property is necessary to override the files property...</span>
                                    </a>
                                </td>
                                <td class="text-center">
                                    <ul class="icons-list">
                                        <li class="dropdown">
                                            <a :href="null" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-right">
                                                <li><a :href="null"><i class="icon-undo"></i> Quick reply</a></li>
                                                <li><a :href="null"><i class="icon-history"></i> Full history</a></li>
                                                <li class="divider"></li>
                                                <li><a :href="null"><i class="icon-plus3 text-blue"></i> Unresolve issue</a></li>
                                                <li><a :href="null"><i class="icon-cross2 text-danger"></i> Close issue</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </td>
                            </tr>

                            <tr>
                                <td class="text-center">
                                    <i class="icon-checkmark3 text-success"></i>
                                </td>
                                <td>
                                    <div class="media-left media-middle">
                                        <a :href="null"><img src="assets/images/placeholder.jpg" class="img-circle img-xs" alt=""></a>
                                    </div>

                                    <div class="media-body">
                                        <a :href="null" class="display-inline-block text-default">Roxanne Forbes</a>
                                        <div class="text-muted text-size-small"><span class="status-mark border-success position-left"></span> Resolved</div>
                                    </div>
                                </td>
                                <td>
                                    <a :href="null" class="text-default display-inline-block">
                                        [#1034] Tooltip multiple event
                                        <span class="display-block text-muted">Fix behavior when using tooltips and popovers that are...</span>
                                    </a>
                                </td>
                                <td class="text-center">
                                    <ul class="icons-list">
                                        <li class="dropdown">
                                            <a :href="null" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-right">
                                                <li><a :href="null"><i class="icon-undo"></i> Quick reply</a></li>
                                                <li><a :href="null"><i class="icon-history"></i> Full history</a></li>
                                                <li class="divider"></li>
                                                <li><a :href="null"><i class="icon-plus3 text-blue"></i> Unresolve issue</a></li>
                                                <li><a :href="null"><i class="icon-cross2 text-danger"></i> Close issue</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </td>
                            </tr>

                            <tr class="active border-double">
                                <td colspan="3">Closed tickets</td>
                                <td class="text-right">
                                    <span class="badge bg-danger">37</span>
                                </td>
                            </tr>

                            <tr>
                                <td class="text-center">
                                    <i class="icon-cross2 text-danger-400"></i>
                                </td>
                                <td>
                                    <div class="media-left media-middle">
                                        <a :href="null"><img src="assets/images/placeholder.jpg" class="img-circle img-xs" alt=""></a>
                                    </div>

                                    <div class="media-body">
                                        <a :href="null" class="display-inline-block text-default">Mitchell Sitkin</a>
                                        <div class="text-muted text-size-small"><span class="status-mark border-danger position-left"></span> Closed</div>
                                    </div>
                                </td>
                                <td>
                                    <a :href="null" class="text-default display-inline-block">
                                        [#1040] Account for static form controls in form group
                                        <span class="display-block text-muted">Resizes control label's font-size and account for the standard...</span>
                                    </a>
                                </td>
                                <td class="text-center">
                                    <ul class="icons-list">
                                        <li class="dropup">
                                            <a :href="null" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-right">
                                                <li><a :href="null"><i class="icon-undo"></i> Quick reply</a></li>
                                                <li><a :href="null"><i class="icon-history"></i> Full history</a></li>
                                                <li class="divider"></li>
                                                <li><a :href="null"><i class="icon-reload-alt text-blue"></i> Reopen issue</a></li>
                                                <li><a :href="null"><i class="icon-cross2 text-danger"></i> Close issue</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </td>
                            </tr>

                            <tr>
                                <td class="text-center">
                                    <i class="icon-cross2 text-danger"></i>
                                </td>
                                <td>
                                    <div class="media-left media-middle">
                                        <a :href="null" class="btn bg-brown-400 btn-rounded btn-icon btn-xs">
                                            <span class="letter-icon"></span>
                                        </a>
                                    </div>

                                    <div class="media-body">
                                        <a :href="null" class="display-inline-block text-default letter-icon-title">Katleen Jensen</a>
                                        <div class="text-muted text-size-small"><span class="status-mark border-danger position-left"></span> Closed</div>
                                    </div>
                                </td>
                                <td>
                                    <a :href="null" class="text-default display-inline-block">
                                        [#1038] Proper sizing of form control feedback
                                        <span class="display-block text-muted">Feedback icon sizing inside a larger/smaller form-group...</span>
                                    </a>
                                </td>
                                <td class="text-center">
                                    <ul class="icons-list">
                                        <li class="dropup">
                                            <a :href="null" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-right">
                                                <li><a :href="null"><i class="icon-undo"></i> Quick reply</a></li>
                                                <li><a :href="null"><i class="icon-history"></i> Full history</a></li>
                                                <li class="divider"></li>
                                                <li><a :href="null"><i class="icon-plus3 text-blue"></i> Unresolve issue</a></li>
                                                <li><a :href="null"><i class="icon-cross2 text-danger"></i> Close issue</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- /support tickets -->

                <!-- Latest posts -->
                <div class="panel panel-flat">
                    <div class="panel-heading">
                        <h6 class="panel-title">Latest posts</h6>
                        <div class="heading-elements">
                            <ul class="icons-list">
                                <li><a data-action="collapse"></a></li>
                                <li><a data-action="reload"></a></li>
                                <li><a data-action="close"></a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="panel-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <ul class="media-list content-group">
                                    <li class="media stack-media-on-mobile">
                                        <div class="media-left">
                                            <div class="thumb">
                                                <a :href="null">
                                                    <img src="assets/images/placeholder.jpg" class="img-responsive img-rounded media-preview" alt="">
                                                    <span class="zoom-image"><i class="icon-play3"></i></span>
                                                </a>
                                            </div>
                                        </div>

                                        <div class="media-body">
                                            <h6 class="media-heading"><a :href="null">Up unpacked friendly</a></h6>
                                            <ul class="list-inline list-inline-separate text-muted mb-5">
                                                <li><i class="icon-book-play position-left"></i> Video tutorials</li>
                                                <li>14 minutes ago</li>
                                            </ul>
                                            The him father parish looked has sooner. Attachment frequently gay terminated son...
                                        </div>
                                    </li>

                                    <li class="media stack-media-on-mobile">
                                        <div class="media-left">
                                            <div class="thumb">
                                                <a :href="null">
                                                    <img src="assets/images/placeholder.jpg" class="img-responsive img-rounded media-preview" alt="">
                                                    <span class="zoom-image"><i class="icon-play3"></i></span>
                                                </a>
                                            </div>
                                        </div>

                                        <div class="media-body">
                                            <h6 class="media-heading"><a :href="null">It allowance prevailed</a></h6>
                                            <ul class="list-inline list-inline-separate text-muted mb-5">
                                                <li><i class="icon-book-play position-left"></i> Video tutorials</li>
                                                <li>12 days ago</li>
                                            </ul>
                                            Alteration literature to or an sympathize mr imprudence. Of is ferrars subject as enjoyed...
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-lg-6">
                                <ul class="media-list content-group">
                                    <li class="media stack-media-on-mobile">
                                        <div class="media-left">
                                            <div class="thumb">
                                                <a :href="null">
                                                    <img src="assets/images/placeholder.jpg" class="img-responsive img-rounded media-preview" alt="">
                                                    <span class="zoom-image"><i class="icon-play3"></i></span>
                                                </a>
                                            </div>
                                        </div>

                                        <div class="media-body">
                                            <h6 class="media-heading"><a :href="null">Case read they must</a></h6>
                                            <ul class="list-inline list-inline-separate text-muted mb-5">
                                                <li><i class="icon-book-play position-left"></i> Video tutorials</li>
                                                <li>20 hours ago</li>
                                            </ul>
                                            On it differed repeated wandered required in. Then girl neat why yet knew rose spot...
                                        </div>
                                    </li>

                                    <li class="media stack-media-on-mobile">
                                        <div class="media-left">
                                            <div class="thumb">
                                                <a :href="null">
                                                    <img src="assets/images/placeholder.jpg" class="img-responsive img-rounded media-preview" alt="">
                                                    <span class="zoom-image"><i class="icon-play3"></i></span>
                                                </a>
                                            </div>
                                        </div>

                                        <div class="media-body">
                                            <h6 class="media-heading"><a :href="null">Too carriage attended</a></h6>
                                            <ul class="list-inline list-inline-separate text-muted mb-5">
                                                <li><i class="icon-book-play position-left"></i> FAQ section</li>
                                                <li>2 days ago</li>
                                            </ul>
                                            Marianne or husbands if at stronger ye. Considered is as middletons uncommonly...
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /latest posts -->

            </div>

            <div class="col-lg-4">

                <!-- My messages -->
                <div class="panel panel-flat">
                    <div class="panel-heading">
                        <h6 class="panel-title">My messages</h6>
                        <div class="heading-elements">
                            <span class="heading-text"><i class="icon-history text-warning position-left"></i> Jul 7, 10:30</span>
                            <span class="label bg-success heading-text">Online</span>
                        </div>
                    </div>

                    <!-- Numbers -->
                    <div class="container-fluid">
                        <div class="row text-center">
                            <div class="col-md-4">
                                <div class="content-group">
                                    <h6 class="text-semibold no-margin"><i class="icon-clipboard3 position-left text-slate"></i> 2,345</h6>
                                    <span class="text-muted text-size-small">this week</span>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="content-group">
                                    <h6 class="text-semibold no-margin"><i class="icon-calendar3 position-left text-slate"></i> 3,568</h6>
                                    <span class="text-muted text-size-small">this month</span>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="content-group">
                                    <h6 class="text-semibold no-margin"><i class="icon-comments position-left text-slate"></i> 32,693</h6>
                                    <span class="text-muted text-size-small">all messages</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /numbers -->

                    <!-- Area chart -->
                    <div id="messages-stats"></div>
                    <!-- /area chart -->

                    <!-- Tabs -->
                    <ul class="nav nav-lg nav-tabs nav-justified no-margin no-border-radius bg-indigo-400 border-top border-top-indigo-300">
                        <li class="active">
                            <a href="#messages-tue" class="text-size-small text-uppercase" data-toggle="tab">
                                Tuesday
                            </a>
                        </li>

                        <li>
                            <a href="#messages-mon" class="text-size-small text-uppercase" data-toggle="tab">
                                Monday
                            </a>
                        </li>

                        <li>
                            <a href="#messages-fri" class="text-size-small text-uppercase" data-toggle="tab">
                                Friday
                            </a>
                        </li>
                    </ul>
                    <!-- /tabs -->

                    <!-- Tabs content -->
                    <div class="tab-content">
                        <div class="tab-pane active fade in has-padding" id="messages-tue">
                            <ul class="media-list">
                                <li class="media">
                                    <div class="media-left">
                                        <img src="assets/images/placeholder.jpg" class="img-circle img-xs" alt="">
                                        <span class="badge bg-danger-400 media-badge">8</span>
                                    </div>

                                    <div class="media-body">
                                        <a :href="null">
                                            James Alexander
                                            <span class="media-annotation pull-right">14:58</span>
                                        </a>

                                        <span class="display-block text-muted">The constitutionally inventoried precariously...</span>
                                    </div>
                                </li>

                                <li class="media">
                                    <div class="media-left">
                                        <img src="assets/images/placeholder.jpg" class="img-circle img-xs" alt="">
                                        <span class="badge bg-danger-400 media-badge">6</span>
                                    </div>

                                    <div class="media-body">
                                        <a :href="null">
                                            Margo Baker
                                            <span class="media-annotation pull-right">12:16</span>
                                        </a>

                                        <span class="display-block text-muted">Pinched a well more moral chose goodness...</span>
                                    </div>
                                </li>

                                <li class="media">
                                    <div class="media-left">
                                        <img src="assets/images/placeholder.jpg" class="img-circle img-xs" alt="">
                                    </div>

                                    <div class="media-body">
                                        <a :href="null">
                                            Jeremy Victorino
                                            <span class="media-annotation pull-right">09:48</span>
                                        </a>

                                        <span class="display-block text-muted">Pert thickly mischievous clung frowned well...</span>
                                    </div>
                                </li>

                                <li class="media">
                                    <div class="media-left">
                                        <img src="assets/images/placeholder.jpg" class="img-circle img-xs" alt="">
                                    </div>

                                    <div class="media-body">
                                        <a :href="null">
                                            Beatrix Diaz
                                            <span class="media-annotation pull-right">05:54</span>
                                        </a>

                                        <span class="display-block text-muted">Nightingale taped hello bucolic fussily cardinal...</span>
                                    </div>
                                </li>

                                <li class="media">
                                    <div class="media-left">
                                        <img src="assets/images/placeholder.jpg" class="img-circle img-xs" alt="">
                                    </div>

                                    <div class="media-body">
                                        <a :href="null">
                                            Richard Vango
                                            <span class="media-annotation pull-right">01:43</span>
                                        </a>

                                        <span class="display-block text-muted">Amidst roadrunner distantly pompously where...</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div class="tab-pane fade has-padding" id="messages-mon">
                            <ul class="media-list">
                                <li class="media">
                                    <div class="media-left">
                                        <img src="assets/images/placeholder.jpg" class="img-circle img-sm" alt="">
                                    </div>

                                    <div class="media-body">
                                        <a :href="null">
                                            Isak Temes
                                            <span class="media-annotation pull-right">Tue, 19:58</span>
                                        </a>

                                        <span class="display-block text-muted">Reasonable palpably rankly expressly grimy...</span>
                                    </div>
                                </li>

                                <li class="media">
                                    <div class="media-left">
                                        <img src="assets/images/placeholder.jpg" class="img-circle img-sm" alt="">
                                    </div>

                                    <div class="media-body">
                                        <a :href="null">
                                            Vittorio Cosgrove
                                            <span class="media-annotation pull-right">Tue, 16:35</span>
                                        </a>

                                        <span class="display-block text-muted">Arguably therefore more unexplainable fumed...</span>
                                    </div>
                                </li>

                                <li class="media">
                                    <div class="media-left">
                                        <img src="assets/images/placeholder.jpg" class="img-circle img-sm" alt="">
                                    </div>

                                    <div class="media-body">
                                        <a :href="null">
                                            Hilary Talaugon
                                            <span class="media-annotation pull-right">Tue, 12:16</span>
                                        </a>

                                        <span class="display-block text-muted">Nicely unlike porpoise a kookaburra past more...</span>
                                    </div>
                                </li>

                                <li class="media">
                                    <div class="media-left">
                                        <img src="assets/images/placeholder.jpg" class="img-circle img-sm" alt="">
                                    </div>

                                    <div class="media-body">
                                        <a :href="null">
                                            Bobbie Seber
                                            <span class="media-annotation pull-right">Tue, 09:20</span>
                                        </a>

                                        <span class="display-block text-muted">Before visual vigilantly fortuitous tortoise...</span>
                                    </div>
                                </li>

                                <li class="media">
                                    <div class="media-left">
                                        <img src="assets/images/placeholder.jpg" class="img-circle img-sm" alt="">
                                    </div>

                                    <div class="media-body">
                                        <a :href="null">
                                            Walther Laws
                                            <span class="media-annotation pull-right">Tue, 03:29</span>
                                        </a>

                                        <span class="display-block text-muted">Far affecting more leered unerringly dishonest...</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div class="tab-pane fade has-padding" id="messages-fri">
                            <ul class="media-list">
                                <li class="media">
                                    <div class="media-left">
                                        <img src="assets/images/placeholder.jpg" class="img-circle img-sm" alt="">
                                    </div>

                                    <div class="media-body">
                                        <a :href="null">
                                            Owen Stretch
                                            <span class="media-annotation pull-right">Mon, 18:12</span>
                                        </a>

                                        <span class="display-block text-muted">Tardy rattlesnake seal raptly earthworm...</span>
                                    </div>
                                </li>

                                <li class="media">
                                    <div class="media-left">
                                        <img src="assets/images/placeholder.jpg" class="img-circle img-sm" alt="">
                                    </div>

                                    <div class="media-body">
                                        <a :href="null">
                                            Jenilee Mcnair
                                            <span class="media-annotation pull-right">Mon, 14:03</span>
                                        </a>

                                        <span class="display-block text-muted">Since hello dear pushed amid darn trite...</span>
                                    </div>
                                </li>

                                <li class="media">
                                    <div class="media-left">
                                        <img src="assets/images/placeholder.jpg" class="img-circle img-sm" alt="">
                                    </div>

                                    <div class="media-body">
                                        <a :href="null">
                                            Alaster Jain
                                            <span class="media-annotation pull-right">Mon, 13:59</span>
                                        </a>

                                        <span class="display-block text-muted">Dachshund cardinal dear next jeepers well...</span>
                                    </div>
                                </li>

                                <li class="media">
                                    <div class="media-left">
                                        <img src="assets/images/placeholder.jpg" class="img-circle img-sm" alt="">
                                    </div>

                                    <div class="media-body">
                                        <a :href="null">
                                            Sigfrid Thisted
                                            <span class="media-annotation pull-right">Mon, 09:26</span>
                                        </a>

                                        <span class="display-block text-muted">Lighted wolf yikes less lemur crud grunted...</span>
                                    </div>
                                </li>

                                <li class="media">
                                    <div class="media-left">
                                        <img src="assets/images/placeholder.jpg" class="img-circle img-sm" alt="">
                                    </div>

                                    <div class="media-body">
                                        <a :href="null">
                                            Sherilyn Mckee
                                            <span class="media-annotation pull-right">Mon, 06:38</span>
                                        </a>

                                        <span class="display-block text-muted">Less unicorn a however careless husky...</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
        </div>

        <slot></slot>

    </div>
</template>
<script>
import DatePicker from 'vue2-datepicker'
import $ from 'jquery'
export default {
  components: { DatePicker },
  mounted () {
    if (window.innerWidth < 700) {
      $('.mx-datepicker-popup').addClass('unset-right')
    }
  },
  methods: {
  },
  data () {
    return {
      dateChoose: null
    }
  }
}
</script>
<style>
    .unset-right{
        right: unset !important;
    }
</style>
