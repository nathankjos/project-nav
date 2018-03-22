var liComment = $('.comment')

liComment.on('click', function() {
    $(this).children('.comment-form').toggleClass('hide')
    console.log($(this))
})