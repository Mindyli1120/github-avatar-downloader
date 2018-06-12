var request = require('request');
var github_token = require('./secrets');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request',
            'Authorization': 'token ' + github_token.GITHUB_TOKEN
        }
    };
    request(options, function(err, res, body) {
        var jsonBody = JSON.parse(body);
        cb(err, jsonBody) 
    });
}


getRepoContributors("jquery", "jquery", function (err, result) {
    console.log("Errors:", err);
    for (var i = 0; i < result.length; i++) {
        console.log("avatar_url: " + result[i].avatar_url);    
    }
});  