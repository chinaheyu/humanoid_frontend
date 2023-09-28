<template>
    <el-button @click="playToFrame(frame, this.duration)" v-for="frame in frames">{{ frame }}</el-button>
    <el-slider v-model="duration" show-input :min="0.1" :max="10.0" :step="0.1" />
</template>

<script>
export default {
    name: "Home",
    data () {
        return {
            frames: [],
            duration: 2.0
        }
    },
    methods: {
        playToFrame(frame_name, duration) {
            fetch(`//${this.robot_hostname}/arm/play`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "frame_name": frame_name,
                    "duration": duration
                })
            })
        }
    },
    props: [
        'robot_hostname'
    ],
    mounted() {
        fetch(`//${this.robot_hostname}/arm/frames`)
            .then((response) => response.json())
            .then((data) => {
                for (const item of data["frames"]) {
                    this.frames.push(item)
                }
            })
    }
}
</script>

<style scoped>

</style>