import Link from 'next/link';
import { connect } from 'react-redux';

export default connect(state => state)(({ title, status, linkTo }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>Welcome to your NG smarthome-control!</p>
      <p>our status right now is {status}</p>
      <p>go to <Link href={linkTo}><a>other</a></Link> page.</p>
    </div>
  );
});
