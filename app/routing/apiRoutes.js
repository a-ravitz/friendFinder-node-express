var express = require("express");
var app = express();
var path = require('path')
const friendData = require('../data/friends')
var bestMatch = {}


module.exports = function(app) {
app.get("/api/friends", function(req, res) {
    res.json(friendData);

});

    // loop through the survey's scores
    // loop through friendData.scores
    // subtract each indexed score from the database from the survey score, and add up the 10 numbers
    // push that number to a new array
    // the index of the lowest number in the new array is the index in friendData of the best match


app.post("/api/friends", function(req, res) {
    var newFriend = req.body
    var nfScores = newFriend.scores
    var nfScoreArray = []

    for(var i = 0; i < nfScores.length; i++) {
        nfScoreArray.push(parseInt(nfScores[i]))
    }

    var eachDiffenceArr = []
    var friendDataArr = []

    for(var j = 0; j < friendData.length; j++) {

        var totalDiff = 0
        var diffArr = [] 
        
        for(var i = 0; i < 10; i++) {      
            friendDataArr = friendData[j].scores 
            diffArr.push(Math.abs((nfScoreArray[i] - friendData[j].scores[i])))

        }

        totalDiff = diffArr.reduce((a, b) => a + b) 
        eachDiffenceArr.push(totalDiff)
        
        var min = eachDiffenceArr.reduce((a, b) => Math.min(a, b))
    }   


    for(var index = 0; index < eachDiffenceArr.length; index++){
            if(eachDiffenceArr[index] === min) {
                    bestMatch = friendData[index]
        }
    }

    console.log(bestMatch)
    res.json(bestMatch)
    friendData.push(newFriend)
});
};
