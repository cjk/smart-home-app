import Avatar from 'material-ui/Avatar';
import { green, grey } from 'material-ui/colors';
import FermenterIcon from 'material-ui-icons/CallToAction';
import { withStyles } from 'material-ui/styles';

import { compose } from 'ramda';

type Props = {
  classes: Object,
  isOn: boolean,
};

const fermenterIconStyles = {
  fermenterIconOn: {
    color: '#fff',
    background: green[500],
  },
  fermenterIconOff: {
    color: '#fff',
    background: grey[500],
  },
};

const FermenterIndicator = ({ classes, isOn }: Props) => (
  <Avatar className={isOn ? classes.fermenterIconOn : classes.fermenterIconOff}>
    <FermenterIcon />
  </Avatar>
);

export default compose(withStyles(fermenterIconStyles))(FermenterIndicator);
