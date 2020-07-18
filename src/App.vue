<template>
  <div id="app" :class="[sun ? 'sun' : 'drop']">
    <div class="container sunC">
      <img src="./assets/sun.png" alt="sun" v-if="sun">
      <img src="./assets/drop.png" alt="rain" v-else>
      <p class="deg">{{degree}}<em>Degrees</em></p>
      <p class="summary">{{summary}}</p>
      <p class='time'>{{hr}}:{{min | addZero }}</p>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    addZero(val){
      if(val < 10){
        return "0" + val
      }
      return val
    }
  },
  name: 'app',
  data () {
    return {
      sun: null,
      degree: "",
      summary: "",
      min: "",
      hr: ""
    }
  },
  created(){
    // Using the geolocation api
      let lat = null;
      let lng = null;
      const onPosReceived = (position) => {
            lat = position.coords.latitude,
            lng = position.coords.longitude
            console.log(lat,lng)

            this.$http.get(`https://dark-sky.p.rapidapi.com/${lat},${lng}?lang=en&units=auto`, {
                "method": "GET",
                "headers": {
                  "x-rapidapi-host": "dark-sky.p.rapidapi.com",
                  "x-rapidapi-key": "501de50467mshe90eae9978833ebp19b9c9jsn6a106670ebde"
                }
              })
              .then(response => {
                if(response.body.currently.icon === "clear-day"){
                  this.sun = true;
                }else{
                  this.sun = false;
                }

                this.degree = response.body.currently.temperature;
                this.summary = response.body.hourly.summary;

                this.min = Math.round(response.body.currently.time / (1000*60) % 60);
                this.hr  = Math.round(response.body.currently.time / (1000*60*60) % 24);
              })
              .catch(err => {
                console.log(err);
              })
            }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onPosReceived)
      }
  }
}
</script>

<style scoped>
#app{
  width: 100%;
  height: 100vh;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  background-color: orangered;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.sun{
  background-color: orangered;
}
.drop{
  background-color: royalblue !important;
}
.container{
  margin: 0 auto;
  text-align: center;
  background-color: #fff;
  height: 500px;
  border-radius: 20px;
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #f5f3f7;
  padding: 10px;
}

 .container img{
   height: 80px;
 }
 .deg{
   font-size: 40px;
   display: flex;
   flex-direction: column;
   margin: 10px;
 }

 .deg em{
   font-size: 15px;
 }
 .time{
   font-size: 25px;
 }
</style>
