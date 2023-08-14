<template>
    <el-card class="motor-card" shadow="hover">
        <template #header>
            <el-row class="card-header">
                <span>waist_yaw</span>
                <el-button @click="motor_1 = 0" class="stop-button" type="primary" circle :disabled="!motor_1_initialized"><el-icon><RefreshLeft /></el-icon></el-button>
            </el-row>
        </template>
        <el-row justify="space-around">
            <el-statistic class="motor-feedback-statistic" title="position" :value="motor_1_feedback.position" :precision="3" suffix="rad" />
            <el-statistic class="motor-feedback-statistic" title="velocity" :value="motor_1_feedback.velocity" :precision="3" suffix="rad/s" />
            <el-statistic class="motor-feedback-statistic" title="torque" :value="motor_1_feedback.torque" :precision="3" suffix="N·m" />
        </el-row>
        <div class="slider-block">
            <span class="demonstration">position</span>
            <el-slider v-model="motor_1" show-input :min="-10" :max="10" :step="0.01" :disabled="!motor_1_initialized"/>
        </div>
    </el-card>
    <el-card class="motor-card" shadow="hover">
        <template #header>
            <el-row class="card-header">
                <span>left_hip_yaw</span>
                <el-button @click="motor_2 = 0" class="stop-button" type="primary" circle :disabled="!motor_2_initialized"><el-icon><RefreshLeft /></el-icon></el-button>
            </el-row>
        </template>
        <el-row justify="space-around">
            <el-statistic class="motor-feedback-statistic" title="position" :value="motor_2_feedback.position" :precision="3" suffix="rad" />
            <el-statistic class="motor-feedback-statistic" title="velocity" :value="motor_2_feedback.velocity" :precision="3" suffix="rad/s" />
            <el-statistic class="motor-feedback-statistic" title="torque" :value="motor_2_feedback.torque" :precision="3" suffix="N·m" />
        </el-row>
        <div class="slider-block">
            <span class="demonstration">position</span>
            <el-slider v-model="motor_2" show-input :min="-10" :max="10" :step="0.01" :disabled="!motor_2_initialized"/>
        </div>
    </el-card>
    <el-card class="motor-card" shadow="hover">
        <template #header>
            <el-row class="card-header">
                <span>right_hip_yaw</span>
                <el-button @click="motor_8 = 0" class="stop-button" type="primary" circle :disabled="!motor_8_initialized"><el-icon><RefreshLeft /></el-icon></el-button>
            </el-row>
        </template>
        <el-row justify="space-around">
            <el-statistic class="motor-feedback-statistic" title="position" :value="motor_8_feedback.position" :precision="3" suffix="rad" />
            <el-statistic class="motor-feedback-statistic" title="velocity" :value="motor_8_feedback.velocity" :precision="3" suffix="rad/s" />
            <el-statistic class="motor-feedback-statistic" title="torque" :value="motor_8_feedback.torque" :precision="3" suffix="N·m" />
        </el-row>
        <div class="slider-block">
            <span class="demonstration">position</span>
            <el-slider v-model="motor_8" show-input :min="-10" :max="10" :step="0.01" :disabled="!motor_8_initialized"/>
        </div>
    </el-card>
</template>

<script>
export default {
    name: "WaistControl",
    data () {
        return {
            timer: null,
            motor_1_initialized: false,
            motor_2_initialized: false,
            motor_8_initialized: false,
            motor_1: 0,
            motor_2: 0,
            motor_8: 0,
            motor_1_feedback: {
                position: 0,
                velocity: 0,
                torque: 0,
            },
            motor_2_feedback: {
                position: 0,
                velocity: 0,
                torque: 0,
            },
            motor_8_feedback: {
                position: 0,
                velocity: 0,
                torque: 0,
            },
        }
    },
    watch: {
        motor_1 (newValue, oldValue) {
            if (this.motor_1_initialized)
                this.controlMotor(1, this.motor_1)
        },
        motor_2 (newValue, oldValue) {
            if (this.motor_2_initialized)
                this.controlMotor(2, this.motor_2)
        },
        motor_8 (newValue, oldValue) {
            if (this.motor_8_initialized)
                this.controlMotor(8, this.motor_8)
        },
    },
    methods: {
        controlMotor (id, position) {
            fetch(`//${this.robot_hostname}/motor/control`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "control_type": "MOTOR_POSITION_CONTROL",
                    "id": id,
                    "kd": 0,
                    "kp": 0,
                    "position": position,
                    "torque": 0,
                    "velocity": 0,
                })
            })
        },
        updateMotorFeedback () {
            if (this.motor_1_initialized) {
                fetch(`//${this.robot_hostname}/motor/feedback?id=1`)
                    .then((response) => response.json())
                    .then((data) => {
                        this.motor_1_feedback.position = data["position"]
                        this.motor_1_feedback.velocity = data["velocity"]
                        this.motor_1_feedback.torque = data["torque"]
                    })
            }
            if (this.motor_2_initialized) {
                fetch(`//${this.robot_hostname}/motor/feedback?id=2`)
                    .then((response) => response.json())
                    .then((data) => {
                        this.motor_2_feedback.position = data["position"]
                        this.motor_2_feedback.velocity = data["velocity"]
                        this.motor_2_feedback.torque = data["torque"]
                    })
            }
            if (this.motor_8_initialized) {
                fetch(`//${this.robot_hostname}/motor/feedback?id=8`)
                    .then((response) => response.json())
                    .then((data) => {
                        this.motor_8_feedback.position = data["position"]
                        this.motor_8_feedback.velocity = data["velocity"]
                        this.motor_8_feedback.torque = data["torque"]
                    })
            }
        }
    },
    props: [
        'robot_hostname'
    ],
    mounted() {
        fetch(`//${this.robot_hostname}/motor`)
            .then((response) => response.json())
            .then((data) => {
                for (const item of data["motors"]) {
                    if (item["id"] === 1) {
                        this.motor_1 = item["position"];
                        this.motor_1_initialized = true;
                    }
                    if (item["id"] === 2) {
                        this.motor_2 = item["position"];
                        this.motor_2_initialized = true;
                    }
                    if (item["id"] === 8) {
                        this.motor_8 = item["position"];
                        this.motor_8_initialized = true;
                    }
                }
            })
        this.timer = setInterval(this.updateMotorFeedback, 100)
    },
    beforeUnmount() {
        clearInterval(this.timer)
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
    flex: 0 0 85%;
}
.motor-card {
    margin-bottom: 10px;
}
.card-header {
    align-items: center;
    justify-content: space-between;
}
.motor-feedback-statistic {
    text-align: center;
}
</style>