import React from 'react';
import img from '../../../../assets/header-logo.svg';

interface Props {
	className: string;
}

const Logo: React.FC<Props> = ({ className }) => (
	<img src={img} className={className}></img>
);

export default Logo;
