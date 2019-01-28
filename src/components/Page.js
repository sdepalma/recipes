import React from 'react';
import Logger from './utils/Logger';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.logger = new Logger('Page Header');
    };

    render() {
        this.logger.log('render');

        return (
            <header>
                <h1>{this.props.name} (Smart Component)</h1>
            </header>
        )
    }
}

const Footer = (props) => {
    const logger = new Logger('Page Footer');
    logger.log('render');

    return (
        <footer>
            <ul>
                <li>{props.name} (Dumb Component)</li>
            </ul>
        </footer>
    )
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.logger = new Logger('Page Main');
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputSubmit = this.handleInputSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

        this.state = {
            names: {
                header: 'Page',
                footer: 'Footer'
            },
            nameAddition: '',
            nameOptions: [
                'Page',
                'Forms'
            ]
        };
    };

    handleInputChange() {
        let nameAddition = this.nameInput.value;
        this.logger.log(`handleInputChange: ${nameAddition}`);
        this.setState({nameAddition});
    };

    handleInputSubmit(event) {
        event.preventDefault();

        let nameAddition = this.nameInput.value;
        this.logger.log(`handleInputSubmit: ${nameAddition}`);

        if (nameAddition != '') {
            const nameOptions = this.state.nameOptions;
            nameOptions.push(nameAddition);

            this.setState({nameOptions});
        }
    };

    handleSelectChange() {
        let nameSelected = this.nameSelect.value;
        this.logger.log(`handleSelectChange: ${nameSelected}`);

        const names = this.state.names;
        names.header = nameSelected;

        this.setState({names});
    };

    render() {
        const component = this;
        this.logger.log('render', component.state);

        let nameSelectOptions;
        this.logger.log(`nameOptions: ${component.state.nameOptions.length}`);
        if (component.state.nameOptions.length > 0) {
            nameSelectOptions = component.state.nameOptions.map((name, i) => {
                this.logger.log(name);
                return (
                    <option key={i} value={name}>{name}</option>
                );
            });
        }

        return (
            <div id="page-container" className="container">

                <Header name={component.state.names.header} />

                <div id="page-content" className="content">
                    <div>
                        <p>URL Variable: {this.props.match.params.subpage}</p>
                    </div>

                    <div>
                        <label>Add page name to select</label>
                        <form id='add-name' onSubmit={this.handleInputSubmit}>
                            <input
                                type="text"
                                value={component.state.namesAddition}
                                ref={(nameInput) => this.nameInput = nameInput}
                                onChange={component.handleInputChange}
                            />
                            <input
                                type="submit"
                                value="Submit"
                            />
                        </form>
                    </div>

                    <div>
                        <label>Change page name</label>
                        <select
                            value={component.state.names.header}
                            ref={(nameSelect) => this.nameSelect = nameSelect}
                            onChange={component.handleSelectChange}
                        >
                            <option>-----</option>
                            {nameSelectOptions}
                        </select>
                    </div>
                </div>

                <Footer name={this.state.names.footer} />
            </div>
        );
    };
};

export default Page;
