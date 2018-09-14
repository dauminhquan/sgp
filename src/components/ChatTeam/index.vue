<template>
    <div class="content">
        <div class="panel panel-flat">
            <div class="panel-heading">
                <h6 class="panel-title"><b><span class="status-mark bg-success"></span></b> <small>32 người online</small></h6>
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
                        <li :key="message.id" :class="message.userId == UserId? 'media reversed': 'media'">
                            <div class="media-body" v-if="message.userId == UserId">
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
                            <div :class="message.userId == UserId ? 'media-right':'media-left'">
                                <a :href="null">
                                    <img :src="message.userAvatar" class="img-circle" alt="" :title="message.userName">
                                </a>
                            </div>
                            <div class="media-body" v-if="message.userId != UserId">
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
                                        {{member.username}}
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div><span class="media-annotation display-block typing">{{typingText}}</span></div>
                <div class="clearfix"></div>
                <div class="preview-image">
                    <div class="preview-image-item" v-for="(img,index) in bobsFileBase64">
                        <div>
                            <button class="btn btn-link icon-close2 close-preview-image-item" @click="removeBobsFile(index)"></button>
                        </div>
                        <img :src="img" alt="">
                    </div>
                </div>
                <div contenteditable="true" @paste="pasteToContentChat" ref="content-chat" class="form-control content-group content-box-chat" @input="setTextMessage" @keyup="keyUpTextMessageContent" @keydown.enter="enterTagMemberMessageContent"></div>
                <div v-if="(textMessage==null || textMessage=='' ) && bobsFile.length == 0" class="place-holder-content-box">Nhập tin nhắn...</div>
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
    import axios from './../../axios'
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
                if (this.endScrollBoxMessage == true) {
                    this.$refs['message-box'].scrollTop = this.$refs['message-box'].scrollHeight
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
            },
            UserId () {
                if(this.$store.getters.getUser != null)
                {
                    return this.$store.getters.getUser.id
                }

            },
            _groupId () {
                let vm = this
                let group = vm.$store.getters['room/getGroups'].find(item => {
                    return item.id == vm.$route.params.id
                })
                if (group != undefined) {
                    return group._id
                }
                return null
            },
            members () {
                let vm = this
                let user = vm.$store.getters.getUser
                let group = vm.$store.getters['room/getGroups'].find(item => {
                    return item.id == vm.$route.params.id
                })
                if (group != undefined) {
                    return group.members.filter(mem => {
                        return mem.id != user.id
                    })
                }
                return null
            }
        },
        watch: {
            textMessage (newText, oldText) {
                if (newText != null && newText != '') {
                    this.typing = true
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
                } else {
                    this.typing = false
                    this.showTagMember = false
                }
            },
            bobsFile (newValue) {
                if (newValue.length > 0) {
                    this.typing = true
                } else {
                    this.typing = false
                }
            },
            offsetHeightPopTagMember (value) {
                let count = this.searchMemberTagToMessage.length

                let element = document.getElementsByClassName('pop-tag-member').item(0)
                let cc = count * 55
                if (value === 300) {
                    element.style.top = '240px'
                } else {
                    element.style.top = (540 - cc).toString() + 'px'
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
                if (value > (contentText.scrollHeight - contentText.offsetHeight - 50)) {
                    this.endScrollBoxMessage = true
                } else {
                    this.endScrollBoxMessage = false
                }
                $(contentText).removeClass('chat-list-white')
                setTimeout(function () {
                    if (contentText.scrollTop == value) {
                        $(contentText).addClass('chat-list-white')
                    }
                }, 3000)
            },
            _groupId (newValue, oldValue) {
                let vm = this
                vm.$socket.off('chanel-group-' + oldValue)
                vm.$socket.on('chanel-group-' + newValue, function (data) {
                    vm.messages.push(data)
                    vm.textMessage = null
                })
                vm.getMessages(1)
            }
        },
        beforeMount () {

            /* let vm = this
              let socket = vm.$socket
              let groups =  vm.$store.getters['room/getGroups']
              groups.forEach(group => {
                  socket.on()
              })
              console.log(vm.$socket) */
        },
        mounted () {
            let vm = this
            vm.$socket.on('chanel-group-' + vm._groupId, function (data) {
                vm.messages.push(data)
                vm.textMessage = null
            })
            vm.getMessages(1)
            if (window.innerWidth < 769) {
                this.modeMobile = true
            }
            vm.$refs['message-box'].scrollTop = this.$refs['message-box'].scrollHeight
            let element, name, arr
            element = document.body
            name = 'sidebar-xs'
            arr = element.className.split(' ')
            if (arr.indexOf(name) === -1) {
                element.className += ' ' + name
            }
            vm.hoverShowMenuMessage()
        },
        data () {
            return {
                endScrollBoxMessage: true,
                textMessage: null,
                showTagMember: false,
                searchMemberTagToMessage: [

                ],
                offsetHeightPopTagMember: 0,
                enterToSend: false,
                indexChoose: null,
                idMemberChoose: null,
                modeMobile: false,
                createNewMessage: false,
                updateLengthMessage: false,
                messages: [],
                typingText: '',
                typing: false,
                loadingOldMessage: false,
                scrollMessageBox: null,
                Latitude: null,
                Longitude: null,
                bobsFile: [],
                bobsFileBase64: [],
                skip: 1
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
                    vm.bobsFile.push(blob)
                    var reader = new FileReader()
                    reader.onload = function (event) {
                        vm.bobsFileBase64.push(event.target.result)
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
                let vm = this
                let contentText = vm.$refs['message-box']
                vm.scrollMessageBox = contentText.scrollTop
                if (contentText.scrollTop === 0) {
                    this.loadingOldMessage = true
                    vm.skip++
                    vm.getOldMessages(vm.skip)
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
                        return member.username.includes(text) === true
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
                    mess2 = '<a contenteditable="false" data-id="' + mem.id + '" class="text-info-tag">@' + mem.username + '</a>&nbsp;'
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

                let vm = this
                axios.post('http://localhost:3000/messages', {
                    group: vm._groupId,
                    contentText: vm.$refs['content-chat'].innerText,
                    content: vm.$refs['content-chat'].innerHTML,
                    type: 'string',
                    location: vm.$store.getters.getLocation
                }).then(data => {
                    vm.$refs['content-chat'].innerHTML = ''
                    vm.showTagMember = false
                    vm.typing = false
                    vm.createNewMessage = true
                    vm.updateLengthMessage = true
                }).catch(err => {
                    console.dir(err)
                    PNotify.notice({
                        title: 'Không thể gửi tin nhắn',
                        text: 'Đã có lỗi xảy ra. Kiểm tra lại.',
                        icon: 'icon-warning',
                        addClass: 'bg-danger-400',
                        text_escape: true
                    })
                })
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
            },
            removeBobsFile (index) {
                let vm = this
                vm.bobsFile = this.bobsFile.filter((item, i) => {
                    return i != index
                })
                vm.bobsFileBase64 = this.bobsFileBase64.filter((item, i) => {
                    return i != index
                })
            },
            getMessages(skip){
                let vm = this
                let idGroup = vm.$route.params.id
                if(axios.defaults.headers.common['Auth-Token'] != null && axios.defaults.headers.common['Auth-Token'] != undefined)
                {
                    axios.get(`http://localhost:3000/groups/${idGroup}/messages?skip=${skip}`).then(data=> {
                        vm.messages = data.data
                    }).catch(err => {
                        PNotify.notice({
                            title: 'Thất bại',
                            text: 'Không thể lấy tin nhắn cũ. Vui lòng load lại trang.',
                            icon: 'icon-warning',
                            addClass: 'bg-warning',
                            text_escape: true
                        })
                        console.log(err)
                    })
                }
            },
            getOldMessages(skip){
                let vm = this
                let idGroup = vm.$route.params.id
                axios.get(`http://localhost:3000/groups/${idGroup}/messages?skip=${skip}`).then(data=> {
                    if(data.data.length == 0 || data.data.length == undefined)
                    {
                        vm.skip--
                    }
                    else{
                        vm.messages = vm.messages.concat(data.data)
                    }
                    vm.loadingOldMessage = false
                    vm.$refs['message-box'].scrollTop = 1
                    vm.updateLengthMessage = true

                }).catch(err => {
                    PNotify.notice({
                        title: 'Thất bại',
                        text: 'Không thể lấy tin nhắn cũ. Vui lòng load lại trang.',
                        icon: 'icon-warning',
                        addClass: 'bg-warning',
                        text_escape: true
                    })
                    vm.loadingOldMessage = false
                    vm.$refs['message-box'].scrollTop = 1
                    vm.updateLengthMessage = true
                    console.log(err)
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
    .preview-image {
        display: block;
        bottom: 180px;
    }
    .preview-image-item{
        margin: 5px;
        display: inline-block;
    }
    .preview-image-item img{
        border-radius: 5px;
        max-height: 100px;
    }
    button.close-preview-image-item{
        z-index: 9999;
        float: right;
        padding-right: 0;
        padding-bottom: 0;
    }
</style>
