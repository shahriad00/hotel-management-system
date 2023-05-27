import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axiosInstance from 'src/services/axiosInstance'
import { SECRET } from 'src/assets/data/Secret'
import CryptoJS from "crypto-js"
import LoadingButton from 'src/components/Button/loadingButton'
import COMPANY_NAME from 'src/assets/data/CompanyName'
import brand_logo from 'src/assets/images/rutbah-hotel.jpg'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const encryptData = (_data) => {
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(_data),SECRET
    ).toString();
    return data;
  };

  const handleLoginSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault()
    axiosInstance.post('v1/auth/login', {
      email,
      password,
    }).then(res => {
      console.log(res);
      toast.success('login successful!');
      const encrypt = encryptData(res?.data?.user)
      localStorage.setItem('token', JSON.stringify(res.data.token.accessToken));
      localStorage.setItem('hms-user', JSON.stringify(encrypt));
      setIsLoading(false);
      navigate('/dashboard');
      window.location.reload();
    })
    .catch((err) => {
      toast.error(err.response.data.message);
      setIsLoading(false);
    });
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center bg-secondary">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol sm={12} md={6} lg={4}>
            <CCardGroup className="mx-auto">
              <CCard className="p-3 py-4 w-100 shadow-lg">
                <CCardBody>
                  <CForm onSubmit={handleLoginSubmit}>
                    <div className='text-center' >
                      <img src={brand_logo} alt='' width={100}/>
                    </div>
                    <h2 className='text-center fw-bold fs-3 my-4'>{COMPANY_NAME}</h2>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput onChange={(e) => setEmail(e.target.value)} placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12}>
                        {
                          isLoading ? <LoadingButton className="px-4 w-100 text-white"/> :  
                          <CButton type='submit' color="info" className="px-4 w-100 text-white">
                            Login
                          </CButton>
                        }
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
