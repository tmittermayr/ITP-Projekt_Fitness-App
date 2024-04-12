import axios from "axios";
import { Preferences } from "@capacitor/preferences";
import router from "@/router";
import { store } from '@/store/store'
import {sadOutline} from "ionicons/icons";


export class TrainingsInformation {

    //Check if training is active on load
    constructor() {
        this.checkIfActive()
    }
    //Start Training and change state in database
    async startTraining(name: string) {
        await axios.post('https://student.cloud.htl-leonding.ac.at/nextfit/api/trainings/start', {
            id: await this.getToken(),
            title: name
        })
        .then(function (response) {
            console.log(response.data)
            store.commit('write', response.data)
            store.commit('change', true)
            router.push('/workouts')
        })
        .catch(function (error) {
            console.log(error);
        }) 
        this.checkIfActive()
    }
    //Start trainingsplan and change state in database
    async startPlan(id: string) {
        await axios.post('http://localhost:3000/training/startPlan/' + id)
        .then(function (response) {
            store.commit('change', response.data)
            router.push('/workouts')
            
        })
        .catch(function (error) {
            console.log(error);
        })
        this.checkIfActive()
    }
    //Stop Training and change state in database to stopped
    async stopTraining() {
        await axios.patch('https://student.cloud.htl-leonding.ac.at/nextfit/api/trainings/stop/' + await this.getToken())
        .then(function (response) {
            console.log(response.data);
            return response.data
        })
        .catch(function (error) {
            console.log(error);
        })
        this.checkIfActive()
    }
    //Check if a training is active in database
    async checkIfActive() {
        await axios.get('https://student.cloud.htl-leonding.ac.at/nextfit/api/trainings/active/' + await this.getToken())
        .then(function (response) {
            store.commit('change', response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    //Get the current training if the training is active
    async getCurrentTraining() {
        await axios.get('https://student.cloud.htl-leonding.ac.at/nextfit/api/trainings/active/user/' + await this.getToken())
        .then(function (response) {
            store.commit('write', response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    //Add a excercise to active Training
    async addExerciseToTraining(id: string) {
        console.log("penis")
        return await axios.post('https://student.cloud.htl-leonding.ac.at/nextfit/api/training/exercise', { user_id: Number(await this.getToken()), exercise_id: id })
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    //Add a new set to the active training 
    async addSetToExercise(data: object) {
        console.log(data)
        await axios.post('https://student.cloud.htl-leonding.ac.at/nextfit/api/training/exercise/set', data)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        this.getCurrentTraining()
    }
    //get the jwt token for the logged in user
    async getToken() {
        const { value } = await Preferences.get({ key: 'token' })
        return value ? value : ''
    }


    async getActiveTraining() {
        return await axios.get('https://student.cloud.htl-leonding.ac.at/nextfit/api/trainings/active/user/' + await this.getToken())
            .then(function (response) {
                return response
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}

