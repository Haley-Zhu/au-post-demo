import React from "react";
import { Table, Input, Button, Icon } from "antd";

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchedColumn: '',
      dataArray: this.props.data,
      editingKey: ""
    };
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <div>{text.toString()}</div>
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const { data } = this.props;
    const dataArray = data.data;

    const columns = [
      {
        title: "postcode",
        dataIndex: "postcode",
        key: "postcode",
        width: "10%",
        ...this.getColumnSearchProps("postcode")
      },
      {
        title: "locality",
        dataIndex: "locality",
        key: "locality",
        width: "15%",
        ...this.getColumnSearchProps("locality")
      },
      {
        title: "state",
        dataIndex: "state",
        key: "state",
        width: "10%",
        editable: true,
        filters: [
          {
            text: "ACT",
            value: "act"
          },
          {
            text: "NT",
            value: "nt"
          }
        ],
        ...this.getColumnSearchProps("state")
      },
      {
        title: "long",
        dataIndex: "long",
        key: "long",
        width: "10%",
      },
      {
        title: "lat",
        dataIndex: "lat",
        key: "lat",
        width: "10%",
      },
      {
        title: "dc",
        dataIndex: "dc",
        key: "dc",
        width: "15%",
      },
      {
        title: "type",
        dataIndex: "type",
        key: "type",
        width: "10%",
      }
    ];

    return (
      <div>
        <Table dataSource={dataArray} columns={columns}></Table>
      </div>
    );
  }
}

export default DashBoard;
