
var app = new Vue({
    el: '#app',
    data: {
      surveys:[],
      newsurvey:{},
      currentsurvey:{},
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
