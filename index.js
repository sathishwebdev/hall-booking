import express from "express";

const app = express()
const PORT = process.env.PORT || 8080
app.use(express.json()) // make all request as json
// rooms data
const rooms = [
    {
        id:"100"+ 5000*6,
        numOfSeats : 100,
        name: "S.K party Hall",
        amemities: ["centeralized Ac hall", "Parking Space", "lawn", "guest Rooms", "dj"],
        price: 5000,
        threshold: 6,
        discount: 0,
        minPrice: 6 * 5000,
        bookedData: [
            {   
                roomName: "S.K party Hall",
                bookingId:"100300001",
                roomId:"10030000",
                clientName: "Sathish K",
                date:"6/1/2022",
                startTime: "10:00:00 am",
                endTime:"12:00:00 pm",
                totalTime: 14,
                amount: 70000
            },
            {
                roomName: "S.K party Hall",
                bookingId:"100300002",
                roomId:"10030000",
                clientName: "Sathish K",
                date:"7/1/2022",
                startTime: "12:00:00 am",
                endTime:"5:00:00 pm",
                totalTime: 17,
                amount: 85000
            }
        ] 
    },
    {
        id: "50"+3500*4,
        numOfSeats : 50,
        name: "S.K Meeting Hall",
        amemities: ["Air Condition", "unlimited free internet", "parking", "open Restaurants", "Secured"],
        price: 3500,
        threshold: 4,
        minPrice: 4 * 3500,
        discount: 0,
        bookedData: [
            {
                roomName: "S.K Meeting Hall",
                bookingId: "50105001",
                roomId:"5010500",
                clientName: "Sathish K",
                date:"5/1/2022",
                startTime: "10:00:00 am",
                endTime:"2:30:00 pm",
                totalTime: 4.5,
                amount: 15750
            }
        ] 
    },
    {
        id:"25"+2000*4,
        numOfSeats : 25,
        name: "S.K conference Hall",
        amemities: ["Air Condition", "free video conferencing", "parking", "Restaurant", "Complete privatized and secured"],
        price: 2000,
        threshold: 3,
        discount: 0,
        minPrice: 3 * 2000,
        bookedData: [
            {
                roomName: "S.K conference Hall",
                bookingId: "2580001",
                roomId:"258000",
                clientName: "Sathish K",
                date:"7/1/2022",
                startTime: "10:00:00 am",
                endTime:"2:00:00 pm",
                totalTime: 4,
                amount: 8000
            }
        ] 
    }
]
// all bookings 
const bookings = [
    {   
        roomName: "S.K party Hall",
        bookingId:"100300001",
        roomId:"10030000",
        clientName: "Sathish K",
        date:"6/1/2022",
        startTime: "10:00:00 am",
        endTime:"12:00:00 pm",
        totalTime: 14,
        amount: 70000
    },
    {
        roomName: "S.K party Hall",
        bookingId:"100300002",
        roomId:"10030000",
        clientName: "Sathish K",
        date:"7/1/2022",
        startTime: "12:00:00 am",
        endTime:"5:00:00 pm",
        totalTime: 17,
        amount: 85000
    },
    {
        roomName: "S.K conference Hall",
        bookingId: "2580001",
        roomId:"258000",
        clientName: "Sathish K",
        date:"7/1/2022",
        startTime: "10:00:00 am",
        endTime:"2:00:00 pm",
        totalTime: 4,
        amount: 8000
    },
    {
        roomName: "S.K Meeting Hall",
        bookingId: "50105001",
        roomId:"5010500",
        clientName: "Sathish K",
        date:"5/1/2022",
        startTime: "10:00:00 am",
        endTime:"2:30:00 pm",
        totalTime: 4.5,
        amount: 15750
    }
]

// customers

const customers = [
    {   
        name: "Sathish K",
        bookings:[
            {
                roomName: "S.K party Hall",
                bookingId:"100300001",
                roomId:"10030000",
                date:"6/1/2022",
                startTime: "10:00:00 am",
                endTime:"12:00:00 pm",
                totalTime: 14,
                amount: 70000
            },
            {
                roomName: "S.K party Hall",
                bookingId:"100300002",
                roomId:"10030000",
                date:"7/1/2022",
                startTime: "12:00:00 am",
                endTime:"5:00:00 pm",
                totalTime: 17,
                amount: 85000
            },
            {
                roomName: "S.K conference Hall",
                bookingId: "2580001",
                roomId:"258000",
                date:"7/1/2022",
                startTime: "10:00:00 am",
                endTime:"2:00:00 pm",
                totalTime: 4,
                amount: 8000
            },
            {
                roomName: "S.K Meeting Hall",
                bookingId: "50105001",
                roomId:"5010500",
                date:"5/1/2022",
                startTime: "10:00:00 am",
                endTime:"2:30:00 pm",
                totalTime: 4.5,
                amount: 15750
            }
        ]
    }
]

// all rooms

app.get('/rooms',(req,res)=>{
    res.send(rooms)
})

// booking a room
app.post('/room/:id',(req ,res)=>{
    let clientData =  req.body
    let id = req.params.id
    let room = rooms.filter(room=> room.id === `${id}` )
    let customer = customers.filter(user => user.name === clientData.clientName)
    let {bookedData, price, name} = room.length > 0 ? room[0] : {bookedData: null, price: 0, name:''}

   if(bookedData !== null){
    //   add data to rooms
    bookedData.push({...clientData, roomId: id, amount: price * clientData.totalTime, bookingId: `${id}${bookedData.length+1}`, roomName: name, bookedStatus: 'booked',
    isCheckedIn : false })

    //  add data to all bookings
    bookings.push({...clientData, roomId: id, amount: price * clientData.totalTime, bookingId: `${id}${bookedData.length+1}`, roomName: name, bookedStatus: 'booked',
    isCheckedIn : false })

     //add data to customers list

     customer.length > 0?
        customer[0].bookings.push(
                {
                    startTime: clientData.startTime,
                    endTime:clientData.endTime,
                    totalTime: 4,
                    date:clientData.date, 
                    roomId: id, amount: price * clientData.totalTime,
                    bookingId: `${id}${bookedData.length+1}`,
                    roomName: name,
                    bookedStatus: 'booked',
                    isCheckedIn : false 
                }
            )
        : 
        customers.push({
            name: clientData.clientName,
            bookings:[
                {
                    startTime: clientData.startTime,
                    endTime:clientData.endTime,
                    totalTime: 4,
                    date:clientData.date, 
                    roomId: id, amount: price * clientData.totalTime,
                    bookingId: `${id}${bookedData.length+1}`,
                    roomName: name,
                    bookedStatus: 'booked',
                    isCheckedIn : false 
                }
            ]
        })
    }

   




    res.send({ 
        lastBookingData :  {
            ...clientData,
             roomId: id,
             amount: price * clientData.totalTime,
             bookingId: `${id}${bookedData.length+1}`, 
             roomName: name,
             bookedStatus: 'booked', // status = 'booked' || 'waiting'
             isCheckedIn : false
            },  
            bookedData: bookedData,
        })
    // res.send({clientData, bookedData})
})

app.get('/bookings', (req,res)=>{
    res.send(bookings)
})

app.get('/customers', (req,res)=>{
    res.send(customers)
})

app.listen(PORT, ()=> console.log("Server Started at "+PORT))