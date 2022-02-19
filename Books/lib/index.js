$(function() {
    getBookList()

    function getBookList() {
        $.get('http://www.liulongbin.top:3006/api/getbooks', function(res) {
            if (res.status !== 200) {
                return alert('获取图书列表失败')
            }
            trs = []
            $(res.data).each(function(i, item) {
                trs.push('<tr><td>' + item.id + '</td><td>' + item.bookname + '</td><td>' + item.author + '</td><td>' + item.publisher + '</td><td><a href="javascript:;" class="del" id="delbook" data-id="' + item.id + '">删除</a></td></tr>')
            })
            $('#tb').empty('').append(trs.join(''))
        })
    };
    $('#btnAdd').on('click', function() {
        var bookname = $('#iptbookname').val().trim();
        var author = $('#iptauthor').val().trim();
        var publisher = $('#iptpublisher').val().trim();
        if (bookname.length <= 0 || author.length <= 0 || publisher.length <= 0) {
            return alert('请填写完整的图书信息')
        }
        $.post('http://www.liulongbin.top:3006/api/addbook', {
            bookname: bookname,
            author: author,
            publisher: publisher
        }, function(res) {
            console.log(res);
        })
        getBookList()
    })
    $('#tb').on('click', 'a.del', function(e) {
        var id = $(this).attr('data-id')
        $.get('http://www.liulongbin.top:3006/api/delbook', {
            id: id
        }, function(res) {
            if (res.status !== 200 && res.status === 503) {
                return alert('删除图书失败,管理员不允许您删除Id为1，2，3的这三条数据！')
            }
        })
        getBookList()
    })
})