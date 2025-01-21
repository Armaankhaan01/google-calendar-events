import { Input, DatePicker, Dropdown, Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { summaryFilterItems, dateFilterItems } from "./helper";
import PropTypes from "prop-types";

const Filters = ({
  filters,
  filterType,
  setFilterType,
  handleFilterChange,
}) => {
  return (
    <Space size="middle">
      <Space>
        <Input
          placeholder="Search events"
          value={filters.summary}
          onChange={(e) => handleFilterChange("summary", e.target.value)}
          style={{ width: 200 }}
        />
        <Dropdown
          menu={{
            items: summaryFilterItems,
            onClick: ({ key }) =>
              setFilterType((prev) => ({ ...prev, summary: key })),
          }}
        >
          <Button>
            {filterType.summary} <DownOutlined />
          </Button>
        </Dropdown>
      </Space>

      <Space>
        <DatePicker
          onChange={(date) =>
            handleFilterChange("startDate", date ? date.toISOString() : "")
          }
          style={{ width: 200 }}
        />
        <Dropdown
          menu={{
            items: dateFilterItems,
            onClick: ({ key }) =>
              setFilterType((prev) => ({ ...prev, startDate: key })),
          }}
        >
          <Button>
            {filterType.startDate} <DownOutlined />
          </Button>
        </Dropdown>
      </Space>
    </Space>
  );
};

Filters.propTypes = {
  filters: PropTypes.shape({
    summary: PropTypes.string,
    startDate: PropTypes.string,
  }).isRequired,
  filterType: PropTypes.shape({
    summary: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
  }).isRequired,
  setFilterType: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default Filters;
