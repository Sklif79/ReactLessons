import React from "react";
import {render} from "react-dom";
import Article from './components/Article';
import articles from "../../../build/assets/js/articles";

function Catalog() {
    return (
        <div className="wrapper">
            <h1>Catalog</h1>

            <Article article={articles[0]}/>
        </div>
    )
}

render(
    <Catalog />,
    document.getElementById('app')
);