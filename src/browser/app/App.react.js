import './App.less';
import Appbar from './Appbar.react';
import Component from 'react-pure-render/component';
import Footer from './Footer.react';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

/* MERGE-TODO: appActions should be refactored into ../../common/app/actions.js */
import {onAppComponentDidMount} from '../../common/app/actions';

/* Material-Design-Lite imports */
import Layout from 'react-mdl/lib/Layout/Layout';
import {Content, Header, Drawer, Navigation} from 'react-mdl/lib/Layout';

class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  };

  // Note pattern how actions related to app start are dispatched.
  // componentDidMount is not called in ReactDOMServer.renderToString, so it's
  // the right place to dispatch client only (e.g. Firebase) actions.
  // Firebase can be used on the server as well, but it's over of this example.
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(onAppComponentDidMount());
  }

  render() {
    const {children, location} = this.props;

    return (
      // Pass data-pathname to allow route specific styling.
      <div className="page" data-pathname={location.pathname}>
        <Helmet
            link={[
              {rel: 'shortcut icon', href: require('./favicon.ico')}
            ]}
            meta={[{
                name: 'description',
                content: 'smart home control app'
              }]}
            titleTemplate="%s - by CjK"
        />

        <Layout fixedHeader>
          {/* Pathname enforces rerender so activeClassName is updated. */}
          <Header pathname={location.pathname}>
            <Appbar pathname={location.pathname} />
          </Header>

          <Drawer title="Drawer-Title">
            <Navigation>
              <a href="">Link #1</a>
              <a href="">Link #2</a>
              <a href="">Link #3</a>
              <a href="">Link #4</a>
            </Navigation>
          </Drawer>

          <Content id="page-content">
            {children}
          </Content>

          <Footer />
        </Layout>
      </div>
    );
  }
}

// Just inject dispatch and don't listen to store.
export default connect()(App);
