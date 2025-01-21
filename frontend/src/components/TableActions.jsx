import { Button, Space } from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";

const TableActions = ({
  handleDelete,
  handleRefresh,
  setIsModalOpen,
  selectedRowKeys,
  logout,
  loading,
}) => (
  <Space>
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => setIsModalOpen(true)}
    >
      Create Event
    </Button>
    <Button danger onClick={handleDelete} disabled={!selectedRowKeys.length}>
      <DeleteOutlined />
    </Button>
    <Button type="primary" onClick={handleRefresh} loading={loading}>
      <ReloadOutlined />
    </Button>
    <Button onClick={logout} danger>
      Sign Out
    </Button>
  </Space>
);

TableActions.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  selectedRowKeys: PropTypes.array.isRequired,
};

export default TableActions;
