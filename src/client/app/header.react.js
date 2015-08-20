import AppBar from '../components/appbar.react';
import Component from '../components/component.react';
import React from 'react';
import {FormattedHTMLMessage} from 'react-intl';
import {Link} from 'react-router';

export default class Header extends Component {

  static propTypes = {
    actions: React.PropTypes.array.isRequired,
    msg: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object
  }

  render() {
    const {msg: {app: {header}}, viewer} = this.props;

    return (
      <header>
        <AppBar actions={this.props.actions} msg={this.props.msg} />
        <h1>
          <FormattedHTMLMessage message={header.h1Html} />
        </h1>
        <ul>
          <li><Link to="home">{header.home}</Link></li>
          {/*<li><Link to="examples">{header.examples}</Link></li>*/}
          <li><Link to="me">{header.me}</Link></li>
          {!viewer &&
            <li><Link to="login">{header.login}</Link></li>
          }
        </ul>
      </header>
    );
  }

}
