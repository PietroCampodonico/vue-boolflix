new Vue({
    el: "#app",
    data: {
        contentResearch: "ciao",
        movieList: [],
        tvSeriesList: [],
        castMembers: [],
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
            };

            //Crea due array, uno per le serie tv e uno per i film    

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
                });

            //Riempie un array coi membri del cast dei vari film/serie tv
            
        },

        getCast(media) {

            const axiosOptions = {
                params: {
                    api_key: "8ba1bb4e00bce0b3ac322114c49aba09",
                }
            };

            const mediaType = media.name ? "tv" : "movie";

            axios.get(`https://api.themoviedb.org/3/${mediaType}/${media.id}/credits`, axiosOptions)
                .then((resp) => {
                    
                    this.$set(media, "castMembers", resp.data.cast);
                });
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

        voteInStars(media) {
            const vote = Math.round(media.vote_average / 2);
            const toReturn = [];

            for (let i = 1; i <= 5; i++) {
                toReturn.push(i <= vote)
            }

            return toReturn;
        }
    },

    mounted() {
        this.onUserSearch();
        this.contentResearch = ""
        this.onLoad = "consigliati:"  
    }
})