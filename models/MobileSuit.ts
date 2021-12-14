import { applyMSName, applySeriesName } from "../util/applyValueObject";
import { MSDict } from "../dict/MSDict";
import { filterMSsFromSeries } from "../util/filterItem";
import { findMSsFromMSName } from "../util/findItem";
import { MSImagePath } from "../util/returnPath";

/*
 * 使用例
 */
const seriesName = applySeriesName("機動戦士ガンダム");
const MSName = applyMSName("シャア専用ザク");
const seriesMS = filterMSsFromSeries(MSDict, seriesName);
const MS = findMSsFromMSName(seriesMS, MSName);
if (MS !== undefined) {
  MSImagePath(MS);
}
