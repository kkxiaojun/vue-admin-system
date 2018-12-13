<template>
    <div :class="{navCollapsed:isSidebarNavCollapse}">
        <sidebarNav  class="sidebar"/>
        <mainContent/>
    </div>
</template>

<script>
import sidebarNav from './components/side_nav'
import mainContent from './components/main_content/index'
import { mapState } from 'vuex'
export default {
    data() {
        return {}
    },
    computed: {
        ...mapState(['isSidebarNavCollapse'])
    },
    components: {
        sidebarNav,
        mainContent
    }
}
</script>

<style lang="less" scoped>

</style>
