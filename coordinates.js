// Generated by CoffeeScript 1.10.0
var CoordinateNumber, Coordinates, Validator;

Validator = require('./validator');

CoordinateNumber = require('./coordinate-number');

Coordinates = (function() {
  function Coordinates(coordinateString) {
    this.coordinates = coordinateString;
    this.latitudeNumbers = null;
    this.longitudeNumbers = null;
    this.validate();
    this.parse();
  }

  Coordinates.prototype.validate = function() {
    var validator;
    validator = new Validator;
    return validator.validate(this.coordinates);
  };

  Coordinates.prototype.parse = function() {
    this.groupCoordinateNumbers();
    this.latitude = this.extractLatitude();
    return this.longitude = this.extractLongitude();
  };

  Coordinates.prototype.groupCoordinateNumbers = function() {
    var coordinateNumbers, numberCountEachCoordinate;
    coordinateNumbers = this.extractCoordinateNumbers(this.coordinates);
    numberCountEachCoordinate = coordinateNumbers.length / 2;
    this.latitudeNumbers = coordinateNumbers.slice(0, numberCountEachCoordinate);
    return this.longitudeNumbers = coordinateNumbers.slice(0 - numberCountEachCoordinate);
  };

  Coordinates.prototype.extractCoordinateNumbers = function(coordinates) {
    return coordinates.match(/-?\d+(\.\d+)?/g);
  };

  Coordinates.prototype.extractLatitude = function() {
    var latitude;
    latitude = this.coordinateNumbersToDecimal(this.latitudeNumbers);
    if (this.latitudeIsNegative()) {
      latitude = latitude * -1;
    }
    return latitude;
  };

  Coordinates.prototype.extractLongitude = function() {
    var longitude;
    longitude = this.coordinateNumbersToDecimal(this.longitudeNumbers);
    if (this.longitudeIsNegative()) {
      longitude = longitude * -1;
    }
    return longitude;
  };

  Coordinates.prototype.coordinateNumbersToDecimal = function(coordinateNumbers) {
    var coordinate, decimalCoordinate;
    coordinate = new CoordinateNumber(coordinateNumbers);
    coordinate.detectSpecialFormats();
    decimalCoordinate = coordinate.toDecimal();
    return decimalCoordinate;
  };

  Coordinates.prototype.latitudeIsNegative = function() {
    var isNegative;
    isNegative = this.coordinates.match(/s/i);
    return isNegative;
  };

  Coordinates.prototype.longitudeIsNegative = function() {
    var isNegative;
    isNegative = this.coordinates.match(/w/i);
    return isNegative;
  };

  Coordinates.prototype.getLatitude = function() {
    return this.latitude;
  };

  Coordinates.prototype.getLongitude = function() {
    return this.longitude;
  };

  return Coordinates;

})();

module.exports = Coordinates;
