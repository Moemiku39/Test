$(function() {
    template.defaults.imports.dateFormat = function(time) {
        var times = new Date(time)
        var yy = times.getFullYear()
        var mm = times.getMonth() + 1
        mm = mm < 10 ? '0' + mm : mm
        var dd = times.getDate()
        dd = dd < 10 ? '0' + dd : dd
        var hh = times.getHours()
        hh = hh < 10 ? '0' + hh : hh
        var mn = times.getMinutes()
        mn = mn < 10 ? '0' + mn : mn
        var ss = times.getSeconds()
        ss = ss < 10 ? '0' + ss : ss
        return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mn + ':' + ss
    }
    getNewsList()

    function getNewsList() {
        $.ajax({
            method: 'get',
            url: 'http://www.liulongbin.top:3006/api/news',
            success: function(res) {
                console.log(res);
                if (res.status !== 200) {
                    return alert('获取新闻列表失败')
                }
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].tags = res.data[i].tags.split(',')
                }
                var htmlStr = template('news', res)
                $('#news-list').html(htmlStr)

            }
        })
    }
})