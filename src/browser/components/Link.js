/* @flow */
import React from 'react';
import pseudo from './pseudo';
import { Base } from 'rebass';
import { Link as FoundRouterLink } from 'found';

const isExternalLink = to => to.includes('://');

const Link = (
  { bold, exactly, inverted, pseudo, to, activeStyle, ...props },
  { rebass }
) => {
  const baseStyle = {
    color: inverted ? rebass.inverted : rebass.link.color,
    ...(bold && rebass.link.bold),
    ...rebass.link.link,
    ...(pseudo.hover && rebass.link.hover),
  };
  const linkProps = {
    ...props,
    baseStyle,
    className: 'Link',
  };

  return isExternalLink(to)
    ? <Base {...linkProps} href={to} is="a" />
    : <Base
        {...linkProps}
        exact={exactly}
        activeStyle={activeStyle}
        is={FoundRouterLink}
        to={to}
      />;
};

Link.propTypes = {
  bold: React.PropTypes.bool,
  exactly: React.PropTypes.bool,
  inverted: React.PropTypes.bool,
  pseudo: React.PropTypes.object.isRequired,
  to: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
};

Link.contextTypes = {
  rebass: React.PropTypes.object,
};

export default pseudo(Link);
