import t from "../actionTypes";

const setCancerCount = (cellid, n) => ({
  type: t.setCancerCount,
  cell: cellid,
  count: n,
});

const setCancerInfoFormValue = (key, value) => ({
  type: t.setCancerInfoFormValue,
  key,
  value,
});

const mergeCancerCounts = (values) => ({
  type: t.mergeCancerCounts,
  values,
});

const mergeCancerInfoFormValues = (values) => ({
  type: t.mergeCancerInfoFormValues,
  values,
});

export default {
  setCancerCount,
  setCancerInfoFormValue,
  mergeCancerCounts,
  mergeCancerInfoFormValues,
};
