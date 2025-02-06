import React from 'react'

const PropertyManagementListing = ({
    params}
    :{
    params:{propertyId:string}
}) => {
  return (
    <div>
       This is the listing Id : {params.propertyId} 
    </div>
  )
}

export default PropertyManagementListing