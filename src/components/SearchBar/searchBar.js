/* eslint-disable react/prop-types */
import { cilMagnifyingGlass } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import React from 'react'

const SearchBar = ({
    placeHolder,
    handleSearch,
    setSearch,
}) => {
  return (
    <CInputGroup role='button' className="input-prepend w-25 shadow-sm">
        <CFormInput onChange={(e) => setSearch(e.target.value)} type="text" placeholder={placeHolder}/>
        <CInputGroupText className='d-flex align-items-center gap-2' onClick={handleSearch}>
            Search
            <CIcon icon={cilMagnifyingGlass} />
        </CInputGroupText>
    </CInputGroup>
  )
}

export default SearchBar