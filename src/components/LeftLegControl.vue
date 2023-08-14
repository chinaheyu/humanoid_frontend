<template>
    <el-container class="motor-card-container" v-for="motor in motors">
        <el-card class="motor-card" shadow="hover">
            <template #header>
                <el-row class="card-header">
                    <span>Motor {{ motor.id }}</span>
                    <el-button @click="stopMotor(motor.id)" class="stop-button" type="danger" circle><el-icon><VideoPause /></el-icon></el-button>
                </el-row>
            </template>
            <el-row justify="space-around">
                <el-statistic class="motor-feedback-statistic" title="position" :value="motor.feedback.position" :precision="3" suffix="rad" />
                <el-statistic class="motor-feedback-statistic" title="velocity" :value="motor.feedback.velocity" :precision="3" suffix="rad/s" />
                <el-statistic class="motor-feedback-statistic" title="torque" :value="motor.feedback.torque" :precision="3" suffix="N·m" />
            </el-row>
            <div class="slider-block">
                <span class="demonstration">position</span>
                <el-slider @input="controlMotor(motor.id)" v-model="motor.command.position" show-input :min="-10" :max="10" :step="0.01" :disabled="!motor.initialized"/>
            </div>
            <div class="slider-block">
                <span class="demonstration">velocity</span>
                <el-slider @input="controlMotor(motor.id)" v-model="motor.command.velocity" show-input :min="-10" :max="10" :step="0.01" :disabled="!motor.initialized"/>
            </div>
            <div class="slider-block">
                <span class="demonstration">torque</span>
                <el-slider @input="controlMotor(motor.id)" v-model="motor.command.torque" show-input :min="-10" :max="10" :step="0.01" :disabled="!motor.initialized"/>
            </div>
            <div class="slider-block">
                <span class="demonstration">kp</span>
                <el-slider @input="controlMotor(motor.id)" v-model="motor.command.kp" show-input :min="-10" :max="10" :step="0.01" :disabled="!motor.initialized"/>
            </div>
            <div class="slider-block">
                <span class="demonstration">kd</span>
                <el-slider @input="controlMotor(motor.id)" v-model="motor.command.kd" show-input :min="-10" :max="10" :step="0.01" :disabled="!motor.initialized"/>
            </div>
        </el-card>
    </el-container>
</template>

<script>
export default {
    name: "LeftLegControl",
    data () {
        return {
            timer: null,
            motors: [
                {
                    id: 3,
                    initialized: false,
                    command: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                        kp: 0,
                        kd: 0,
                    },
                    feedback: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                    }
                },
                {
                    id: 4,
                    initialized: false,
                    command: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                        kp: 0,
                        kd: 0,
                    },
                    feedback: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                    }
                },
                {
                    id: 5,
                    initialized: false,
                    command: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                        kp: 0,
                        kd: 0,
                    },
                    feedback: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                    }
                },
                {
                    id: 6,
                    initialized: false,
                    command: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                        kp: 0,
                        kd: 0,
                    },
                    feedback: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                    }
                },
                {
                    id: 7,
                    initialized: false,
                    command: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                        kp: 0,
                        kd: 0,
                    },
                    feedback: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                    }
                },
            ],
        }
    },
    props: [
        'robot_hostname'
    ],
    methods: {
        stopMotor (id) {
            for (let motor of this.motors) {
                if (motor.id === id) {
                    motor.command.velocity = 0
                    motor.command.torque = 0
                    motor.command.kp = 0
                    motor.command.kd = 0
                    this.controlMotor(id)
                }
            }
        },
        updateMotorFeedback () {
            for (let motor of this.motors) {
                if (motor.initialized) {
                    fetch(`//${this.robot_hostname}/motor/feedback?id=${motor.id}`)
                        .then((response) => response.json())
                        .then((data) => {
                            motor.feedback.position = data["position"]
                            motor.feedback.velocity = data["velocity"]
                            motor.feedback.torque = data["torque"]
                        })
                }
            }
        },
        controlMotor (id) {
            for (const motor of this.motors) {
                if (motor.id === id && motor.initialized) {
                    fetch(`//${this.robot_hostname}/motor/control`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            "control_type": "MOTOR_MIT_CONTROL",
                            "id": motor.id,
                            "kd": motor.command.kd,
                            "kp": motor.command.kp,
                            "position": motor.command.position,
                            "torque": motor.command.torque,
                            "velocity": motor.command.velocity,
                        })
                    })
                }
            }
        },
    },
    mounted() {
        fetch(`//${this.robot_hostname}/motor`)
            .then((response) => response.json())
            .then((data) => {
                for (const item of data["motors"]) {
                    for (let motor of this.motors) {
                        if (item["id"] === motor.id) {
                            motor.command.position = item["position"]
                            motor.command.velocity = item["velocity"]
                            motor.command.torque = item["torque"]
                            motor.initialized = true
                        }
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
.card-header {
    align-items: center;
    justify-content: space-between;
}
.motor-card-container {
    display: flex;
    flex-direction: column;
}
.motor-card {
    margin-bottom: 10px;
}
</style>