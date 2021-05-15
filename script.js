new Vue({
    el: "#app",
    data: {
        contentResearch: "ciao",
        movieList: [],
        tvSeriesList: [],
        onLoad: "",
        researchFailed: false,
    },

    methods: {
        makeAxiosSearch(searchEntity) {

            const axiosOptions = {
                params: {
                    api_key: "8ba1bb4e00bce0b3ac322114c49aba09",
                    query: this.contentResearch,
                    language: "it-IT",
                }
            }

            axios.get("https://api.themoviedb.org/3/search/" + searchEntity, axiosOptions)
                .then((resp) => {
                    if (searchEntity === "movie") {
                        this.movieList = resp.data.results

                    } else if (searchEntity === "tv") {
                        this.tvSeriesList = resp.data.results                    
                    }

                    if(this.movieList.length === 0 && this.tvSeriesList.length === 0) {
                        this.researchFailed = true
                    } else {
                        this.researchFailed = false
                    }
                })
        },

        onUserSearch() {
            this.makeAxiosSearch("movie");
            this.makeAxiosSearch("tv");
            this.onLoad = "ricercati:"
        },

        getFlag(language) {

            const flagMap = {
                es: "es.svg",
                fr: "fr.svg",
                it: "it.svg",
                ja: "jp.svg",
                en: "gb-eng.svg",
            }

            if (Object.keys(flagMap).includes(language)) {
                return flagMap[language]
            } else {
                return false
            }
        },

        roundVote(vote) {
            let voteToStars = vote/2;
           
            return Math.round(voteToStars)
        },

        createEmptyStar(vote) {
            let voteToStars = vote / 2;

            return 5 - Math.round(voteToStars) 
        }
    },

    mounted() {
        this.onUserSearch();
        this.contentResearch = ""
        this.onLoad = "consigliati:"  
    }
})