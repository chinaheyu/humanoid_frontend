<template>
    <el-card class="frame-card" shadow="hover">
        <template #header>
            <el-row class="card-header">
                <span>Frames</span>
            </el-row>
        </template>
        <el-row>
            <el-button class="frame-button" :disabled="teach_mode || running" @click="playToFrame(frame, this.duration)" v-for="frame in frames">{{ frame }}</el-button>
        </el-row>
        <el-row class="time-slider" justify="space-around">
            <el-slider v-model="duration" show-input :min="0.5" :max="10.0" :step="0.1" />
        </el-row>
    </el-card>
    <el-card class="frame-card" shadow="hover">
        <template #header>
            <el-row class="card-header">
                <span>Control</span>
            </el-row>
        </template>
        <el-row class="control-item" align="middle">
            <el-button type="primary" @click="calibrateArm()">Calibrate Arm</el-button>
        </el-row>
        <el-row class="control-item" align="middle">
            <span>Teach Mode:&nbsp;</span>
            <el-switch v-model="teach_mode" active-text="on" inactive-text="off" inline-prompt @change="setTeachMode()"></el-switch>
        </el-row>
        <el-row class="control-item" align="middle">
            <el-input v-model="teach_frame_name" placeholder="Teach frame name...">
                <template #append>
                    <el-button @click="teachArm()">Teach</el-button>
                </template>
            </el-input>
        </el-row>
    </el-card>
    <div>
        注意：请先<span style="font-weight: bold;color: red;">校准</span>手臂电机
    </div>
    <el-dialog v-model="confirm_dialog_visible" title="Caution" width="30%">
        <span>Is the motor calibrated?</span>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="confirm_dialog_visible = false">Cancel</el-button>
        <el-button type="primary" @click="confirm_dialog_visible = false; confirm_calibrated = true">
          Confirm
        </el-button>
      </span>
        </template>
    </el-dialog>
</template>

<script>
export default {
    name: "PlayArm",
    data () {
        return {
            frames: [],
            duration: 2.0,
            teach_mode: true,
            teach_frame_name: "",
            confirm_calibrated: false,
            confirm_dialog_visible: false,
            running: false
        }
    },
    methods: {
        playToFrame(frame_name, duration) {
            if (!this.confirm_calibrated) {
                this.confirm_dialog_visible = true
            } else {
                if (!this.running) {
                    this.running = true
                    fetch(`//${this.robot_hostname}/arm/play`, {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            "frame_name": frame_name,
                            "duration": duration
                        })
                    }).then((response) => {
                        this.running = false
                    })
                }
            }
        },
        calibrateArm() {
            fetch(`//${this.robot_hostname}/arm/calibration`)
                .then((response) => response.json())
                .then((data) => {
                    if (data["message"] === "Success") {
                        this.confirm_calibrated = true
                    }
                })
        },
        setTeachMode() {
            if (this.teach_mode) {
                fetch(`//${this.robot_hostname}/arm/play`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        "frame_name": 'home',
                        "duration": 2.0
                    })
                }).then((response) => {
                    fetch(`//${this.robot_hostname}/arm/teach_mode`, {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            "enable": this.teach_mode
                        })
                    })
                })
            } else {
                fetch(`//${this.robot_hostname}/arm/teach_mode`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        "enable": this.teach_mode
                    })
                })
            }
        },
        teachArm() {
            fetch(`//${this.robot_hostname}/arm/teach`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "frame_name": this.teach_frame_name
                })
            }).then((response) => {
                this.getFrames()
            })
        },
        getFrames() {
            fetch(`//${this.robot_hostname}/arm/frames`)
                .then((response) => response.json())
                .then((data) => {
                    this.frames = []
                    for (const item of data["frames"]) {
                        this.frames.push(item)
                        this.frames.sort()
                    }
                })
        }
    },
    props: [
        'robot_hostname'
    ],
    mounted() {
        this.setTeachMode()
        this.getFrames()
    }
}
</script>

<style scoped>
.frame-button {
    margin-top: 5px;
    margin-bottom: 5px;
}
.time-slider {
    margin-top: 20px;
}
.frame-card {
    margin-bottom: 10px;
}
.control-item {
    margin-top: 10px;
}
</style>