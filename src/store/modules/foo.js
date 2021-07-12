import Vue from 'vue'

import { fetchItem } from '@/api'

export default {
    namespaced: true,
    state: {
        items: []
    },
    mutations: {
        setItem(state, { items }) {
            Vue.set(state, 'items', items)
        }
    },
    actions: {
        fetchItem({ commit }) {
            // `store.dispatch()` 会返回 Promise，
            // 以便我们能够知道数据在何时更新
            return fetchItem().then(({ data: { data } }) => {
                commit('setItem', { items: data.data })
            })
        }
    },
}