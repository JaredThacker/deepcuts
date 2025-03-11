import { getSession } from "@/helpers/api/session/getSession";
import prisma from "@/lib/prismaClient";
import { Profile } from "@/modules/Profile/Profile";
import { UserInfo } from "@/types/api/UserInfo";

const ProfilePage = async () => {
    const session = getSession();

    const foundUser = await prisma.userinfo.findFirst({
        where: { id: session.data.id },
        select: {
            id: true,
            name: true,
            email: true,
            created_at: false,
            updated_at: false,
            api_token: true,
            oauth_token: false,
            oauth_token_secret: false,
            password: false,
            password_salt: false,
        },
    });

    return (
        <Profile
            userData={
                {
                    ...foundUser,
                    apiToken: foundUser?.api_token,
                } as Partial<UserInfo>
            }
        />
    );
};

export default ProfilePage;
