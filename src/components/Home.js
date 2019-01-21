import React from 'react';
import Logger from './utils/Logger';
import { shuffle } from './utils/Helper';

const logger = new Logger('Home');

class Home extends React.Component {
    render() {
        let shuffledArray = shuffle(["1", "2", "3"]);
        logger.log("shuffledArray", shuffledArray);

        return (
            <div id="home-container" className="container">
                <header>
                    <h1>Home</h1>
                </header>
                <div id="home-content" className="page">
                    <p>Content</p>
                </div>
            </div>
        );
    };
};

export default Home;
