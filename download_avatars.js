var request = require('request');
var github_token = require('./secrets');
var fs = require('fs');
function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request',
            'Authorization': 'token ' + github_token.GITHUB_TOKEN
        }
    };
    request(options, function (err, res, body) {
        var jsonBody = JSON.parse(body);
        cb(err, jsonBody)
    });
}

function downloadImageByURL(url, filePath) {
    request.get(url)
        .on('error', function (err) {
            throw err;
        })
        .pipe(fs.createWriteStream(filePath));
}

getRepoContributors("jquery", "jquery", function (err, result) {
    console.log("Errors:", err);
    for (var i = 0; i < result.length; i++) {
        var login = result[i].login;
        //get the image of each person with the avatar_url
        downloadImageByURL(result[i].avatar_url, "./avatars/" + login + ".jpg")
    }
});

