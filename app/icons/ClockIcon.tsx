// ClockIcon.tsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ClockIcon: React.FC = () => (
  <Svg viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" width="55" height="55">
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      fill="none"
    />
  </Svg>
);

export default ClockIcon;
