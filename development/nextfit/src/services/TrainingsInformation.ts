import axios from "axios";
import { Preferences } from "@capacitor/preferences";
import router from "@/router";
import { store } from '@/store/store'


export class TrainingsInformation {

    constructor() {
        this.checkIfActive()
    }

    async startTraining(name: string) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${await this.getToken()}`;
        await axios.post('http://localhost:3000/training/start', {
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

    async checkIfActive() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${await this.getToken()}`;
        await axios.get('http://localhost:3000/training/isActive/active')
        .then(function (response) {
            store.commit('change', response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    async getCurrentTraining() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${await this.getToken()}`;
        await axios.get('http://localhost:3000/training/isActive/object')
        .then(function (response) {
            store.commit('write', response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    async addExerciseToTraining(id: string) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${await this.getToken()}`;
        await axios.get('http://localhost:3000/training/isActive/object')
        .then(function (response) {
            return true
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    async getToken() {
        const { value } = await Preferences.get({ key: 'token' })
        return value ? value : ''
    }

    

}

