import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import EmptyList from "src/components/EmptyList/emptyList";
import DeleteModal from "src/components/Modal/deleteModal";
import SearchBar from "src/components/SearchBar/searchBar";
import axiosInstance from "src/services/axiosInstance";

const Reference = () => {
  const [reference, setReference] = useState([]);
  const [id, setId] = useState('');
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = () => {
    axiosInstance
      .get(`v1/reference`)
      .then((res) => {setReference(res?.data)})
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
      .patch(`v1/reference/unpublish-reference/${id}`,{ isPublished : false })
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
    updatedList = reference?.filter((item) => {
      return item?.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    })
    setReference(updatedList);
  }

  return (
    <>
      <h5 className="font-weight-bold">Reference list</h5>
      <hr />
      <div className="py-3 d-flex justify-content-between">
        <SearchBar placeHolder="Search Reference name" handleSearch={handleSearch} setSearch={setSearch}/>
        <button
          onClick={() => navigate("/add-reference")}
          type="button"
          className="btn btn-info text-white shadow"
        >
          + Add Reference
        </button>
      </div>
    {
      reference.length > 0 ? 
      <table className="table rounded-3 overflow-hidden shadow-sm table-bordered bg-white table-striped">
        <thead>
          <tr className="">
            <th scope="col" className="w-5 text-center">S.No</th>
            <th scope="col" className="text-center">Name</th>
            <th scope="col" className="text-center">Mobile</th>
            <th scope="col" className="text-center">Address</th>
            <th scope="col" className="text-center">Status</th>
            <th scope="col" className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {reference &&
            reference.length > 0 &&
            reference?.map(({_id, name, mobile, address, status}, i) => (
              <tr key={_id}>
                <th scope="row" className="text-center">
                  {i+1}
                </th>
                <td className="text-center">{name}</td>
                <td className="text-center">{mobile}</td>
                <td className="text-center">{address}</td>
                <td className="text-center">
                  <span className={`badge ${status ? 'bg-success' : 'bg-danger'}`}>
                    {status ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <span title="Edit" onClick={()=>navigate(`/edit-reference/${_id}`)} className="btn btn-warning btn-sm">
                      <BiEdit fontSize={18} color="white" />
                    </span>
                    <span title="Delete" onClick={()=>{setVisible(true);setId(_id)}} className="btn btn-danger btn-sm">
                      <RiDeleteBin6Line fontSize={18} color="white" />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table> : <EmptyList/>
    }
      
      <DeleteModal visible={visible} setVisible={setVisible} handleDelete={handleDelete} />
    </>
  );
};

export default Reference;