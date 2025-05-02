import { useState } from 'react';
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
  Grid,
  Input
} from 'antd';
import { 
  MobileOutlined, 
  LaptopOutlined, 
  DownloadOutlined
} from '@ant-design/icons';
import '../app/next-payment.css';
import { mockPaymentData } from '../mocks/paymentData';
import { PaymentTransaction } from '../types/payment';
import type { SortOrder } from 'antd/es/table/interface';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const PaymentHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState('nextpayment');
  const [transactionIdFilter, setTransactionIdFilter] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount);
  };

  const renderPaymentTypeIcon = (type: 'terminal' | 'mobile') => {
    return type === 'terminal' ? <LaptopOutlined /> : <MobileOutlined />;
  };

  const columns = [
    {
      title: '取引日時',
      dataIndex: 'date',
      key: 'date',
      sorter: (a: PaymentTransaction, b: PaymentTransaction) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      defaultSortOrder: 'descend' as SortOrder,
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
      title: '取引ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string, record: PaymentTransaction) => (
        record.transactionType === 'refund' ? (
          <a onClick={() => setTransactionIdFilter(id)}>{id}</a>
        ) : id
      ),
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
      render: (amount: number, record: PaymentTransaction) => (
        <span style={{ color: record.transactionType === 'refund' ? '#d93025' : '#188038' }}>
          {record.transactionType === 'refund' ? '-' : ''}{formatCurrency(amount)}
        </span>
      ),
    },
    {
      title: '入金額',
      dataIndex: 'paymentAmount',
      key: 'paymentAmount',
      render: (amount: number, record: PaymentTransaction) => (
        <span style={{ color: record.transactionType === 'refund' ? '#d93025' : '#188038' }}>
          {record.transactionType === 'refund' ? '-' : ''}{formatCurrency(amount)}
        </span>
      ),
    },
    {
      title: '手数料',
      dataIndex: 'fee',
      key: 'fee',
      render: (fee: number, record: PaymentTransaction) => (
        <span style={{ color: record.transactionType === 'refund' ? '#d93025' : '#188038' }}>
          {record.transactionType === 'refund' ? '-' : ''}{formatCurrency(fee)}（2%）
        </span>
      ),
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
          <Card style={{ marginBottom: 16, background: 'white' }}>
            <Row gutter={[16, 16]} style={{ alignItems: 'center' }}>
              <Col flex="auto">
                <Text strong>現在の入金サイクル</Text>
                <div style={{ whiteSpace: 'nowrap' }}>{mockPaymentData.paymentCycle.start} 〜 {mockPaymentData.paymentCycle.end}</div>
              </Col>
              <Col flex="auto">
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
              <Col flex="auto">
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
              <Col flex="auto">
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
              <Col flex="auto">
                <Input
                  placeholder="取引IDで検索"
                  value={transactionIdFilter || ''}
                  onChange={(e) => setTransactionIdFilter(e.target.value || null)}
                  allowClear
                />
              </Col>
              <Col>
                <Button type="primary" icon={<DownloadOutlined />}>
                  CSVダウンロード
                </Button>
              </Col>
            </Row>
          </Card>
          <Table
            dataSource={mockPaymentData.transactions.filter(transaction => 
              !transactionIdFilter || transaction.id === transactionIdFilter || 
              (transaction.transactionType === 'refund' && transaction.originalTransactionId === transactionIdFilter)
            )}
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
          <Card style={{ marginBottom: 16, background: 'white' }}>
            <Row gutter={[16, 16]} style={{ alignItems: 'center' }}>
              <Col flex="auto">
                <RangePicker style={{ width: '100%' }} />
              </Col>
              <Col flex="auto">
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
              <Col flex="auto">
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
              <Col flex="auto">
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
              <Col>
                <Button type="primary" icon={<DownloadOutlined />}>
                  CSVダウンロード
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
            <Title level={4} style={{ marginBottom: 16 }}>次回振込予定額</Title>
            <Statistic
              value={mockPaymentData.nextPaymentAmount}
              precision={0}
              prefix="¥"
              valueStyle={{ 
                color: '#1677FF', 
                fontSize: '40px',
                lineHeight: '38px',
                fontWeight: 700 
              }}
            />
            <Text>入金予定日: {mockPaymentData.nextPaymentDate}</Text>
          </Col>
          <Col xs={24} sm={12}>
            <div className="payment-cycle-info">
              <Title level={4} style={{ marginBottom: 16 }}>入金サイクル</Title>
              <div style={{ fontSize: '16px', marginBottom: 8 }}>
                {mockPaymentData.paymentCycle.start} 〜 {mockPaymentData.paymentCycle.end}
              </div>
              <Text type="secondary">設定: {mockPaymentData.paymentCycle.type}</Text>
            </div>
          </Col>
          <Col span={24}>
            <div className="bank-info-section">
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={6}>
                  <div className="bank-info-item">
                    <Text type="secondary">金融機関名</Text>
                    <div className="bank-info-value">{mockPaymentData.bankInfo.bankName}</div>
                  </div>
                </Col>
                <Col xs={24} sm={6}>
                  <div className="bank-info-item">
                    <Text type="secondary">支店名</Text>
                    <div className="bank-info-value">{mockPaymentData.bankInfo.branchName}</div>
                  </div>
                </Col>
                <Col xs={24} sm={6}>
                  <div className="bank-info-item">
                    <Text type="secondary">口座名義</Text>
                    <div className="bank-info-value">{mockPaymentData.bankInfo.accountName}</div>
                  </div>
                </Col>
                <Col xs={24} sm={6}>
                  <div className="bank-info-item">
                    <Text type="secondary">口座番号</Text>
                    <div className="bank-info-value">{mockPaymentData.bankInfo.accountNumber}</div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Card>

      <Card className="payment-history-card">
        <Tabs
          activeKey={activeTab}
          items={items}
          onChange={(key) => setActiveTab(key)}
        />
      </Card>
    </div>
  );
};

export default PaymentHistory; 