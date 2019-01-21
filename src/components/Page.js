import React from 'react';

class Page extends React.Component {
    render() {
        return (
            <div id="page-container" className="container">
                <header>
                    <h1>Page</h1>
                </header>
                <div id="page-content" className="page">
                    <p>Content</p>
                </div>
            </div>
        );
    };
};

export default Page;
