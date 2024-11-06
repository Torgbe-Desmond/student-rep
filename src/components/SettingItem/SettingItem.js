import React from 'react';
import './SettingItem.css';

const SettingItem = ({ label, control }) => {
  return (
    <div className="setting">
      <label className="setting-label">{label}</label>
      <div className="setting-control">{control}</div>
    </div>
  );
};

export default SettingItem;
