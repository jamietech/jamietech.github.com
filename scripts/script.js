$(function() {
    var first = "https://api.github.com/users/jamietech?callback=?";
    $.getJSON(first, function(data) {
        $('#num-repos').fadeOut('fast', function() {
            $('#num-repos').html(data.data.public_repos);
            $('#num-repos').fadeIn('fast');
        });
        $('#num-followers').fadeOut('fast', function() {
            $('#num-followers').html(data.data.followers);
            $('#num-followers').fadeIn('fast');
        });
        $('#hireable').fadeOut('fast', function() {
            $('#hireable').html(data.data.hireable ? "&#10003;" : "&#10007;");
            $('#hireable').fadeIn('fast');
        });
    });

    var url = "https://api.github.com/users/jamietech/repos?callback=?&sort=pushed&type=owner";
    $.getJSON(url, function(data) {
        $('#recently-updated-repos').hide();
        $.each(data.data, function(i, repo) {
            if (i <= 2) {
                var $item = $("<li>");

                var $name = $("<a>").attr("href", repo.html_url).text(repo.name);
                $item.append($("<span>").addClass("name").append($name));

                //var $time = $("<a>").attr("href", repo.html_url + "/commits").text(strftime("%h %e, %Y", repo.pushed_at));
                //$item.append($("<span>").addClass("time").append($time));

                $item.append('<span class="bullet">&sdot;</span>');

                var $stargazing = (repo.watchers_count);
                $stargazing += (repo.watchers_count == 1) ? " stargazer" : " stargazers";
                var $watchers = $("<a>").attr("href", repo.html_url + "/watchers").text($stargazing);
                $item.append($("<span>").addClass("watchers").append($watchers));

                $item.append('<span class="bullet">&sdot;</span>');

                var $forks = $("<a>").attr("href", repo.html_url + "/network").text(repo.forks + " forks");
                $item.append($("<span>").addClass("forks").append($forks));

                $item.appendTo("#recently-updated-repos");
                if (i == 2) {
                    $('#recently-updated-repos').fadeIn('fast');
                }
            }
            var $item = $("<li>").addClass("repo grid-1 " + (repo.language || '').toLowerCase());
            var $link = $("<a>").attr("href", repo.html_url).appendTo($item);
            $link.append($("<h2>").text(repo.name));
            $link.append($("<h3>").text(repo.language));
            $link.append($("<p>").text(repo.description));
            $item.appendTo("#repos");
        });
    });
});