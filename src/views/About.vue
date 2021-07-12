<template>
    <div class="about">
        <ul>
            <li v-for="item in items" :key="item.id">
                <p>
                    <label>{{ item.plan_name }}：</label>{{ item.username }}
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
// 在这里导入模块，而不是在 `store/index.js` 中
import fooStoreModule from "../store/modules/foo";

export default {
    asyncData({ store }) {
        store.registerModule("foo", fooStoreModule);
        // 触发 action 后，会返回 Promise
        return store.dispatch("foo/fetchItem");
    },
    destroyed() {
        this.$store.unregisterModule("foo");
    },
    name: "About",
    data() {
        return {};
    },
    // beforeRouteEnter(to, from, next) {
    //     console.log(to, from)
    //     next(vm => {
    //         console.log(vm)
    //     })
        
    // },
    computed: {
        // 从 store 的 state 对象中的获取 item。

        items() {
            return this.$store.state.foo.items;
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.about ul li {
    list-style: none;
    font-size: 14px;
}
.about ul li label {
    font-weight: bold;
    font-size: 16px;
}
</style>
