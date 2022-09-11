<template>
    <div class="text">
        <NavBar></NavBar>
        <div style="display:flex" @click="settings = !settings">
            <h2 v-if="settings" style="font-size:1.5rem ; font-weight: 700; margin-left: 10px; color: #FF7519;"> Borrower Settings
                <i style="font-size: large;" class="glyphicon glyphicon-arrow-right"></i>
            </h2>
            <h2 v-else style="font-size:1.5rem ; font-weight: 700; margin-left: 10px; color: #FF7519;"> 
                <i style="font-size: large;" class="glyphicon glyphicon-arrow-left"></i>
                Transaction Settings
            </h2>
        </div>
        <article v-if="settings" class="leaderboard">
            <div style="display:flex">
                <h2 style="font-size:1.5rem ; font-weight: 700; margin-left: 10px;">Purpose list of your transaction</h2>
                <button style="    margin-left: 92px;" class="plus-button" @click="deleteBudget(item)">
                    <i style="font-size: large;" class="glyphicon glyphicon-plus"></i>
                </button>
            </div>
            <main class="leaderboard__profiles">
                <article class="leaderboard__profile">
                    <img src="./profile.png" alt="Mark Zuckerberg" class="leaderboard__picture">
                    <span class="leaderboard__name">Mark Zuckerberg</span>
                    <span class="leaderboard__value">9.9<span>B</span></span>
                </article>

                <article class="leaderboard__profile">
                    <img src="https://randomuser.me/api/portraits/men/97.jpg" alt="Dustin Moskovitz"
                        class="leaderboard__picture">
                    <span class="leaderboard__name">Dustin Moskovitz</span>
                    <span class="leaderboard__value">
                        <button style="border: none; background:white" @click="deleteBudget(item)"><i
                                class="glyphicon glyphicon-trash"></i></button>
                    </span>
                </article>
            </main>
        </article>
        <article v-else class="leaderboard">
            <div style="display:flex">
                <h2 style="font-size:1.5rem ; font-weight: 700; margin-left: 10px;">borrower's list</h2>
                <button style="    margin-left: 212px;" class="plus-button" @click="deleteBudget(item)">
                    <i style="font-size: large;" class="glyphicon glyphicon-plus"></i>
                </button>
            </div>
            <main class="leaderboard__profiles">
                <article class="leaderboard__profile">
                    <img src="./profile.png" alt="Mark Zuckerberg" class="leaderboard__picture">
                    <span class="leaderboard__name">Mark Zuckerberg</span>
                    <span class="leaderboard__value">9.9<span>B</span></span>
                </article>

                <article class="leaderboard__profile">
                    <img src="https://randomuser.me/api/portraits/men/97.jpg" alt="Dustin Moskovitz"
                        class="leaderboard__picture">
                    <span class="leaderboard__name">Dustin Moskovitz</span>
                    <span class="leaderboard__value">
                        <button style="border: none; background:white" @click="deleteBudget(item)"><i
                                class="glyphicon glyphicon-trash"></i></button>
                    </span>
                </article>
            </main>
        </article>
    </div>
</template>
<script>
import NavBar from '../common/NavBar.vue';
export default {
    components: { NavBar },
    data () {
        return {
            settings: true
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
    margin-left: 12px;
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
}
.text {
    margin: 0 auto;
    max-width: 400px;
}
</style>