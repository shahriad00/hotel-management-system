import { CFooter } from '@coreui/react'
import React from 'react'

const AppFooter = () => {
  return (
    <CFooter className='mt-3'>
      <div className="mx-auto">
        <span>2023 Hotel Management System</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
