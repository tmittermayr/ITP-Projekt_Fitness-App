import axios from "axios";
import { Preferences } from "@capacitor/preferences";
import router from "@/router";

export class TrainingsInformation {

    isTrainingActive : boolean;

    constructor() {
        this.isTrainingActive = true
        this.checkIfActive()
    }

    async startTraining(name: string) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${await this.getToken()}`;
        await axios.post('http://localhost:3000/training/start', {
            title: name
        })
        .then(function (response) {
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
        const res = await axios.get('http://localhost:3000/training/isActive/active')
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
        })
        this.writeActiveState(res)
    }

    writeActiveState(value: boolean) {
        console.log(value);
        
        this.isTrainingActive = value
    }

    async getToken() {
        const { value } = await Preferences.get({ key: 'token' })
        return value ? value : ''
    }

}

