var express = require("express");
var app = express();
var path = require('path')
const friendData = require('../data/friends')
var bestMatch = {}

module.exports = function(app) {
app.get("/api/friends", function(req, res) {
    res.json(friendData);

});

    // 1. loop through the survey's scores
    // 2. loop through the database of friends 
    // 3. subtract each score in the database from the score from the survey index by index,
    //    push the new numbers into an array (it'll be ten numbers). add up the ten numbers
    // 4. push that number to a new array (eachDifferenceArr), this new array will have the same length as 
    //    the database, so each number in the array and each person in the database will have the same index
    //      --the lowest number in the array will be the best match
    // 5. loop through eachDifferenceArr, find the index of the minimum number (min), 
    //    that will be the index of the best match

app.post("/api/friends", function(req, res) {
    var newFriend = req.body
    var nfScores = newFriend.scores
    var nfScoreArray = []

    //1

    for(var i = 0; i < nfScores.length; i++) {
        nfScoreArray.push(parseInt(nfScores[i]))
    }

    var eachDiffenceArr = []
    var friendDataArr = []

    //2

    for(var j = 0; j < friendData.length; j++) {

        var totalDiff = 0
        var diffArr = [] 
        
        //3

        for(var i = 0; i < 10; i++) {      
            friendDataArr = friendData[j].scores 
            diffArr.push(Math.abs((nfScoreArray[i] - friendData[j].scores[i])))

        }

        totalDiff = diffArr.reduce((a, b) => a + b) 

        //4

        eachDiffenceArr.push(totalDiff)
        
        var min = eachDiffenceArr.reduce((a, b) => Math.min(a, b))
    }   

    //5
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
