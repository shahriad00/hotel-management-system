import React from "react";

const ViewCheckIn = () => {
  return (
    <>
      {/*---------- guest information header ----------------*/}
      <div className="border-top border-end border-start rounded-top my-Header">
        Guest Information
      </div>
      {/*---------- guest information table ----------------*/}
      <div className="bg-white rounded-bottom p-4 border">
        <div className="d-flex gap-4 justify-content-between align-items-center w-100">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Full name</th>
                <td>2</td>
                <th>Address</th>
                <td></td>
              </tr>
              <tr>
                <th>E-mail</th>
                <td>32323@qq.com</td>
                <th>Mobile No.</th>
                <td>132222211</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>Bangladesh</td>
                <th>Company</th>
                <td>SDL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/*---------- check in / check out information header ----------------*/}
      <div className="mt-3 border-top border-end border-start rounded-top my-Header">
        Check in / Check out information
      </div>
      {/*---------- check in / check out information table ----------------*/}
      <div className="bg-white rounded-bottom p-4 border">
        <div className="d-flex gap-4 justify-content-between align-items-center w-100">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Check In</th>
                <td>3-2-2024</td>
                <th>Check Out</th>
                <td>3-2-2024</td>
              </tr>
              <tr>
                <th>Check In form date</th>
                <td>132222211</td>
                <th>Duration of Stay</th>
                <td>2</td>
              </tr>
              <tr>
                <th>ID Card Type</th>
                <td>Passport</td>
                <th>Booked By</th>
                <td></td>
              </tr>
              <tr>
                <th>ID Card Number</th>
                <td>fsdf</td>
                <th>Referenced By</th>
                <td></td>
              </tr>
              <tr>
                <th>Payment Mode</th>
                <td></td>
                <th>Reason of visit/stay</th>
                <td>AP</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/*---------- information of other person header ----------------*/}
      <div className="mt-3 border-top border-end border-start rounded-top my-Header">
        Information of Other Person
      </div>
      {/*---------- information of other person table ----------------*/}
      <div className="bg-white rounded-bottom p-4 border">
        <div className="d-flex gap-4 justify-content-between align-items-center w-100">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">ID Type</th>
                <th scope="col">ID No.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>hello</td>
                <td>kdsf</td>
                <td>asldf</td>
                <td>kdjjek;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/*---------- ID card Uploads header ----------------*/}
      <div className="mt-3 border-top border-end border-start rounded-top my-Header">
        Uploaded Id Cards
      </div>
      {/*---------- ID card Uploads table ----------------*/}
      <div className="bg-white rounded-bottom p-4 border">
        <div className="d-flex gap-4 justify-content-between align-items-center w-100">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col" className="text-center">
                  Uploaded image
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>hello</td>
                <td>kdsf</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewCheckIn;
