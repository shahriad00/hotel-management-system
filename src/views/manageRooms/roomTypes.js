import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axiosInstance from "src/services/axiosInstance";
import { toast } from "react-hot-toast";
import DeleteModal from "src/components/Modal/deleteModal";
import SearchBar from "src/components/SearchBar/searchBar";

const RoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState();
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [id, setId] = useState();
  const navigate = useNavigate();

  const fetchData = () => {
    axiosInstance
      .get(`v1/room-type`)
      .then((res) => {setRoomTypes(res.data)})
      .catch((err) => {
          toast.error(err.message);
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
      .patch(`v1/unpublish-room-type/${id}`,{ isPublished : false })
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
    updatedList = roomTypes.filter((item) => {
      return item?.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    })
    setRoomTypes(updatedList);
  }

  return (
    <>
      <h5 className="font-weight-bold">Room Type list</h5>
      <hr />
      <div className="py-3 d-flex justify-content-between">
      <SearchBar placeHolder="Search Room-type title" handleSearch={handleSearch} setSearch={setSearch}/>
        <button
          onClick={() => navigate("/manage-rooms/add-room-types")}
          type="button"
          className="btn btn-info text-white shadow"
        >
          + Add Room Type
        </button>
      </div>

      <table className="table-bordered table table-striped rounded-3 overflow-hidden bg-white shadow-sm">
        <thead>
          <tr className="">
            <th scope="col" className="w-5 text-center">S.No</th>
            <th scope="col" className="text-center">Title</th>
            <th scope="col" className="text-center">Base price</th>
            <th scope="col" className="text-center">Discount price</th>
            <th scope="col" className="text-center">capacity</th>
            <th scope="col" className="text-center">Status</th>
            <th scope="col" className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {roomTypes &&
            roomTypes.length > 0 &&
            roomTypes.map(({_id, title,basePrice, discountPrice, capacity, status}, i) => (
              <tr key={_id}>
                <th scope="row" className="text-center">
                  {i+1}
                </th>
                <td className="text-center">{title}</td>
                <td className="text-center">{basePrice}</td>
                <td className="text-center">{discountPrice}</td>
                <td className="text-center">{capacity}</td>
                <td className="text-center">
                  <span className={`badge ${status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                    {status}
                  </span>
                </td>
                <td>
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <span onClick={()=> navigate(`/manage-rooms/edit-room-types/${_id}`)} title="edit" className="btn btn-warning btn-sm">
                      <BiEdit fontSize={18} color="white" />
                    </span>
                    <span onClick={()=>{setVisible(true); setId(_id)}} title="delete" className="btn btn-danger btn-sm">
                      <RiDeleteBin6Line fontSize={18} color="white" />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <DeleteModal visible={visible} setVisible={setVisible} handleDelete={handleDelete} />
    </>
  );
};

export default RoomTypes;
