import {
    FETCH_ALL_MEDIAS_REQUEST, FETCH_ALL_MEDIAS_SUCCESS, FETCH_ALL_MEDIAS_FAILURE,
    FETCH_MEDIA_SUCCESS, FETCH_MEDIA_SUCCESS2, FETCH_MEDIA_SUCCESS3, FETCH_MEDIA_REQUEST, FETCH_MEDIA_FAILURE,
    SEARCH_SUCCESS, SEARCH_REQUEST, SEARCH_FAILURE,
    ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, CLEAR_WISHLIST
} from "./actionTypes"

const initialState = {
    isLoading: false,
    error: null,
    medias: [],
    media1: [],
    media2: [],
    genre: [],
    currmedia: "",
    cast: [],
    crew: [],
    main: [],
    episodes: [],
    tv:[],
    movie:[],
    anime:[],
    english:[],
    regional:[]
}

export const mediasReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_ALL_MEDIAS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case FETCH_ALL_MEDIAS_SUCCESS:
            var tv = payload.filter(payload => payload.media_type == "tv");
            var movie = payload.filter(payload => payload.media_type == "movie")
            var anime = payload.filter(payload => payload.original_language == "ja")
            var english = payload.filter(payload => payload.original_language == "en")
            var regional = payload.filter(payload => payload.original_language == "ml" || payload.original_language == "ta" || payload.original_language == "hi")
            tv.length=15
            movie.length=15
            anime.length=15
            english.length=15
            regional.length=15
            const carmain = []
            for (var i = 0; i < payload.length; i++) {
                if (payload[i].type == "main")
                    carmain.push(payload[i])
            }
            // console.log("AA", carmain,tv,movie,anime,english,regional)
            const media1 = [...payload].sort((a, b) => b.vote_average - a.vote_average)
            const media2 = [...media1]
            media1.length = 20
            media2.length = 24

            return {
                ...state,
                main: carmain,
                medias: payload,
                media1: media1,
                media2: media2,
                tv:tv,
                movie:movie,
                anime:anime,
                english:english,
                regional:regional,
                isLoading: false
            }

        case FETCH_ALL_MEDIAS_FAILURE:
            return {
                ...state,
                error: true,
                isLoading: false
            }


        case FETCH_MEDIA_REQUEST: {
            // console.log("request")
            return {
                ...state,
                isLoading: true,
                error: null
            }
        }

        case FETCH_MEDIA_SUCCESS: {
            // console.log(payload)
            const genre = []
            const genres = [{
                "id": 28,
                "name": "Action"
            },
            {
                "id": 12,
                "name": "Adventure"
            },
            {
                "id": 16,
                "name": "Animation"
            },
            {
                "id": 35,
                "name": "Comedy"
            },
            {
                "id": 80,
                "name": "Crime"
            },
            {
                "id": 99,
                "name": "Documentary"
            },
            {
                "id": 18,
                "name": "Drama"
            },
            {
                "id": 10751,
                "name": "Family"
            },
            {
                "id": 14,
                "name": "Fantasy"
            },
            {
                "id": 36,
                "name": "History"
            },
            {
                "id": 27,
                "name": "Horror"
            },
            {
                "id": 10402,
                "name": "Music"
            },
            {
                "id": 9648,
                "name": "Mystery"
            },
            {
                "id": 10749,
                "name": "Romance"
            },
            {
                "id": 878,
                "name": "Science Fiction"
            },
            {
                "id": 10770,
                "name": "TV Movie"
            },
            {
                "id": 53,
                "name": "Thriller"
            },
            {
                "id": 10752,
                "name": "War"
            },
            {
                "id": 37,
                "name": "Western"
            },
            {
                "id": 10759,
                "name": "Action & Adventure"
            },
            {
                "id": 16,
                "name": "Animation"
            },
            {
                "id": 35,
                "name": "Comedy"
            },
            {
                "id": 80,
                "name": "Crime"
            },
            {
                "id": 99,
                "name": "Documentary"
            },
            {
                "id": 18,
                "name": "Drama"
            },
            {
                "id": 10751,
                "name": "Family"
            },
            {
                "id": 10762,
                "name": "Kids"
            },
            {
                "id": 9648,
                "name": "Mystery"
            },
            {
                "id": 10763,
                "name": "News"
            },
            {
                "id": 10764,
                "name": "Reality"
            },
            {
                "id": 10765,
                "name": "Sci-Fi & Fantasy"
            },
            {
                "id": 10766,
                "name": "Soap"
            },
            {
                "id": 10767,
                "name": "Talk"
            },
            {
                "id": 10768,
                "name": "War & Politics"
            },
            {
                "id": 37,
                "name": "Western"
            }
            ]
            for (var i = 0; i < payload.genre_ids.length; i++) {
                for (var j = 0; j < genres.length; j++) {
                    if (payload.genre_ids[i] == genres[j].id) {
                        genre.push(genres[j].name)
                        break
                    }
                }
            }
            // console.log(genre)
            return {
                ...state,
                currmedia: payload,
                genre: genre
            }
        }

        case FETCH_MEDIA_SUCCESS2: {
            // console.log(payload)
            var directors = []
            var actors = []
            for (var i = 0; i < payload.cast.length; i++) {
                if (payload.cast[i].known_for_department == "Acting")
                    actors.push(payload.cast[i].name)
            }
            for (var i = 0; i < payload.crew.length; i++) {
                if (payload.crew[i].known_for_department == "Directing")
                    directors.push(payload.crew[i].name)
            }
            directors = [...new Set(directors)]
            actors = [...new Set(actors)]

            actors.length = 5
            // console.log(actors, directors)

            return {
                ...state,
                cast: actors,
                crew: directors,
                isLoading: false
            }
        }

        case FETCH_MEDIA_SUCCESS3: {
            // console.log(payload)
            var episodes = []

            for (var i = 0; i < payload.episodes.length; i++) {
                var temp = {
                    title: payload.episodes[i].name,
                    overview: payload.episodes[i].overview,
                    image: "https://image.tmdb.org/t/p/w500" + payload.episodes[i].still_path,
                    released: payload.episodes[i].air_date
                }
                episodes.push(temp)
            }
            // console.log(episodes)

            return {
                ...state,
                episodes: episodes
            }
        }

        case FETCH_MEDIA_FAILURE:
            return {
                ...state,
                error: true,
                isLoading: false
            }

      



        default: return state
    }
}
