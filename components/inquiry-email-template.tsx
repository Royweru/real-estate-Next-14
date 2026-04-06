import * as React from 'react';

interface InquiryEmailTemplateProps {
  listingTitle: string;
  inquiryName: string;
  inquiryEmail: string;
  inquiryPhone?: string;
  inquiryMessage?: string;
}

export const InquiryEmailTemplate: React.FC<Readonly<InquiryEmailTemplateProps>> = ({
  listingTitle,
  inquiryName,
  inquiryEmail,
  inquiryPhone,
  inquiryMessage,
}) => (
  <div style={{ fontFamily: 'sans-serif', padding: '24px', backgroundColor: '#f8f9fa' }}>
    <div style={{ maxWidth: '480px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px' }}>
        New inquiry on your listing
      </h2>
      <p style={{ fontSize: '14px', color: '#555555', marginBottom: '20px' }}>
        Someone is interested in <strong style={{ color: '#1a1a1a' }}>{listingTitle}</strong>.
      </p>

      <div style={{ backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
          <strong>Name:</strong> {inquiryName}
        </p>
        <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
          <strong>Email:</strong>{' '}
          <a href={`mailto:${inquiryEmail}`} style={{ color: '#7c3aed' }}>
            {inquiryEmail}
          </a>
        </p>
        {inquiryPhone && (
          <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            <strong>Phone:</strong> {inquiryPhone}
          </p>
        )}
        {inquiryMessage && (
          <p style={{ margin: '0 0 0 0', fontSize: '14px' }}>
            <strong>Message:</strong> {inquiryMessage}
          </p>
        )}
      </div>

      <p style={{ fontSize: '12px', color: '#999999', lineHeight: '1.5' }}>
        Log in to your Apartimenti dashboard to manage this inquiry.
      </p>
    </div>
  </div>
);
