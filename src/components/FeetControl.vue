<template>
    <el-card class="motor-card" shadow="hover" v-for="(foot, index) in feet">
        <template #header>
            <el-row class="card-header">
                <span>{{ foot.name }}</span>
                <el-button @click="resetFootPosition(index)" class="stop-button" type="primary" circle><el-icon><RefreshLeft /></el-icon></el-button>
            </el-row>
        </template>
        <div class="slider-block">
            <span class="demonstration">roll</span>
            <el-slider @input="controlFoot(index)" v-model="foot.target_roll" show-input :min="-0.5" :max="0.5" :step="0.01" :disabled="!(motors[foot.upper_motor].initialized && motors[foot.lower_motor].initialized)"/>
        </div>
        <div class="slider-block">
            <span class="demonstration">pitch</span>
            <el-slider @input="controlFoot(index)" v-model="foot.target_pitch" show-input :min="-0.5" :max="0.5" :step="0.01" :disabled="!(motors[foot.upper_motor].initialized && motors[foot.lower_motor].initialized)"/>
        </div>
    </el-card>
</template>

<script>
export default {
    name: "LeftLegControl",
    data () {
        return {
            timer: null,
            feet: [
                {
                    name: "left foot",
                    upper_motor: 6,
                    lower_motor: 7,
                    target_roll: 0,
                    target_pitch: 0,
                },
                {
                    name: "right foot",
                    upper_motor: 12,
                    lower_motor: 13,
                    target_roll: 0,
                    target_pitch: 0,
                },
            ],
            motors: {
                6: {
                    initialized: false,
                    position_offset: 1.5475,
                    reverse: true,
                    command: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                        kp: 2,
                        kd: 0.5,
                    },
                    feedback: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                    }
                },
                7: {
                    initialized: false,
                    position_offset: 1.9135,
                    reverse: false,
                    command: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                        kp: 2,
                        kd: 0.5,
                    },
                    feedback: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                    }
                },
                12: {
                    initialized: false,
                    position_offset: 0.2095,
                    reverse: true,
                    command: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                        kp: 2,
                        kd: 0.5,
                    },
                    feedback: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                    }
                },
                13: {
                    initialized: false,
                    position_offset: 1.0245,
                    reverse: false,
                    command: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                        kp: 2,
                        kd: 0.5,
                    },
                    feedback: {
                        position: 0,
                        velocity: 0,
                        torque: 0,
                    }
                },
            },
        }
    },
    props: [
        'robot_hostname'
    ],
    methods: {
        resetFootPosition (index) {
            this.feet[index].target_roll = 0
            this.feet[index].target_pitch = 0
            this.controlFoot(index)
        },
        updateMotorFeedback () {
            for (const motorId in this.motors) {
                if (this.motors[motorId].initialized) {
                    this.controlMotor(motorId)
                    fetch(`//${this.robot_hostname}/motor/feedback?id=${motorId}`)
                        .then((response) => response.json())
                        .then((data) => {
                            this.motors[motorId].feedback.position = data["position"]
                            this.motors[motorId].feedback.velocity = data["velocity"]
                            this.motors[motorId].feedback.torque = data["torque"]
                        })
                }
            }
        },
        controlMotor (id) {
            if (this.motors[id].initialized) {
                fetch(`//${this.robot_hostname}/motor/control`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "control_type": "MOTOR_MIT_CONTROL",
                        "id": Number(id),
                        "kd": this.motors[id].command.kd,
                        "kp": this.motors[id].command.kp,
                        "position": this.motors[id].command.position,
                        "torque": this.motors[id].command.torque,
                        "velocity": this.motors[id].command.velocity,
                    })
                })
            }
        },
        controlFoot(index) {
            const pax = -47.2 * Math.cos(this.feet[index].target_pitch) + Math.sin(this.feet[index].target_pitch) * (16 * Math.sin(this.feet[index].target_roll) - 16.5 * Math.cos(this.feet[index].target_roll));
            const pay = 16 * Math.cos(this.feet[index].target_roll) + 16.5 * Math.sin(this.feet[index].target_roll)
            const paz = 47.2 * Math.sin(this.feet[index].target_pitch) + Math.cos(this.feet[index].target_pitch) * (16 * Math.sin(this.feet[index].target_roll) - 16.5 * Math.cos(this.feet[index].target_roll))
            const pbx = -47.2 * Math.cos(this.feet[index].target_pitch) - Math.sin(this.feet[index].target_pitch) * (16 * Math.sin(this.feet[index].target_roll) + 16.5 * Math.cos(this.feet[index].target_roll))
            const pby = -16 * Math.cos(this.feet[index].target_roll) + 16.5 * Math.sin(this.feet[index].target_roll)
            const pbz = 47.2 * Math.sin(this.feet[index].target_pitch) - Math.cos(this.feet[index].target_pitch) * (16 * Math.sin(this.feet[index].target_roll) + 16.5 * Math.cos(this.feet[index].target_roll))
            let alpha = -Math.atan2(100 * pax, 29000 - 100 * paz) - Math.asin((Math.pow(pay - 16, 2) + Math.pow(paz - 290, 2) + Math.pow(pax, 2) - 81600) / (100 * Math.sqrt(Math.pow(100 * paz - 29000, 2) / 10000 + Math.pow(pax, 2))))
            let beta = -Math.atan2(100 * pbx, 23200 - 100 * pbz) - Math.asin((Math.pow(pby + 16, 2) + Math.pow(pbz - 232, 2) + Math.pow(pbx, 2) - 51324) / (100 * Math.sqrt(Math.pow(100 * pbz - 23200, 2) / 10000 + Math.pow(pbx, 2))))

            if (this.motors[this.feet[index].upper_motor].reverse)
                alpha = -alpha
            if (this.motors[this.feet[index].lower_motor].reverse)
                beta = -beta

            alpha += this.motors[this.feet[index].upper_motor].position_offset
            beta += this.motors[this.feet[index].lower_motor].position_offset

            this.motors[this.feet[index].upper_motor].command.position = alpha
            this.motors[this.feet[index].lower_motor].command.position = beta
        },
    },
    mounted() {
        fetch(`//${this.robot_hostname}/motor`)
            .then((response) => response.json())
            .then((data) => {
                for (const item of data["motors"]) {
                    for (const motorId in this.motors) {
                        if (item["id"] === Number(motorId)) {
                            this.motors[motorId].command.position = item["position"]
                            this.motors[motorId].command.velocity = item["velocity"]
                            this.motors[motorId].command.torque = item["torque"]
                            this.motors[motorId].initialized = true
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
.motor-card {
    margin-bottom: 10px;
}
.motor-feedback-statistic {
    text-align: center;
}
</style>