import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';


import './charInfo.scss';

const CharInfo = (props) => {
    const {loading, error, getCharacter, clearError} = useMarvelService();
    const [char, setChar] = useState(null);

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const onCharLoaded = (char) =>{
        setChar(char);
    }

    const updateChar = () =>{
        const {charId} = props;
        if(!charId){
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded);
    }
        
        const skeleton = (char || loading || error) ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(error || loading || !char) ? <View char={char} /> : null;
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
    
const View = ({char}) => {
    const {name, decoration, thumbnail, homepage, wiki, comics} = char;
    let imgStyle = {
        'objectFit': 'cover'
    }
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgStyle = {
            'objectFit': 'contain'
        }
    }
    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                   {decoration}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {comics.map((item, i) =>{
                    if(i > 10){
                        // eslint-disable-next-line array-callback-return
                        return;
                    }
                    return(
                        <li className="char__comics-item" key={i}>
                            {item.name}
                        </li>
                    )
                })}

            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;