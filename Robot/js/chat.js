$(function() {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()
    $('#btnSend').on('click', function() {
        var ipttext = $('#ipttext').val().trim();
        if (ipttext.length <= 0) {
            return $('#ipttext').val('')
        };
        $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /><span>' + ipttext + '</span></li>')
        resetui()
        $('#ipttext').val('')
        getMsg(ipttext)
    })

    function getMsg(text) {
        $.ajax({
            method: 'get',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function(res) {
                if (res.message === 'success') {
                    var msg = res.data.info.text
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>')
                    resetui()
                    getVoice(text)
                }
            }
        })
    }

    function getVoice(text) {
        $.ajax({
            method: 'get',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function(res) {
                if (res.status == 200) {
                    $("#voice").attr('src', res.voiceUrl)
                }
            }
        })
    }
    $('#ipttext').on('keyup', function(e) {
        if (e.keyCode == 13) {
            $('#btnSend').click()
        }
    })
})