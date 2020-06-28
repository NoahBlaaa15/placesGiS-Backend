module.exports.converter = (req) => {
  let newData = {device: req.query.device, users: req.query.users, hum: req.query.hum, temp: req.query.temp, light: parseInt(req.query.light) / 6, timestamp: Date.now()};
  return newData;
};

module.exports.same = (oO, nO) => {
  return oO.device === nO.device;
}

module.exports.averageTemp = (rooms) => {
  let temp = 0;
  let first = true;
  rooms.forEach((room) => {
    temp = parseInt(temp) + parseInt(room.temp);
    if(first){first = false}else{temp = parseInt(temp) / 2}
  });
  return temp;
}

module.exports.averageHum = (rooms) => {
  let hum = 0;
  let first = true;
  rooms.forEach((room) => {
    hum = parseInt(hum) + parseInt(room.hum);
    if(first){first = false}else{hum = parseInt(hum) / 2}
  });
  return hum;
}

module.exports.averageLight = (rooms) => {
  let light = 0;
  let first = true;
  rooms.forEach((room) => {
    light = parseInt(light) + parseInt(room.light);
    if(first){first = false}else{light = parseInt(light) / 2}
  });
  return light;
}

module.exports.roomNames = (rooms) => {
  let roms = [];
  rooms.forEach((room) => {
    if(!roms.includes(room.device)){
      roms.push(room.device);
    }
  });
  return roms;
}

module.exports.findRoom = (rooms, name) => {
  rooms.forEach((room) => {
      if(room.device === name){
        return room.device
      }
  });
  return "Unknown";
}

module.exports.allPeople = (rooms) => {
  let people = 0;
  rooms.forEach((room) => {
    people += parseInt(room.users);
  });
  return people;
}

module.exports.warmRoom = (rooms) => {
  let temp = 0;
  let first = true;
  let name = "";
  rooms.forEach((room) => {
    if(first){
      first = false;
      temp = room.temp;
      name = room.device;
    }else{
      if(temp < room.temp){
        temp = room.temp;
        name = room.device;
      }
    }
  })
  return name + ": " + temp;
}
module.exports.coldRoom = (rooms) => {
  let temp = 0;
  let first = true;
  let name = "";
  rooms.forEach((room) => {
    if(first){
      first = false;
      temp = room.temp;
      name = room.device;
    }else{
      if(temp > room.temp){
        temp = room.temp;
        name = room.device;
      }
    }
  })
  return name + ": " + temp;
}
module.exports.hH = (rooms) => {
  let hum = 0;
  let first = true;
  let name = "";
  rooms.forEach((room) => {
    if(first){
      first = false;
      hum = room.hum;
      name = room.device;
    }else{
      if(hum > room.hum){
        hum = room.hum;
        name = room.device;
      }
    }
  })
  return name + ": " + hum;
}
module.exports.lH = (rooms) => {
  let hum = 0;
  let first = true;
  let name = "";
  rooms.forEach((room) => {
    if(first){
      first = false;
      hum = room.hum;
      name = room.device;
    }else{
      if(hum < room.hum){
        hum = room.hum;
        name = room.device;
      }
    }
  })
  return name + ": " + hum;
}
