import { Modal, Form, Input, Button, Space, DatePicker, Checkbox } from "antd";
import PropTypes from "prop-types";

const CreateEventModal = ({
  isModalOpen,
  setIsModalOpen,
  form,
  handleCreateEvent,
  loading,
}) => (
  <Modal
    title="Create New Event"
    open={isModalOpen}
    onCancel={() => setIsModalOpen(false)}
    footer={null}
  >
    <Form form={form} layout="vertical" onFinish={handleCreateEvent}>
      <Form.Item
        name="summary"
        label="Event Title"
        rules={[{ required: true, message: "Please enter event title" }]}
      >
        <Input placeholder="Enter event title" />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea placeholder="Enter event description" rows={4} />
      </Form.Item>

      <Form.Item
        name="dateTime"
        label="Event Date & Time"
        rules={[
          { required: true, message: "Please select event date and time" },
        ]}
      >
        <DatePicker.RangePicker
          showTime
          className="w-full"
          placeholder={["Start Time", "End Time"]}
        />
      </Form.Item>

      <Form.Item name="isRecurring" valuePropName="checked">
        <Checkbox>Repeat weekly</Checkbox>
      </Form.Item>

      <Form.Item>
        <Space className="w-full justify-end">
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Event
          </Button>
        </Space>
      </Form.Item>
    </Form>
  </Modal>
);

CreateEventModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  handleCreateEvent: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CreateEventModal;
