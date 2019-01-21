import React, {PropTypes} from 'react';
import Nav from './Nav';

class App extends React.Component {
    render() {
        return (
            <div id="main">
                <Nav />
                {this.props.children}
            </div>
        );
    };
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;
