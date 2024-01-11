import axios from "axios";
import { Preferences } from "@capacitor/preferences";
import router from "@/router";
import { store } from '@/store/store'


export class TrainingsInformation {

    //Check if training is active on load
    constructor() {
        this.checkIfActive()
    }
    //Start Training and change state in database
    async startTraining(name: string) {
        await axios.post('http://localhost:8080/api/trainings/start', {
            id: await this.getToken(),
            title: name
        })
        .then(function (response) {
            store.commit('write', response.data)
            router.push('/workouts')
        })
        .catch(function (error) {
            console.log(error);
        }) 
        this.checkIfActive()
    }
    //Start trainingsplan and change state in database
    async startPlan(id: string) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${await this.getToken()}`;
        await axios.post('http://localhost:3000/training/startPlan/' + id)
        .then(function (response) {
            store.commit('write', response.data)
            router.push('/workouts')
            
        })
        .catch(function (error) {
            console.log(error);
        })
        this.checkIfActive()
    }
    //Stop Training and change state in database to stopped
    async stopTraining() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${await this.getToken()}`;
        await axios.patch('http://localhost:3000/training/stop')
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
        await axios.get('http://localhost:8080/api/trainings/active/' + await this.getToken())
        .then(function (response) {
            store.commit('change', response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    //Get the current training if the training is active
    async getCurrentTraining() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${await this.getToken()}`;
        await axios.get('http://localhost:3000/training/isActive/object')
        .then(function (response) {
            console.log("written in store");
            store.commit('write', response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    //Add a excercise to active Training
    async addExerciseToTraining(id: string) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${await this.getToken()}`;
        return await axios.patch('http://localhost:3000/training/addExercise', { exerciseid: id })
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    //Add a new set to the active training 
    async addSetToExercise(data: object) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${await this.getToken()}`;
        await axios.patch('http://localhost:3000/training/addSet', data)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        this.checkIfActive()
    }
    //get the jwt token for the logged in user
    async getToken() {
        const { value } = await Preferences.get({ key: 'token' })
        return value ? value : ''
    }

    

}

