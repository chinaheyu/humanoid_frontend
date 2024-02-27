<script>
export default {
    name: "App",
    data () {
        return {
            robot_hostname: "orin-desktop.local:5000"
        }
    },
    mounted() {
        let currentHost = window.location.host
        if (currentHost.indexOf(':') === -1) {
            currentHost += ':5000'
        } else {
            currentHost = currentHost.replace(/:\d+$/, ':5000')
        }
        this.robot_hostname = currentHost
    }
}
</script>

<template>
    <el-container>
        <el-header class="page-header">
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
                <el-scrollbar class="menu-scrollbar">
                    <el-menu router="true">
                        <el-menu-item index="1">
                            <template #title>
                                <el-icon><House /></el-icon>
                                <span>Home</span>
                            </template>
                        </el-menu-item>
                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon><Plus /></el-icon>
                                <span>Head</span>
                            </template>
                            <el-menu-item index="2-1">Face Control</el-menu-item>
                            <el-menu-item index="2-2">Neck Control</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="3">
                            <template #title>
                                <el-icon><Plus /></el-icon>
                                <span>Upper Limbs</span>
                            </template>
                            <el-menu-item index="3-1">Left Arm Control</el-menu-item>
                            <el-menu-item index="3-2">Right Arm Control</el-menu-item>
                            <el-menu-item index="3-3">Play Arm</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="4">
                            <template #title>
                                <el-icon><Plus /></el-icon>
                                <span>Lower Limbs</span>
                            </template>
                            <el-menu-item index="4-1">Waist Control</el-menu-item>
                            <el-menu-item index="4-2">Left Leg Control</el-menu-item>
                            <el-menu-item index="4-3">Right Leg Control</el-menu-item>
                            <el-menu-item index="4-4">Feet Control</el-menu-item>
                        </el-sub-menu>
                        <el-menu-item index="5">
                            <template #title>
                                <el-icon><Pointer /></el-icon>
                                <span>Motor Test</span>
                            </template>
                        </el-menu-item>
                        <el-sub-menu index="6">
                            <template #title>
                                <el-icon><Plus /></el-icon>
                                <span>Leg Position</span>
                            </template>
                            <el-menu-item index="6-1">Left Leg Control</el-menu-item>
                            <el-menu-item index="6-2">Right Leg Control</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="7">
                            <template #title>
                                <el-icon><Plus /></el-icon>
                                <span>演示</span>
                            </template>
                            <el-menu-item index="7-1">所有动作</el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                </el-scrollbar>
            </el-aside>
            <el-main>
                <el-scrollbar class="main-scrollbar">
                    <router-view :robot_hostname="robot_hostname"></router-view>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>

.page-header {
    height: 60px;
    padding: 20px;
}

.main-scrollbar, .menu-scrollbar {
    height: calc(100vh - 100px);
}

.main-page-title {
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
