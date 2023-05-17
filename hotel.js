//java script simple hotel system
//GSG Advanced JS
//first poject 
class Room {
  floorNum;
  roomNum;
  price;
  #isBooked;
  constructor(floorNum, roomNum, price) {
    this.floorNum = floorNum;
    this.roomNum = roomNum;
    this.price = price;
    this.#isBooked = false;
  }
  printRoom() {
    console.log(`Room Details:
                        Floor Number: ${this.floorNum}
                        Room  Number: ${this.roomNum}
                        Price       : ${this.price}$`);
  }
  book() {
    this.#isBooked = true;
  }
  isBooked() {
    return this.#isBooked;
  }
}

// A Class for Room with View
class RoomWithView extends Room {
  view;
  numberOfBeds;
  constructor(floorNum, roomNum, price, view, numberOfBeds) {
    super(floorNum, roomNum, price);
    this.view = view;
    this.numberOfBeds = numberOfBeds;
  }
  
  printRoom() {
    console.log(`Room With View Destails:
                        Floor Number: ${this.floorNum}
                        Room  Number: ${this.roomNum}
                        Beds  Number: ${this.numberOfBeds}
                        Price       : ${this.price}$
                        View        ;/: ${this.view}`);
  }
}


class SleepingRoom extends Room {
  personCapacity;
  constructor(floorNum, roomNum, price, personCapacity) {
    super(floorNum, roomNum, price);
    this.personCapacity = personCapacity;
  }
 
  printRoom() {
    console.log(`Sleeping Room Description:
                          Floor  Number: ${this.floorNum}
                          Room   Number: ${this.roomNum}
                          People Number: ${this.personCapacity}
                          Price        : ${this.price}$`);
  }
}

// A Class for Hotel
class Hotel {
  #minFloor;
  #maxFloor;
  constructor(address, numberOfRooms, rooms) {
    this.address = address;
    this.numberOfRooms = numberOfRooms;
    // Class Composition
    this.rooms = rooms;
  }
  printAdvertisement() {
    console.log(`welcome to our hotel :
              Located in : ${this.address}
              More than  : ${this.numberOfRooms} rooms with different views that will satisfy your needs!`);
  }
  listBookedRooms() {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].isBooked()) this.rooms[i].printRoom();
    }
  }
}

// Create some rooms
const room1 = new Room(1, "101", 100);
const room2 = new RoomWithView(2, "201", 150, "View on the sea", 2);
const room3 = new SleepingRoom(3, "301", 200, 4);

// Book some rooms
room1.book();
room2.book();

// Create a hotel
const myHotel = new Hotel("123 Main St", 3, [room1, room2, room3]);

// Print hotel advertisement and list of booked rooms
myHotel.printAdvertisement();
myHotel.listBookedRooms();
