import Component from '../components/component.react';
import React from 'react';
import fetch from 'isomorphic-fetch';
import {createValidate} from '../validate';

import * as authActions from '../auth/actions';
import * as eventActions from '../events/actions';
import * as addressActions from '../groupaddresses/actions';

const actions = [authActions, eventActions, addressActions];

export default function createActions(BaseComponent) {

  return class CreateActions extends Component {

    static propTypes = {
      flux: React.PropTypes.object.isRequired,
      msg: React.PropTypes.object.isRequired
    }

    createActions() {
      const {flux, msg} = this.props;
      const state = () => flux.state.toObject();
      const validate = createValidate(() => msg);

      return actions.reduce((actions, {create, feature, inject}) => {
        const dispatch = (action, payload) =>
          flux.dispatch(action, payload, {feature});

        const deps = [dispatch, validate, fetch, state];
        const args = inject ? inject(...deps) : deps;
        return {...actions, [feature]: create(...args)};
      }, {});
    }

    componentWillMount() {
      this.actions = this.createActions();
    }

    render() {
      return <BaseComponent {...this.props} actions={this.actions} />;
    }

  };

}
