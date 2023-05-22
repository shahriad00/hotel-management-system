import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Manage Rooms
const Rooms = React.lazy(() => import('./views/manageRooms/rooms'))
const AddRoom = React.lazy(() => import('./views/manageRooms/addRoom'))
const UpdateRoom = React.lazy(() => import('./views/manageRooms/updateRoom'))
const RoomTypes = React.lazy(() => import('./views/manageRooms/roomTypes'))
const AddRoomTypes = React.lazy(() => import('./views/manageRooms/addRoomTypes'))
const UpdateRoomTypes = React.lazy(() => import('./views/manageRooms/updatedRoomType'))

// Check In
const OnlineBooking = React.lazy(() => import('./views/checkIn/onlineBooking'))
const AllOnlineBooking = React.lazy(() => import('./views/checkIn/allBooking'))
const AddCheckIn = React.lazy(() => import('./views/checkIn/addCheckIn'))
const AllCheckIns = React.lazy(() => import('./views/checkIn/allCheckIns'))
const ViewCheckIn = React.lazy(() => import('./views/checkIn/viewCheckIn.js'))
const ViewOnlineBooking = React.lazy(() => import('./views/checkIn/viewOnlineBooking'))

// Check out
const CheckOut = React.lazy(() => import('./views/checkOut/checkOut'))
const AllCheckOuts = React.lazy(() => import('./views/checkOut/allCheckOuts.js'))
const UpdateGuestInfo = React.lazy(() => import('./views/checkOut/updateGuestInfo'))

// Reference
const Reference = React.lazy(() => import('./views/reference/reference'))
const AddReference = React.lazy(() => import('./views/reference/addReference'))
const UpdateReference = React.lazy(() => import('./views/reference/updateReference'))

// Total Income
const TotalIncome = React.lazy(() => import('./views/totalIncome/totalIncome'))

// Total Expense
const TotalExpense = React.lazy(() => import('./views/totalExpense/allExpense'))

// Total Expense
const TotalReport = React.lazy(() => import('./views/totalReport/totalReport'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/manage-rooms/rooms', name: 'Room List', element: Rooms },
  { path: '/manage-rooms/add-room', name: 'Add Room', element: AddRoom },
  { path: '/manage-rooms/edit-room/:id', name: 'Edit Room', element: UpdateRoom },
  { path: '/manage-rooms/room-types', name: 'Room Types', element: RoomTypes },
  { path: '/manage-rooms/add-room-types', name: 'Add Room Types', element: AddRoomTypes },
  { path: '/manage-rooms/edit-room-types/:id', name: 'Edit Room Types', element: UpdateRoomTypes },
  { path: '/check-in/online-booking', name: 'Online Booking', element: OnlineBooking },
  { path: '/check-in/all-online-booking', name: 'All online bookings', element: AllOnlineBooking },
  { path: '/check-in/add-check-in', name: 'Add Check In', element: AddCheckIn },
  { path: '/check-in/all-check-ins', name: 'All Check In', element: AllCheckIns },
  { path: '/edit-guest/:id', name: 'Edit Guest', element: UpdateGuestInfo },
  { path: '/view-guest/:id', name: 'View Guest', element: ViewCheckIn },
  { path: '/check-in/view-online-booking/:id', name: 'View Online Booking', element: ViewOnlineBooking },
  { path: '/check-out/:id', name: 'Check Outs', element: CheckOut },
  { path: '/all-check-outs', name: 'All Check Outs', element: AllCheckOuts },
  { path: '/reference', name: 'Reference', element: Reference },
  { path: '/add-reference', name: 'Add Reference', element: AddReference },
  { path: '/edit-reference/:id', name: 'Edit Reference', element: UpdateReference },
  { path: '/total-income', name: 'Total Income', element: TotalIncome },
  { path: '/total-expense', name: 'Total Expense', element: TotalExpense },
  { path: '/total-report', name: 'Total Report', element: TotalReport },
]

export default routes
