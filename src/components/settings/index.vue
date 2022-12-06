<template>
    <div class="text">
        <NavBar></NavBar>
        <div style="display:flex" @click="settings = !settings">
            <h2 v-if="settings" style="font-size:1.5rem ; font-weight: 700; margin-left: 10px; color: #FF7519;">
                Go to Borrower Settings
                <i style="font-size: large;" class="glyphicon glyphicon-arrow-right"></i>
            </h2>
            <h2 v-else style="font-size:1.5rem ; font-weight: 700; margin-left: 10px; color: #FF7519;">
                <i style="font-size: large;" class="glyphicon glyphicon-arrow-left"></i>
                Go to Transaction Settings
            </h2>
        </div>
        <LoaderVue style="margin: 150px" v-if="loading" />
        <div v-else>
            <article v-if="settings" class="leaderboard">
                <div style="display:flex">
                    <!-- <h2 style="font-size:1.5rem ; font-weight: 700; margin-left: 10px;">Purpose list of your transaction
                </h2> -->
                    <input style="margin-left: 10px;" v-model="name" type="text" class="form-control my-form"
                        placeholder="Purpose Ex:Mess, personal">
                    <button style="" class="plus-button" @click="addItem(name, 'cash')">
                        <i style="font-size: large;" class="glyphicon glyphicon-plus"></i>
                    </button>
                </div>
                <main class="leaderboard__profiles">
                    <article v-if="cash.length > 0" v-for="(item, index) in cash" class="leaderboard__profile">
                        <img src="./purpose.jpg" alt="Dustin Moskovitz" class="leaderboard__picture">
                        <span class="leaderboard__name">{{ item.name }}</span>
                        <span class="leaderboard__value">
                            <button style="border: none; background:white" @click="deleteSettings(item._id)"><i
                                    class="glyphicon glyphicon-trash"></i></button>
                        </span>
                    </article>
                    <div v-else class="">
                        <h2 style="font-size:1.5rem ; font-weight: 700; color:midnightblue">
                            There are no any purpose for transaction , please add
                        </h2>
                    </div>
                </main>
            </article>
            <article v-else class="leaderboard">
                <div style="display:flex">
                    <input style="margin-left: 10px;" v-model="purpose" type="text" class="form-control my-form"
                        placeholder="Borrower name; Ex: Jhon, Smith">
                    <button class="plus-button" @click="addItem(purpose, 'loan')">
                        <i style="font-size: large;" class="glyphicon glyphicon-plus"></i>
                    </button>
                </div>
                <main class="leaderboard__profiles">
                    <article v-if="loan.length > 0" v-for="(item, index) in loan" class="leaderboard__profile">
                        <img src="./profile.png" alt="Dustin Moskovitz" class="leaderboard__picture">
                        <span class="leaderboard__name">{{ item.name }}</span>
                        <span class="leaderboard__value">
                            <button style="border: none; background:white" @click="deleteSettings(item._id)"><i
                                    class="glyphicon glyphicon-trash"></i></button>
                        </span>
                    </article>
                    <div v-else class="">
                        <h2 style="font-size:1.5rem ; font-weight: 700; color:midnightblue">
                            There are no any borrower for borrow , please add
                        </h2>
                    </div>
                </main>
            </article>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import LoaderVue from '../common/Loader.vue';
import NavBar from '../common/NavBar.vue';

export default {
    components: { NavBar, LoaderVue },
    data() {
        return {
            settings: true,
            user_id: localStorage.getItem("id"),
            loading: true,
            cash: [],
            loan: [],
            name: '',
            purpose: ''
        }
    },
    methods: {
        prepareData(data, that) {
            let loandata = [];
            let transaction = [];
            data?.map(item => {
                if (item?.slug === "cash") {
                    transaction.push(item);
                } else if (item?.slug === "loan") {
                    loandata.push(item);
                }
            })
            that.loan = loandata;
            that.cash = transaction;
        },
        errorMessage(message = 'Title is required!') {
            this.$swal.fire(
                {
                    icon: 'error',
                    title: 'Oops...',
                    text: message,
                }
            );
        },
        async deleteSettings(data) {
            this.$swal.fire({
                icon: 'warning',
                title: 'Delete',
                text: 'Are you sure delete the settings?',
                showCancelButton: true,
                confirmButtonText: 'Delete',
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.loading = true;
                    let res = await axios.delete(`https://my-cash-backend.vercel.app/category/${data}`);
                    if (res?.data?.message) {
                        this.loading = false;
                        this.getSettings();
                    } else {
                        this.$swal.fire(
                            {
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!',
                            }
                        );
                    }
                }
            })
        },
        async addItem(name, slug) {
            let that = this;
            this.loading = true;
            try {
                if (name === '' || slug === '') {
                    this.errorMessage();
                    this.loading = false;
                } else {
                    const data = {
                        name: name.toLowerCase(), slug, user_id: this.user_id
                    }
                    await axios.post("https://my-cash-backend.vercel.app/category", data);
                    that.getSettings();
                }
            } catch {
                this.loading = false;
            }
        },
        async getSettings() {
            this.loading = true;
            let that = this;
            try {
                await axios.get(`https://my-cash-backend.vercel.app/category/${this.user_id}`)
                    .then(async function (response) {
                        response?.data && (
                            that.prepareData(response?.data.reverse(), that)
                        )
                        that.loading = false;
                    }).catch(function (error) {
                        // handle error
                        that.loading = false;
                    })
                    .then(function () {
                        // always executed
                    });
            } catch {
                this.loading = false;
            }
        }
    },
    mounted() {
        if (localStorage.getItem("id")) {
            this.getSettings()
        } else {
            this.$router.push('/');
        }
    }
}
</script>
<style scoped>
.leaderboard {
    margin: 0 auto;
    max-width: 490px;
    width: 95%;
    border-radius: 12px;
    margin-top: 24px;
    margin-bottom: 100px;
}

.leaderboard__profiles {
    background-color: #fff;
    border-radius: 0 0 12px 12px;
    padding: 15px 15px 20px;
    display: grid;
    row-gap: 8px;
}

.leaderboard__profile {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    align-items: center;
    padding: 10px 30px 10px 10px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 5px 7px -1px rgba(51, 51, 51, 0.23);
    cursor: pointer;
    background-color: #fff;
    margin: 3px;
}

.leaderboard__profile:hover {
    box-shadow: 0 9px 47px 11px rgba(51, 51, 51, 0.18);
}

.leaderboard__picture {
    max-width: 100%;
    width: 60px;
    border-radius: 50%;
    box-shadow: 0 0 0 10px #ebeef3;
}

.leaderboard__name {
    color: #979cb0;
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 0.64px;
    margin: 0 auto
}

.leaderboard__value {
    color: #d83535;
    font-weight: 700;
    font-size: 34px;
    text-align: right;
}

.leaderboard__value>span {
    opacity: 0.8;
    font-weight: 600;
    font-size: 13px;
    margin-left: 3px;
}

body {
    margin: 0;
    background-color: #eaeaea;
    display: grid;
    height: 100vh;
    place-items: center;
    font-family: "Source Sans Pro", sans-serif;
}

.leaderboard {
    box-shadow: 0 0 40px -10px rgba(0, 0, 0, 0.4);
}

.plus-button {
    border: none;
    background: white;
    width: 50px;
    height: 50px;
    margin-top: 19px;
}

.text {
    margin: 0 auto;
    max-width: 400px;
}

.glyphicon-plus:before {
    content: "\002b";
    margin-left: -28px;
    font-size: 33px;
}
</style>