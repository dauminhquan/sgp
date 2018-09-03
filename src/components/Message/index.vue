<template>
    <div class="content">
        <div class="panel panel-flat">
            <div class="panel-heading">
                <h6 class="panel-title"><b><span class="status-mark bg-success"></span></b></h6>
                <div class="heading-elements">
                    <ul class="icons-list">
                        <li><a data-action="collapse"></a></li>
                        <li><a data-action="reload"></a></li>
                        <li><a data-action="close"></a></li>
                    </ul>
                </div>
            </div>
            <div class="panel-body">
                <ul class="media-list chat-list content-group chat-list-white" ref="message-box" @scroll="scollMessageList">
                    <li class="media date-step" v-show="loadingOldMessage == true" style="min-height: 20px">
                        <span>Đang tải...</span>
                    </li>
                    <template v-for="(message,index) in messageSorted">
                        <li :key="message.id" :class="message.userId == 1? 'media reversed': 'media'">
                            <div class="media-body" v-show="message.userId == 1">
                                <div class="message-more-left">
                                    <div class="dropdown">
                                        <div class="dropdown-toggle" data-toggle="dropdown">
                                            <span class="icon-menu" style="color: #abb6c6"></span>
                                        </div>
                                        <ul class="dropdown-menu dropdown-menu-right">
                                            <li><a :href="null" @click="deleteMessage(message.id)"><i class="icon-trash"></i> Xóa tin nhắn</a></li>
                                            <li><a :href="null" @click="reply(message.id)"><i class="icon-reply"></i> Trả lời</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="media-content text-message-content" v-html="message.message"></div>
                                <span class="media-annotation display-block mt-10">{{coverTime(message.time)}} <span v-if="message.location != undefined && message.location != null && message.location != ''">, tại {{message.location}}<a :href="null"><i class="icon-pin-alt position-right text-muted"></i></a></span></span>
                            </div>
                            <div :class="message.userId == 1 ? 'media-right':'media-left'">
                                <a :href="null">
                                    <img :src="message.userAvatar" class="img-circle" alt="">
                                </a>
                            </div>
                            <div class="media-body" v-show="message.userId != 1">
                                <div class="message-more-right">
                                    <div class="dropdown">
                                        <div class="dropdown-toggle" data-toggle="dropdown">
                                            <span class="icon-menu" style="color: #abb6c6"></span>
                                        </div>
                                        <ul class="dropdown-menu dropdown-menu-left">
                                            <li><a :href="null" @click="deleteMessage(message.id)"><i class="icon-trash"></i> Xóa tin nhắn</a></li>
                                            <li><a :href="null" @click="reply(message.id)"><i class="icon-reply"></i> Trả lời</a></li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="media-content text-message-content" v-html="message.message"></div>
                                <span class="media-annotation display-block mt-10">{{coverTime(message.time)}} <span v-if="message.location != undefined && message.location != null && message.location != ''">, {{message.location}}<a :href="null"><i class="icon-pin-alt position-right text-muted"></i></a></span></span>
                            </div>
                        </li>
                        <li v-if="showLiDateMessage(index)" class="media date-step">
                            <span>{{coverDate(index)}}</span>
                        </li>
                    </template>
                </ul>
                <div class="popover fade top in pop-tag-member" ref="pop-tag-member" v-show="showTagMember == true">
                    <div class="popover-content">
                        <ul class="navigation tag-member">
                            <li v-for="(member,index) in searchMemberTagToMessage" :key="member.id" :class="tagMemberLiStyleHover(index,member.id)">
                                <a :href="null" @click="tagMember(member.id)">
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
                <div><span class="media-annotation display-block typing">{{typingText}}</span></div>
                <div class="clearfix"></div>
                <div contenteditable="true" @paste="pasteToContentChat" ref="content-chat" class="form-control content-group content-box-chat" @input="setTextMessage" @keyup="keyUpTextMessageContent" @keydown.enter="enterTagMemberMessageContent"></div>
                <div v-if="textMessage==null || textMessage==''" class="place-holder-content-box">Nhập tin nhắn...</div>
                <div class="row">
                    <div class="col-xs-6">
                        <ul class="icons-list icons-list-extended mt-10">
                            <li><a :href="null" @click="$refs['input-photo'].click()" data-popup="tooltip" title="Send photo" data-container="body"><i class="icon-file-picture"></i></a></li>
                            <input type="file" ref="input-photo" style="display: none">
                            <li><a :href="null" @click="$refs['input-video'].click()" data-popup="tooltip" title="Send video" data-container="body"><i class="icon-file-video"></i></a></li>
                            <input type="file"  ref="input-video" style="display: none">
                            <li><a :href="null" @click="$refs['input-file'].click()" data-popup="tooltip" title="Send file" data-container="body"><i class="icon-file-plus"></i></a></li>
                            <input type="file" ref="input-file" style="display: none">
                        </ul>
                    </div>

                    <div class="col-xs-6 text-right">
                        <div class="input-group">
                            <div class="input-group-btn">
                                <button type="button" class="btn bg-success-400 " v-if="enterToSend == false" @click="sendMessage"><b><i class="glyphicon glyphicon-send"></i> Gửi</b></button>
                                <button type="button" class="btn bg-teal-400 " v-if="modeMobile == false" data-toggle="dropdown"><b><i class="icon-cog2"></i></b></button>
                                <ul class="dropdown-menu dropdown-menu-right">
                                    <li><a :href="null" @click="enterToSend = true" v-if="enterToSend == false">Nhấn Enter để gửi</a></li>
                                    <li><a :href="null" @click="enterToSend = false" v-if="enterToSend == true">Sử dụng nút gửi</a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <slot></slot>
    </div>
</template>
<script>
import $ from 'jquery'
import PNotify from 'pnotify/dist/es/PNotifyCompat'
export default {
  updated () {
    this.$nextTick(function () {
      this.offsetHeightPopTagMember = document.getElementsByClassName('pop-tag-member').item(0).offsetHeight
      if (this.createNewMessage == true) {
        this.$refs['message-box'].scrollTop = this.$refs['message-box'].scrollHeight
        this.createNewMessage = false
      }
      if (this.updateLengthMessage == true) {
        this.hoverShowMenuMessage()
        this.updateLengthMessage = false
        let maxWidth = this.$refs['message-box'].offsetWidth
        if (window.innerWidth < 411) {
          $('pre').css('max-width', '180px')
        } else {
          $('pre').css('max-width', (maxWidth - 350) + 'px')
        }
      }
    })
  },
  computed: {
    messageSorted () {
      return this.messages.sort(function (a, b) {
        var c = new Date(a.time)
        var d = new Date(b.time)
        return c.getTime() - d.getTime()
      })
    }
  },
  watch: {
    textMessage (newText, oldText) {
      if (newText != null && newText != '') {
        this.typing = true
      } else {
        this.typing = false
      }
      let arrayText = newText.split('').reverse()
      arrayText = arrayText.toString().replace(/,/g, '')
      if (this.searchListTagMember(arrayText)) {
        if (this.searchMemberTagToMessage.length > 0) {
          this.showTagMember = true
        } else {
          this.showTagMember = false
        }
      } else {
        this.showTagMember = false
      }
    },
    offsetHeightPopTagMember (value) {
      let count = this.searchMemberTagToMessage.length

      let element = document.getElementsByClassName('pop-tag-member').item(0)
      let cc = count * 55
      if (value === 300) {
        element.style.top = '240px'
      } else {
        element.style.top = (520 - cc).toString() + 'px'
      }
    },
    indexChoose (value, oldValue) {
      let pop = this.$refs['pop-tag-member']
      if (value == 0) {
        pop.scrollTop = 0
      }
      if (value == this.searchMemberTagToMessage.length - 1) {
        pop.scrollTop = pop.scrollHeight
      }
      if (value != null && value > 3 && pop.scrollTop >= 0 && pop.scrollTop < pop.scrollHeight) {
        if (oldValue < value) {
          let crt = pop.scrollTop + 44

          if (crt > pop.scrollHeight) {
            pop.scrollTop = pop.scrollHeight
          } else {
            pop.scrollTop = crt
          }
        }
        if (oldValue > value) {
          let crt = pop.scrollTop - 44
          console.log(pop.scrollTop)
          if (crt < 0) {
            pop.scrollTop = 0
          } else {
            pop.scrollTop = crt
          }
        }
      }
    },
    typing (value) {
      if (value == true) {
        this.typingText = 'Có người đang nhập...'
      } else {
        this.typingText = ''
      }
    },
    scrollMessageBox (value) {
      let contentText = this.$refs['message-box']
      $(contentText).removeClass('chat-list-white')
      setTimeout(function () {
        if (contentText.scrollTop == value) {
          $(contentText).addClass('chat-list-white')
        }
      }, 3000)
    }
  },
  mounted () {
    if (window.innerWidth < 769) {
      this.modeMobile = true
    }
    this.$refs['message-box'].scrollTop = this.$refs['message-box'].scrollHeight
    let element, name, arr
    element = document.body
    name = 'sidebar-xs'
    arr = element.className.split(' ')
    if (arr.indexOf(name) === -1) {
      element.className += ' ' + name
    }
    this.hoverShowMenuMessage()
  },
  data () {
    return {
      textMessage: null,
      showTagMember: false,
      searchMemberTagToMessage: [
        {
          id: 1,
          name: 'XXX',
          avatar: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          id: 2,
          name: 'C',
          avatar: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          id: 3,
          name: 'C',
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
          name: 'C',
          avatar: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          id: 2,
          name: 'C',
          avatar: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          id: 3,
          name: 'XXX',
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
      offsetHeightPopTagMember: 0,
      enterToSend: false,
      indexChoose: null,
      idMemberChoose: null,
      modeMobile: false,
      createNewMessage: false,
      updateLengthMessage: false,
      messages: [
        {
          'id': '5b88ed7eb5974b716ea92ec3',
          'userId': 2,
          'userName': 'blue',
          'message': '<a contenteditable="false" data-id="7" style="white-space: pre;border-radius: 5px;cursor: pointer;font-weight: bold;border: solid 1px #77faff" class="text-info">@Cường Đào</a>',
          'type': 'text',
          'time': '2014-08-09 07:32:36',
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          'id': '5b88ed7e4c70d68bc6399c50',
          'userId': 2,
          'userName': 'green',
          'message': 'Đây là message',
          'type': 'text',
          'time': '2018-08-31 09:51:03',
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          'id': '5b88ed7e779ebc109fe3e4f7',
          'userId': 2,
          'userName': 'green',
          'message': 'Đây là message',
          'type': 'text',
          'time': '2017-07-25 12:50:38',
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          'id': '5b88ed7e9e62ff7735e19584',
          'userId': 2,
          'userName': 'green',
          'message': 'Đây là message',
          'type': 'text',
          'time': '2014-05-09 12:27:02',
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          'id': '5b88ed7e26dabcc3bc72fcf6',
          'userId': 1,
          'userName': 'green',
          'message': 'Đây là message',
          'type': 'text',
          'time': '2014-02-23 08:51:59',
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          'id': '5b88ed7eb4d2abcfe0e59942',
          'userId': 2,
          'userName': 'blue',
          'message': 'Đây là message',
          'type': 'text',
          'time': '2016-03-03 02:01:54',
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          'id': '5b88ed7eaba87d9adb07af4d',
          'userId': 1,
          'userName': 'blue',
          'message': 'Đây là message',
          'type': 'text',
          'time': '2017-03-17 01:32:14',
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          'id': '5b88ed7e2d75502dfe67567a',
          'userId': 1,
          'userName': 'green',
          'message': 'Đây là message',
          'type': 'text',
          'time': '2016-03-16 12:38:47',
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          'id': '5b88ed7ed3517869dc4ddd56',
          'userId': 2,
          'userName': 'green',
          'message': 'Đây là message',
          'type': 'text',
          'time': '2016-08-28 01:21:13',
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          'id': '5b88ed7e00372c1f7c2bfccb',
          'userId': 2,
          'userName': 'blue',
          'message': 'Đây là message',
          'type': 'text',
          'time': '2015-05-20 05:37:47',
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          'id': '5b88ed7ee9ff89723147e2b9',
          'userId': 1,
          'userName': 'green',
          'message': 'Đây là message',
          'type': 'text',
          'time': '2015-11-17 06:15:13',
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          'id': '5b88ed7e9c0e0a85fa24a9ec',
          'userId': 2,
          'userName': 'green',
          'message': 'Đây là message',
          'type': 'text',
          'time': '2017-08-26 02:25:43',
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          'id': '5b88ed7ecde5145033df6516',
          'userId': 1,
          'userName': 'blue',
          'message': 'Đây là message',
          'type': 'text',
          'time': '2015-01-20 02:28:31',
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          'id': '5b88ed7e09b9fc0db1e68c3b',
          'userId': 2,
          'userName': 'blue',
          'message': 'Đây là message',
          'type': 'text',
          'time': '2016-08-27 11:19:42',
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          'id': '5b88ed7e46c712100733ed66',
          'userId': 1,
          'userName': 'blue',
          'message': 'Đây là message',
          'type': 'text',
          'time': '2017-03-01 03:52:54',
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          'id': '5b88ed7e7b8e38e185455848',
          'userId': 2,
          'userName': 'blue',
          'message': 'Đây là message',
          'type': 'text',
          'time': '2018-08-30 09:16:01',
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          'id': '5b88ed7e4100d55c53e53beb',
          'userId': 1,
          'userName': 'green',
          'message': 'Đây là message',
          'type': 'text',
          'time': '2018-08-31 04:06:12',
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          'id': '5b88ed7ef85403196778be4f',
          'userId': 2,
          'userName': 'green',
          'message': 'Đây là message',
          'type': 'text',
          'time': '2015-07-11 12:33:06',
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          'id': '5b88ed7ef3bf36d15b80113e',
          'userId': 1,
          'userName': 'green',
          'message': 'Đây là message',
          'type': 'text',
          'time': '2017-01-08 10:59:55',
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        },
        {
          'id': '5b88ed7e6753575975d0d0d9',
          'userId': 2,
          'userName': 'blue',
          'message': 'Đây là message',
          'type': 'text',
          'time': '2015-07-13 10:33:33',
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
        }
      ],
      typingText: '',
      typing: false,
      loadingOldMessage: false,
      scrollMessageBox: null,
      Latitude: null,
      Longitude: null
    }
  },
  methods: {
    pasteToContentChat (event) {
      let vm = this
      var items = (event.clipboardData || event.originalEvent.clipboardData).items
      var blob = null
      for (var i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') === 0) {
          blob = items[i].getAsFile()
        }
      }
      if (blob !== null) {
        var reader = new FileReader()
        reader.onload = function (event) {
          vm.$refs['content-chat'].innerHTML += '<img style="width: 100%" src="' + event.target.result + '"></img>'
          vm.textMessage = vm.$refs['content-chat'].innerHTML
        }
        reader.readAsDataURL(blob)
      }
    },
    tagMemberLiStyleHover (index, id) {
      if (index == this.indexChoose) {
        this.idMemberChoose = id
        return 'tag-member-li'
      }
      return null
    },
    deleteMessage (id) {
      this.messages = this.messages.filter(message => {
        return message.id != id
      })
    },
    reply (id) {
      let message = this.messages.find(item => {
        return item.id == id
      })
      let t = this.$refs['content-chat'].innerHTML + '<span class="quoter-message" contenteditable="false">{<span class="text-info-tag">@' + message.userName + '</span>: ' + message.message + '}</span>&nbsp;'
      this.$refs['content-chat'].innerHTML = t
      this.textMessage = t
      this.placeCaretAtEnd(this.$refs['content-chat'])
    },
    scollMessageList () {
      let contentText = this.$refs['message-box']
      this.scrollMessageBox = contentText.scrollTop
      if (contentText.scrollTop === 0) {
        this.loadingOldMessage = true
        let vm = this
        setTimeout(function () {
          vm.messages.unshift(
            {
              'id': (new Date()).getTime() + 'a',
              'userId': 1,
              'userName': 'blue',
              'message': 'text mới',
              'type': 'text',
              'time': '2001-10-10 10:30:20',
              'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
            },
            {
              'id': (new Date()).getTime() + 'b',
              'userId': 1,
              'userName': 'blue',
              'message': 'text mới',
              'type': 'text',
              'time': '2001-10-10 10:30:19',
              'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
            },
            {
              'id': (new Date()).getTime() + 'c',
              'userId': 1,
              'userName': 'blue',
              'message': 'text mới',
              'type': 'text',
              'time': '2001-10-10 10:30:18',
              'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
            },
            {
              'id': (new Date()).getTime() + 'e',
              'userId': 1,
              'userName': 'blue',
              'message': 'text mới',
              'type': 'text',
              'time': '2001-10-10 10:30:17',
              'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
            }, {
              'id': (new Date()).getTime() + 'd',
              'userId': 1,
              'userName': 'blue',
              'message': 'text mới',
              'type': 'text',
              'time': '2001-10-10 10:30:16',
              'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
            },
            {
              'id': (new Date()).getTime() + 'f',
              'userId': 1,
              'userName': 'blue',
              'message': 'text mới',
              'type': 'text',
              'time': '2001-10-10 10:30:15',
              'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
            },
            {
              'id': (new Date()).getTime() + 'g',
              'userId': 1,
              'userName': 'blue',
              'message': 'text mới',
              'type': 'text',
              'time': '2001-10-10 10:30:14',
              'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02'
            }
          )
          vm.loadingOldMessage = false
          contentText.scrollTop = 1
          vm.updateLengthMessage = true
        }, 1000)
      }
      // if (contentText.scrollTop !== (contentText.scrollHeight - contentText.offsetHeight)) {
      //   this.createNewMessage = false
      // }
    },
    showLiDateMessage (index) {
      if (index < (this.messageSorted.length - 1)) {
        let dC = new Date(this.messages[index].time)
        let dP = new Date(this.messages[index + 1].time)
        dC = dC.getFullYear() + dC.getMonth() + dC.getDate() + '/'
        dP = dP.getFullYear() + dP.getMonth() + dP.getDate() + '/'
        if (dC != dP) {
          return true
        }
      }
      return false
    },
    coverTime (d) {
      d = new Date(d)
      let curr = new Date()
      let dTime = d.getTime()
      let cTime = curr.getTime()
      if (cTime > dTime) {
        let m = parseInt(((cTime - dTime) / (1000 * 60 * 60)))
        if (m < 24) {
          if (m == 0) {
            let mi = parseInt(((cTime - dTime) / (1000 * 60)))
            if (mi > 0) {
              return mi + ' phút trước'
            }
            let sc = parseInt(((cTime - dTime) / (1000)))
            return sc + ' giây trước'
          }
          return m + ' giờ trước'
        } else {
          m = parseInt(m / 24)
          if (m < 2) {
            return 'Hôm qua ' + d.getHours() + ':' + d.getMinutes() + ' ' + d.getSeconds()
          }
        }
      }
      return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes() + ' ' + d.getSeconds()
    },
    coverDate (index) {
      if (index < (this.messageSorted.length - 1)) {
        var d = this.messageSorted[index + 1].time
        d = new Date(d)
        let curr = new Date()
        let dTime = d.getTime()
        let cTime = curr.getTime()
        if (cTime > dTime) {
          let m = parseInt(((cTime - dTime) / (1000 * 60 * 60)))
          m = parseInt(m / 24)
          if (m == 1) {
            return 'Hôm qua'
          }
          if (m == 0) {
            return 'Hôm nay'
          }
        }
        return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
      }
    },
    searchListTagMember (text) {
      let index = text.indexOf('@')
      if (index != -1) {
        text = text.slice(0, index)
        text = text.split('').reverse()
        text = text.toString().replace(/,/g, '')
        this.searchMemberTagToMessage = this.members.filter(member => {
          return member.name.includes(text) === true
        })
        return true
      }
      return false
    },
    tagMember (id) {
      let mem = this.members.filter(item => {
        return item.id == id
      })
      if (mem.length > 0) {
        mem = mem[0]
        let mess = this.textMessage.split('')
        let ins = []
        for (let i = 0; i < mess.length; i++) {
          if (mess[i] == '@') {
            ins.push(i)
          }
        }
        mess = mess.join('')
        let mess2 = mess.slice(0, ins[ins.length - 1])
        mess = mess.replace(mess2, '')
        mess2 = '<a contenteditable="false" data-id="' + mem.id + '" class="text-info-tag">@' + mem.name + '</a>&nbsp;'
        let h = this.$refs['content-chat'].innerHTML
        h = h.split('')
        ins = []
        for (let i = 0; i < h.length; i++) {
          if (h[i] == '@') {
            ins.push(i)
          }
        }
        h = h.join('')

        h = h.slice(0, ins[ins.length - 1])

        this.$refs['content-chat'].innerHTML = h + mess2
        this.placeCaretAtEnd(this.$refs['content-chat'])
        this.showTagMember = false
        this.indexChoose = null
        this.idMemberChoose = null
      }
    },
    placeCaretAtEnd (el) {
      el.focus()
      if (typeof window.getSelection !== 'undefined' &&
                    typeof document.createRange !== 'undefined') {
        var range = document.createRange()
        range.selectNodeContents(el)
        range.collapse(false)
        var sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      } else if (typeof document.body.createTextRange !== 'undefined') {
        var textRange = document.body.createTextRange()
        textRange.moveToElementText(el)
        textRange.collapse(false)
        textRange.select()
      }
    },
    setTextMessage (e) {
      let text = e.target.innerHTML
      text.split('')
      if (text.length > 5000) {
        PNotify.notice({
          title: 'Lưu ý',
          text: 'Nội dung tin nhắn không được quá 5000 từ.',
          icon: 'icon-warning',
          addClass: 'bg-warning',
          text_escape: true
        })
        this.$refs['content-chat'].innerHTML = null
        this.textMessage = null
        return false
      }
      this.textMessage = e.target.innerHTML
    },
    keyUpTextMessageContent (e) {
      if (e.keyCode == 38) {
        if (this.showTagMember == true) {
          if (this.indexChoose == null) {
            this.indexChoose = this.searchMemberTagToMessage.length - 1
          } else {
            if (this.indexChoose == 0) {
              this.indexChoose = this.searchMemberTagToMessage.length - 1
            } else {
              this.indexChoose--
            }
          }
        } else {
          this.indexChoose = null
        }
      }
      if (e.keyCode == 40) {
        if (this.showTagMember == true) {
          if (this.indexChoose == null) {
            this.indexChoose = 0
          } else {
            if (this.indexChoose == (this.searchMemberTagToMessage.length - 1)) {
              this.indexChoose = 0
            } else {
              this.indexChoose++
            }
          }
        } else {
          this.indexChoose = null
        }
      }
    },
    enterTagMemberMessageContent (e) {
      if (this.showTagMember == true && this.idMemberChoose != null) {
        this.tagMember(this.idMemberChoose)
        this.idMemberChoose = null
        e.preventDefault()
      } else {
        if (this.enterToSend == true) {
          this.sendMessage()
          e.preventDefault()
        }
      }
    },
    sendMessage () {
      let d = new Date()

      let textContent = this.$refs['content-chat'].innerHTML
      let userText = this.$refs['content-chat'].innerText.replace(/\s+$/, '')
      if (userText === '' && !textContent.includes('img')) {
        PNotify.notice({
          title: 'Lưu ý',
          text: 'Vui lòng điền nội dung tin nhắn.',
          icon: 'icon-warning',
          addClass: 'bg-warning',
          text_escape: true
        })
        this.$refs['content-chat'].innerHTML = null
        this.textMessage = null
        return false
      }
      let lc = this.$store.getters.getLocation
      this.messages.push(
        {
          'id': (new Date()).getTime(),
          'userId': 1,
          'userName': 'blue',
          'message': textContent,
          'type': 'text',
          'time': d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(),
          'userAvatar': 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p50x50/30713129_221639121917111_2265048069710760037_n.jpg?_nc_cat=0&oh=ef29b1adabb59cb6e620eaa19e817ee7&oe=5BFF3C02',
          'location': lc
        }
      )
      this.$refs['content-chat'].innerHTML = ''
      this.showTagMember = false
      this.typing = false
      this.createNewMessage = true
      this.updateLengthMessage = true
    },
    hoverShowMenuMessage () {
      let WDWidth = $(window).width()
      let wt = 50
      if (WDWidth < 769) {
        wt = 30
      }
      $('.media-body').hover(function () {
        let widthP = $(this).width()
        let widthC = $(this).children('.media-content').width()
        let paddingLeft = $(this).children('.media-content').css('padding-left')
        let paddingRight = $(this).children('.media-content').css('padding-right')
        $(this).find('.message-more-left').show()
        $(this).find('.message-more-left').css('margin-left', (widthP - widthC - wt - parseFloat(paddingLeft)) + 'px')
        $(this).find('.message-more-right').show()
        $(this).find('.message-more-right').css('margin-right', (widthP - widthC - wt - parseFloat(paddingRight)) + 'px')
      })
      $('.media-body').mouseleave(function () {
        $(this).find('.message-more-left').hide()
        $(this).find('.message-more-right').hide()
      })
    }
  }
}
</script>
<style>
    .tag-member > li {
        margin-bottom: 10px;
    }
    .tag-member > li > a{
        color: #333333;
        vertical-align: middle;
        line-height: 40px;
        font-size: 15px;
    ;
    }
    .tag-member > li > a:hover{
        color: #333333;
    }
    .pop-tag-member{
        position: absolute;
        display: block;
        left: 20px;
        top:520px;
        max-height: 300px;
        overflow: scroll;
        overflow-x: unset;
        scroll-behavior: smooth;
    }
    .pop-tag-member::-webkit-scrollbar {
        width: 5px;
    }

    .pop-tag-member::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    .pop-tag-member::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
    }

    .pop-tag-member::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    .pop-tag-member > div{
        padding: 0 !important;
    }
    .tag-member > li > a {
        padding: 0px 15px;
    }
    .text-message-content{
        font-size: 15px;
    }
    .tag-member-li{
        background-color: rgba(31,65,104,0.42);
    }
    .text-info-tag{
        white-space: pre;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        text-decoration:underline;
    }
    .text-info-tag:hover{
        background-color: rgba(185,189,204,0.61);
        text-decoration:underline;
    }
    .place-holder-content-box{
        position: absolute;
        color: #90949c;
        top: 568px;
        margin-left: 14px;
    }
    .typing{
        min-height: 20px;
        float: right;
        margin-right: 10px;
    }
    .content-box-chat{
        min-height: 100px;
        overflow-y: scroll;
        resize: both;
    }
    .quoter-message{
        background-color: rgba(142,204,182,0.61);
        padding: 5px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;

    }
</style>
