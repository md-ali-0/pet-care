import ManageUsersTable from "@/components/dashboard/users/manage-user-table";

export default function ManageUsers() {
    return (
        <div className="container mx-auto py-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-5 py-1.5">
                <h2 className="text-xl font-semibold text-default-900 sm:text-2xl">
                    Manage Users
                </h2>
            </div>
            <ManageUsersTable/>
        </div>
    );
}
