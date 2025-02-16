import { fetchInquiries } from '@/actions/fetchInquiries'
import { InquiriesHeader } from '@/features/inquiries/components/inquiries-header'
import { InquiriesDisplay } from '@/features/inquiries/components/inquries-display'
import React from 'react'

const InquiriesPage =async () => {
  const inquiries = await fetchInquiries()
  return (
    <div className=' w-full min-h-screen p-8 md:p-14 lg:p-16'>
      <InquiriesHeader
        total={inquiries.length}
      />
        <InquiriesDisplay 
           inquiries={inquiries}
        />
    </div>
  )
}

export default InquiriesPage