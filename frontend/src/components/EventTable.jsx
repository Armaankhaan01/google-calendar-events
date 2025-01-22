import { Table, Empty, Button, Row, Col, Modal, Form, message } from "antd";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import CreateEventModal from "./CreateEventModal";
import TableActions from "./TableActions";
import Filters from "./Filters";

const EventTable = ({ logout, user }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filterType, setFilterType] = useState({
    summary: "contains",
    startDate: "equals",
  });
  const [filters, setFilters] = useState({
    summary: "",
    startDate: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const fetchEvents = async (page = 1, shouldAppend = true) => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("googleAccessToken");
      const pageToken = shouldAppend ? nextPageToken : null;
      const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/calendar/events`;
      const queryParams = new URLSearchParams();

      if (pageToken) queryParams.append("pageToken", pageToken);
      const url = `${baseUrl}?${queryParams.toString()}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      setEvents((prevEvents) =>
        shouldAppend
          ? [...prevEvents, ...(data.events || [])]
          : data.events || []
      );

      setNextPageToken(data.nextPageToken || null);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      if (!error.message.includes("Invalid credentials")) {
        message.error("An error occurred while fetching events");
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...events];

    if (filters.summary) {
      filtered = filtered.filter((event) => {
        const summary = event.summary.toLowerCase();
        const searchTerm = filters.summary.toLowerCase();

        switch (filterType.summary) {
          case "contains":
            return summary.includes(searchTerm);
          case "equals":
            return summary === searchTerm;
          case "startsWith":
            return summary.startsWith(searchTerm);
          case "endsWith":
            return summary.endsWith(searchTerm);
          default:
            return true;
        }
      });
    }

    if (filters.startDate) {
      const filterDate = new Date(filters.startDate);
      filterDate.setHours(0, 0, 0, 0);

      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.start.dateTime || event.start.date);
        eventDate.setHours(0, 0, 0, 0);

        switch (filterType.startDate) {
          case "equals":
            return eventDate.getTime() === filterDate.getTime();
          case "before":
            return eventDate < filterDate;
          case "after":
            return eventDate > filterDate;
          default:
            return true;
        }
      });
    }

    setFilteredEvents(filtered);
  }, [filters, filterType, events]);

  useEffect(() => {
    fetchEvents(1, false);
  }, []);

  const handleRefresh = () => {
    fetchEvents(1, false);
  };

  const getRecurrenceType = (event) => {
    return event.recurringEventId ? "Recurring" : "One-time";
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const columns = [
    {
      title: "Event",
      dataIndex: "summary",
      key: "summary",
    },
    {
      title: "Start Time",
      dataIndex: "start",
      key: "start",
      render: (start) =>
        new Date(start.dateTime || start.date).toLocaleString(),
    },
    {
      title: "End Time",
      dataIndex: "end",
      key: "end",
      render: (end) => new Date(end.dateTime || end.date).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => status || "N/A",
    },
    {
      title: "Organizer Email",
      dataIndex: "organizer",
      key: "organizer",
      render: (organizer) => organizer?.email || "N/A",
    },
    {
      title: "Event Link",
      dataIndex: "htmlLink",
      key: "htmlLink",
      render: (link) =>
        link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            View Event
          </a>
        ) : (
          "N/A"
        ),
    },

    {
      title: "Event Type",
      dataIndex: "eventType",
      key: "eventType",
      render: (text, record) => getRecurrenceType(record),
    },
  ];

  const handleCreateEvent = async (values) => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("googleAccessToken");

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/calendar/events`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            summary: values.summary,
            description: values.description,
            startDateTime: values.dateTime[0].toISOString(),
            endDateTime: values.dateTime[1].toISOString(),
            isRecurring: values.isRecurring,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      message.success("Event created successfully");
      setIsModalOpen(false);
      form.resetFields();
      fetchEvents(currentPage);
    } catch (error) {
      console.error("Failed to create event:", error);
      message.error("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedRowKeys.length) {
      message.warning("No events selected for deletion");
      return;
    }

    Modal.confirm({
      title: "Are you sure you want to delete the selected events?",
      content: `This action will permanently delete ${selectedRowKeys.length} event(s).`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          setLoading(true);
          const accessToken = localStorage.getItem("googleAccessToken");

          await Promise.all(
            selectedRowKeys.map((eventId) =>
              fetch(
                `${
                  import.meta.env.VITE_BACKEND_URL
                }/calendar/events/${eventId}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              )
            )
          );

          message.success("Selected events deleted successfully");

          fetchEvents(1, false);
          setSelectedRowKeys([]);
        } catch (error) {
          console.error("Failed to delete events:", error);
          message.error("Failed to delete selected events");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <>
      <h1 className="text-center font-semibold pb-8 text-primary">
        Calendar Events
      </h1>
      <CreateEventModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        form={form}
        handleCreateEvent={handleCreateEvent}
        loading={loading}
      />
      <Row gutter={[16, 16]} className="w-full px-4 py-4">
        <Col xs={24} md={6}>
          <h2 className="text-2xl font-semibold m-0 text-center">
            Welcome, {user.name}
          </h2>
        </Col>
        <Col xs={24} md={11}>
          <div className="flex justify-center">
            <Filters
              filters={filters}
              filterType={filterType}
              setFilterType={setFilterType}
              handleFilterChange={handleFilterChange}
            />
          </div>
        </Col>
        <Col xs={24} md={7}>
          <div className="flex justify-end">
            <TableActions
              handleDelete={handleDelete}
              handleRefresh={handleRefresh}
              setIsModalOpen={setIsModalOpen}
              selectedRowKeys={selectedRowKeys}
              logout={logout}
              loading={loading}
            />
          </div>
        </Col>
      </Row>

      {filteredEvents.length > 0 ? (
        <>
          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: (keys) => setSelectedRowKeys(keys),
            }}
            dataSource={filteredEvents}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={false}
            scroll={{
              y: `calc(100vh - 310px)`,
              x: 1000,
            }}
          />
          {nextPageToken && (
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <Button
                onClick={() => fetchEvents(currentPage + 1, true)}
                loading={loading}
              >
                Load More
              </Button>
            </div>
          )}
        </>
      ) : (
        !loading && <Empty description="No Events Found" />
      )}
    </>
  );
};

EventTable.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventTable;
