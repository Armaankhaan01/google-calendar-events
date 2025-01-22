import { Input, DatePicker, Dropdown, Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { summaryFilterItems, dateFilterItems } from "./helper";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

const Filters = ({
  filters,
  filterType,
  setFilterType,
  handleFilterChange,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isDesktop = useMediaQuery({ maxWidth: 1160 });

  return (
    <Space
      direction={isDesktop ? "vertical" : "horizontal"}
      size={isMobile ? 12 : "middle"}
      className="w-full "
    >
      <Space
        direction={isMobile ? "vertical" : "horizontal"}
        size="small"
        className="w-full"
      >
        <Input
          placeholder="Search events"
          value={filters.summary}
          onChange={(e) => handleFilterChange("summary", e.target.value)}
          className="w-full min-w-[200px]"
        />
        <Dropdown
          menu={{
            items: summaryFilterItems,
            onClick: ({ key }) =>
              setFilterType((prev) => ({ ...prev, summary: key })),
          }}
          className="min-w-[104px] w-full"
        >
          <Button className={isMobile ? "w-full" : ""}>
            {filterType.summary} <DownOutlined />
          </Button>
        </Dropdown>
      </Space>

      <Space
        direction={isMobile ? "vertical" : "horizontal"}
        size="small"
        className="w-full"
      >
        <DatePicker
          onChange={(date) =>
            handleFilterChange("startDate", date ? date.toISOString() : "")
          }
          className="w-full min-w-[200px]"
        />
        <Dropdown
          menu={{
            items: dateFilterItems,
            onClick: ({ key }) =>
              setFilterType((prev) => ({ ...prev, startDate: key })),
          }}
          className="min-w-[104px] w-full"
        >
          <Button className={isMobile ? "w-full" : ""}>
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
