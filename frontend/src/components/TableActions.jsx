import { Button, Space } from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

const TableActions = ({
  handleDelete,
  handleRefresh,
  setIsModalOpen,
  selectedRowKeys,
  logout,
  loading,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <Space
      size={isMobile ? 12 : "middle"}
      className="w-full justify-between md:justify-end"
    >
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
        title="Create Event"
      ></Button>
      <Button
        danger
        onClick={handleDelete}
        disabled={!selectedRowKeys.length}
        title="Delete selected Events"
        icon={<DeleteOutlined />}
      ></Button>
      <Button
        type="primary"
        onClick={handleRefresh}
        loading={loading}
        title="Refresh"
        icon={<ReloadOutlined />}
      ></Button>
      <Button
        onClick={logout}
        danger
        variant="solid"
        title="Logout"
        icon={<LogoutOutlined />}
      ></Button>
    </Space>
  );
};

TableActions.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  selectedRowKeys: PropTypes.array.isRequired,
};

export default TableActions;
