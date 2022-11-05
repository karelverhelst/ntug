
var app = new Vue({
    el: '#app',
    data: {
      reporters:[],
      articles:[],
      newreporter:"",
      newarticle:{},
      currentreporter:"",
      showNav: false
    },
    methods:{
        add_new_reporter:function(){
            axios.post("/api/v1/reporters",{name:this.newreporter})
                .then(this.fetch_reporters());
        },
        add_new_article:function(){
            Vue.set(this.newarticle,"reporter_id",this.currentreporter.id);
            axios.post("/api/v1/articles",this.newarticle)
                .then(this.fetch_articles());
        },        
        fetch_reporters:function(){
            var self = this // create a closure to access component in the callback below
            axios.get("/api/v1/reporters")
                .then(response => {this.reporters = response.data})
            this.newreporter="";
        },
        reset_article_form:function(){
            if(this.$refs.articleform){
                this.$refs.articleform.reset();
            }
        },
        fetch_articles:function(){
            var self = this // create a closure to access component in the callback below
            axios.get("/api/v1/articles")
                .then(response => {this.articles = response.data})
            this.newarticle={};
            this.reset_article_form();
        },        
        delete_reporter:function(id){
            axios.delete("/api/v1/reporters/"+id)
                .then(this.fetch_reporters());
        },
        delete_article:function(id){
            axios.delete("/api/v1/articles/"+id)
                .then(this.fetch_articles());
        },        
        select_reporter:function(reporter){
            this.$cookies.set('reporter',reporter.id);
            this.currentreporter=reporter;
        },
        logout:function(){
            this.$cookies.remove('reporter');
            this.currentreporter="";
        },
        update:function(obj, prop, event) {
            Vue.set(obj, prop, event.target.value);
        }
    },
    mounted() { // when the Vue app is booted up, this is run automatically.
        this.fetch_reporters();
        this.fetch_articles();
        if(this.$cookies.isKey('reporter')){
            var url = "/api/v1/reporters/"+ this.$cookies.get("reporter");
            axios.get(url)
                .then(response => {this.currentreporter=response.data[0]});
        }
    }    
})
