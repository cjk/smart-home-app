// import Link from 'next/link';
import { connect } from 'react-redux';

export default connect(state => state)(({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>Welcome to your NG smarthome-control!</div>
    </div>
  );
});
