import React, { Component } from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';

class LoadingIndicator extends Component {
    state = {}
    render() {
        return (
            <Dimmer active>
                <Loader />
            </Dimmer>
        );
    }
}

export default LoadingIndicator;
