import {parseAsString, useQueryStates} from 'nuqs'

export const useFiltersPropertiesAdmin = ()=>{
    return (
        useQueryStates({
            typeId:parseAsString,
            statusId:parseAsString,
            locationId:parseAsString,
            categoryId:parseAsString
        },
    )
    )
}