<template>
    <div class="slider-block">
        <span class="demonstration">chin_up_down</span>
        <el-slider v-model="chin_up_down_value" show-input :min="500" :max="2500" :disabled="!initialized"/>
    </div>
    <div class="slider-block">
        <span class="demonstration">eyes_up_down</span>
        <el-slider v-model="eyes_up_down_value" show-input :min="500" :max="2500" :disabled="!initialized"/>
    </div>
    <div class="slider-block">
        <span class="demonstration">eyes_left_right</span>
        <el-slider v-model="eyes_left_right_value" show-input :min="500" :max="2500" :disabled="!initialized"/>
    </div>
    <div class="slider-block">
        <span class="demonstration">left_eyelid_up_down</span>
        <el-slider v-model="left_eyelid_up_down_value" show-input :min="500" :max="2500" :disabled="!initialized"/>
    </div>
    <div class="slider-block">
        <span class="demonstration">right_eyelid_up_down</span>
        <el-slider v-model="right_eyelid_up_down_value" show-input :min="500" :max="2500" :disabled="!initialized"/>
    </div>
    <div class="slider-block">
        <span class="demonstration">left_eyebrow_up_down</span>
        <el-slider v-model="left_eyebrow_up_down_value" show-input :min="500" :max="2500" :disabled="!initialized"/>
    </div>
    <div class="slider-block">
        <span class="demonstration">right_eyebrow_up_down</span>
        <el-slider v-model="right_eyebrow_up_down_value" show-input :min="500" :max="2500" :disabled="!initialized"/>
    </div>
    <div class="slider-block">
        <span class="demonstration">left_cheek_up_down</span>
        <el-slider v-model="left_cheek_up_down_value" show-input :min="500" :max="2500" :disabled="!initialized"/>
    </div>
    <div class="slider-block">
        <span class="demonstration">right_cheek_up_down</span>
        <el-slider v-model="right_cheek_up_down_value" show-input :min="500" :max="2500" :disabled="!initialized"/>
    </div>
    <div class="slider-block">
        <span class="demonstration">left_lip_corner_push_pull</span>
        <el-slider v-model="left_lip_corner_push_pull_value" show-input :min="500" :max="2500" :disabled="!initialized"/>
    </div>
    <div class="slider-block">
        <span class="demonstration">right_lip_corner_push_pull</span>
        <el-slider v-model="right_lip_corner_push_pull_value" show-input :min="500" :max="2500" :disabled="!initialized"/>
    </div>
    <el-button @click="resetSlider" class="reset-button" type="primary" size="large" circle  :disabled="!initialized"><el-icon><RefreshLeft /></el-icon></el-button>
</template>

<script>
export default {
    name: "FaceControl",
    data() {
        return {
            chin_up_down_value: 1000,
            eyes_up_down_value: 1500,
            eyes_left_right_value: 1500,
            left_eyelid_up_down_value: 1500,
            right_eyelid_up_down_value: 1500,
            left_eyebrow_up_down_value: 1500,
            right_eyebrow_up_down_value: 1500,
            left_cheek_up_down_value: 1500,
            right_cheek_up_down_value: 1500,
            left_lip_corner_push_pull_value: 1500,
            right_lip_corner_push_pull_value: 1500,
            initialized: false,
        }
    },
    watch: {
        chin_up_down_value (newValue, oldValue) {
            this.sendToRobot()
        },
        eyes_up_down_value (newValue, oldValue) {
            this.sendToRobot()
        },
        eyes_left_right_value (newValue, oldValue) {
            this.sendToRobot()
        },
        left_eyelid_up_down_value (newValue, oldValue) {
            this.sendToRobot()
        },
        right_eyelid_up_down_value (newValue, oldValue) {
            this.sendToRobot()
        },
        left_eyebrow_up_down_value (newValue, oldValue) {
            this.sendToRobot()
        },
        right_eyebrow_up_down_value (newValue, oldValue) {
            this.sendToRobot()
        },
        left_cheek_up_down_value (newValue, oldValue) {
            this.sendToRobot()
        },
        right_cheek_up_down_value (newValue, oldValue) {
            this.sendToRobot()
        },
        left_lip_corner_push_pull_value (newValue, oldValue) {
            this.sendToRobot()
        },
        right_lip_corner_push_pull_value (newValue, oldValue) {
            this.sendToRobot()
        },
    },
    methods: {
        resetSlider (e) {
            this.chin_up_down_value = 1000
            this.eyes_up_down_value = 1500
            this.eyes_left_right_value = 1500
            this.left_eyelid_up_down_value = 1500
            this.right_eyelid_up_down_value = 1500
            this.left_eyebrow_up_down_value = 1500
            this.right_eyebrow_up_down_value = 1500
            this.left_cheek_up_down_value = 1500
            this.right_cheek_up_down_value = 1500
            this.left_lip_corner_push_pull_value = 1500
            this.right_lip_corner_push_pull_value = 1500
        },
        sendToRobot () {
            fetch(`//${this.robot_hostname}/head/face`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "chin_up_down": this.chin_up_down_value,
                    "eyes_left_right": this.eyes_left_right_value,
                    "eyes_up_down": this.eyes_up_down_value,
                    "left_cheek_up_down": this.left_cheek_up_down_value,
                    "left_eyebrow_up_down": this.left_eyebrow_up_down_value,
                    "left_eyelid_up_down": this.left_eyelid_up_down_value,
                    "left_lip_corner_push_pull": this.left_lip_corner_push_pull_value,
                    "right_cheek_up_down": this.right_cheek_up_down_value,
                    "right_eyebrow_up_down": this.right_eyebrow_up_down_value,
                    "right_eyelid_up_down": this.right_eyelid_up_down_value,
                    "right_lip_corner_push_pull": this.right_lip_corner_push_pull_value,
                })
            })
        }
    },
    props: [
        'robot_hostname'
    ],
    mounted() {
        fetch(`//${this.robot_hostname}/head`)
            .then((response) => response.json())
            .then((data) => {
                this.chin_up_down_value = data["face"]["chin_up_down"]
                this.eyes_up_down_value = data["face"]["eyes_up_down"]
                this.eyes_left_right_value = data["face"]["eyes_left_right"]
                this.left_eyelid_up_down_value = data["face"]["left_eyelid_up_down"]
                this.right_eyelid_up_down_value = data["face"]["right_eyelid_up_down"]
                this.left_eyebrow_up_down_value = data["face"]["left_eyebrow_up_down"]
                this.right_eyebrow_up_down_value = data["face"]["right_eyebrow_up_down"]
                this.left_cheek_up_down_value = data["face"]["left_cheek_up_down"]
                this.right_cheek_up_down_value = data["face"]["right_cheek_up_down"]
                this.left_lip_corner_push_pull_value = data["face"]["left_lip_corner_push_pull"]
                this.right_lip_corner_push_pull_value = data["face"]["right_lip_corner_push_pull"]
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
    flex: 0 0 60%;
}
.reset-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
}
</style>