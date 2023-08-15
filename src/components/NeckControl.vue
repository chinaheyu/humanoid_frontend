<template>
    <div class="slider-block">
        <span class="demonstration">pitch_velocity</span>
        <el-slider v-model="pitch_velocity_value" show-input :min="-1" :max="1" :step="0.01" :disabled="!initialized"/>
    </div>
    <div class="slider-block">
        <span class="demonstration">yaw_angle</span>
        <el-slider v-model="yaw_angle_value" show-input :min="-3.14" :max="3.14" :step="0.01" :disabled="!initialized"/>
    </div>
    <div class="slider-block">
        <span class="demonstration">yaw_max_velocity</span>
        <el-slider v-model="yaw_max_velocity_value" show-input :min="0" :max="10" :step="0.01" :disabled="!initialized"/>
    </div>
    <el-button @click="resetSlider" class="reset-button" type="primary" size="large" circle :disabled="!initialized"><el-icon><RefreshLeft /></el-icon></el-button>
</template>

<script>
export default {
    name: "NeckControl",
    data() {
        return {
            pitch_velocity_value: 0.0,
            yaw_angle_value: 0.0,
            yaw_max_velocity_value: 3.14,
            initialized: false,
        }
    },
    watch: {
        pitch_velocity_value (newValue, oldValue) {
            this.sendToRobot()
        },
        yaw_angle_value (newValue, oldValue) {
            this.sendToRobot()
        },
        yaw_max_velocity_value (newValue, oldValue) {
            this.sendToRobot()
        },
    },
    methods: {
        resetSlider(e) {
            this.pitch_velocity_value = 0.0
            this.yaw_angle_value = 0.0
            this.yaw_max_velocity_value = 3.14
        },
        sendToRobot () {
            fetch(`//${this.robot_hostname}/head/neck`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "pitch_velocity": this.pitch_velocity_value,
                    "yaw_angle": this.yaw_angle_value,
                    "yaw_max_velocity": this.yaw_max_velocity_value,
                })
            })
        }
    },props: [
        'robot_hostname'
    ],
    mounted() {
        fetch(`//${this.robot_hostname}/head`)
            .then((response) => response.json())
            .then((data) => {
                this.pitch_velocity_value = data["neck"]["pitch_velocity"]
                this.yaw_angle_value = data["neck"]["yaw_angle"]
                this.initialized = true
            })
    }
}
</script>

<style scoped>
.slider-block {
    display: flex;
    align-items: center;
}
.slider-block .demonstration {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.slider-block .demonstration + .el-slider {
    flex: 0 0 70%;
}
.reset-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
}
</style>