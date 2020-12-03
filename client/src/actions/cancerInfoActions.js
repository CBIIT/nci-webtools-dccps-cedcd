import t from '../actionTypes'

const setCancerCount = (cellid, n) => ({
    type: t.setCancerCount,
    cell: cellid,
    count: n
});

const setCancerInfoFormValue = (key, value) => ({
    type: t.setCancerInfoFormValue,
    key, 
    value,
});

export default {
    setCancerCount,
    setCancerInfoFormValue,
}