export const getJoke = async () => {
    const data = await fetch("https://sv443.net/jokeapi/v2/joke/Any?type=single")
        .then((res) => res.json());


    // console.log(data)
    return data.joke;
}
