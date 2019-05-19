var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function () {
    console.log("port is runninng")

});

// Aystex kapum enq classnery

var Grass = require("./module/Grass.js");
var GrassEater = require("./module/GrassEater.js");
var Gishatich = require("./module/Gishatich.js");
var Napastak = require("./module/Napastak.js");
var Vorsord = require("./module/Vorsord.js");

// haytararum enq zangvacner

GrassArr = [];
GrassEaterArr = [];
GishatichArr = [];
NapastakArr = [];
VorsordArr = [];

// Matrix enq haytararum

var w = 50;
var h = 60;

function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.floor(Math.random() * 200);
            if (r < 20) r = 0;
            else if (r < 30) r = 1;
            else if (r < 55) r = 2;
            else if (r < 75) r = 3;
            else if (r < 85) r = 4;
            else if (r < 100) r = 5;
            matrix[y][x] = r;
        }
    }
    return matrix;
}

//stexcum en zangvacic patahakan andam tvoc function
Random = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
//kanchum en genMatrix functiony ev talis en matrix popoxakanin
matrix = genMatrix(w, h);

//stex pptvum en matrix-i mejov u stexcum en objectnery
for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] == 1) {
            GrassArr.push(new Grass(x, y, 1));
        }
        else if (matrix[y][x] == 2) {
            GrassEaterArr.push(new GrassEater(x, y, 2));
        }
        else if (matrix[y][x] == 3) {
            GishatichArr.push(new Gishatich(x, y, 3));
        }
        else if (matrix[y][x] == 3) {
            VorsordArr.push(new Vorsord(x, y, 4));
        }
        else if (matrix[y][x] == 3) {
            NapastakArr.push(new Napastak(x, y, 5));
        }
    }
}

//stexcum en function vor kkanchi objecteri methodnery ev kuxark matrixi masin datan script.js

function drawserever() {

    for (var i in GrassArr) {
        GrassArr[i].mul();
    }
    for (var i in GrassEaterArr) {
        GrassEaterArr[i].move();
        GrassEaterArr[i].mul();
        GrassEaterArr[i].eat();
        GrassEaterArr[i].die();
    }
    for (var i in VorsordArr) {
        VorsordArr[i].move();
        VorsordArr[i].mul();
        VorsordArr[i].eat();
        VorsordArr[i].die();
    }
    for (var i in NapastakArr) {
        NapastakArr[i].move();
        NapastakArr[i].mul();
        NapastakArr[i].eat();
        NapastakArr[i].die();
    }
    for (var i in GishatichArr) {
        GishatichArr[i].move();
        GishatichArr[i].mul();
        GishatichArr[i].eat();
        GishatichArr[i].die();
    }
//matrixy uxarkum en clientin
    io.sockets.emit("matrix", matrix);
}
setInterval(drawserever, 2000);
// Random = function (arr) {
//     return arr[Math.floor(Math.random() * arr.length)]
// }