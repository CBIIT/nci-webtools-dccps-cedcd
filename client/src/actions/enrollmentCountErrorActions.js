import t from "../actionTypes";

const mostRecentDate = (toRemove, v) => ({
  type: t.enrollment_most_recent_date,
  remove: toRemove,
  value: v,
});

export default { mostRecentDate };
