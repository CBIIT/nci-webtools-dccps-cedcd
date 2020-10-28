import t from '../actionTypes'

const setCancerCount = (cellid, n) => ({
    type: t.setCancerCount,
    cell: cellid,
    count: n
})

export default {
    setCancerCount
}