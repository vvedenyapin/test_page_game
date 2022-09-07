import axios from 'axios';

export const getGames = async () => {
    return await axios.get('/games_test.json')
}