import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Manage Rooms
const Rooms = React.lazy(() => import('./views/manageRooms/rooms'))
const AddRoom = React.lazy(() => import('./views/manageRooms/addRoom'))
const RoomTypes = React.lazy(() => import('./views/manageRooms/roomTypes'))
const AddRoomTypes = React.lazy(() => import('./views/manageRooms/addRoomTypes'))

// Check In
const OnlineBooking = React.lazy(() => import('./views/checkIn/onlineBooking'))
const AllOnlineBooking = React.lazy(() => import('./views/checkIn/allBooking'))
const AddCheckIn = React.lazy(() => import('./views/checkIn/addCheckIn'))
const AllCheckIns = React.lazy(() => import('./views/checkIn/allCheckIns'))
const ViewCheckIn = React.lazy(() => import('./views/checkIn/viewCheckIn.js'))
const ViewOnlineBooking = React.lazy(() => import('./views/checkIn/viewOnlineBooking'))

// Check out
const CheckOut = React.lazy(() => import('./views/checkOut/checkOut'))
const updateGuestInfo = React.lazy(() => import('./views/checkOut/updateGuestInfo'))

// Reference
const Reference = React.lazy(() => import('./views/reference/reference'))
const AddReference = React.lazy(() => import('./views/reference/addReference'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/manage-rooms/rooms', name: 'Rooms', element: Rooms },
  { path: '/manage-rooms/add-room', name: 'Add Room', element: AddRoom },
  { path: '/manage-rooms/room-types', name: 'Room Types', element: RoomTypes },
  { path: '/manage-rooms/add-room-types', name: 'Add Room Types', element: AddRoomTypes },
  { path: '/check-in/online-booking', name: 'online booking', element: OnlineBooking },
  { path: '/check-in/all-online-booking', name: 'all online booking', element: AllOnlineBooking },
  { path: '/check-in/add-check-in', name: 'Add Check In', element: AddCheckIn },
  { path: '/check-in/all-check-ins', name: 'All Check In', element: AllCheckIns },
  { path: '/edit-guest/:id', name: 'Edit Guest', element: updateGuestInfo },
  { path: '/check-in/view-check-in/:id', name: 'View Check In', element: ViewCheckIn },
  { path: '/check-in/view-online-booking/:id', name: 'View Online Booking', element: ViewOnlineBooking },
  { path: '/check-out/:id', name: 'Check Outs', element: CheckOut },
  { path: '/reference', name: 'Reference', element: Reference },
  { path: '/add-reference', name: 'Add Reference', element: AddReference },
]

export default routes
