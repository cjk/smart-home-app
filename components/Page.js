// @flow
import Link from 'next/link';
import { connect } from 'react-redux';
import { keys } from 'ramda';

export default connect(state => state)(({ home }) =>
  <div>
    <h1>SmartHome Entry</h1>
    <p>Welcome to your NG smarthome-control!</p>
    <p>our status right now is {keys(home.livestate).length}</p>
    <p>go to <Link href="/other"><a>other</a></Link> page.</p>
  </div>
);
