import { createRouter, createWebHistory } from 'vue-router';
import Game from '../views/Game.vue';

const routes = [
	{
		path: '/game',
		name: 'game',
		component: Game,
	},
	{
		path: '/',
		redirect: '/game',
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/game',
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
