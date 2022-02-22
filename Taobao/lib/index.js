$(function() {
    var timer = null
    var cacheObj = {}

    function debounceSearch(kw) {
        timer = setTimeout(function() {
            getSuggestList(kw)
        }, 500);
    }
    $('#ipt').on('keyup', function() {
        clearTimeout(timer)
        var keywords = $(this).val().trim()
        if (keywords.length <= 0) {
            return $('#suggestlist').empty().hide()
        }
        if (cacheObj[keywords]) {
            return renderSuggestList(cacheObj[keywords])
        }
        debounceSearch(keywords)
    })

    function getSuggestList(kw) {
        $.ajax({
            url: 'https://suggest.taobao.com/sug?q=' + kw,
            dataType: 'jsonp',
            success: function(res) {
                renderSuggestList(res)
            }

        })
    }

    function renderSuggestList(res) {
        if (res.result.length <= 0) {
            return $('#suggestlist').empty().hide()
        }
        var htmlStr = template('tpl-suggestlist', res)
        $('#suggestlist').html(htmlStr).show()
        var k = $('#ipt').val().trim()
        cacheObj[k] = res
        console.log(cacheObj[k]);
    }
})