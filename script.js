new Vue({
    el: "#app",
    data: {
        contentResearch: "",
        movieList: [],
        tvSeriesList: [],
        
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
                        console.log(this.movieList)

                    } else if (searchEntity === "tv") {
                        this.tvSeriesList = resp.data.results
                        console.log(this.tvSeriesList)

                    }
                })
           
        },

        onUserSearch() {
            this.makeAxiosSearch("movie");
            this.makeAxiosSearch("tv");
        },

        getFlag(language) {

            const flagMap = {
                es: "es.svg",
                fr: "fr.svg",
                it: "it.svg",
                jp: "jp.svg",
                en: "gb-eng.svg",
            }

            if (Object.keys(flagMap).includes(language)) {
                return flagMap[language]
            } else {
                return false
            }
        }
    }
})