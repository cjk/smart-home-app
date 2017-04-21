/* @flow */

/* An animated toggle-button to switch between two states */

import React from 'react';
import { ButtonCircle } from 'rebass';
import { GoRss } from 'react-icons/lib/go';
import { Motion, spring } from 'react-motion';

type Props = {
  isActive?: boolean,
  //   style?: any,
};

const ToggleButton = ({ isActive, ...props }: Props) => {
  const buttonMotionStyle = {
    s: spring(isActive ? 1.2 : 1),
    r: spring(isActive ? 360 : 0),
  };

  return (
    <ButtonCircle {...props}>
      <Motion style={buttonMotionStyle}>
        {({ s, r }) => (
          <GoRss style={{ transform: `scale(${s}) rotate(${r}deg)` }} />
        )}
      </Motion>
    </ButtonCircle>
  );
};

export default ToggleButton;
