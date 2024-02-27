<template>
    <el-card class="action-card" shadow="hover">
        <template #header>
            <el-row class="card-header">
                <span>动作</span>
            </el-row>
        </template>
        <el-row>
            <el-button class="action-button" @click="doAction(action)" v-for="action in actions">{{ translateActionName(action) }}</el-button>
        </el-row>
        <el-row class="control-item" align="middle">
            <span>动作模式：</span>
            <el-switch v-model="action_mode" active-text="on" inactive-text="off" inline-prompt @change="setActionMode()"></el-switch>
        </el-row>
    </el-card>
</template>

<script>
export default {
    name: "AllAction",
    data () {
        return {
            actions: [],
            action_mode: false,
            translations: {
                'home': '回原点',
                'wave_hand': '挥手',
                'rolling_eyes': '转眼睛',
                'self_introduction': '自我介绍',
                'introduce_scut': '介绍SCUT',
                'shake_hand': '握手',
                'grab_blocks': '抓积木',
                'yeah': '比耶',
                'hospital_demo1': '医院Demo01',
                'hospital_demo2': '医院Demo02',
                'hospital_demo3': '医院Demo03',
                'hospital_demo4': '医院Demo04',
                'hospital_demo5': '医院Demo05',
                'hospital_demo6': '医院Demo06',
                'hospital_demo7': '医院Demo07',
                'hospital_demo8': '医院Demo08',
                'hospital_demo9': '医院Demo09',
                'hospital_demo10': '医院Demo10',
                'hospital_demo11': '医院Demo11',
                'hospital_demo12': '医院Demo12',
                'lxr_demo1': '李星儒Demo1',
                'lxr_demo2': '李星儒Demo2',
                'lxr_demo3': '李星儒Demo3'
            }
        }
    },
    methods: {
        translateActionName(action) {
            if (action in this.translations)
                return this.translations[action]
            else
                return action
        },
        doAction(action) {
            if (this.action_mode) {
                fetch(`//${this.robot_hostname}/actions/do`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        "action": action
                    })
                })
            }
        },
        calibrateArm() {
            return fetch(`//${this.robot_hostname}/arm/calibration`)
                .then((response) => response.json())
                .then((data) => {
                    if (data["message"] === "Success") {
                        this.confirm_calibrated = true
                    }
                })
        },
        setTeachMode(on_off) {
            fetch(`//${this.robot_hostname}/arm/teach_mode`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "enable": on_off
                })
            })
        },
        setActionMode() {
            if (this.action_mode === true) {
                this.calibrateArm().then((response) => {
                    this.setTeachMode(false)
                })
            } else {
                this.setTeachMode(true)
            }
        },
        getActions() {
            fetch(`//${this.robot_hostname}/actions`)
                .then((response) => response.json())
                .then((data) => {
                    for (const item of data["actions"]) {
                        this.actions.push(item)
                    }
                    this.actions.sort()
                })
        }
    },
    props: [
        'robot_hostname'
    ],
    mounted() {
        this.setTeachMode(true)
        this.getActions()
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