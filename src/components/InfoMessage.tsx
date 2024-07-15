import React from 'react';
import { Typography } from 'antd';

const InfoMessage: React.FC = () => {
  return (
    <div className="mobile-message">
      <Typography.Title level={3}>🌈 Spectral Typography 🌈</Typography.Title>
      <Typography.Text>
        이 사이트는 PC 데스크탑 환경에서 더 좋은 경험을 제공합니다.
      </Typography.Text>
    </div>
  );
}

export default InfoMessage;