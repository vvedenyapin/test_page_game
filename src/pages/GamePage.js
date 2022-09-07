/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom"
import { getGames } from "../api";

export const GamePage = () => {
    const location = useLocation();
    const { gameCategory, gameName } = useParams();
    const [gameTitle, setGameTitle] = useState(location.state?.title);

    useEffect(() => {
        if (!location.state?.title) {
            const gameId = `${gameCategory}/${gameName}`
            getGames()
                .then((res) => {
                    const games = res.data;
                    setGameTitle(games[gameId].title)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [])

    return (
        <div style={{display: 'flex'}}>
            <Link to={'/'} style={{margin: '1rem', border: '1px solid #696969', textDecoration: 'none', padding: '5px'}}>
                На главную
            </Link>
            <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                <h2>{gameTitle}</h2>
            </div>
        </div>
    )
}