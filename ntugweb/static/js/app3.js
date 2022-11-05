
var app = new Vue({
    el: '#app',
    data: {
      surveys:[],
      newsurvey:{},
      currentsurvey:{},
      raffleInterval:undefined,
      winner:-1,
      raffling:false,
      showNav: false,
      hyperscalers:[
        {name:"hyp_azure",friendly:"Azure"},
        {name:"hyp_gcp",friendly:"GCP"},
        {name:"hyp_aws",friendly:"AWS"}],
      netapps:[
        {name:"na_ontap",friendly:"ONTAP"},
        {name:"na_cloudmanager",friendly:"CloudManager"},
        {name:"na_cvo",friendly:"CVO"},
        {name:"na_cvs_anf",friendly:"CVS/ANF"},
        {name:"na_cloud_insight",friendly:"Cloud Insight"},
        {name:"na_cloudsync",friendly:"CloudSync"}],
      grades:[
        {name:"None",value:0},
        {name:"< 1 year",value:1},
        {name:"1-3 years",value:2},
        {name:"> 3 years",value:3}]
    },
    methods:{
        add_new_survey:function(){
            axios.post("/api/v1/surveys",this.newsurvey)
                .then(this.fetch_surveys());
        },
        fetch_surveys:function(){
            var self = this // create a closure to access component in the callback below
            axios.get("/api/v1/surveys")
                .then(response => {this.surveys = response.data})
            this.newsurvey={};
            this.reset_survey_form();
        },
        reset_survey_form:function(){
            if(this.$refs.surveyform){
                this.$refs.surveyform.reset();
            }
        },
        delete_survey:function(id){
            axios.delete("/api/v1/surveys/"+id)
                .then(this.fetch_surveys());
        },
        select_survey:function(survey){
            this.$cookies.set('survey',survey.id);
            this.currentsurvey=survey.name;
        },
        logout:function(){
            this.$cookies.remove('survey');
            this.currentsurvey="";
        },
        update:function(obj, prop, event) {
            Vue.set(obj, prop, event.target.value);
        },
        pickWinner:function(){
          if(this.winner<0)
            this.winner = Math.floor(Math.random()*this.surveys.length); // pick first random
          if((this.winner+1) == this.surveys.length){ // then spin the wheel
            this.winner=0
          }else{
            this.winner++
          };
        },
        excludeNetapp:function(){
          var watchdog=0;
          while(this.surveys[this.winner].company.trim().toUpperCase()=="NETAPP" || watchdog>150){
            console.log("Picking next (non netapp)")
            this.pickWinner()
            watchdog++
          }
          if(watchdog==150){
            console.log("Only netapp winners...")
          }else{
            console.log("Found non netapp winner")
          }

        },
        raffleAnimate:function(next=1){
          if(this.raffling){
            var ref=this
            this.pickWinner()
            var b = 1.05 // increment rate
            next++ // next sample
            var interval=parseInt(10*Math.pow(b,next))
            console.log(next + " -> " + interval)
            setTimeout(function(){ref.raffleAnimate(next)},interval);
          }
        },
        raffle:function(){
          var ref=this
          this.pickWinner() // pick one to start
          // keep raffling for visual effect
          this.raffling=true;
          setTimeout(function(){
            ref.raffling=false;
            ref.excludeNetapp() //
          },10000)          // stop raffle after x seconds
          this.raffleAnimate()  // make slow down animation
        }
    },
    mounted() { // when the Vue app is booted up, this is run automatically.
        this.fetch_surveys();
        if(this.$cookies.isKey('survey')){
            var url = "/api/v1/surveys/"+ this.$cookies.get("survey");
            axios.get(url)
                .then(response => {this.currentsurvey=response.data[0]});
        }
    }
})
