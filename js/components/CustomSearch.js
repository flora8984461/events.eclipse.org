import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CustomSearch = ({ setTriggerSearchValue }) => {
  
  const [searchValue, setSearchValue] = useState("")

  const handleSearchOnChange = (e) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    if (searchValue.length > 2) {
      setTriggerSearchValue(searchValue)
    }
    if (searchValue.length === 0) {
      setTriggerSearchValue(searchValue)
    }
  })

  return (
    <div className="inner-addon left-addon">
      <i className="fa fa-search"></i>
      <input 
        type="text" 
        onChange={e => handleSearchOnChange(e)} 
        className="margin-bottom-10 margin-top-15 form-control" 
        placeholder="Search" 
      />
    </div>
  )
}

CustomSearch.propTypes = {
  setTriggerSearchValue: PropTypes.func.isRequired,
}


export default CustomSearch