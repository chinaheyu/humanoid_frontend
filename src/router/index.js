import { createWebHashHistory, createRouter } from "vue-router";
import App from "@/App.vue";
import Home from "@/components/Home.vue";
import FaceControl from "@/components/FaceControl.vue";
import NeckControl from "@/components/NeckControl.vue";
import WaistControl from "@/components/WaistControl.vue";
import LeftLegControl from "@/components/LeftLegControl.vue";
import RightLegControl from "@/components/RightLegControl.vue";
import LeftArmControl from "@/components/LeftArmControl.vue";
import RightArmControl from "@/components/RightArmControl.vue";
import MotorTest from "@/components/MotorTest.vue";
import FeetControl from "@/components/FeetControl.vue";
import LeftLegControl2 from "@/components/LeftLegControl2.vue";
import RightLegControl2 from "@/components/RightLegControl2.vue";

const routes = [
    { path: '/1', component: Home },
    { path: '/2-1', component: FaceControl },
    { path: '/2-2', component: NeckControl },
    { path: '/3-1', component: LeftArmControl },
    { path: '/3-2', component: RightArmControl },
    { path: '/4-1', component: WaistControl },
    { path: '/4-2', component: LeftLegControl },
    { path: '/4-3', component: RightLegControl },
    { path: '/4-4', component: FeetControl },
    { path: '/5', component: MotorTest },
    { path: '/6-1', component: LeftLegControl2 },
    { path: '/6-2', component: RightLegControl2 },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;