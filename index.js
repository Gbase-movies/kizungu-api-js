import express from "express";
import { getvmovie, getvserie } from "./src/vidsrcto.js";


const port = 3000;

const app = express()

app.get('/', (req, res) => {
    res.status(200).json({
        intro: "Welcome to the unofficial vidsrc provider: check the provider website @ https://swaflix.xyz/ ",
        routes: {
            movie: "/autoembed/:movieTMDBid",
            show: "/vidsrcxyz/:showTMDBid?s=seasonNumber&e=episodeNumber"
        },
        author: "This api is developed and created by Swafbase"
    });
});

app.get('/vidsrc/:tmdbId', async (req, res) => {
    const id = req.params.tmdbId;
    const season = req.query.s;
    const episode = req.query.e;

    try {
        if (season && episode) {
            const vidsrcresponse = await getvserie(id, season, episode);
            res.status(200).json(vidsrcresponse);
        } else {
            const vidsrcresponse = await getvmovie(id);
            res.status(200).json(vidsrcresponse);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
