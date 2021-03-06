var express = require('express');
var router = express.Router();
var request = require('sync-request');

var articleModel = require('../models/articles')
var orderModel = require('../models/orders')
var userModel = require('../models/users')

/* GET home page. */
router.get('/', async function(req, res, next) {

  var emptyStocks = await articleModel.find({stock:0})

  var user = await userModel.findById('5c52e4efaa4beef85aad5e52');
  var messages = user.messages;
  
  var unreadMessages = 0;
  for(var i=0;i<messages.length;i++){
    if(messages[i].read == false){
      unreadMessages +=1
    }
  }

  var taches = user.tasks;
  var taskInprogress = 0

  for(var i=0;i<taches.length;i++){
    if(taches[i].dateCloture == null){
      taskInprogress +=1;
    }
  }

  res.render('index',{emptyStocks:emptyStocks.length,unreadMessages,taskInprogress});
});

/* GET tasks page. */
router.get('/tasks-page', async function(req, res, next) {

  var user = await userModel.findById('5c52e4efaa4beef85aad5e52');
  res.render('tasks', {taches: user.tasks});
});

/* GET Messages page. */
router.get('/messages-page', async function(req, res, next) {

  var user = await userModel.findById('5c52e4efaa4beef85aad5e52');

  res.render('messages', {messages: user.messages});
});

/* GET Users page. */
router.get('/users-page', async function(req, res, next) {

  var users = await userModel.find({status: "customer"});

  res.render('users', {users});
});

/* GET Catalog page. */
router.get('/catalog-page', async function(req, res, next) {

  var articles = await articleModel.find();

  res.render('catalog', {articles});
});

/* GET Orders-list page. */
router.get('/orders-list-page', async function(req, res, next) {

  var orders = await orderModel.find();
  
  res.render('orders-list', {orders});
});

/* GET Order detail page. */
router.get('/order-page', async function(req, res, next) {

  var order = await orderModel.findById(req.query.id)
                              .populate('articles')
                              .exec()

  res.render('order', {order});
});

/* GET chart page. */
router.get('/charts', async function(req, res, next) {
  var users = await userModel.find();
  var nbrFemmes = 0;
  var nbrHommes = 0;
  
  for(var i=0;i<users.length;i++){
    if(users[i].gender == "female"){
      nbrFemmes +=1;
    }
    if(users[i].gender == "male"){
      nbrHommes +=1;
    }
  }

  var users = await userModel.findById('5c52e4efaa4beef85aad5e52');
  var messages = users.messages;
  var unreadMessages = 0;
  var readMessages = 0;
  for(var i=0;i<messages.length;i++){
    if(messages[i].read == false){
      unreadMessages +=1
    }
    if(messages[i].read == true){
      readMessages +=1
    }
  }

  var orders = await orderModel.find({status_payment:"validated"});
  var nbrExp = 0;
var nbrNonExp = 0
for(var i=0;i<orders.length;i++){
  if(orders[i].status_shipment == true){
    nbrExp++
  } else {
    nbrNonExp++
  }
}

var aggr = orderModel.aggregate();
aggr.match({status_payment:"validated"});
aggr.group({ _id: {year: {$year:'$date_insert'}, month:{$month: '$date_insert'}}, CA:{$sum: '$total'}});
aggr.sort({ _id : 1 });
var totalCAByMonth = await aggr.exec();
console.log(totalCAByMonth);

  res.render('charts', {users, nbrHommes, nbrFemmes,unreadMessages,readMessages,nbrExp,nbrNonExp,totalCAByMonth});
});

module.exports = router;
