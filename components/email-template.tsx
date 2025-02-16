import * as React from 'react';

interface EmailTemplateProps {
  token: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  token,
}) => (
  <div>
   <p className=' italic font-mono font-semibold text-neutral-900'>
        Follow this link to verfiy your email <br />
         {token}
   </p>
  </div>
);