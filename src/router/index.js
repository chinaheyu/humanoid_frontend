import { createWebHashHistory, createRouter } from "vue-router";
import App from "@/App.vue";
import FaceControl from "@/components/FaceControl.vue";
import NeckControl from "@/components/NeckControl.vue";
import WaistControl from "@/components/WaistControl.vue";
import LeftLegControl from "@/components/LeftLegControl.vue";
import RightLegControl from "@/components/RightLegControl.vue";

const routes = [
    { path: '/1-1', component: FaceControl },
    { path: '/1-2', component: NeckControl },
    { path: '/2-1', component: WaistControl },
    { path: '/2-2', component: LeftLegControl },
    { path: '/2-3', component: RightLegControl },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;