import { headers } from "@/common/constants/headers";
import { Random } from "@/modules/Random/Random";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const RandomPage = () => {
    const session = cookies().get(headers.SESSION);

    if (session === undefined) {
        redirect("/");
        return <span />;
    }

    return <Random />;
};

export default RandomPage;
