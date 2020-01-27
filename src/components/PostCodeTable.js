import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";

import { editData as editDataAction } from "../redux/action";
import TableTemple from "./TableTemple";
import EditableCell from './EditableCell';
import { SelectColumnFilter } from "./Filter";

function PostCodeTable() {
  const columns = useMemo(
    () => [
      {
        Header: "Post Code",
        accessor: "postcode"
      },
      {
        Header: "Locality",
        accessor: "locality",
        filter: "fuzzyText"
      },
      {
        Header: "State",
        accessor: "state",
        Filter: SelectColumnFilter,
        filter: "includes"
      },
      {
        Header: "Long",
        accessor: "long"
      },
      {
        Header: "Lat",
        accessor: "lat"
      },
      {
        Header: "Dc",
        accessor: "dc",
        Cell: EditableCell, 
      },
      {
        Header: "Type",
        accessor: "type",
        Cell: EditableCell, 
        Filter: SelectColumnFilter,
        filter: "includes"
      }
    ],
    []
  );

  const data = useMappedState(state => state.data);
  const dispatch = useDispatch();
  const [skipPageReset, setSkipPageReset] = useState(false);

  const updateMyData = (rowIndex, columnId, value) => {
    setSkipPageReset(true);
    const editItem = { rowIndex, columnId, value };
    dispatch(editDataAction(editItem));
  };

  useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  return (
    <div className="postCodeTable">
      {data.length !== 0 ? (
        <TableTemple
          columns={columns}
          data={data}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
        />
      ) : null}
    </div>
  );
}

export default PostCodeTable;
