/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getGames } from '../api';
import { GameCard } from '../components/GameCard';
import { Selector } from '../components/Selector';
import { Button } from '../components/Button';
import { setCurrencyFilter, setProviderFilter } from '../store/slices/filterSlice';

const checkEqualsIfOption = (value, option) => {
    return option ? value === option : true
}

const checkOwnIfOption = (object, option) => {
    return option ? Object.hasOwn(object, option) : true
}

export const HomePage = () => {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filter);
    const [gamesList, setGamesList] = useState(null);
    const [filteredGames, setFilteredGames] = useState(null);
    const [visibleGamesCount, setVisibleGames] = useState(12);
    const [filtersOptions, setFiltersOptions] = useState(null);

    useEffect(() => {
        getGames()
            .then((res) => {
                const games = Object.entries(res.data);
                const sortedGames = Object.fromEntries(
                    games.sort(([, a],[, b]) => {
                        return a.collections.popularity - b.collections.popularity
                    })
                );

                let currencyOptions = []
                games.forEach(game => Object.keys(game[1].real).forEach(
                    currency => currencyOptions.indexOf(currency) === -1 && currencyOptions.push(currency))
                );
                const providerOptions = [...new Set(Array.from(games, (val) => val[1].provider))];
                
                setFiltersOptions({currencyOptions, providerOptions});
                setGamesList(sortedGames);
                setFilteredGames(filterGames(sortedGames));
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        if (gamesList) {
            setFilteredGames(filterGames(gamesList));
            setVisibleGames(12);
        }
    }, [filters])

    const filterGames = useCallback((gamesList) => {
        let games = []
        Object.keys(gamesList).forEach(
            gameId => {
                if (
                    checkOwnIfOption(gamesList[gameId].real, filters.currency) && 
                    checkEqualsIfOption(gamesList[gameId].provider, filters.provider)
                ) {
                    games.push([[gameId], gamesList[gameId]])
                }
            }
        )
        return Object.fromEntries(games)
    }, [filters])

    const loadMore = () => {
        setVisibleGames(prev => prev + 12)
    }

    const changeCurrencyFilter = (e) => {
        dispatch(setCurrencyFilter(e.target.value))
    }

    const changeProviderFilter = (e) => {
        dispatch(setProviderFilter(e.target.value))
    }

    return gamesList && (
        <div style={{display: 'flex', flexDirection: 'column', margin: '1.5rem 0'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
                <Selector options={filtersOptions?.currencyOptions} value={filters.currency} onChange={changeCurrencyFilter} />
                <Selector options={filtersOptions?.providerOptions} value={filters.provider} onChange={changeProviderFilter} />
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
                {Object.keys(filteredGames).splice(0, visibleGamesCount).map(gameId => 
                    <GameCard id={gameId} title={gamesList[gameId].title} key={gameId} />    
                )}
            </div>
            {visibleGamesCount < Object.keys(filteredGames).length && <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button onClick={loadMore}>Показать ещё</Button>
            </div>}
        </div>
    )
}