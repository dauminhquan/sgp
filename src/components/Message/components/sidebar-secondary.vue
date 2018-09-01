<template>
    <div class="sidebar sidebar-secondary sidebar-default">
        <div class="sidebar-content">

            <div class="sidebar-category">
                <div class="category-title">
                    <span>Tìm kiếm người dùng</span>
                    <ul class="icons-list">
                        <li><a :href="null" data-action="collapse"></a></li>
                    </ul>
                </div>

                <div class="category-content">
                    <form action="#">
                        <div class="has-feedback has-feedback-left">
                            <input type="search" v-model="idSearch" class="form-control" placeholder="#id hoặc @name người dùng">
                            <div class="form-control-feedback">
                                <i class="icon-search4 text-size-base text-muted"></i>
                            </div>
                        </div>
                        <div class="popover fade top in pop-search-user" v-if="idSearch != null && idSearch != ''">
                            <div>
                                <ul class="navigation">
                                    <li v-for="member in members" :key="member.id">
                                        <a :href="null">
                                            <div class="media-left">
                                                <img :src="member.avatar" class="img-circle" alt="">
                                            </div>
                                            <div class="media-body">
                                                @{{member.name}}
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Sub navigation -->
            <div class="sidebar-category">
                <div class="category-title">
                    <span>Navigation</span>
                    <ul class="icons-list">
                        <li><a :href="null" data-action="collapse"></a></li>
                    </ul>
                </div>

                <div class="category-content no-padding">
                    <ul class="navigation navigation-alt navigation-accordion">
                        <li class="navigation-header">Actions</li>
                        <li><a :href="null" @click="showModalChatBots"><i class="icon-compose"></i> Chat boot</a></li>
                        <li class="navigation-divider"></li>
                        <li><a :href="null" @click="showCloseGroupModal"><i class="icon-file-locked"></i> Chặn chat</a></li>
                        <li><a :href="null" @click="showDeleteGroupModal"><i class="icon-trash"></i> Xóa cuộc trò chuyện</a></li>
                    </ul>
                </div>
            </div>
            <!-- /sub navigation -->

            <!-- Latest messages -->
            <div class="sidebar-category">
                <div class="category-title">
                    <span>File đính kèm</span>
                    <ul class="icons-list">
                        <li><a :href="null" data-action="collapse"></a></li>
                    </ul>
                </div>

                <div class="category-content no-padding">
                    <ul class="media-list media-list-linked menu-scollbar">
                        <li class="media">
                            <a :href="null" class="media-link">
                                <div class="media-left"><img src="assets/images/placeholder.jpg" class="img-circle" alt=""></div>
                                <div class="media-body">
                                    <span class="media-heading text-semibold">Will Samuel</span>
                                    <span class="text-muted">And he looked over at the alarm clock, ticking..</span>
                                </div>
                            </a>
                        </li>

                        <li class="media">
                            <a :href="null" class="media-link">
                                <div class="media-left"><img src="assets/images/placeholder.jpg" class="img-circle" alt=""></div>
                                <div class="media-body">
                                    <span class="media-heading text-semibold">Margo Baker</span>
                                    <span class="text-muted">However hard he threw himself onto..</span>
                                </div>
                            </a>
                        </li>

                        <li class="media">
                            <a :href="null" class="media-link">
                                <div class="media-left"><img src="assets/images/placeholder.jpg" class="img-circle" alt=""></div>
                                <div class="media-body">
                                    <span class="media-heading text-semibold">Monica Smith</span>
                                    <span class="text-muted">Yes, but was it spanossible to quietly sleep through..</span>
                                </div>
                            </a>
                        </li>

                        <li class="media">
                            <a :href="null" class="media-link">
                                <div class="media-left"><img src="assets/images/placeholder.jpg" class="img-circle" alt=""></div>
                                <div class="media-body">
                                    <span class="media-heading text-semibold">Jordana Mills</span>
                                    <span class="text-muted">What should he do now? The next train went at..</span>
                                </div>
                            </a>
                        </li>

                        <li class="media">
                            <a :href="null" class="media-link">
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

        </div>
        <div id="modal-close-group" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-warning-400">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h6 class="modal-title"><i class="fa fa-warning"></i> Lưu ý</h6>
                    </div>

                    <div class="modal-body">
                        <p><b>Lưu ý</b>: Sau khi chặn chat, hai người sẽ không thể chat được với nhau.</p>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-link" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-warning">Chặn chat</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="modal-chat-bots" class="modal fade">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header  bg-indigo-400">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h6 class="modal-title"><i class="fa fa-android"></i> Chat bots</h6>
                    </div>

                    <div class="modal-body">
                        <div class="menu-scollbar chat-bots-body">
                            <div class="chat-bot-item">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <label>Text: </label>
                                        <input type="text" class="form-control">
                                    </div>
                                    <div class="col-sm-3">
                                        <label>Hiển thị: </label>
                                        <select class="form-control">
                                            <option value="">Thứ 2 hằng tuần</option>
                                            <option value="">Thứ 3 hằng tuần</option>
                                            <option value="">Thứ 4 hằng tuần</option>
                                            <option value="">Thứ 5 hằng tuần</option>
                                            <option value="">Thứ 6 hằng tuần</option>
                                            <option value="">Thứ 7 hằng tuần</option>
                                            <option value="">Chủ nhật hằng tuần</option>
                                            <option value="">Hằng ngày</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-3">
                                        <label>Thời gian: </label>
                                        <input type="datetime-local" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="chat-bots-footer">
                            <button type="button" class="btn btn-info">Lưu</button>
                            <div class="clearfix"></div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-xs-6">
                                <label>Nhập text: </label>
                                <input type="text" class="form-control">
                            </div>
                            <div class="col-xs-3">
                                <label>Hiển thị: </label>
                                <select class="form-control">
                                    <option value="">Thứ 2 hằng tuần</option>
                                    <option value="">Thứ 3 hằng tuần</option>
                                    <option value="">Thứ 4 hằng tuần</option>
                                    <option value="">Thứ 5 hằng tuần</option>
                                    <option value="">Thứ 6 hằng tuần</option>
                                    <option value="">Thứ 7 hằng tuần</option>
                                    <option value="">Chủ nhật hằng tuần</option>
                                    <option value="">Hằng ngày</option>
                                </select>
                            </div>
                            <div class="col-xs-3">
                                <label>Thời gian: </label>
                                <input type="datetime-local" class="form-control">
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-link" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success">Thêm boot</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /basic modal -->
    </div>
</template>
<script>
import $ from 'jquery'
export default {
  watch: {
    newGroupName (name) {
      if (name === '@') {

      }
    },
    idSearch (query) {

    }
  },
  data () {
    return {
      idSearch: null,
      members: []
    }
  },
  methods: {
    showCloseGroupModal () {
      $('#modal-close-group').modal('show')
    },
    showModalChatBots () {
      $('#modal-chat-bots').modal('show')
    },
    showDeleteGroupModal () {

    }
  },
  mounted () {
  }
}
</script>
<style>
    .menu-scollbar {
        max-height: 500px;
        overflow: scroll;
        overflow-x: hidden;
    }
    .menu-scollbar::-webkit-scrollbar {
        width: 5px;
    }
    .menu-scollbar::-webkit-scrollbar-track {
        background: white;
    }
    .menu-scollbar::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
    }

    .menu-scollbar::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    .pop-users-request-body button{
        padding-right: 0px;
    }
    .chat-bot-item{
        padding: 10px;
        border: 1px solid rgba(111,108,122,0.31);
        border-radius: 10px;
    }
    .chat-bot-item label{
        font-weight: bold;
    }
    .chat-bots-footer{
        margin: 5px;
    }
    .chat-bots-footer button{
        float: right;
    }
    .pop-search-user{
        display: block;
        top: 65px;
        left: 20px;
        max-height: 200px;
        overflow: scroll;
        overflow-x: hidden;
    }
    .pop-search-user::-webkit-scrollbar {
        width: 5px;
    }
    .pop-search-user::-webkit-scrollbar-track {
        background: white;
    }
    .pop-search-user::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
    }
</style>
