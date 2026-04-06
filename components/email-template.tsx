import * as React from 'react';

interface EmailTemplateProps {
  token: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ token }) => (
  <div style={{ fontFamily: 'sans-serif', padding: '24px', backgroundColor: '#f8f9fa' }}>
    <div style={{ maxWidth: '480px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a', marginBottom: '12px' }}>
        Verify your email
      </h2>
      <p style={{ fontSize: '14px', color: '#555555', lineHeight: '1.6', marginBottom: '24px' }}>
        Click the button below to verify your email address for your Apartimenti account.
      </p>
      <a
        href={token}
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
        Verify Email Address
      </a>
      <p style={{ fontSize: '12px', color: '#999999', marginTop: '24px', lineHeight: '1.5' }}>
        If you did not create an account, you can safely ignore this email.
      </p>
    </div>
  </div>
);
