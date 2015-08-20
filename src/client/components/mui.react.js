/* Higher order Component for making material-ui styled components available in
   your own components.
   Note that this requires material-ui v0.8.x or higher!
 */
import Component from '../components/component.react';
import React from 'react';
import {Styles} from 'material-ui';

export default function exposeMui(BaseComponent) {

  const ThemeManager = new Styles.ThemeManager();

  return class MuiComponent extends Component {

    static displayName = `${BaseComponent.name}MaterialUI`

    // static propTypes = {
    // msg: React.PropTypes.object.isRequired,
    // actions: React.PropTypes.object.isRequired
    // }

    static childContextTypes = {
      muiTheme: React.PropTypes.object.isRequired,
      styles: React.PropTypes.func.isRequired
    }

    getChildContext() {
      return {
        muiTheme: ThemeManager.getCurrentTheme(),
        styles: () => Styles
      };
    }

    render() {

      /* Whitelist contexts provided on child-component */
      BaseComponent.contextTypes = {
        muiTheme: React.PropTypes.object.isRequired,
        styles: React.PropTypes.func.isRequired
      };

      return (
        <BaseComponent {...this.props} />
      );
    }
  };
}
