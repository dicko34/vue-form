const {
    createApp
} = Vue

createApp({

    data() {
        return {
            mask: "",
            setup: {
                width: "100%",
                reverse: false,
                background: "#fff",
                color: "#292929",
                borderColor: "#e9e9e9e",
                borderWidth: 1,
                borderStyle: "solid",
                title: "Get started",
                fields: [
                    {
                        el: ["input", "input"],
                        name: ["one", "tow"],
                        type: "text",
                        label: ["First name", "Last name"],
                        placeholder: ["First", "Last"],
                        length: [50, 50],
                        require: {
                            enable: [false, true],
                            text: [`First name cannot be empty`, `Last name cannot be empty`]
                        },
                    },
                    {
                        el: ["input"],
                        name: ["thre"],
                        type: ["email"],
                        label: ["Email address"],
                        length: [20],
                        require: {
                            enable: [true],
                            text: ["your email invaild"]
                        },
                        placeholder: ["Email"],
                        regex: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
                    },
                    {
                        el: ["input"],
                        name: ["four"],
                        type: ["phone_number"],
                        label: ["Phone number"],
                        length: [20],
                        require: {
                            enable: [true],
                            text: ["phone email"]
                        },
                        placeholder: ["Phone"],
                        numberMask: ["(xxx) xxx-xxx"]
                    },
                    {
                        el: [
                            "textarea"
                        ],
                        name: ["five"],
                        length: [50],
                        require: {
                            enable: [true],
                            text: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget facilisis nisi, in finibus lacus. Pellentesque varius mauris quis mi scelerisque dapibus. In et sapien."]
                        },
                        type: ["text"],
                        label: ["First name"],
                        placeholder: ["decrption"]
                    }
                ],
                button: {
                    content: "Action",
                    color: "#fff",
                    background: "#3c59ff",
                    fontSize: "14px",
                    width: "150px",
                    height: "42px",
                    borderRadius: "5px",
                    action: (url = "post.php",redirect=false) => {
                        let fieldsValid = true;
                        let fieldNotValidCount = 0;

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: $('#mian-section-form').serialize(),
                            beforeSend: _ => {
                                $('[require="true"] ').each(function() {
                                    if ($(this).val().length < 1) {
                                        fieldsValid = false;
                                        $(this).next().removeClass("hide")
                                    } else {
                                        $(this).next().addClass("hide")
                                    }
                                })
                                $('input[type="phone_number"][require="true"]').each(function () {
                                    if($(this).val().length != $(this).attr("data-mask").length) {
                                        fieldsValid = false;
                                        $(this).next().removeClass("hide")
                                    } else {
                                        $(this).next().addClass("hide")
                                    }
                                })
                                $('input[type="email"][require="true"]').each(function () {
                                    let regex =  $(this).attr('data-pattern').replaceAll(/[\/]/gm , "");
                                    const toObjRegex = new RegExp(regex);
                                    if(!toObjRegex.test($(this).val())) {
                                        fieldsValid = false;
                                        $(this).next().removeClass("hide")
                                    } else {
                                        $(this).next().addClass("hide")
                                    }
                                })
                                
                                fieldsValid ?  $('#loading').removeClass("hide") :"" ;
                                return fieldsValid;
                            }
                        }).done(_d => {
                           console.log(_d);
                            if (this.setup.loading.enable) {
                                $('#loading').removeClass('hide')
                            }
                            if (this.setup.loading.enable) {
                                $('#loading').removeClass('hide')
                            }
                            if (_d.includes('fail_request_400')) {
                                if (this.setup.fail.enable) {
                                    $('#loading').addClass('hide'),
                                        $('#fail').removeClass('hide')
                                }
                            } else {
                                $('#loading').addClass('hide'),
                                $('#success').removeClass('hide')
                                redirect ? window.location.href = redirect : ""

                            }
                            setTimeout(_ =>  $('.window').addClass("hide") , 5000)
                        }).fail(_ => {
                            if (fieldsValid) {
                                if (this.setup.loading.enable) {
                                    $('#loading').removeClass('hide')
                                }
                                if (this.setup.error.enable) {
                                    $('#loading').addClass('hide'),
                                        $('#error').removeClass('hide')
                                }
                                setTimeout(_ =>  $('.window').addClass("hide") , 5000)
                            } 
                           
                        })
                    }
                },
                sideSection: {
                    width: "70%",
                    background: {
                        color: "#3c59ff",
                        url: "assets/img/db8c8283057bfc1e3261587c0d0223f2.jpg",
                        size: "cover",
                        postion: "center",
                        repeate: "no-repeate"
                    },
                    color: "#fff",
                    title: "We are",
                    subTitle: "Welcome back to class! I was looking forward to meeting ",
                    areas: [{
                            text: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
                            icon: "user",
                           borderShape: "square",
                            borderColor: "#fff",
                            borderWidth : "4px"
                        },
                        {
                            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper ante mi, eu rhoncus diam hendrerit nec. Nullam elementum.",
                            icon: "eye",
                            borderShape: "square",
                            borderColor: "#fff",
                            borderWidth : "4px"
                        },
                        {
                            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat lacinia sem, in mollis velit convallis sed. Nunc blandit.",
                            icon: "at",
                            borderShape: "square",
                            borderColor: "#fff",
                            borderWidth : "4px"
                        },
                        {
                            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae condimentum purus, ut luctus nunc. Nunc et vestibulum dui. Mauris tellus orci, euismod non lobortis.",
                            icon: "phone-call",
                            borderShape: "square",
                            borderColor: "#fff",
                            borderWidth : "4px"
                        },
                    ],
                    links: {
                        enable: true,
                        icon: ["facebook", "github","apple", "instagram"]
                    }
                },
                loading: {
                    enable: true,
                    src: "assets/img/loading.gif"
                },
                success: {
                    enable: true,
                    src: "assets/img/success.gif"
                },
                fail: {
                    enable: true,
                    src: "assets/img/fail.gif"
                },
            }
        }
    },
    methods: {
        action() {
            return this.setup.button.action();;
        },
        maskNumber(event, pattern) {
            let Numbers = event.srcElement.value.replaceAll(/\D/gm, "");
            let vv = Numbers.split("").forEach(element => {
                pattern = pattern.replace('x', element)

            });
            return event.srcElement.value = pattern.split('x')[0];
        },
        emailValid (event, pattern) {
           
            return event.srcElement.value = pattern.split('x')[0];
        }
    },

    template: `
    <div id="c-contact-form" class="dp-flex flex-bet"> 
    <div id="c-contact-form-side-section" class="dp-flex flex-bet flex-colmun">
        <div class="side-section-titles">
            <h1 class="side-section-title my-10">Our Info</h1>
            <p class="side-section-subtitle my-10">{{setup.sideSection.subTitle}}</p>
        </div>
        <ul class="side-section-our-info dp-flex flex-bet flex-colmun">
                <li class="side-section-info dp-flex flex-ailgn-center flex-bet" v-for="area in setup.sideSection.areas">
                    <div class="side-section-info-container-icon" :class="area.borderShape" :style="'border-color:'+area.borderColor+'; border-width:'+area.borderWidth+';'">
                        <img :src="'assets/img/svg/marks/'+area.icon+'.svg'" alt="">
                    </div>
                    <div class="side-section-container-text">
                        <div class="side-section-text">
                            {{area.text}}
                        </div>
                    </div>
                </li>
            </ul>
        <div class="side-section-ilnks dp-flex flex-bet">
        <div class="side-section-link"  v-for="link in setup.sideSection.links.icon" v-if="setup.sideSection.links.enable">
        <img :src="'assets/img/svg/brands/' +link+'.svg'" alt="">
    </div>
        </div>
    </div>
    <div id="c-contact-form-main-section">
        <div class="window hide" id="loading">
            <img :src="setup.loading.src" alt="">
        </div>
        <div class="window hide" id="success">
            <img :src="setup.success.src" alt="">
        </div>
        <div class="window hide" id="fail">
            <img :src="setup.fail.src" alt="">
        </div>
        <div class="main-section-title">
            <h1>{{setup.title}}</h1>
        </div>
        <form action="post" id="mian-section-form" class=" dp-flex flex-colmun flex-bet">
        <div class="field-container dp-flex flex-bet" v-for="(item,index) in setup.fields">
            <div class="field"  v-for="(attr,index2) in item.el">
                <label :for="'field' + index + '-' + index2">{{item.label[index2]}}</label>
                <input type="hidden" :name="'label-'+item.name[index2]" :value="item.label[index2]">
                <textarea :require="item.require.enable[index2]"  v-if="attr == 'textarea'" :name="item.name[index2]"  :placeholder="item.placeholder[index2]" :id="'field' + index + '-' + index2" ></textarea>
                <input :require="item.require.enable" :maxLength="item.length[index2]" :data-pattern="item.regex[index2]" v-else-if="item.type[index2] == 'email'" :id="'field' + index + '-' + index2" :name="item.name[index2]" :placeholder="item.placeholder[index2]" :type="item.type[index2]">
                <input :require="item.require.enable" :maxLength="item.length[index2]" @keyup="maskNumber($event,item.numberMask[index2])" :data-mask="item.numberMask[index2]" v-else-if="item.type[index2] == 'phone_number'" :id="'field' + index + '-' + index2" :name="item.name[index2]" :placeholder="item.placeholder[index2]" :type="item.type[index2]">
                <input :require="item.require.enable[index2]" :maxLength="item.length[index2]"  v-else :id="'field' + index + '-' + index2":name="item.name[index2]" :placeholder="item.placeholder[index2]" :type="item.type[index2]">
                <span class="required hide"  v-if="item.require.enable[index2]">{{item.require.text[index2]}} </span>
            </div>
        </div>
        <div id="main-section-container-button" class="flex-end dp-flex">
            <button @click.prevent="action()" id="main-section-button">{{setup.button.content}}</button>
        </div>
    </form>
</div>
        </div>
    `,
    mounted() {
        // main section
        $('#c-contact-form').css("width", this.setup.width);
        (this.setup.reverse == true) ? $('#c-contact-form').addClass("reverse"): "";
        $('#c-contact-form-main-section').css({
            backgroundColor: this.setup.background,
            color: this.setup.color,
            borderWidth: this.setup.borderWidth,
            borderSolid: this.setup.borderSolid,
            borderColor: this.setup.borderColor,
        })
        $('#c-contact-form-side-section').css({
            flexBasis: this.setup.sideSection.width,
            backgroundColor: this.setup.sideSection.background.color,
            backgroundImage: `url("${this.setup.sideSection.background.url}")`,
            backgroundSize: this.setup.sideSection.background.size,
            backgroundPosition: this.setup.sideSection.background.postion,
            backgroundRepeat: this.setup.sideSection.background.repeate,
        })
        // button
        $('#main-section-button').css({
            width: this.setup.button.width,
            height: this.setup.button.height,
            background: this.setup.button.background,
            padding: this.setup.button.padding,
            fontSize: this.setup.button.fontSize,
            width: this.setup.button.width,
            color: this.setup.button.color,

        })

    },
    watch: {

    },

}).mount('#lu-form')