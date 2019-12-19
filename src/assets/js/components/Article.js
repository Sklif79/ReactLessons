import React from "react";
import Text from './Text';

function Article(props) {
    const {article} = props;

    return (
        <a href={article.url} className="article">
            <img src={article.imageURL} alt=""/>
            <Text text={article.text} />
            <div>{article.date}</div>
        </a>
    )
}

export default Article;