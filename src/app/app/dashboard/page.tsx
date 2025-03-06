import { headers } from "@/common/constants/headers";
import { Home } from "@/modules/Home/Home";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Dashboard = () => {
    const session = cookies().get(headers.SESSION);

    if (session === undefined) {
        redirect("/");
        return <span />;
    }

    return <Home />;
};

export default Dashboard;
