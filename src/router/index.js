import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Create from "../pages/Create.vue";
import NotFound from "../pages/NotFound.vue";

const routes = [
    {path: '/', component: Home},
    {path: '/create', component: Create},
    {path: '/:pathMatch(.*)*', component: NotFound},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
