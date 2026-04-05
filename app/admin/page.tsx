import { redirect } from "next/navigation";

const AdminRedirectPage = () => {
    redirect("/management/approvals");
};

export default AdminRedirectPage;
