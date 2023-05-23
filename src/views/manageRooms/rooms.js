import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axiosInstance from "src/services/axiosInstance";
import { toast } from "react-hot-toast";
import DeleteModal from "src/components/Modal/deleteModal";
import SearchBar from "src/components/SearchBar/searchBar";
import Skeleton from "react-loading-skeleton";


const Rooms = () => {
  const [room, setRoom] = useState();
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const fetchData = () => {
    axiosInstance
      .get(`v1/rooms`)
      .then((res) => {
        setRoom(res?.data);
        setIsLoading(false);
      })
      .catch((err) => {
          toast.error(err.message);
          setIsLoading(false);
      });
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchData();
      setSearch('');
    }
    return () => {
        isMounted = false;
    };
  }, []);

  const handleDelete = () => {
    axiosInstance
      .patch(`v1/unpublish-room/${id}`,{ isPublished : false })
      .then((res) => {
        toast.success(res.data.message);
        fetchData();
        setVisible(false);
        setId('');
      })
      .catch((err) => {
          toast.error(err.message);
          setVisible(false);
          setId('');
      });
  }
  const handleSearch = () => {
    let updatedList = [];
    search === '' ?
      fetchData()
    :
    updatedList = room.filter((item) => {
      return item?.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
    setRoom(updatedList);
  }

  return (
    <>
      <h5 className="font-weight-bold">Room list</h5>
      <hr />
      <div className="py-3 d-flex justify-content-between">
      <SearchBar placeHolder="Search Room name" handleSearch={handleSearch} setSearch={setSearch}/>
        <button
          onClick={() => navigate("/manage-rooms/add-room")}
          type="button"
          className="btn btn-info text-white shadow"
        >
          + Add Room
        </button>
      </div>
      {
        isLoading ? <Skeleton count={10} height={35} gap={5}/> : 
        <table className="table-bordered table rounded-3 overflow-hidden bg-white shadow-sm table-striped">
        <thead>
          <tr className="">
            <th scope="col" className="w-5 text-center">S.No</th>
            <th scope="col" className="text-center">Room Type</th>
            <th scope="col" className="text-center">Name</th>
            <th scope="col" className="text-center">Floor No.</th>
            <th scope="col" className="text-center">Status</th>
            <th scope="col" className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
        {room &&
            room.length > 0 &&
            room.map(({_id, roomTypeName, name, floorNo, status}, i) => (
              <tr key={_id}>
                <th scope="row" className="text-center">
                  {i+1}
                </th>
                <td className="text-center">{roomTypeName}</td>
                <td className="text-center">{name}</td>
                <td className="text-center">{floorNo}</td>
                <td className="text-center">
                  <span className= {`badge ${status === 'active' && 'bg-success' || status === 'inactive' && 'bg-danger' || status === 'maintenance' && 'bg-warning' }`}>
                    {status}
                  </span>
                </td>
                <td>
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <span title='edit' onClick={()=> navigate(`/manage-rooms/edit-room/${_id}`)} className="btn btn-warning btn-sm">
                      <BiEdit fontSize={18} color="white" />
                    </span>
                    <span title='delete' onClick={()=>{ setId(_id); setVisible(true) }} className="btn btn-danger btn-sm">
                      <RiDeleteBin6Line fontSize={18} color="white" />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      }
      <DeleteModal visible={visible} setVisible={setVisible} handleDelete={handleDelete} />
    </>
  );
};

export default Rooms;
