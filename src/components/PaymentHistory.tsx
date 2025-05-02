import React, { useState } from 'react';
import { 
  Card, 
  Tabs, 
  Select, 
  DatePicker, 
  Button, 
  Table, 
  Tag, 
  Space, 
  Typography,
  Row,
  Col,
  Statistic,
  Grid
} from 'antd';
import { 
  MobileOutlined, 
  LaptopOutlined, 
  DownloadOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import './PaymentHistory.css';
import { mockPaymentData } from '../mocks/paymentData';
import { PaymentTransaction } from '../types/payment';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { useBreakpoint } = Grid;

const PaymentHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState('nextpayment');
  const screens = useBreakpoint();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount);
  };

  const renderPaymentTypeIcon = (type: 'terminal' | 'mobile') => {
    return type === 'terminal' ? <LaptopOutlined /> : <MobileOutlined />;
  };

  const columns = [
    {
      title: '取引ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '取引日時',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '決済種別',
      dataIndex: 'paymentType',
      key: 'paymentType',
      render: (type: 'terminal' | 'mobile') => (
        <Space>
          {renderPaymentTypeIcon(type)}
          {type === 'terminal' ? '端末決済' : 'モバイル決済'}
        </Space>
      ),
    },
    {
      title: '区分',
      dataIndex: 'transactionType',
      key: 'transactionType',
      render: (type: 'payment' | 'refund') => (
        <Tag color={type === 'payment' ? 'success' : 'error'}>
          {type === 'payment' ? '決済' : '取消'}
        </Tag>
      ),
    },
    {
      title: '決済状態',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'confirmed' | 'authorized') => (
        <Tag color={status === 'confirmed' ? 'success' : 'warning'}>
          {status === 'confirmed' ? '決済確定' : '（仮）承認済'}
        </Tag>
      ),
    },
    {
      title: '入金予定日',
      dataIndex: 'scheduledDate',
      key: 'scheduledDate',
    },
    {
      title: '売上',
      dataIndex: 'salesAmount',
      key: 'salesAmount',
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: '入金額',
      dataIndex: 'paymentAmount',
      key: 'paymentAmount',
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: '手数料',
      dataIndex: 'fee',
      key: 'fee',
      render: (fee: number) => `${formatCurrency(fee)}（2%）`,
    },
    {
      title: '支払方法',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
  ];

  const items = [
    {
      key: 'nextpayment',
      label: '次回入金サイクル取引',
      children: (
        <div>
          <Card className="filter-card">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Text strong>現在の入金サイクル</Text>
                <div>{mockPaymentData.paymentCycle.start} 〜 {mockPaymentData.paymentCycle.end}</div>
              </Col>
              <Col xs={24} sm={8}>
                <Select
                  defaultValue="すべての決済種別"
                  style={{ width: '100%' }}
                  options={[
                    { value: 'all', label: 'すべての決済種別' },
                    { value: 'terminal', label: '端末決済' },
                    { value: 'mobile', label: 'モバイル決済' },
                  ]}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Select
                  defaultValue="すべての区分"
                  style={{ width: '100%' }}
                  options={[
                    { value: 'all', label: 'すべての区分' },
                    { value: 'payment', label: '決済' },
                    { value: 'refund', label: '取消' },
                  ]}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Select
                  defaultValue="すべての決済状態"
                  style={{ width: '100%' }}
                  options={[
                    { value: 'all', label: 'すべての決済状態' },
                    { value: 'confirmed', label: '決済確定' },
                    { value: 'authorized', label: '（仮）承認済' },
                  ]}
                />
              </Col>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" icon={<DownloadOutlined />}>
                  ダウンロード
                </Button>
              </Col>
            </Row>
          </Card>
          <Table
            dataSource={mockPaymentData.transactions}
            columns={columns}
            pagination={{
              total: mockPaymentData.transactions.length,
              pageSize: 10,
              showSizeChanger: false,
              showQuickJumper: true,
              showTotal: (total) => `全 ${total} 件`,
            }}
          />
        </div>
      ),
    },
    {
      key: 'history',
      label: 'すべての決済履歴',
      children: (
        <div>
          <Card className="filter-card">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <RangePicker style={{ width: '100%' }} />
              </Col>
              <Col xs={24} sm={8}>
                <Select
                  defaultValue="すべての決済種別"
                  style={{ width: '100%' }}
                  options={[
                    { value: 'all', label: 'すべての決済種別' },
                    { value: 'terminal', label: '端末決済' },
                    { value: 'mobile', label: 'モバイル決済' },
                  ]}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Select
                  defaultValue="すべての区分"
                  style={{ width: '100%' }}
                  options={[
                    { value: 'all', label: 'すべての区分' },
                    { value: 'payment', label: '決済' },
                    { value: 'refund', label: '取消' },
                  ]}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Select
                  defaultValue="すべての決済状態"
                  style={{ width: '100%' }}
                  options={[
                    { value: 'all', label: 'すべての決済状態' },
                    { value: 'confirmed', label: '決済確定' },
                    { value: 'authorized', label: '（仮）承認済' },
                  ]}
                />
              </Col>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" icon={<DownloadOutlined />}>
                  ダウンロード
                </Button>
              </Col>
            </Row>
          </Card>
          <Table
            dataSource={mockPaymentData.transactions}
            columns={columns}
            pagination={{
              total: mockPaymentData.transactions.length,
              pageSize: 10,
              showSizeChanger: false,
              showQuickJumper: true,
              showTotal: (total) => `全 ${total} 件`,
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="payment-history-container">
      <Title level={2}>入金予定・決済履歴</Title>

      <Select
        defaultValue="UAT3-オンライン決済確認(Adyen)"
        style={{ width: 300, marginBottom: 16 }}
        options={[
          { value: 'uat3', label: 'UAT3-オンライン決済確認(Adyen)' },
          { value: 'tokyo', label: '東京駅前店' },
          { value: 'shinjuku', label: '新宿店' },
          { value: 'shibuya', label: '渋谷店' },
          { value: 'all', label: '全店舗合計' },
        ]}
      />

      <Card className="next-payment-card">
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12}>
            <div>
              <Title level={4}>次回振込予定額</Title>
              <Statistic
                value={mockPaymentData.nextPaymentAmount}
                precision={0}
                prefix="¥"
                valueStyle={{ color: '#1890ff', fontSize: '32px' }}
              />
              <Text>入金予定日: {mockPaymentData.nextPaymentDate}</Text>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <Card className="payment-cycle-card">
              <Title level={5}>入金サイクル</Title>
              <Text>{mockPaymentData.paymentCycle.start} 〜 {mockPaymentData.paymentCycle.end}</Text>
              <div style={{ marginTop: 8 }}>
                <Text type="secondary">設定: {mockPaymentData.paymentCycle.type}</Text>
              </div>
            </Card>
          </Col>
          <Col span={24}>
            <Card className="bank-info-card">
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={6}>
                  <div>
                    <Text type="secondary">金融機関名</Text>
                    <div>{mockPaymentData.bankInfo.bankName}</div>
                  </div>
                </Col>
                <Col xs={24} sm={6}>
                  <div>
                    <Text type="secondary">支店名</Text>
                    <div>{mockPaymentData.bankInfo.branchName}</div>
                  </div>
                </Col>
                <Col xs={24} sm={6}>
                  <div>
                    <Text type="secondary">口座名義</Text>
                    <div>{mockPaymentData.bankInfo.accountName}</div>
                  </div>
                </Col>
                <Col xs={24} sm={6}>
                  <div>
                    <Text type="secondary">口座番号</Text>
                    <div>{mockPaymentData.bankInfo.accountNumber}</div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>

      <Tabs
        activeKey={activeTab}
        items={items}
        onChange={(key) => setActiveTab(key)}
      />
    </div>
  );
};

export default PaymentHistory; 