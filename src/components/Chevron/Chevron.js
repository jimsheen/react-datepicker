import React from 'react';
import classNames from 'classnames';

import './Chevron.css'

export default ({ right, left, down, up }) => {
	const className = classNames('chevron', {
		'right': right,
		'left': left,
		'down': down,
		'up': up
	})
	return (
		<i className={className}></i>
	)
}