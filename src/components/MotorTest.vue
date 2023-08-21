<template>
    <el-card class="motor-card" shadow="hover">
        <template #header>
            <el-row class="card-header">
                <el-select @change="clearCharts" v-model="motor.id" allow-create filterable placeholder="Select">
                    <el-option
                        v-for="item in motorIds"
                        :key="item"
                        :label="'Motor ' + item"
                        :value="item"
                    />
                </el-select>
                <el-switch v-model="motor.initialized" inline-prompt active-text="on" inactive-text="off" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"></el-switch>
            </el-row>
        </template>
        <el-row ref="chartsContainer" @resize="resizeCharts" justify="space-around">
            <div class="motor-chart" ref="positionChart"></div>
            <div class="motor-chart" ref="velocityChart"></div>
            <div class="motor-chart" ref="torqueChart"></div>
        </el-row>
        <div class="slider-block">
            <span class="demonstration">time range</span>
            <el-slider v-model="charts.maxLength" show-input :min="1" :max="1000" :step="1" :disabled="!motor.initialized"/>
        </div>
        <div class="slider-block">
            <span class="demonstration">position</span>
            <el-slider v-model="motor.command.position" show-input :min="motor.initial_position - 10" :max="motor.initial_position + 10" :step="0.01" :disabled="!motor.initialized"/>
        </div>
        <div class="slider-block">
            <span class="demonstration">velocity</span>
            <el-slider v-model="motor.command.velocity" show-input :min="-10" :max="10" :step="0.01" :disabled="!motor.initialized"/>
        </div>
        <div class="slider-block">
            <span class="demonstration">torque</span>
            <el-slider v-model="motor.command.torque" show-input :min="-10" :max="10" :step="0.01" :disabled="!motor.initialized"/>
        </div>
        <div class="slider-block">
            <span class="demonstration">kp</span>
            <el-slider v-model="motor.command.kp" show-input :min="0" :max="100" :step="0.1" :disabled="!motor.initialized"/>
        </div>
        <div class="slider-block">
            <span class="demonstration">kd</span>
            <el-slider v-model="motor.command.kd" show-input :min="0" :max="10" :step="0.1" :disabled="!motor.initialized"/>
        </div>
    </el-card>
</template>

<script>
import * as echarts from 'echarts'
import {markRaw} from "vue";
export default {
    name: "MotorTest",
    data() {
        return {
            motorIds: [],
            motor: {
                id: 1,
                initialized: false,
                initial_position: 0,
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
            charts: {
                maxLength: 1000,
                position: {
                    chart: null,
                    option: {
                        legend: {
                            data: ['feedback', 'target'],
                            icon: "line"
                        },
                        xAxis: {
                            type: 'time'
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name: "feedback",
                                data: [],
                                type: 'line',
                                showSymbol: false,
                            },
                            {
                                name: "target",
                                data: [],
                                type: 'line',
                                showSymbol: false,
                            }
                        ]
                    },
                },
                velocity: {
                    chart: null,
                    option: {
                        legend: {
                            data: ['feedback', 'target'],
                            icon: "line"
                        },
                        xAxis: {
                            type: 'time'
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name: "feedback",
                                data: [],
                                type: 'line',
                                showSymbol: false,
                            },
                            {
                                name: "target",
                                data: [],
                                type: 'line',
                                showSymbol: false,
                            }
                        ]
                    },
                },
                torque: {
                    chart: null,
                    option: {
                        legend: {
                            data: ['feedback', 'target'],
                            icon: "line"
                        },
                        xAxis: {
                            type: 'time'
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name: "feedback",
                                data: [],
                                type: 'line',
                                showSymbol: false,
                            },
                            {
                                name: "target",
                                data: [],
                                type: 'line',
                                showSymbol: false,
                            }
                        ]
                    },
                },
            },
            timer: null,
        }
    },
    props: [
        'robot_hostname'
    ],
    methods: {
        initMotorList () {
            fetch(`//${this.robot_hostname}/motor`)
                .then((response) => response.json())
                .then((data) => {
                    for (const item of data["motors"]) {
                        this.motorIds.push(item["id"])
                    }
                    this.motorIds.sort((a, b) => a - b)
                })
        },
        initCharts () {
            this.charts.position.chart = markRaw(echarts.init(this.$refs.positionChart))
            this.charts.position.chart.setOption(this.charts.position.option)
            this.charts.velocity.chart = markRaw(echarts.init(this.$refs.velocityChart))
            this.charts.velocity.chart.setOption(this.charts.velocity.option)
            this.charts.torque.chart = markRaw(echarts.init(this.$refs.torqueChart))
            this.charts.torque.chart.setOption(this.charts.torque.option)
        },
        clearCharts () {
            this.charts.position.option.series[0].data = []
            this.charts.velocity.option.series[0].data = []
            this.charts.torque.option.series[0].data = []
            this.charts.position.option.series[1].data = []
            this.charts.velocity.option.series[1].data = []
            this.charts.torque.option.series[1].data = []
        },
        resizeCharts () {
            this.charts.position.chart.resize()
            this.charts.velocity.chart.resize()
            this.charts.torque.chart.resize()
        },
        normalizeAngle (angle) {
            angle = angle % (2 * Math.PI)
            if (angle > Math.PI) {
                angle -= 2 * Math.PI
            } else if (angle < -Math.PI) {
                angle += 2 * Math.PI
            }
            return angle
        },
        updateMotorFeedback () {
            if (this.motor.initialized) {
                fetch(`//${this.robot_hostname}/motor/control`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "control_type": "MOTOR_MIT_CONTROL",
                        "id": this.motor.id,
                        "kd": this.motor.command.kd,
                        "kp": this.motor.command.kp,
                        "position": this.motor.command.position,
                        "torque": this.motor.command.torque,
                        "velocity": this.motor.command.velocity,
                    })
                })
                fetch(`//${this.robot_hostname}/motor/feedback?id=${this.motor.id}`)
                    .then((response) => response.json())
                    .then((data) => {
                        this.motor.feedback.position = data["position"]
                        this.motor.feedback.velocity = data["velocity"]
                        this.motor.feedback.torque = data["torque"]

                        this.charts.position.option.series[0].data.push([data["timestamp"] / 1000, this.normalizeAngle(data["position"])])
                        this.charts.velocity.option.series[0].data.push([data["timestamp"] / 1000, data["velocity"]])
                        this.charts.torque.option.series[0].data.push([data["timestamp"] / 1000, data["torque"]])
                        while (this.charts.position.option.series[0].data.length > this.charts.maxLength)
                            this.charts.position.option.series[0].data.shift()
                        while (this.charts.velocity.option.series[0].data.length > this.charts.maxLength)
                            this.charts.velocity.option.series[0].data.shift()
                        while (this.charts.torque.option.series[0].data.length > this.charts.maxLength)
                            this.charts.torque.option.series[0].data.shift()

                        this.charts.position.option.series[1].data.push([data["timestamp"] / 1000, this.normalizeAngle(this.motor.command.position)])
                        this.charts.velocity.option.series[1].data.push([data["timestamp"] / 1000, this.motor.command.velocity])
                        this.charts.torque.option.series[1].data.push([data["timestamp"] / 1000, this.motor.command.torque])
                        while (this.charts.position.option.series[1].data.length > this.charts.maxLength)
                            this.charts.position.option.series[1].data.shift()
                        while (this.charts.velocity.option.series[1].data.length > this.charts.maxLength)
                            this.charts.velocity.option.series[1].data.shift()
                        while (this.charts.torque.option.series[1].data.length > this.charts.maxLength)
                            this.charts.torque.option.series[1].data.shift()

                        this.charts.position.chart.setOption(this.charts.position.option)
                        this.charts.velocity.chart.setOption(this.charts.velocity.option)
                        this.charts.torque.chart.setOption(this.charts.torque.option)
                    })
            }
        },
    },
    mounted() {
        this.initMotorList()
        this.initCharts()
        window.addEventListener("resize", this.resizeCharts)
        this.timer = setInterval(this.updateMotorFeedback, 10)
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.resizeCharts)
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
.motor-chart {
    width: 33%;
    height: 400px;
}
</style>