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
                        <li>
                            <a :href="null" @click="clickAddUser"><i class="icon-user-plus"></i> Thêm thành viên</a>
                            <ul v-if="subMenuAddUser == true">
                                <li>
                                    <div class="input-group form-control sub-menu-2-input-group">
                                        <input type="text" class="form-control" placeholder="Nhập Id người dùng">
                                        <span class="input-group-btn">
                                            <button class="btn bg-info" type="button"><i class="icon-user-plus"></i></button>
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li><a :href="null" @click="showModalCreate"><i class="icon-users"></i> Tạo mới nhóm chat</a></li>
                        <li class="navigation-divider"></li>
                        <li><a :href="null"><i class="icon-file-plus"></i> Yêu cầu vào nhóm chat <span class="badge badge-danger">32</span></a>
                            <ul class="navigation menu-scollbar">
                                <div class="pop-users-request-content">
                                    <li v-for="user in usersRequest" :key="user.id">
                                        <div class="pop-users-request-item">
                                            <div class="media-left">
                                                <img :src="user.avatar" title="#12345" class="img-circle" alt="">
                                            </div>
                                            <div class="media-body pop-users-request-body" title="#12345">
                                                @{{user.name}} <button class="btn btn-link text-danger" @click="notAcceptJoin(user.id)"><i class="fa fa-close"></i></button> <button class="btn btn-link text-success" @click="acceptJoin(user.id)"><i class="fa fa-check"></i></button>
                                            </div>
                                        </div>
                                    </li>
                                </div>
                            </ul>
                        </li>
                        <li><a :href="null" @click="showCloseGroupModal"><i class="icon-file-locked"></i> Đóng nhóm chat</a></li>
                        <li><a :href="null" @click="showDeleteGroupModal"><i class="icon-trash"></i> Xóa nhóm chat</a></li>
                    </ul>
                </div>
            </div>
            <!-- /sub navigation -->

            <!-- Online users -->
            <div class="sidebar-category">
                <div class="category-title">
                    <span>Danh sách thành viên</span>
                    <ul class="icons-list">
                        <li><a :href="null" data-action="collapse"></a></li>
                    </ul>
                </div>

                <div class="category-content no-padding">
                    <ul class="media-list media-list-linked menu-scollbar">
                        <li class="media" v-for="member in members" :key="member.id">
                            <a :href="null" class="media-link">
                                <div class="media-left"><img :src="member.avatar" class="img-circle" alt=""></div>
                                <div class="media-body">
                                    <span class="media-heading text-semibold">{{member.name}}</span>
                                    <span class="text-size-small text-muted display-block">#{{member.id}}</span>
                                </div>
                                <div class="media-right media-middle">
                                    <span class="status-mark bg-success"></span>
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
                    <span>File đính kèm mới nhất</span>
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
            <!-- /latest messages -->
            <div class="sidebar-category">
                <div class="category-title">
                    <span>new issue</span>
                    <ul class="icons-list">
                        <li><a :href="null" data-action="collapse"></a></li>
                    </ul>
                </div>

                <div class="category-content new-issue-menu">
                    <ul class="media-list menu-scollbar">
                        <li class="media">
                            <div class="media-left"><a :href="null" class="btn border-success text-success btn-flat btn-icon btn-sm btn-rounded"><i class="icon-checkmark3"></i></a></div>
                            <div class="media-body">
                                <a :href="null">Richard Vango</a> has been registered
                                <div class="media-annotation">4 minutes ago</div>
                            </div>
                        </li>

                        <li class="media">
                            <div class="media-left"><a :href="null" class="btn border-slate text-slate btn-flat btn-icon btn-sm btn-rounded"><i class="icon-infinite"></i></a></div>
                            <div class="media-body">
                                Server went offline for monthly maintenance
                                <div class="media-annotation">36 minutes ago</div>
                            </div>
                        </li>

                        <li class="media">
                            <div class="media-left"><a :href="null" class="btn border-success text-success btn-flat btn-icon btn-sm btn-rounded"><i class="icon-checkmark3"></i></a></div>
                            <div class="media-body">
                                <a :href="null">Chris Arney</a> has been registered
                                <div class="media-annotation">2 hours ago</div>
                            </div>
                        </li>

                        <li class="media">
                            <div class="media-left"><a :href="null" class="btn border-danger text-danger btn-flat btn-icon btn-sm btn-rounded"><i class="icon-cross2"></i></a></div>
                            <div class="media-body">
                                <a :href="null">Chris Arney</a> left main conversation
                                <div class="media-annotation">Dec 18, 18:36</div>
                            </div>
                        </li>

                        <li class="media">
                            <div class="media-left"><a :href="null" class="btn border-primary text-primary btn-flat btn-icon btn-sm btn-rounded"><i class="icon-plus3"></i></a></div>
                            <div class="media-body">
                                <a :href="null">Beatrix Diaz</a> just joined conversation
                                <div class="media-annotation">Dec 12, 05:46</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
        <div id="modal-create-group" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h5 class="modal-title"><b>Tạo mới nhóm chat</b></h5>
                    </div>

                    <div class="modal-body">
                        <h6>Nhập tên nhóm chat: </h6>
                        <input type="text" class="form-control" ref="input-new-group-name" @focus="forcusInputNewGroupName" v-model="newGroupName" data-popup="popover" data-placement="top" popover-title="bg-teal-400" title="Tên nhóm chat" data-trigger="focus" data-content="Vui lòng điền đầy đủ tên nhóm chat">
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-link" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Tạo mới</button>
                    </div>
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
                        <p><b>Lưu ý</b>: Sau khi đóng nhóm chat, các thành viên trong nhóm chat sẽ không thể trò chuyện trong nhóm, nhưng tất cả thành viên có thể xem được lịch sử tin nhắn cũng như tải xuống các file đã đính kèm trong group.</p>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-link" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-warning">Đóng nhóm</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="modal-delete-group" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-danger-400">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h6 class="modal-title"><i class="fa fa-warning"></i> Cảnh báo</h6>
                    </div>

                    <div class="modal-body">
                        <p><b>Lưu ý</b>: Sau khi xóa nhóm chat, tất cả thông tin lịch sử chat hay các file đính kèm đều bị xóa theo.</p>
                        <p>Đồng thời các thành viên trong nhóm chat không thể thấy nhóm chat này nữa.</p>
                        <p>Các thành viên sẽ nhận được thông báo nhóm chat đã bị xóa.</p>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-link" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger">Xóa nhóm <i class="fa fa-trash-o"></i> </button>
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
      subMenuAddUser: false,
      newGroupName: null,
      usersRequest: [
        {
          id: 1,
          name: 'Cường Đào',
          avatar: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          id: 2,
          name: 'Cường Đào',
          avatar: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          id: 3,
          name: 'Cường Đào',
          avatar: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          id: 4,
          name: 'Cường Đào',
          avatar: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          id: 5,
          name: 'Cường Đào',
          avatar: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          id: 6,
          name: 'Cường Đào',
          avatar: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          id: 7,
          name: 'Cường Đào',
          avatar: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        }
      ],
      members: [
        {
          id: 1,
          name: 'Cường Đào',
          avatar: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          id: 2,
          name: 'Cường Đào',
          avatar: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          id: 3,
          name: 'Cường Đào',
          avatar: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          id: 4,
          name: 'Cường Đào',
          avatar: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          id: 5,
          name: 'Cường Đào',
          avatar: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          id: 6,
          name: 'Cường Đào',
          avatar: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          id: 7,
          name: 'Cường Đào',
          avatar: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        }
      ],
      idSearch: null
    }
  },
  methods: {
    clickAddUser () {
      this.subMenuAddUser = !this.subMenuAddUser
    },
    showModalCreate () {
      $('#modal-create-group').modal('show')
    },
    showCloseGroupModal () {
      $('#modal-close-group').modal('show')
    },
    showDeleteGroupModal () {
      $('#modal-delete-group').modal('show')
    },
    showModalChatBots () {
      $('#modal-chat-bots').modal('show')
    },
    forcusInputNewGroupName () {
      let vm = this
      setTimeout(function () {
        $(vm.$refs['input-new-group-name']).popover('hide')
      }, 4000)
    },
    notAcceptJoin (id) {
      let vm = this
      vm.usersRequest = vm.usersRequest.filter(item => {
        return item.id !== id
      })
    },
    acceptJoin (id) {
      let vm = this
      vm.usersRequest = vm.usersRequest.filter(item => {
        return item.id !== id
      })
    }
  },
  mounted () {
    let vm = this
    $(vm.$refs['input-new-group-name']).popover({
      template: '<div class="popover "' + $(vm.$refs['input-new-group-name']).attr('popover-title') + '"><div class="arrow"></div><h3 class="popover-title bg-teal-400">' + $(vm.$refs['input-new-group-name']).attr('title') + '</h3><div class="popover-content"></div></div>'
    })
  }
}
</script>
<style>
    .sub-menu-2-input-group{
        border:none;
    }
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
    .new-issue-menu{
        padding-right: 0;
    }
    .new-issue-menu li{
        padding-right: 20px;
    }
    .pop-users-request-content{
        margin-left: 35px;
    }
    .pop-users-request-item{
        padding-bottom: 10px;
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
