import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../pages/HomePage.vue'
import WorkoutHistoryPage from '../pages/WorkoutHistoryPage.vue'
import SearchExercisesPage from '../pages/SearchExercisesPage.vue'
import SettingsPage from '../pages/SettingsPage.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/workouts',
    name: 'Workouts',
    component: WorkoutHistoryPage
  },
  {
    path: '/exercises',
    name: "Exercises",
    component: SearchExercisesPage
  },
  {
    path: '/settings',
    name: "Settings",
    component: SettingsPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router