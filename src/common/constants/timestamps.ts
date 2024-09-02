import { Timestamps } from "@/types/common/Timestamps";
import dayjs from "dayjs";

export const creationTimestamps = () => ({
    created_at: dayjs(Date.now()).toISOString(),
    updated_at: dayjs(Date.now()).toISOString(),
});

export const updatedTimestamps = (): Pick<Timestamps, "updated_at"> => ({
    updated_at: dayjs(Date.now()).toISOString(),
});
