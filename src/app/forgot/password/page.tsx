import { ForgotPassword } from "@/modules/ForgotPassword/ForgotPassword";
import { PageProperties } from "@/types/common/PageProperties";
import { PagePropertiesAsync } from "@/types/common/PagePropertiesAsync";
import { NextPage } from "next";

type ForgotPasswordPageParameters = {
    readonly token: string;
    readonly email: string;
};

const Page = (properties: PageProperties<ForgotPasswordPageParameters>) => {
    const { email, token } = properties.searchParams;
    return <ForgotPassword email={email} token={token} />;
};

export default Page;
