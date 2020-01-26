import React, { useMemo } from "react";

import { useTable, useFilters, useGlobalFilter, usePagination } from 'react-table'
import { GlobalFilter, DefaultColumnFilter } from './Filter';
import EditableCell from './EditableCell';
import { fuzzyTextFilterFn } from '../utils/fuzzyTextFilterFn';
import { Table, Button } from 'react-bootstrap';

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

function TableTemple({ columns, data, updateMyData, skipPageReset }) {
  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      Cell: EditableCell, 
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    flatColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      autoResetPage: !skipPageReset,
      updateMyData,
    },
    useFilters,
    useGlobalFilter,
    usePagination
  )

  return (
    <div className="table">
      <Table striped bordered hover size="sm" variant="dark" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={flatColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
      <div className="pagination">
        <Button variant="dark" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </Button>
        <Button variant="dark" onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </Button>
        <Button variant="dark" onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </Button>
        <Button variant="dark" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </Button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default TableTemple;