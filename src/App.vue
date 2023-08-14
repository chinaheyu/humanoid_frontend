<script>
export default {
    name: "App",
    data () {
        return {
            robot_hostname: "orin-desktop.local:5000"
        }
    }
}
</script>

<template>
    <el-container class="main-page">
        <el-header>
            <el-row justify="center">
                <el-col class="main-page-title" :span="8" :offset="8">
                    <b>Humanoid Control Panel</b>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="robot_hostname" placeholder="hostname" />
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-scrollbar>
                    <el-menu router="true">
                        <el-sub-menu index="1">
                            <template #title>
                                <el-icon><Plus /></el-icon>
                                <span>Head</span>
                            </template>
                            <el-menu-item index="1-1">Face Control</el-menu-item>
                            <el-menu-item index="1-2">Neck Control</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon><Plus /></el-icon>
                                <span>Lower Body</span>
                            </template>
                            <el-menu-item index="2-1">Waist Control</el-menu-item>
                            <el-menu-item index="2-2">Left Leg Control</el-menu-item>
                            <el-menu-item index="2-3">Right Leg Control</el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                </el-scrollbar>
            </el-aside>
            <el-main>
                <router-view :robot_hostname="robot_hostname"></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>

.main-page {
    min-height: 100vh;
}

.main-page-title {
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
