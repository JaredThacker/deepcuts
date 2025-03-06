import { getSession } from "@/helpers/api/session/getSession";
import { Random } from "@/modules/Random/Random";

const RandomPage = () => {
    const session = getSession();
    return <Random session={session} />;
};

export default RandomPage;
