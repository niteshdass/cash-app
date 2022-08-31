<template>
    <div class="container" style="max-width: 400px; border: 1px solid #f2f4f5;">
        <NavBar></NavBar>
        <div style="padding-top: 50px">
            <div style="display:flex; margin-bottom: 20px;">
                <button @click="filtershow" style="margin-top: 5px; background-color: white;"><i class='bx bxs-filter-alt' style="color: #FF7519; font-size: 3rem;"></i></button>
                <div v-if="filterRender" class="select-box">
                    <select v-model="filter.year" @change="filterHandler"  name="sample" id="sample" class="fa">
                        <option value="" selected>Year</option>
                        <option value="2022" class="fa">2022</option>
                        <option value="2021" class="fa">2021</option>
                        <option value="2020" class="fa">2020</option>
                        <option value="2019" class="fa">2019</option>
                        <option value="total" class="fa">Total</option>
                    </select>

                </div>
                <div v-if="(filter.year && filter.year !== 'total') && filterRender " class="select-box">
                    <select v-model="filter.month" @change="filterHandler" name="sample" id="sample" class="fa">
                        <option value="" selected>Year</option>
                        <option value="jan" class="fa">jan</option>
                        <option value="feb" class="fa">feb</option>
                        <option value="march" class="fa">march</option>
                        <option value="april" class="fa">april</option>
                    </select>
                </div>

                <div v-if="(filter.year || filter.month) && filterRender" style="margin-left: 20px" class="">
                    <button style="background-color:white" @click="cancelFilter"><i class='bx bx-x-circle' style="font-size:4rem ; color: #FF7519"></i></button>
                </div>
            </div>
            <h2 style="font-size:1.5rem ; font-weight: 700;">Expenses summary</h2>
            <PieChart />
            <BarChart />
            <BarChart />

        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import NavBar from '../common/NavBar.vue';
import BarChart from '../common/ChartBar.vue'
import PieChart from '../common/PiChart.js'

export default {
  components: { BarChart, NavBar, PieChart },
  data() {
    return {
      filter: {
           year: '',
           month: ''
      },
      filterRender: false
    };
  },
  methods: {
    filterHandler () {
        console.log('hello', this.filter)
    },
    cancelFilter () {
        console.log('cancel')
    },
    filtershow () {
        this.filterRender = !this.filterRender;
    }
  },
  mounted() {
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