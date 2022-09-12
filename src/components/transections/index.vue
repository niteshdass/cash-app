<template>
    <div class="container" style="padding-bottom: 50px;max-width: 400px; border: 1px solid #f2f4f5;">
        <NavBar></NavBar>
        <div class="padding-filter">
            <div style="display:flex; margin-bottom: 20px;">
                <button @click="filtershow" style="margin-top: 5px; background-color: white;border: none;"><i
                        class='bx bxs-filter-alt' style="color: #FF7519; font-size: 3rem;"></i></button>
                <div v-if="filterRender" class="select-box">
                    <select v-model="filter.year" @change="filterHandler" name="sample" id="sample" class="fa">
                        <option value="" selected>Year</option>
                        <option value="2022" class="fa">2022</option>
                        <option value="2021" class="fa">2021</option>
                        <option value="2020" class="fa">2020</option>
                        <option value="2019" class="fa">2019</option>
                        <option value="total" class="fa">Total</option>
                    </select>

                </div>
                <div v-if="(filter.year && filter.year !== 'total') && filterRender" class="select-box">
                    <select v-model="filter.month" @change="filterHandler" name="sample" id="sample" class="fa">
                        <option value="" selected>Month</option>
                        <option value="1" class="fa">Jan</option>
                        <option value="2" class="fa">Feb</option>
                        <option value="3" class="fa">March</option>
                        <option value="4" class="fa">April</option>
                        <option value="5" class="fa">May</option>
                        <option value="6" class="fa">June</option>
                        <option value="7" class="fa">July</option>
                        <option value="8" class="fa">Aug</option>
                        <option value="9" class="fa">Sep</option>
                        <option value="10" class="fa">Oct</option>
                        <option value="11" class="fa">Nov</option>
                        <option value="12" class="fa">Dec</option>
                    </select>
                </div>

                <div v-if="(filter.year || filter.month) && filterRender" style="margin-left: 20px" class="">
                    <button style="background-color:white; border: none;" @click="cancelFilter"><i
                            class='bx bx-x-circle' style="font-size:4rem ; color: #FF7519"></i></button>
                </div>
            </div>
            <h2 style="font-size:1.5rem ; font-weight: 700;">Transaction's</h2>
            <button style="margin-top: -40px;" type="button" class="btn btn-labeled btn-primay app" data-toggle="modal"
                data-target="#myModal">
                <span class="btn-label"><i class="glyphicon glyphicon-plus"></i></span></button>
            <div style="margin: 135px" v-if="loading">
                <Loader />
            </div>
            <article v-else class="">
                <section class="list">
                    <div v-if="data.length > 0" class="list-item" v-for="(item, index) in data"
                        :style="'--order:' + index + ';'">
                        <!-- {{ item }} -->
                        <div class="thumbnail">
                            <i v-if="item.budget_type === 'credit'" style="color: green"
                                class="glyphicon glyphicon-plus"></i>
                            <i v-else class="glyphicon glyphicon-minus"></i>
                        </div>
                        <div class="item-body">
                            <div style="display:flex">
                                <h4>{{ item.purpose }} </h4>
                                <p> &nbsp; {{ item.amount }} tk &nbsp; {{ item.date }}</p>
                            </div>
                            <p>{{ item.note }}</p>
                        </div>
                        <button style="border: none; background:white" @click="deleteBudget(item)"><i
                                style="color: #1b1796; font-size: 20px" class="glyphicon glyphicon-trash"></i></button>
                    </div>
                    <div v-else>
                        <h4>Transaction not found !</h4>
                    </div>
                </section>
            </article>
            <div class="modal" id="myModal" style="border-radius: 10px">
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <!-- Modal body -->
                        <div class="modal-body">
                            <form class="form-inline">
                                <div class="form-group">
                                    <label></label>
                                    <select v-model="purpose" class="select" id="sel1" placeholder="Amount">
                                        <option value="" selected>Enter purpose</option>
                                        <option v-for="(item, index) in purpose_data" :value="item">{{ item }}</option>
                                    </select>
                                </div>
                                <input v-model="amount" type="number" class="form-control my-form" placeholder="Amount">
                                <div class="form-group">
                                    <label></label>
                                    <select v-model="budget_type" class="select" id="sel1" placeholder="Amount">
                                        <option value="" selected>Transaction type</option>
                                        <option value="debit">Debit</option>
                                        <option value="credit">Credit</option>
                                    </select>
                                </div>
                                <input v-model="note" type="text" class="form-control my-form" placeholder="Note">
                                <button @click="addTransaction" class="btn btn-primary my-button"
                                    data-dismiss="modal">Submit</button>
                            </form>
                        </div>

                        <!-- Modal footer
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div> -->

                    </div>
                </div>
            </div>
        </div>

        <!-- <BarChart /> -->
    </div>
</template>
<script>
import { ref } from 'vue'
import NavBar from '../common/NavBar.vue';
import axios from 'axios'
import { data } from 'browserslist';
import Loader from '../common/Loader.vue';

export default {
    components: { NavBar, Loader },
    data() {
        return {
            filter: {
                year: '',
                month: ''
            },
            data: [],
            filterRender: false,
            loading: true,
            amount: '',
            purpose: '',
            budget_type: '',
            date: this.formatDate(),
            note: '',
            user_id: localStorage.getItem("id"),
            purpose_data: []
        };
    },
    // beforeRouteEnter(to, from, next) {
    //     next((vm) => {
    //         vm.from = from;
    //     });
    //     console
    // },
    methods: {
        formatDate() {
            var d = new Date(),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        },
        prepareCategoryData(data, that) {
            let loandata = [];
            data?.map(item => {
                if (item?.slug === "cash") {
                    loandata.push(item);
                }
            })
            loandata?.map((item) => {
                that.purpose_data.push(item?.name)
            })
        },
        async getPurpose() {
            this.loading = true;
            let that = this;
            await axios.get(`https://my-cash-app.herokuapp.com/category/${this.user_id}`)
                .then(async function (response) {
                    response?.data && (
                        that.prepareCategoryData(response?.data, that)
                    );
                    that.loading = false;
                }).catch(function (error) {
                    // handle error
                    that.loading = false;
                })
                .then(function () {
                    // always executed
                });
        },
        filterHandler() {
            if (this.filter.year === 'total') {
                let url = `https://my-cash-app.herokuapp.com/budget/${this.user_id}`;
                this.getAllTransection(url);
                return;
            }
            let month = parseInt(this.filter.month, 10);
            let year = parseInt(this.filter.year, 10);

            if (month > 0 && year > 0) {
                let url = `https://my-cash-app.herokuapp.com/budget/month/${this.user_id}/${month}/${year}`;
                this.getAllTransection(url)
            }
        },
        async deleteBudget(data) {
            this.$swal.fire({
                icon: 'warning',
                title: 'Delete',
                text: 'Are you sure delete the transaction?',
                showCancelButton: true,
                confirmButtonText: 'Delete',
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.loading = true;
                    let res = await axios.delete(`https://my-cash-app.herokuapp.com/budget/${data._id}`);
                    if (res?.data?.message) {
                        this.loading = false;
                        this.getAllTransection();
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
        async addTransaction() {
            const d = new Date();
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            const budget = {
                amount: this.amount,
                purpose: this.purpose,
                budget_type: this.budget_type,
                date: this.date,
                note: this.note,
                user_id: this.user_id,
                month,
                year
            }
            try {
                if (this.amount && this.purpose && this.budget_type && this.note) {
                    this.loading = true;
                    const result = await axios.post("https://my-cash-app.herokuapp.com/budget/create", budget);
                    if (result) {
                        this.loading = false;
                        // this.successMessage('Transaction', 'Transaction add successfully')
                        this.getAllTransection();
                    } else {
                        this.loading = false;
                        this.errorMessage();
                    }
                } else {
                    this.errorMessage('Somthing wents wrong');
                }
            } catch (err) {
                this.loading = false;
                this.errorMessage('Somthing wents wrong');
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
        },
        successMessage(title = 'Delete', message = 'Successfully deleted the budget item!') {
            this.$swal.fire(
                title,
                message,
                'success'
            );
        },
        cancelFilter() {
            this.filter.month = '';
            this.filter.year = '';
            this.filterRender = false;
            this.getAllTransection();
        },
        filtershow() {
            this.filterRender = !this.filterRender;
        },
        async getAllTransection(customUrl = '') {
            const d = new Date();
            let year = d.getFullYear();
            let month = d.getMonth() + 1;

            let that = this;
            that.loading = true;
            let url = customUrl.length > 1 ? customUrl : `https://my-cash-app.herokuapp.com/budget/month/${this.user_id}/${month}/${year}`;
            await axios.get(url)
                .then(async function (response) {
                    that.data = response.data.reverse();
                    that.loading = false;
                    // getEachMonthCostTotal(response.data);
                    // setLoading(false);
                }).catch(function (error) {
                    console.log(error)
                    that.loading = false;
                })
                .then(function () {
                });
        }
    },
    mounted() {
        if (localStorage.getItem("id")) {
            this.getAllTransection();
            this.getPurpose()
        } else {
            window.location.href = '/';
        }
    },
};
</script>

<style>
.select-box {
    display: inline-block;
    border-radius: 2px;
    box-shadow: 1px 4px 4px #FF7519;
    margin-left: 18px;
    max-height: 38px;
}

.fa {
    font-family: 'Lato', 'Font Awesome 5 Free', 'Font Awesome 5 Brands';
    font-weight: 900;
    padding: 1rem 2rem;
    color: #FF7519;
    border: none;
    font-size: medium;

}

.select {
    width: 308px;
    margin-left: 0px;
    padding: 15px;
    font-size: 18px;
    background-color: #ecf0f3;
    border: none;
    border-radius: 15px;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}

.container {
    color: #114273;
    font-family: sans-serif;
}

.app {
    margin-top: 0px;
    margin-bottom: 10px;
    margin-left: 280px;
}

article {
    background-color: #fff;
    box-shadow: 0 2px 12px 3px rgba(8, 8, 8, 0.15);
    border-radius: 0.5em;
    overflow: hidden;
    margin-bottom: 100px;
}

section.header {
    text-align: center;
    padding: 1em;
    background-color: #2260a0;
    color: #fff;
}

section.list {
    display: flex;
    flex-flow: row wrap;
    padding: 1em;
}

section.list .list-item {
    flex: 0 1 320px;
    /* 	border-bottom: 1px solid #ddd; */
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 0.5em;
    gap: 1.4em;
    border-bottom: 1px solid #f1f2f4;
}

.list-item h4 {
    font-size: 1.6em;
    font-weight: 900;
}

.list-item h4,
.list-item p {
    margin: 0 0 0.3em 0;
    font-size: 1.4em;
}

:is(.list-item) h4,
:is(.list-item) p {
    margin: 0 0 0.3em 0;
}

section.list .list-item .thumbnail {
    flex: 0 1 52px;
    font-size: 20px;
    text-align: center;
    color: white;
    background-color: #FF7519;
}

section.list .list-item .item-body {
    flex: 0 1 calc(100% - 52px);
}

/* Animation styles */

section.list .list-item {
    opacity: 0;
    animation: stagger ease-in 0.4s forwards 1;
    animation-delay: calc(var(--order) * 0.3s);
}

@keyframes stagger {
    from {
        opacity: 0;
        transform: translateY(80px);
    }

    to {
        opacity: 1;
        transform: translateY(0px);
    }
}

.my-form {
    max-width: 350px;
    min-height: 40px;
    margin: 20px;
    margin-left: 0px;
    padding: 25px;
    font-size: 18px;
    background-color: #ecf0f3;
    border-radius: 15px;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}

.my-button {
    width: 100%;
    height: 50px;
    background-color: #FF7519;
    margin-top: 30px;
    border-radius: 15px;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}

select:focus {
    outline: none;
}
</style>








