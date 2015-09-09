import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import React from 'react';
import {FormattedHTMLMessage} from 'react-intl';
import {Link} from 'react-router';

export default class HomeIndex extends Component {

  static propTypes = {
    home: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
  }

  render() {
    const {home, msg: {home: msg}} = this.props;

    const addrState = home.livestate.map(addr => {
      return <li key={addr.id}>{addr.id} - {addr.name} - {addr.value || '???'}</li>;
    });

    return (
      <DocumentTitle title={msg.title}>
        <div className="home-page">
          <p>
            <FormattedHTMLMessage message={msg.infoHtml} />{' '}
            <Link to="events">{msg.empty}</Link>.
          </p>
          <ul>
            {addrState}
          </ul>
        </div>
      </DocumentTitle>
    );
  }

}
