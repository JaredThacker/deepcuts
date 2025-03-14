import { AuthenticateStatus } from "@/modules/AuthenticateStatus/AuthenticateStatus";
import { PagePropertiesAsync } from "@/types/common/PagePropertiesAsync";

const AuthenticatePage = async ({ searchParams }: PagePropertiesAsync) => {
    const params = await searchParams;

    const { success } = params;

    const isSuccess = success === "true";

    return <AuthenticateStatus success={isSuccess} />;
};

export default AuthenticatePage;
