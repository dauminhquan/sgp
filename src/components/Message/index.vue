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
                <ul class="media-list chat-list content-group" ref="message-box" @scroll="scollMessageList">

                    <template v-for="(message,index) in messageSorted">
                        <li :key="message.id" :class="message.userId == 1? 'media reversed': 'media'">
                            <div class="media-body" v-if="message.userId == 1">
                                <div class="message-more-left">
                                    <div class="dropdown">
                                        <div class="dropdown-toggle" data-toggle="dropdown">
                                            <span class="icon-menu" style="color: #abb6c6"></span>
                                        </div>
                                        <ul class="dropdown-menu dropdown-menu-left">
                                            <li><a :href="null"><i class="icon-trash"></i> Xóa tin nhắn</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="media-content text-message-content">{{message.message}}</div>
                                <span class="media-annotation display-block mt-10">{{coverTime(message.time)}} <a :href="null"><i class="icon-pin-alt position-right text-muted"></i></a></span>
                            </div>
                            <div :class="message.userId == 1 ? 'media-right':'media-left'">
                                <a :href="null">
                                    <img :src="message.userAvatar" class="img-circle" alt="">
                                </a>
                            </div>
                            <div class="media-body" v-if="message.userId != 1">
                                <div class="message-more-right">
                                    <div class="dropdown">
                                        <div class="dropdown-toggle" data-toggle="dropdown">
                                            <span class="icon-menu" style="color: #abb6c6"></span>
                                        </div>
                                        <ul class="dropdown-menu dropdown-menu-left">
                                            <li><a :href="null"><i class="icon-trash"></i> Xóa tin nhắn</a></li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="media-content text-message-content">{{message.message}}</div>
                                <span class="media-annotation display-block mt-10">{{coverTime(message.time)}} <a :href="null"><i class="icon-pin-alt position-right text-muted"></i></a></span>
                            </div>
                        </li>
                        <li v-if="showLiDateMessage(index)" class="media date-step">
                            <span>{{coverDate(index)}}</span>
                        </li>
                    </template>
                    <li class="media reversed">
                        <div class="media-body">
                            <div class="media-content"><i class="icon-menu display-block"></i></div>
                        </div>

                        <div class="media-right">
                            <a href="assets/images/placeholder.jpg">
                                <img src="assets/images/placeholder.jpg" class="img-circle" alt="">
                            </a>
                        </div>
                    </li>
                </ul>
                <div class="popover fade top in pop-tag-member" v-show="showTagMember == true">
                    <div class="popover-content">
                        <ul class="navigation tag-member">
                            <li v-for="member in searchMemberTagToMessage" :key="member.id">
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
                <textarea v-model="textMessage" name="enter-message" class="form-control content-group" rows="3" cols="1" placeholder="Nhập tin nhắn của bạn, gõ @name để tag thành viên...">

                </textarea>

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
                                <button type="button" class="btn bg-success-400 " v-if="enterToSend == false"><b><i class="glyphicon glyphicon-send"></i> Gửi</b></button>
                                <button type="button" class="btn bg-teal-400 " data-toggle="dropdown"><b><i class="icon-cog2"></i></b></button>
                                <ul class="dropdown-menu dropdown-menu-right">
                                    <li><a :href="null" @click="enterToSend = false" v-if="enterToSend == true">Nhấn Enter để gửi</a></li>
                                    <li><a :href="null" @click="enterToSend = true" v-if="enterToSend == false">Sử dụng nút gửi</a></li>
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
    export default {
        updated () {
            this.$nextTick(function () {
                this.offsetHeightPopTagMember = document.getElementsByClassName('pop-tag-member').item(0).offsetHeight
            })
        },
        computed: {
            messageSorted () {
                return this.messages.sort(function (a, b) {
                    var c = new Date(a.time)
                    var d = new Date(b.time)
                    return c.getTime()-d.getTime()
                })
            }
        },
        watch: {
            textMessage (newText) {
                let arrayText = newText.split('').reverse()
                arrayText = arrayText.toString().replace(/,/g,'')
                if (this.searchListTagMember(arrayText)) {
                    if( this.searchMemberTagToMessage.length > 0)
                    {
                        this.showTagMember = true
                        let count = this.searchMemberTagToMessage.length
                        console.log(count)
                        console.log(document.getElementsByClassName('pop-tag-member').item(0).style.top)
                        let cc = count * 54
                        document.getElementsByClassName('pop-tag-member').item(0).style.top = (520 - cc).toString() + 'px'
                    }
                } else {
                    this.showTagMember = false
                }
            },
            offsetHeightPopTagMember (value) {
                if (value === 300) {
                    document.getElementsByClassName('pop-tag-member').item(0).style.top = '240px'
                }
            }
        },
        mounted () {
            this.$refs['message-box'].scrollTop = this.$refs['message-box'].scrollHeight
            let element, name, arr
            element = document.body
            name = 'sidebar-xs'
            arr = element.className.split(' ')
            if (arr.indexOf(name) === -1) {
                element.className += ' ' + name
            }
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
        },
        data () {
            return {
                textMessage: null,
                showTagMember: false,
                searchMemberTagToMessage: [
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
                offsetHeightPopTagMember: 0,
                enterToSend: true,
                messages: [
                    {
                        'id': '5b88ed7eb5974b716ea92ec3',
                        'userId': 2,
                        'userName': 'blue',
                        'message': 'Đây là message',
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
                ]
            }
        },
        methods: {
            scollMessageList () {
                if (this.$refs['message-box'].scrollTop === 0) {
                    console.log(123)
                }
            },
            showLiDateMessage(index){
                if(index < (this.messageSorted.length - 1))
                {
                    let dC = new Date(this.messages[index].time)
                    let dP = new Date(this.messages[index+1].time)
                    dC = dC.getFullYear()+dC.getMonth()+dC.getDate()+'/'
                    dP = dP.getFullYear()+dP.getMonth()+dP.getDate()+'/'
                    if(dC != dP)
                    {
                        return true
                    }
                }
                return false
            },
            coverTime(d){
                d = new Date(d)
                let curr = new Date()
                let dTime = d.getTime()
                let cTime = curr.getTime()
                if(cTime > dTime)
                {
                    let m = parseInt(((cTime-dTime) / (1000 * 60 * 60)))
                    if( m < 24)
                    {
                        return m+' giờ trước'
                    }
                    else{
                        m = parseInt(m / 24)
                        if(m < 2)
                        {
                            return 'Hôm qua '+d.getHours()+':'+d.getMinutes()+' '+d.getSeconds()
                        }
                    }
                }
                return d.getDate()+'/'+(d.getMonth() + 1)+'/'+d.getFullYear() + ' '+d.getHours()+':'+d.getMinutes()+' '+d.getSeconds()
            },
            coverDate(index){
                if(index < (this.messageSorted.length - 1))
                {
                    var d = this.messageSorted[index + 1].time
                    d = new Date(d)
                    let curr = new Date()
                    let dTime = d.getTime()
                    let cTime = curr.getTime()
                    if(cTime > dTime)
                    {
                        let m = parseInt(((cTime-dTime) / (1000 * 60 * 60)))
                        m = parseInt(m / 24)
                        if(m  == 1)
                        {
                            return 'Hôm qua'
                        }
                        if(m == 0)
                        {
                            return 'Hôm nay'
                        }
                    }
                    return d.getDate()+'/'+(d.getMonth() + 1)+'/'+d.getFullYear()
                }
            },
            searchListTagMember(text){
                let index = text.indexOf('@')
                if(index != -1)
                {
                    text = text.slice(0,index)
                    text = text.split('').reverse()
                    text = text.toString().replace(/,/g,'')
                    this.searchMemberTagToMessage = this.members.filter(member => {
                        return member.name.includes(text) === true
                    })
                    return true
                }
                return false
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
</style>
