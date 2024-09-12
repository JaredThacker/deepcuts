import { History } from "../History";
import { HistoryRecord } from "../HistoryRecord";

export type HistoryWithRecord = History & { historyrecord: HistoryRecord[] };
