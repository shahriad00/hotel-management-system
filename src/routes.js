import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Manage Rooms
const Rooms = React.lazy(() => import('./views/manageRooms/rooms'))
const AddRoom = React.lazy(() => import('./views/manageRooms/addRoom'))
const RoomTypes = React.lazy(() => import('./views/manageRooms/roomTypes'))
const AddRoomTypes = React.lazy(() => import('./views/manageRooms/addRoomTypes'))

// Check In
const OnlineCheckIn = React.lazy(() => import('./views/checkIn/onlineCheckIn'))
const AddCheckIn = React.lazy(() => import('./views/checkIn/addCheckIn'))
const AllCheckIns = React.lazy(() => import('./views/checkIn/allCheckIns'))
const CheckOuts = React.lazy(() => import('./views/checkIn/checkOuts'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/manage-rooms/rooms', name: 'Rooms', element: Rooms },
  { path: '/manage-rooms/add-room', name: 'Add Room', element: AddRoom },
  { path: '/manage-rooms/room-types', name: 'Room Types', element: RoomTypes },
  { path: '/manage-rooms/add-room-types', name: 'Add Room Types', element: AddRoomTypes },
  { path: '/check-in/online-booking', name: 'online booking', element: OnlineCheckIn },
  { path: '/check-in/add-check-in', name: 'Add Check In', element: AddCheckIn },
  { path: '/check-in/all-check-ins', name: 'All Check In', element: AllCheckIns },
  { path: '/check-in/check-outs', name: 'Check Outs', element: CheckOuts },
]

export default routes
