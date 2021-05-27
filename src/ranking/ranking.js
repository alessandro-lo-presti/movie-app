import { writeMainHTML } from "../common/common";
import { comperator } from "../common/comparetor";
import { movieApiService } from "../services/movieApiService";
import "./ranking.scss"

const recordTemplate = (movie, index) => `
    <div class="movie-table-record">

        <div class="movie-id">
           ${index + 1}
        </div>

        <div class="movie-name">
            ${movie.name}
        </div>

        <div class="movie-rating">
            ${movie.rating}
        </div>

        <div class="movie-views">
            ${movie.views}
        </div>
    
    </div>
`;

const buildRanking = movieList => `
    <div class="movie-table">

        <div class="movie-table-record">

            <div class="movie-id">
                <h2>Id</h2>
            </div>

            <div class="movie-name">
                <h2>
                    Nome
                    <span id="movie-name-button">&#43;</span>
                    <span id="movie-name-reverse-button">&#45;</span>
                </h2>
            </div>

            <div class="movie-rating">
                <h2>
                    Voto
                    <span id="movie-rating-button">&#43;</span>
                    <span id="movie-rating-reverse-button">&#45;</span>
                </h2>
            </div>

            <div class="movie-views">
                <h2>
                    Visual
                    <span id="movie-views-button">&#43;</span>
                    <span id="movie-views-reverse-button">&#45;</span>
                </h2>
            </div>

        </div>

        ${movieList.map((movie, index) => recordTemplate(movie, index)).join("")}
    </div>
`;

export const rankingPage = () => {
    movieApiService.movieList()
        .then(movielist => {
            writeMainHTML(buildRanking(movielist));

            //ordina nomi
            document.getElementById('movie-name-button').addEventListener('click', event => {
                writeMainHTML(buildRanking(movielist.sort(comperator.orderByName)));
            });

            document.getElementById('movie-name-reverse-button').addEventListener('click', event => {
                writeMainHTML(buildRanking(movielist.sort(comperator.orderByName).reverse()));
            });

            //ordina rating
            document.getElementById('movie-rating-button').addEventListener('click', event => {
                writeMainHTML(buildRanking(movielist.sort(comperator.orderByRating)));
            });

            document.getElementById('movie-rating-reverse-button').addEventListener('click', event => {
                writeMainHTML(buildRanking(movielist.sort(comperator.orderByRating).reverse()));
            });

            //ordina views
            document.getElementById('movie-views-button').addEventListener('click', event => {
                writeMainHTML(buildRanking(movielist.sort(comperator.orderByViews)));
            });

            document.getElementById('movie-views-reverse-button').addEventListener('click', event => {
                writeMainHTML(buildRanking(movielist.sort(comperator.orderByViews).reverse()));
            });

        })
        .catch(() => writeMainHTML("Errore ricezione dati"))

};