import { AuthenticateStatus } from "@/modules/AuthenticateStatus/AuthenticateStatus";
import { PageProperties } from "@/types/common/PageProperties";

const AuthenticatePage = async ({ searchParams }: PageProperties) => {
    const params = await searchParams;

    const { success } = params;

    const isSuccess = success === "true";

    return <AuthenticateStatus success={isSuccess} />;
};

export default AuthenticatePage;
