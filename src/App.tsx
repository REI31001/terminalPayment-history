import React from 'react';
import { ConfigProvider } from 'antd';
import jaJP from 'antd/locale/ja_JP';
import PaymentHistory from './components/PaymentHistory';
import './App.css';

function App() {
  return (
    <ConfigProvider
      locale={jaJP}
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
        components: {
          Card: {
            borderRadiusLG: 8,
          },
          Table: {
            borderRadiusLG: 8,
          },
        },
      }}
    >
      <div className="App">
        <PaymentHistory />
      </div>
    </ConfigProvider>
  );
}

export default App; 