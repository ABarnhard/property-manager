property-manager
================

[![Build Status](https://travis-ci.org/ABarnhard/property-manager.svg)](https://travis-ci.org/ABarnhard/property-manager)
[![Coverage Status](https://coveralls.io/repos/ABarnhard/property-manager/badge.png)](https://coveralls.io/r/ABarnhard/property-manager)

### About
Property Manager is a Node.js application to be used at an apartment complex. It allows the owner to more easily manage the operations of the complex.

### Models
```
Room
name
length
width
#area
#cost
#isBedroom
```

```
Renter
name
age
gender
profession
_isEvicted
_cash
#work
#payRent
#party
```

```
Apartment
unit
renters
rooms
#area
#cost
#revenue
#isAvailable
#purge
#collectRent
#save
.collection [-]
.find
.findById
.deleteById
.area
.cost
.revenue
.tenents
```

### Features
- Object Oriented
- TDD
- Mocha
- MongoDB
* Using asynchronous functions to save and retrieve data from a MongoDB database.
* Recreate correct object prototype links using the lo-dash.io Node module.
* Integrate Travis-ci & coveralls badges for improved code quality assurance.
* Using Mocha's Before & BeforeEach functions to load and clear test datasets from the database.


### Running Tests
```bash
$ npm install
$ npm test
```

### Contributors
- [Adam Barnhard](https://github.com/abarnhard)

### License
[MIT](LICENSE)
