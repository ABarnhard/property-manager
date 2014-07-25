'use strict';

var cApt = global.mongodb.collection('apartments');

var Room = require('./room');
var Renter = require('./renter');
var _ = require('lodash');

function Apartment(unit){
  this.unit = unit;
  this.rooms = [];
  this.renters = [];

}

Apartment.prototype.area = function() {
  var combinedArea = 0;
  for (var i = 0; i< this.rooms.length; i++) {
    combinedArea += this.rooms[i].area();
  }
  return combinedArea;
};

Apartment.prototype.cost = function() {
  var cost = 0;
  for (var i = 0; i< this.rooms.length; i++) {
    cost += this.rooms[i].cost();
  }
  return cost;
};

Apartment.prototype.bedrooms = function() {
  var beds = 0;
  for (var i = 0; i< this.rooms.length; i++) {
    if(this.rooms[i].isBedroom){
      beds += 1;
    }
  }
  return beds;
};

Apartment.prototype.isAvailable = function(){
  return this.bedrooms() > this.renters.length;
};

Apartment.prototype.purgeEvicted = function(){
  var notEvicted = [];
  for(var i = 0; i < this.renters.length; i++){
    if(!this.renters[i].isEvicted){
      notEvicted.push(this.renters[i]);
    }
  }
  this.renters = notEvicted;
};

Apartment.prototype.collectRent = function(){
  if(!this.renters.length){return;}

  var rent = this.cost() / this.renters.length;
  for(var i = 0; i < this.renters.length; i++){
    this.renters[i].payRent(rent);
  }
};

Apartment.prototype.save = function(cb){
  cApt.save(this, function(err, object){
    cb();
  });
};

Apartment.find = function(query, cb){
  cApt.find(query).toArray(function(err, apts){
    for(var i = 0; i < apts.length; i++){
      apts[i] = reProto(apts[i]);
    }
    cb(apts);
  });
};

Apartment.findById = function(id, cb){
  //console.log(id);
  var query = {_id:id};
  cApt.findOne(query, function(err, apt){
    cb(reProto(apt));
  });
};

Apartment.deleteById = function(id, cb){
  //console.log(id);
  var query = {_id:id};
  cApt.remove(query, function(){
    cb();
  });
};

// HELPER FUNCTIONS //

function reProto(apt){
  var room, renter;
  for(var i = 0; i < apt.rooms.length; i++){
    room = _.create(Room.prototype, apt.rooms[i]);
    apt.rooms[i] = room;
  }
  for(var j = 0; j < apt.renters.length; j++){
    renter = _.create(Renter.prototype, apt.renters[j]);
    apt.renters[j] = renter;
  }
  apt = _.create(Apartment.prototype, apt);

  return apt;
}

module.exports = Apartment;
