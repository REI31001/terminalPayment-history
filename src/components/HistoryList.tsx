import React from 'react';
import { List, Card, Tag, Space } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const HistoryList: React.FC = () => {
  const data = [
    {
      title: '2024/05/01 10:30',
      description: '支払い完了',
      amount: '¥1,000',
      status: 'completed',
    },
    {
      title: '2024/05/01 09:15',
      description: '支払い処理中',
      amount: '¥2,500',
      status: 'processing',
    },
    // Add more items as needed
  ];

  return (
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{item.title}</span>
                <span style={{ fontWeight: 'bold' }}>{item.amount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{item.description}</span>
                {item.status === 'completed' ? (
                  <Tag icon={<CheckCircleOutlined />} color="success">
                    完了
                  </Tag>
                ) : (
                  <Tag icon={<ClockCircleOutlined />} color="processing">
                    処理中
                  </Tag>
                )}
              </div>
            </Space>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default HistoryList; 