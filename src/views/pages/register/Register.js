import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Select from 'react-select';
import axiosInstance from 'src/services/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import CryptoJS from "crypto-js";
import { SECRET } from 'src/assets/data/Secret';

const RoleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Accountant', value: 'accountant' },
  { label: 'Receptionist', value: 'receptionist' },
];

const Register = () => {

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [role, setRole] = useState();

  const navigate = useNavigate();

  const encryptData = ( _data ) => {
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(_data),SECRET
    ).toString();
    return data;
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if(password === password2){
        axiosInstance.post('v1/auth/register', {
        name: userName,
        email,
        password,
        role: role.value
      }).then(res => {
        toast.success('registration successful!');
        const encrypt = encryptData(res?.data?.user)
        localStorage.setItem('token', JSON.stringify(res.data.token.accessToken));
        localStorage.setItem('hms-user', JSON.stringify(encrypt));
        navigate('/dashboard');
      })
      .catch((err) => {
          toast.error(err.message);
      });
    }else{
      toast.error('password and confirm password is not matching');
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleRegisterSubmit}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username" 
                      autoComplete="username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}  
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput 
                      placeholder="Email" 
                      autoComplete="email" 
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="d-flex flex-nowrap mb-3 w-100">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <Select 
                      className='w-100' 
                      options={RoleOptions} 
                      placeholder='Select Role...'
                      value={role}
                      onChange={(event) => setRole(event)}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type='submit' color="success">Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
