import { headers } from "@/common/constants/headers";
import { Support } from "@/modules/Support/Support";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SupportPage = () => {
    const session = cookies().get(headers.SESSION);

    if (session === undefined) {
        redirect("/");
        return <span />;
    }

    return <Support />;
};

export default SupportPage;
