const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const port = 3001;

app.use(cors());

const orders = [
  {
    id: 11,
    title: 'Длинное предлинное при очень очень длинное название прихода',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    get products () { return products }
  },
  {
    id: 1,
    title: 'Order 1',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    get products () { return products }
  },
  {
    id: 2,
    title: 'Order 2',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    get products () { return products }
  },
  {
    id: 3,
    title: 'Order 3',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    get products () { return products },
  }
]

const products = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: 1,
    photo: 'pathToFile.jpg',
    title: 'Product 1',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33'
    },
    price: [
      {value: 100, symbol: 'USD', isDefault: 0},
      {value: 2600, symbol: 'UAH', isDefault: 1}
    ],
    order: 1,
    date: '2017-06-29 12:09:33'
  },
  {
    id: 2,
    serialNumber: 1234,
    isNew: 1,
    photo: 'pathToFile.jpg',
    title: 'Product 1',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33'
    },
    price: [
      {value: 100, symbol: 'USD', isDefault: 0},
      {value: 2600, symbol: 'UAH', isDefault: 1}
    ],
    order: 2,
    date: '2017-06-29 12:09:33'
  }
]

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

let sessionCount = 0;

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