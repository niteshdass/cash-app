<template>
    <div class="container">
        <h2 style="font-size:2.5rem ; font-weight: 700;">Login</h2>

        <div style="margin-top: 100px">
            <input v-model="gmail" type="gmail" class="form-control my-form" placeholder="Enter your gmail">
            <input v-model="password" type="password" class="form-control my-form" placeholder="Enter your password">
            <button v-if="loading" @click="login" class="btn btn-primary my-button">Loading...</button>
            <button v-else @click="login" class="btn btn-primary my-button">Loading</button>
        </div>
        <h2 style="font-size:1.5rem ; font-weight: 700;">Do you have not any account please go to <router-link
                to="/register">register</router-link> page</h2>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            password: '',
            gmail: '',
            loading: false
        }
    },
    methods: {
        async login() {
            this.loading = true;
            let that = this;
            if (this.password === '' || this.gmail === '') {
                this.errorMessage()
            } else {
                const data = { email: this.gmail, password: this.password }
                try {
                    const result = await axios.post("https://my-cash-app.herokuapp.com/api/signin", data);
                    if (result) {
                        let user = result?.data?.user
                        localStorage.setItem("id",user?._id);
                        window.location.href = '/home';
                    }
                    that.loading = false;
                } catch {
                    this.errorMessage('Your password or gmail does not match our database!');
                }
            }
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
    }
}

</script>