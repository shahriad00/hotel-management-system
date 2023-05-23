import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import brand_logo from 'src/assets/images/rutbah-hotel.jpg'
import COMPANY_NAME from 'src/assets/data/CompanyName'
import { useState } from 'react'
import CryptoJS from "crypto-js";
import { SECRET } from 'src/assets/data/Secret';
import { useEffect } from 'react';

const AppHeader = () => {

  const [decreptedData, setDecryptedData] = useState();

  const dispatch = useDispatch();

  const sidebarShow = useSelector((state) => state.sidebarShow);

  const _data = JSON.parse(localStorage.getItem("hms-user"));

  useEffect(()=> {
    if(_data){
      const bytes = CryptoJS.AES.decrypt(_data, SECRET);
      const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setDecryptedData(data);
  }
  },[_data]);
  
  return (
    <>
      <CHeader className="text-center my-5 d-none d-print-block fw-600 fs-3">
        {COMPANY_NAME}
      </CHeader>
      <CHeader position="sticky" className="mb-4 d-print-none">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={brand_logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
        </CHeaderNav>
        <CHeaderNav>
          <div className='d-flex flex-column'>
            <span className='text-end fw-bold'>{decreptedData?.name}</span>
            <span className='text-end text-secondary'>{decreptedData?.role}</span>
          </div>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
    </>
  )
}

export default AppHeader
