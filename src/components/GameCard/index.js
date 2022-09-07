import { Link } from 'react-router-dom';

import './index.css';

export const GameCard = ({id, title}) => {
    return (
        <Link className="gamecard" to={`/game/${id}`} state={{ title }}>
            <img src={`https://cdn2.softswiss.net/i/s2/${id}.png`} className="gamecard_img" alt="game card img" />
            <div className="gamecard_title">
                {title}
            </div>
        </Link>
    )
}