import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'

import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

import Meta from 'vue-meta'

// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')


export function createApp() {
    const router = createRouter()
    const store = createStore()

    router.beforeEach((to, from, next) => {
        if (to.meta.metaInfo)
            store.commit("CAHNGE_META_INFO", to.meta.metaInfo)
        next()
    });

    sync(store, router)

    Vue.use(Meta)

    const app = new Vue({
        router,
        store,
        metaInfo() {
            return {
                title: this.$store.state.metaInfo.title,
                meta: [
                    {
                        name: "keywords",
                        content: this.$store.state.metaInfo.keywords
                    }, {
                        name: "description",
                        content: this.$store.state.metaInfo.description
                    }
                ]
            }
        },
    render: h => h(App)
})
return { app, router, store }
}