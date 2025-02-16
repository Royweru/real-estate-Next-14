import { NewVerificationForm } from "@/features/auth/_components/new-verification-form";

const NewVerificationPage = ({
  searchParams,
}: {
  searchParams: {
   token: string;
  };
}) => {
   
  return (
    <NewVerificationForm verificationToken={searchParams.token} />
  );
};

export default NewVerificationPage;
