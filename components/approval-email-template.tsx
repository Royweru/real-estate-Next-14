import * as React from 'react';

interface ApprovalEmailTemplateProps {
  listingTitle: string;
  listingUrl: string;
  ownerName: string;
}

export const ApprovalEmailTemplate: React.FC<Readonly<ApprovalEmailTemplateProps>> = ({
  listingTitle,
  listingUrl,
  ownerName,
}) => (
  <div style={{ fontFamily: 'sans-serif', padding: '24px', backgroundColor: '#f8f9fa' }}>
    <div style={{ maxWidth: '480px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>
          Listing Approved!
        </h2>
      </div>
      <p style={{ fontSize: '14px', color: '#555555', lineHeight: '1.6', marginBottom: '20px' }}>
        Hi {ownerName}, great news! Your listing <strong style={{ color: '#1a1a1a' }}>&ldquo;{listingTitle}&rdquo;</strong> has been approved and is now live on Apartimenti.
      </p>
      <a
        href={listingUrl}
        style={{
          display: 'inline-block',
          backgroundColor: '#7c3aed',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '600',
        }}
      >
        View Your Listing
      </a>
      <p style={{ fontSize: '12px', color: '#999999', marginTop: '24px', lineHeight: '1.5' }}>
        Your property is now visible to thousands of potential buyers and renters.
      </p>
    </div>
  </div>
);
