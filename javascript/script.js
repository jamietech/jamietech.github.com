$(function() {
    var repos = 0;
    var url = "https://api.github.com/users/jamietech/repos?callback=?&sort=pushed&type=owner";
    $.getJSON(url, function(data) {
        var $item = $("<li>").addClass("repo grid-1 " + (repo.language || '').toLowerCase());
        var $link = $("<a>").attr("href", repoUrl(repo)).appendTo($item);
        $link.append($("<h2>").text(repo.name));
        $link.append($("<h3>").text(repo.language));
        $link.append($("<p>").text(repoDescription(repo)));
        $item.appendTo("#repos");
    });
});