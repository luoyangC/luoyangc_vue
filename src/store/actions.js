import * as types from './mutation-types'
// 提交mutation
function makeAction (type) {
  return ({ commit }, ...args) => commit(type, ...args)
}

export const setInfo = makeAction(types.SET_INFO)
export const setType = makeAction(types.SET_TYPE)
export const setOffs = makeAction(types.SET_OFFS)