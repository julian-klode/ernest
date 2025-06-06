// @license magnet:?xt=urn:btih:d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt Expat
$(document).ready(function() {

    // check if we show a blog post or not
    var isArticle = true; // /\/?post\/.+$/.test(RelPermalink);
    if (isArticle === false) {
        console.log("Not a blog post, no need to search for comments");
        return;
    }

    var areLazy = ('IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype &&
        'isIntersecting' in window.IntersectionObserverEntry.prototype);

    $.ajax({
        url: BaseURL + "/mastodon/getcomments.php",
        type: "get",
        data: {
            search : RelPermalink
        },
        success: function(data) {
            var stats = data.stats;
            var root = data.stats.root;
            $("#like-count-container").append('<div id="mastodon-like-count"><a href="' + stats.url + '"><span title="Likes">★' + stats.favs + '</span></a></div></div>');
            $("#reblog-count-container").append('<div id="mastodon-reblog-count"><a href="' + stats.url + '"><span title="Reblogs">🔁' + stats.reblogs + '</span></a></div></div>');
            $("#reply-count-container").append('<div id="mastodon-reply-count"><a href="' + stats.url + '"><span title="Comments">💬' + stats.replies + '</span></a></div></div>');
            var comments = data.comments;
            $.each(comments, function(key, value) {
                var timestamp = Date.parse(value.date);
                var date = new Date(timestamp);
                var comment = "<div class='comment' id='" + key + "'>";
                if (areLazy)
                    comment += "<img class='avatar lazy' referrerpolicy='no-referrer' data-src='" + value.author.avatar + "' />";
                else
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

            let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
            let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                      let lazyImage = entry.target;
                      lazyImage.src = lazyImage.dataset.src;
                      lazyImage.classList.remove("lazy");
                      lazyImageObserver.unobserve(lazyImage);
                    }
                });
            });

            lazyImages.forEach(function(lazyImage) {
                lazyImageObserver.observe(lazyImage);
            });

            if (parseInt(root) > 0) {
                $("#reference").append("<a href='https://mastodon.social/users/" + MastodonUser + "/statuses/" + root + "'>Join the discussion on Mastodon!</a>");
            } else {
                $("#comments").empty();
                $("#statistics").empty();
                $("#reference").append("Comments are handled by my <a href='https://mastodon.social/@" + MastodonUser + "'>Mastodon account</a>. Sadly this article wasn't published at Mastodon. Feel free to send me a mail if you want to share your thoughts regarding this topic.");
            }

        }
    });
});
// @license-end
