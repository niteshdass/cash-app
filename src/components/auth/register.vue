<template>
    <div class="container" style="max-width: 400px; margin: 0 auto">
        <h2 style="font-size:2.5rem ; font-weight: 700;">Register</h2>

        <div class="form-inline" style="margin-top: 100px">
            <input v-model="name" type="text" class="form-control my-form" placeholder="Enter your name">
            <h2 style="font-size:1.2rem ; font-weight: 600; color: brown;">{{nameError}}</h2>
            <input v-model="gmail" type="gmail" class="form-control my-form" placeholder="Enter your gmail">
            <h2 style="font-size:1.2rem ; font-weight: 600; color: brown;">{{gmailError}}</h2>
            <input v-model="password" type="password" class="form-control my-form" placeholder="Enter your password">
            <h2 style="font-size:1.2rem ; font-weight: 600; color: brown;">{{passError}}</h2>
            <button v-if="loading" class="btn btn-primary my-button">Register....</button>
            <button v-else @click="login" class="btn btn-primary my-button">Register</button>
        </div>
        <h2 style="font-size:1.5rem ; font-weight: 700;">If you have already an account please go to <router-link
                to="/">login</router-link> page</h2>
        <h2 style="font-size:1.5rem ; font-weight: 700; color: brown;">If you have any query please talk with us.  dasnitesh780@gmail.com</h2>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            password: '',
            passError: '',
            gmail: '',
            gmailError: '',
            name: '',
            nameError: '',
            loading: false
        }
    },
    methods: {
        containsNumber(str) {
            return /\d/.test(str);
        },
        async login() {
            this.nameError = this.name.length < 4 ? 'Name string length must be more then 4' : '';
            let regex = /([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g;
            this.gmailError = !this.gmail.match(regex) ? 'Valid email required!' : '';
            if ( this.password.length < 7 || !this.containsNumber(this.password)) {
                this.passError = 'Password length must be more then 7 and contains must one number!'
            } else {
                this.passError = ''
            }
            this.loading = true;
            let that = this;
            if (this.passError === '' || this.gmailError === '' || this.nameError === '') {
                const data = { email: this.gmail, password: this.password, name: this.name }
                try {
                    const result = await axios.post("https://my-cash-backend.vercel.app/api/signup", data);
                    if (result) {
                        let user = result?.data?.user
                        localStorage.setItem("id", user?._id);
                        this.$router.push('/home');
                    }
                    that.loading = false;
                } catch {
                    this.errorMessage('User already exist!');
                }
            }
            this.loading = false;
        },
        errorMessage(message = 'All fields are required!') {
            this.$swal.fire(
                {
                    icon: 'error',
                    title: 'Oops...',
                    text: message,
                }
            );
            this.loading = false;
        },
    },
    mounted() {
        if (localStorage.getItem("id")) {
            this.$router.push('/home');
        }
    },
}

</script>