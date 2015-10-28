import React from 'react';
import keycode from 'keycode';

export default class Modal extends React.Component {
    render() {
        return (
            <div className='modal-bg'>
                {this.props.children}
            </div>
        );
    }
}