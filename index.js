import express from "express";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json()); // make all request as json
// rooms data
const rooms = [
  {
    id: "100" + 5000 * 6,
    numOfSeats: 100,
    name: "S.K party Hall",
    amemities: [
      "centeralized Ac hall",
      "Parking Space",
      "lawn",
      "guest Rooms",
      "dj",
    ],
    price: 5000,
    threshold: 6,
    discount: 0,
    minPrice: 6 * 5000,
    bookedData: [
      {
        roomName: "S.K party Hall",
        bookingId: "100300001",
        roomId: "10030000",
        clientName: "Sathish K",
        date: "25/12/2021",
        startTime: "10:00",
        endTime: "24:00",
        totalTime: 14,
        amount: 70000,
      },
      {
        roomName: "S.K party Hall",
        bookingId: "100300002",
        roomId: "10030000",
        clientName: "Sathish K",
        date: "7/1/2022",
        startTime: "00:00",
        endTime: "17:00",
        totalTime: 17,
        amount: 85000,
      },
    ],
  },
  {
    id: "50" + 3500 * 4,
    numOfSeats: 50,
    name: "S.K Meeting Hall",
    amemities: [
      "Air Condition",
      "unlimited free internet",
      "parking",
      "open Restaurants",
      "Secured",
    ],
    price: 3500,
    threshold: 4,
    minPrice: 4 * 3500,
    discount: 0,
    bookedData: [
      {
        roomName: "S.K Meeting Hall",
        bookingId: "50105001",
        roomId: "5010500",
        clientName: "Sathish K",
        date: "5/1/2022",
        startTime: "10:00",
        endTime: "14:30",
        totalTime: 4.5,
        amount: 15750,
      },
    ],
  },
  {
    id: "25" + 2000 * 4,
    numOfSeats: 25,
    name: "S.K conference Hall",
    amemities: [
      "Air Condition",
      "free video conferencing",
      "parking",
      "Restaurant",
      "Complete privatized and secured",
    ],
    price: 2000,
    threshold: 3,
    discount: 0,
    minPrice: 3 * 2000,
    bookedData: [
      {
        roomName: "S.K conference Hall",
        bookingId: "2580001",
        roomId: "258000",
        clientName: "Sathish K",
        date: "7/1/2022",
        startTime: "10:00",
        endTime: "14:00",
        totalTime: 4,
        amount: 8000,
      },
    ],
  },
];
// all bookings
const bookings = [
  {
    roomName: "S.K party Hall",
    bookingId: "100300001",
    roomId: "10030000",
    clientName: "Sathish K",
    date: "25/12/2021",
    startTime: "10:00",
    endTime: "00:00",
    totalTime: 14,
    amount: 70000,
  },
  {
    roomName: "S.K party Hall",
    bookingId: "100300002",
    roomId: "10030000",
    clientName: "Sathish K",
    date: "7/1/2022",
    startTime: "10:00",
    endTime: "17:00",
    totalTime: 17,
    amount: 85000,
  },
  {
    roomName: "S.K conference Hall",
    bookingId: "2580001",
    roomId: "258000",
    clientName: "Sathish K",
    date: "7/1/2022",
    startTime: "10:00",
    endTime: "14:00",
    totalTime: 4,
    amount: 8000,
  },
  {
    roomName: "S.K Meeting Hall",
    bookingId: "50105001",
    roomId: "5010500",
    clientName: "Sathish K",
    date: "5/1/2022",
    startTime: "10:00",
    endTime: "14:30",
    totalTime: 4.5,
    amount: 15750,
  },
];

// customers

const customers = [
  {
    name: "Sathish K",
    bookings: [
      {
        roomName: "S.K party Hall",
        bookingId: "100300001",
        roomId: "10030000",
        date: "25/12/2021",
        startTime: "10:00",
        endTime: "24:00",
        totalTime: 14,
        amount: 70000,
      },
      {
        roomName: "S.K party Hall",
        bookingId: "100300002",
        roomId: "10030000",
        date: "7/1/2022",
        startTime: "00:00",
        endTime: "17:00",
        totalTime: 17,
        amount: 85000,
      },
      {
        roomName: "S.K conference Hall",
        bookingId: "2580001",
        roomId: "258000",
        date: "7/1/2022",
        startTime: "10:00",
        endTime: "14:00",
        totalTime: 4,
        amount: 8000,
      },
      {
        roomName: "S.K Meeting Hall",
        bookingId: "50105001",
        roomId: "5010500",
        date: "5/1/2022",
        startTime: "10:00",
        endTime: "14:30",
        totalTime: 4.5,
        amount: 15750,
      },
    ],
  },
];

// all rooms

app.get("/rooms", (req, res) => {
  res.send(rooms);
});

// booking a room
app.post("/room/:id", (req, res) => {
  let clientData = req.body;
  let id = req.params.id;
  let customer = customers.filter(
    (user) => user.name === clientData.clientName
  ); // get customer data || check user availablity
  let room = rooms.filter((room) => room.id === `${id}`); // get room data
  if (room.length > 0) {
    let { bookedData, price, name, } = room[0];

    // calculate time
    let {startTime, endTime, date} = clientData

    let start  = startTime.split(':'),startMin = start[1] === '00'? 0 : +start[1]/60
   
    let end = endTime.split(':'),endMin = end[1] === '00'? 0 : +end[1]/60
  
    let rangeHr =  +end[0] - +start[0], rangeMin = Math.abs(+endMin - +startMin), timeRange = rangeMin === 0 ? rangeHr : rangeHr + rangeMin

    let availablity = true;

    // check availabilty
    
    bookings.forEach((book)=>{
      if(date === book.date && +start[0] >= +book.startTime.split(':')[0]  && start[0] <= +book.endTime.split(':')[0]  ){
        availablity = false
      }
    })

    if (availablity) {
      //   add data to rooms
      bookedData.push({
        ...clientData,
        totalTime:timeRange,
        roomId: id,
        amount: price * timeRange,
        bookingId: `${id}${bookedData.length + 1}`,
        roomName: name,
        bookedStatus: true,
        isCheckedIn: false,
      });

      //  add data to all bookings
      bookings.push({
        ...clientData,
        totalTime:timeRange,
        roomId: id,
        amount: price * timeRange,
        bookingId: `${id}${bookedData.length + 1}`,
        roomName: name,
        bookedStatus: true,
        isCheckedIn: false,
      });

      //add data to customers list
      //add data to existing customer's data. if we got new customer, make a new cumster detail

      customer.length > 0
        ? customer[0].bookings.push({
            startTime: clientData.startTime,
            endTime: clientData.endTime,
            totalTime:timeRange,
            date: clientData.date,
            roomId: id,
            amount: price * timeRange,
            bookingId: `${id}${bookedData.length + 1}`,
            roomName: name,
            bookedStatus: true,
            isCheckedIn: false,
          })
        : customers.push({
            name: clientData.clientName,
            bookings: [
              {
                startTime: clientData.startTime,
                endTime: clientData.endTime,
                totalTime:timeRange,
                date: clientData.date,
                roomId: id,
                amount: price * timeRange,
                bookingId: `${id}${bookedData.length + 1}`,
                roomName: name,
                bookedStatus: true,
                isCheckedIn: false,
              },
            ],
          });

      res.send({
        lastBookingData: {
          ...clientData,
          totalTime:timeRange,
          roomId: id,
          amount: price * timeRange,
          bookingId: `${id}${bookedData.length + 1}`,
          roomName: name,
          bookedStatus: true, // status = 'booked' = true || 'canceled' = false
          isCheckedIn: false,
        },
        bookedData: bookedData,
      });
    } else {
      res.send({
        bookingStatus: false,
        message: "no availability",
      });
    }
  } else {
    res.send(401, { error: "invalid link" });
  }
});

app.get("/bookings", (req, res) => {
  res.send(bookings);
});

app.get("/customers", (req, res) => {
  res.send(customers);
});

app.get('/bookoftheday', (req, res)=>{
  let date = req.query.date
  date = !date ? new Date().toLocaleDateString() : date
  console.log(date)
  res.send(bookings.filter(bookings => bookings.date === date)) // bookings on client booking date)
})

app.get('/', (req,res)=>{
  fs.readFile('index.html', 'utf-8', (err,data)=>{
    err? res.send(err) : res.send(data)
  })
})

app.listen(PORT, () => console.log("Server Started at " + PORT));
