<template>
  <div class="posts">
    <h1>Donate Disaster Supplies</h1>
    <input type="radio" id="one" value="Water" v-model="picked">
    <label for="one">Water</label>
    <br>
    <input type="radio" id="two" value="Food" v-model="picked">
    <label for="two">Food</label>
    <br>
    <input type="radio" id="three" value="First aid kit" v-model="picked">
    <label for="three">First aid kit</label>
    <br>
    <input type="radio" id="four" value="Tent" v-model="picked">
    <label for="four">Tent</label>
    <br>
    <input type="radio" id="five" value="Clothes" v-model="picked">
    <label for="five">Clothes</label>
    <br>
    <input type="radio" id="six" value="Other" v-model="picked">
    <label for="six">Other</label>
    <br>
    <br>
    <span v-if="picked">
      Picked:
      <b>{{ picked }}</b>
    </span>
    <br>
    <br>
    <!--span><b>{{ response }}</b></span><br /-->
    <form v-on:submit="castBallot">
      <!-- <input type="text" value="2sww593dc034wb2twdk91r" v-model="input.electionId"  >
      <br>-->
      <span>Enter the number of unit of the supply you want to donate: </span>
      <input type="text" v-model="input.donateNum" placeholder="Enter number of unit">
      <br>
      <br>
      <input type="text" v-model="input.voterId" placeholder="Enter DonatorId">
      <br>
      <br>
      <br>
      <input type="submit" value=" Donate ">
      <br>
    </form>

    <br>
    <span v-if="response">
      <b>{{ response }}</b>
    </span>
    <br>
    <vue-instant-loading-spinner id="loader" ref="Spinner"></vue-instant-loading-spinner>
  </div>
</template>

<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
  name: "response",
  data() {
    return {
      input: {},
      picked: null,
      response: null
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    async castBallot() {
      await this.runSpinner();

      const electionRes = await PostsService.queryWithQueryString('election');

      let electionId = electionRes.data[0].Key;

      console.log("picked: ");
      console.log(this.picked);
      console.log("number: ");
      console.log(this.input.donateNum);
      console.log("DonatorId: ");
      console.log(this.input.voterId);
      this.response = null;

 

      //error checking for making sure to vote for a valid party
      if (this.picked === null ) {
        console.log('this.picked === null')

        let response = "You have to pick a supply to donate!";
        this.response = response;
        await this.hideSpinner();
      
      } else if (this.input.donateNum == 0){
        let response = "You have to donate at least one unit of the item!";
        this.response = response;
        await this.hideSpinner();
      }else if (this.input.voterId === undefined) {
        console.log('this.DonatorId === undefined')

        let response = "You have to enter your DonatorId to donate an item!";
        this.response = response;
        await this.hideSpinner();

      } else {

        const apiResponse = await PostsService.castBallot(
          electionId,
          this.input.voterId,
          this.picked
        );

        console.log('apiResponse: &&&&&&&&&&&&&&&&&&&&&&&');
        console.log(apiResponse);

        if (apiResponse.data.error) {
          this.response= apiResponse.data.error;
          await this.hideSpinner();
        } else if (apiResponse.data.message) {
          this.response= `Could not find donator with donator Id "${this.input.voterId}"
            in the state. Make sure you are entering a valid donatorId`;
          await this.hideSpinner();
        } 
        else {
          let response = `Successfully recorded donation of ${this.picked}  
            for the disaster area with donatorId ${apiResponse.data.voterId}. Thanks for 
            your help and support!`;

          this.response = response;

          console.log("cast ballot");
          console.log(this.input);
          await this.hideSpinner();
        }
      }
    },
    async runSpinner() {
      this.$refs.Spinner.show();
    },
    async hideSpinner() {
      this.$refs.Spinner.hide();
    }
  }
};
</script>
