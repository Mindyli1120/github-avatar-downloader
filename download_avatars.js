var request = require('request');
var github_token = require('1a370cf72a2e15b8dbc9b464ddcd29b83cba7bf0');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request'
        }
    };
    request(options, function(err, res, body) {
        cb(err, body);
    });
}


getRepoContributors("jquery", "jquery", function (err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
});  