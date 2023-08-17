<template>
    <el-card class="motor-card" shadow="hover" v-for="motor in motors">
        <template #header>
            <el-row class="card-header">
                <span>Motor {{ motor.id }}</span>
                <el-button @click="resetMotorPosition(motor.id)" class="stop-button" type="primary" circle :disabled="!motor.initialized"><el-icon><RefreshLeft /></el-icon></el-button>
            </el-row>
        </template>
        <el-row justify="space-around">
            <el-statistic class="motor-feedback-statistic" title="position" :value="motor.feedback.position" :precision="3" suffix="rad" />
            <el-statistic class="motor-feedback-statistic" title="velocity" :value="motor.feedback.velocity" :precision="3" suffix="rad/s" />
            <el-statistic class="motor-feedback-statistic" title="torque" :value="motor.feedback.torque" :precision="3" suffix="N·m" />
        </el-row>
        <div class="slider-block">
            <span class="demonstration">position</span>
            <el-slider @input="controlMotor(motor.id, motor.position)" v-model="motor.position" show-input :min="motor.initial_position - 2 * Math.PI" :max="motor.initial_position + 2 * Math.PI" :step="0.01" :disabled="!motor.initialized"/>
        </div>
    </el-card>
</template>

<script>
export default {
    name: "RightArmControl",
    data () {
        return {
            timer: null,
            motors: [
                {
                    id: 19,
                    initialized: false,
                    initial_position: 0,
                    position: 0,
                    feedback: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                    },
                },
                {
                    id: 20,
                    initialized: false,
                    initial_position: 0,
                    position: 0,
                    feedback: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                    },
                },
                {
                    id: 21,
                    initialized: false,
                    initial_position: 0,
                    position: 0,
                    feedback: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                    },
                },
                {
                    id: 22,
                    initialized: false,
                    initial_position: 0,
                    position: 0,
                    feedback: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                    },
                },
                {
                    id: 23,
                    initialized: false,
                    initial_position: 0,
                    position: 0,
                    feedback: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                    },
                },
            ],
        }
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
        resetMotorPosition (id) {
            for (let motor of this.motors) {
                if (motor.id === id && motor.initialized) {
                    this.controlMotor(motor.id, motor.initial_position);
                    motor.position = motor.initial_position;
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
                    for (let motor of this.motors) {
                        if (item["id"] === motor.id) {
                            motor.initial_position = item["position"]
                            motor.position = item["position"]
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