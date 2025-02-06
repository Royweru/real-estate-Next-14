import { PropertyManagementHeader } from "@/features/listings/components/property-management-header"


const PropertyManagementDashboard = ({children,params}:{
    children:React.ReactNode
, params:{propertyId:string}
}) => {
  return (
    <div className=' relative w-full max-w-5xl min-h-screen p-12'>
        <PropertyManagementHeader 
          propertyId={params.propertyId}
        />
       {children}
    </div>
  )
}

export default PropertyManagementDashboard