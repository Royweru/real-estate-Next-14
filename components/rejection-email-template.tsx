import * as React from 'react';

interface RejectionEmailTemplateProps {
  listingTitle: string;
  ownerName: string;
  reason?: string;
}

export const RejectionEmailTemplate: React.FC<Readonly<RejectionEmailTemplateProps>> = ({
  listingTitle,
  ownerName,
  reason,
}) => (
  <div style={{ fontFamily: 'sans-serif', padding: '24px', backgroundColor: '#f8f9fa' }}>
    <div style={{ maxWidth: '480px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>
          Listing Update
        </h2>
      </div>
      <p style={{ fontSize: '14px', color: '#555555', lineHeight: '1.6', marginBottom: '20px' }}>
        Hi {ownerName}, your listing <strong style={{ color: '#1a1a1a' }}>&ldquo;{listingTitle}&rdquo;</strong> was not approved at this time.
      </p>
      {reason && (
        <div style={{ backgroundColor: '#fef2f2', borderRadius: '8px', padding: '16px', marginBottom: '20px', borderLeft: '4px solid #f43f5e' }}>
          <p style={{ fontSize: '13px', color: '#991b1b', margin: 0 }}>
            <strong>Reason:</strong> {reason}
          </p>
        </div>
      )}
      <p style={{ fontSize: '14px', color: '#555555', lineHeight: '1.6', marginBottom: '20px' }}>
        You can edit your listing to address the issues above and resubmit it for review. We&apos;re here to help if you have any questions.
      </p>
      <p style={{ fontSize: '12px', color: '#999999', marginTop: '24px', lineHeight: '1.5' }}>
        Log in to your Apartimenti dashboard to manage your listings.
      </p>
    </div>
  </div>
);
