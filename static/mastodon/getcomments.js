$(document).ready(function() {

    // check if we show a blog post or not
    var isArticle = /\/?post\/.+$/.test(RelPermalink);
    if (isArticle === false) {
        console.log("Not a blog post, no need to search for comments");
        return;
    }

    $.ajax({
        url: "https://jak-linux.org/foo/mastodon.comments/getcomments.php",
        type: "get",
        data: {
            search : "Blog"
        },
        success: function(data) {
            var stats = data.stats;
            var root = data.stats.root;
            $("#like-count-container").append('<div id="mastodon-like-count"><a href="' + stats.url + '"><span title="Likes"><i class="fa fa-star"></i>' + stats.favs + '</span></a></div></div>');
            $("#reblog-count-container").append('<div id="mastodon-reblog-count"><a href="' + stats.url + '"><span title="Reblogs"><i class="fa fa-retweet"></i>' + stats.reblogs + '</span></a></div></div>');
            $("#reply-count-container").append('<div id="mastodon-reply-count"><a href="' + stats.url + '"><span title="Comments"><i class="fa fa-comments"></i>' + stats.replies + '</span></a></div></div>');
            var comments = data.comments;
            $.each(comments, function(key, value) {
                var timestamp = Date.parse(value.date);
                var date = new Date(timestamp);
                var comment = "<div class='comment' id='" + key + "'>";
                comment += "<img class='avatar' referrerpolicy='no-referrer' src='" + value.author.avatar + "' />";
                comment += "<div class='author'><a class='displayName' href='" + value.author.url + "'>" + value.author.display_name + "</a> wrote at ";
                comment += "<a class='date' href='" + value.url + "'>" + date.toDateString() + ', ' + date.toLocaleTimeString() + "</a></div>";
                comment += "<div class='toot'>" + value.toot + "</div>";
                comment += "</div>";
                if (value.reply_to === root) {
                    $("#comments").append(comment);
                } else {
                    var selector = '#'+value.reply_to;
                    $(selector).append(comment);
                }
            });
            if (parseInt(root) > 0) {
                $("#reference").append("<a href='https://mastodon.social/users/bjoern/statuses/" + root + "'>Join the discussion on Mastodon!</a>");
            } else {
                $("#comments").empty();
                $("#statistics").empty();
                $("#reference").append("Comments are handled by my <a href='https://mastodon.social/@bjoern'>Mastodon account</a>. Sadly this article wasn't published at Mastodon. Feel free to <a href='https://www.schiessle.org/contact/'>send me a mail</a> if you want to share your thoughts regarding this topic.");
            }

        }
    });
});
