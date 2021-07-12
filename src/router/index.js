import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

Vue.use(Router)
Vue.use(Meta, {
    refreshOnceOnNavigation: true
})

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/', component: () => import('@/views/Home.vue'), meta: {
                    metaInfo: {
                        title: 'home',
                        keywords: "home玉树临风,风流倜傥,英俊潇洒,才高八斗,貌似番安",
                        description: 'home页面'
                    }
                }
            },
            {
                path: '/about', component: () => import('@/views/About.vue'), meta: {
                    metaInfo: {
                        title: 'about',
                        keywords: "about玉树临风,风流倜傥,英俊潇洒,才高八斗,貌似番安",
                        description: 'about页面'
                    }
                }
            }
        ]
    })
}