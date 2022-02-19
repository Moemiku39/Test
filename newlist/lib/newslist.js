$(function() {
    getCommenList()

    function getCommenList() {
        $.ajax({
            method: 'get',
            url: 'http://www.liulongbin.top:3006/api/cmtlist',
            success: function(res) {
                if (res.status !== 200) {
                    return alert('获取评论列表失败')
                }
                var rows = [];
                $(res.data).each(function(i, item) {
                    rows.push('<li class="list-group-item"><span class="badge" style="background-color: gold;">评论时间：' + item.time + '</span><span class="badge" style="background-color: aqua;">评论人：' + item.username + '</span> ' + item.content + '</li>')
                })
                $('#list_group').empty().append(rows.join(''))
            }
        })
    }
    $('#contentform').on('submit', function(e) {
        e.preventDefault()
        var username = $('#username').val().trim()
        var content = $('#content').val().trim()
        if (username.length <= 0 || content.length <= 0) {
            return alert('请填写完整的评论内容')
        }
        var data = $(this).serialize()
        $.post('http://www.liulongbin.top:3006/api/addcmt', data, function(res) {
            if (res.status !== 201) {
                return alert('发表评论失败')
            }

            getCommenList()
            $('#contentform')[0].reset()
        })
    })
})