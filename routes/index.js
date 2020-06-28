var express = require('express');
var router = express.Router();
var data = require('./data');

let rooms = [ {device: 'Server', users: 1, hum: 20, temp: 20, light: 50, timestamp: Date.now()} ];

router.get('/', function(req, res, next) {
  if(req.query.device != null){
    let dataJSON = data.converter(req);
    rooms.push(dataJSON); //check if already device there LOL
    res.send("THX");
  }else{
    let roomString = "";
    data.roomNames(rooms).forEach((roomName) => {
      roomString = roomString + roomName + "; ";
    })
    let roomAll = "";
    rooms.forEach((room) => {
      roomAll += `Name: ${room.device}, Personen: ${room.users}, Temperatur: ${room.temp}, Feuchtigkeit: ${room.hum}, Licht: ${room.light}; `;
    })
    res.render('index', { title: 'placesGiS', rooms: roomString, roomsAll: roomAll, allPeople: data.allPeople(rooms), avgTemp: data.averageTemp(rooms), avgHum: data.averageHum(rooms), highHum: data.hH(rooms), lowHum: data.lH(rooms), highTemp: data.warmRoom(rooms), lowTemp: data.coldRoom(rooms), avgLight: data.averageLight(rooms), room: rooms[rooms.length-1]});
  }
});

module.exports = router;
