import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../pages/HomePage.vue'
import WorkoutHistoryPage from '../pages/WorkoutHistoryPage.vue'
import SearchExercisesPage from '../pages/SearchExercisesPage.vue'
import SettingsPage from '../pages/SettingsPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import StartTrainingPage from '../pages/StartTraining.vue'
import WorkoutDetailPage from '../pages/WorkoutDetailPage.vue'
import ChangePasswordPage from '../pages/ChangePasswordPage.vue'


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
    path: '/workouts/:id',
    name: 'WorkoutDetail',
    component: WorkoutDetailPage
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
  },
  {
    path: '/login',
    name: "Login",
    component: LoginPage
  },
  {
    path: '/register',
    name: "Register",
    component: RegisterPage
  },
  {
    path: '/start-training',
    name: "Start Training",
    component: StartTrainingPage
  }
  ,
  {
    path: '/change-password',
    name: "Passwort ändern",
    component: ChangePasswordPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
