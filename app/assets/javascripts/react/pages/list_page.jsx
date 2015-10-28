import React from 'react';
import Relay from 'react-relay';
import 'babel-core/polyfill';
import {Link} from 'react-router';

import * as Item from 'react/components/item_component';
import  TextInput from 'react/components/text_input_component';
import CreateItemMutation from 'react/mutations/create_item_mutation';

export class List extends React.Component {


    handleSave = (name) => {
        const {list} = this.props;

        Relay.Store.update(
            new CreateItemMutation({list, name})
        );
    };

    renderItems() {
        var {list} = this.props;
        return list.items.edges.map(({node}) =>
                <Item.Component
                    key={node.id}
                    item={node}
                    name={node.name}
                    body={node.body}
                    list={list}
                    />
        );
    }

    render() {
        var {list} = this.props;
        return (
            <div className="App">
                <section className="modal">
                    <div className="modal-header">
                        <h2>{list.name}</h2>
                        <Link className="close" to={`/lists`}>x</Link>
                    </div>
                    <div className="modal-body lists">
                        <TextInput
                            className="new-list"
                            autofocus
                            placeholder="What do you have to do?"
                            onSave={this.handleSave}
                            />
                        <ul className="list">
                            {this.renderItems()}
                        </ul>
                    </div>
                </section>
            </div>

        );
    }
}

export const Queries = {
    list: (Component) => Relay.QL`
        query {
          node(id: $id) {
            ${Component.getFragment('list')},
          },
        }
    `,
};

export const RelayContainer = Relay.createContainer(List, {
    initialVariables: {
        count: 10
    },
    fragments: {
        list: () => Relay.QL`
          fragment on List {
            id,
            name,
            items(first: $count, order: "-id") {
              edges {
                node {
                   id,
                   name,
                   body
                }
              }
            },
          }
        `,
    },
});
