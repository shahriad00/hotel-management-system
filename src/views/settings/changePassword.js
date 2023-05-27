import { CForm, CFormLabel } from "@coreui/react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SubmitButton from "src/components/Button/submitButton";
import axiosInstance from "src/services/axiosInstance";

const ChangePassword = () => {

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(newPassword === newPassword2){
        axiosInstance.post('v1/auth/reset-password', {
        email,
        newPassword,
        oldPassword
      }).then(res => {
        toast.success(res?.data?.message);
        setEmail('');
        setOldPassword('');
        setNewPassword('');
        setNewPassword2('');
        navigate('/dashboard');
      })
      .catch((err) => {
          toast.error(err?.response?.data?.message);
          console.log(err);
      });
    }else{
      toast.error('password and confirm password is not matching');
    }
  }
  return (
    <>
      <div className="border-top border-end border-start rounded-top my-Header">
        Change Password
      </div>
      <CForm onSubmit={handleSubmit}>
          <div className="bg-white rounded-bottom p-4 border">
          <div className="w-50 mb-4">
            <CFormLabel className="semi-bold" htmlFor="email">
              Email<span className="text-danger">*</span>:
            </CFormLabel>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-50 mb-4">
            <CFormLabel className="semi-bold" htmlFor="old-password">
              Old Password<span className="text-danger">*</span>:
            </CFormLabel>
            <input
              id="old-password"
              type="password"
              className="form-control"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="alert alert-info">&#9432; Your password must be at least 6 characters.</div>
          <div className="w-50 mb-4">
            <CFormLabel className="semi-bold" htmlFor="new-password">
              New Password<span className="text-danger">*</span>:
            </CFormLabel>
            <input
              id="new-password"
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-50 pb-3">
            <CFormLabel className="semi-bold" htmlFor="confirm-password">
              Confirm Password<span className="text-danger">*</span>:
            </CFormLabel>
            <input
              id="confirm-password"
              type="password"
              className="form-control"
              placeholder="Enter confirm password"
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
            />
          </div>
      </div>
        <SubmitButton/>
      </CForm>
    </>
  );
};

export default ChangePassword;
