const User = require('./User')
const Restaurant = require('./Restaurant')
const ActiveRestaurant = require('./ActiveRestaurant')
const Menu = require('./Menu')
const Addon = require('./Addon')
const Order = require('./Order')
const mongoose = require('mongoose')

exports.User = mongoose.model('User', User, 'users')
exports.Menu = mongoose.model('Menu', Menu, 'menus')
exports.Addon = mongoose.model('Addon', Addon, 'addons')
exports.Order = mongoose.model('Order', Order, 'orders')
exports.ActiveRestaurant = mongoose.model('ActiveRestaurant', ActiveRestaurant, 'activeRestaurants')
exports.Restaurant = mongoose.model('Restaurant', Restaurant, 'restaurants')