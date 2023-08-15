const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');

const { orders, products } = require('./database');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "DELETE"]
    }
});

const port = 3001;

app.use(cors());
let sessionCount = 0;

app.get('/api/orders', (req, res) => {
  res.send(orders);
});

app.get('/api/products', (req, res) => {
  res.send(products);
});

app.delete('/api/orders/:id', (req, res) => {
  const orderId = req.params.id;

  const index = orders.findIndex(order => order.id == orderId);

  if(index !== -1) {
    orders.splice(index, 1);
    res.status(200).send({ message: `Order with id ${orderId} deleted`});
  } else {
    res.status(404).send({ message: `Order with id ${orderId} not found`});
  }
});

app.delete('/api/:orders/products/:id', (req, res) => {
  const orderId = req.params.orders;
  const productId = req.params.id;

  const orderIndex = orders.findIndex(order => order.id == orderId);
  const productIndex = products.findIndex(product => product.id == productId);

  if(orderIndex !== -1 && productIndex !== -1) {
    orders[orderIndex].products.splice(productIndex, 1);
    res.status(200).send({ message: `Product ${productId} in order ${orderId} was deleted`});
  } else {
    res.status(404).send({ message: `Product ${productId} in order ${orderId} not found`});
  }
});

app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;

  const index = products.findIndex(product => product.id == productId);

  if(index !== -1) {
    products.splice(index, 1);
    res.status(200).send({ message: `Product with id ${productId} deleted`});
  } else {
    res.status(404).send({ message: `Product with id ${productId} not found`});
  }
});



io.on('connection', (socket) => {
    sessionCount++;
    io.emit('sessionCount', sessionCount);

    socket.on('disconnect', () => {
        sessionCount--;
        io.emit('sessionCount', sessionCount);
    });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});