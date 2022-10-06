import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import './comicsList.scss';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const ComicsList = (props) => {
    const {loading, error, getAllComics} = useMarvelService();
    const [comicsList, setComicsList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false)

    useEffect(() => {
        onRequest(offset, true);
    }, []);
    const onRequest = (offset, initials) =>{
        initials ? setNewItemsLoading(true) : setNewItemsLoading(false);
        getAllComics(offset)
            .then(onComicsListLoaded)
    }
    
    const onComicsListLoaded = (newComicsList) =>{
        let ended = false;
        if(newComicsList.length < 8){
            ended = true;
        }
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemsLoading(newItemsLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(comicsEnded => ended);
    }
    function renderItems(arr){
        const items = arr.map((item, i) =>{
            return(
                <li className="comics__item" key={i}
                    onClick={() =>{
                    }}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        });
        return(
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const items = renderItems(comicsList);
    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled = {newItemsLoading} 
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;