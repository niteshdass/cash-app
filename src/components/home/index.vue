<template>
    <div class="container" style="padding-bottom: 50px;max-width: 400px; border: 1px solid #f2f4f5;">
        <NavBar></NavBar>
        <div class="padding-filter">
            <div style="display:flex; margin-bottom: 20px;">
                <button @click="filtershow" style="margin-top: 5px; background-color: white; border: none;"><i
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
                    <button style="background-color:white;   border: none;" @click="cancelFilter"><i class='bx bx-x-circle'
                            style="font-size:4rem ; color: #FF7519"></i></button>
                </div>
            </div>
            <h2 style="font-size:1.5rem ; font-weight: 700;">Expenses summary</h2>
            <Pie v-if="data.length" :data="data" :labels="labels" />
            {{ data }}
            <!-- <PieChart v-if="data.length" :data="data" :labels="labels" /> -->
            <h2 style="font-size:1.5rem ; font-weight: 700;">Income | Expense | Savings</h2>
            <BarChart v-if="totalData.length > 0" :totalData="totalData" :label="totalLabels" />
            <!-- <BarChart /> -->
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import axios from 'axios'
import NavBar from '../common/NavBar.vue';
import BarChart from '../common/ChartBar.vue'
import PieChart from '../common/PiChart.js'
import Pie from '../common/Pie.vue';

export default {
    components: { BarChart, NavBar, PieChart, Pie },
    data() {
        return {
            filter: {
                year: '',
                month: ''
            },
            data: [],
            totalData: [''],
            totalLabels: ['Earn', 'Cost', 'Save'],
            labels: [],
            filterRender: false,
            colorArray: ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green',
                'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
                'silver', 'teal', 'white', 'yellow']
        };
    },
    methods: {
        filterHandler() {
            let month = parseInt(this.filter.month, 10);
            let year = parseInt(this.filter.year, 10);
            if (month > 0 && year > 0) {
                let url = `https://my-cash-app.herokuapp.com/budget/month/62b88f52d21490416a74fc91/${month}/${year}`;
                this.getAllTransection(url)
            }
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
        prepareAllTransactionData(data) {
            var flags = [], labels = [], amount = [], credit = [], l = data.length, i;
            let dTotal = 0, cTotal = 0;
            for (i = 0; i < l; i++) {
                if (data[i].budget_type === 'debit') {
                    dTotal = dTotal + data[i]?.amount;
                    if (flags[data[i].purpose]) continue;
                    flags[data[i].purpose] = true;
                    const result = data.filter(budget => budget.purpose === data[i].purpose);
                    const sum = result.reduce((accumulator, object) => {
                        return accumulator + object.amount;
                    }, 0);
                    labels.push(data[i].purpose);
                    amount.push(sum)
                    // output.push({
                    //     name: data[i].purpose, amount: sum, legendFontColor: this.colorArray[i],
                    //     legendFontSize: 12, color: this.colorArray[i]
                    // });
                } else {
                    cTotal = cTotal + data[i]?.amount;
                    if (flags[data[i].purpose]) continue;
                    flags[data[i].purpose] = true;
                    const result = data.filter(budget => budget.purpose === data[i].purpose);
                    const sum = result.reduce((accumulator, object) => {
                        return accumulator + object.amount;
                    }, 0);
                    credit.push({
                        name: data[i].purpose, amount: sum, legendFontColor: this.colorArray[i],
                        legendFontSize: 12, color: this.colorArray[i]
                    });
                }
            }
            this.data = amount;
            this.labels = labels
            let totalData = [cTotal, dTotal, cTotal - dTotal]
            this.totalData = totalData;
        },
        async getAllTransection(customUrl = '') {
            let that = this;
            let url = customUrl.length > 1 ? customUrl : `https://my-cash-app.herokuapp.com/budget/62b88f52d21490416a74fc91`;
            await axios.get(url)
                .then(async function (response) {
                    that.prepareAllTransactionData(response.data.reverse());
                    // getEachMonthCostTotal(response.data);
                    // setLoading(false);
                }).catch(function (error) {
                    console.log(error)
                })
                .then(function () {
                });
        }
    },
    mounted() {
        this.getAllTransection()
    },
};
</script>

<style>
.select-box {
    display: inline-block;
    border-radius: 10px;
    box-shadow: 3px 2px 5px #FF7519;
    margin-left: 18px;
    max-height: 38px;
}

.fa {
    font-family: 'Lato', 'Font Awesome 5 Free', 'Font Awesome 5 Brands';
    font-weight: 900;
    padding: 1rem 2rem;
    color: #FF7519;
    border: none;

}
</style>