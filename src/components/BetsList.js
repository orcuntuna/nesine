import React from 'react'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useVirtual } from 'react-virtual'
import useBets from '../hooks/useBets'
import useBasket from '../hooks/useBasket'

export function BetsList() {
  const { bets: data } = useBets()
  const { toggleBet, basketItems, isBetSelected } = useBasket()

  const columns = React.useMemo(
    () => [
      {
        id: 'title',
        header: () => <span>Event count: {data.length}</span>,
        accessorFn: (row) => ({ C: row.C, T: row.T, N: row.N }),
        cell: (info) => (
          <span>
            <b>{info.getValue().C}</b> <span>{info.getValue().T}</span>{' '}
            <span>{info.getValue().N}</span>
          </span>
        ),
        size: 300,
      },
      {
        id: 'comment',
        header: 'Yorumlar',
        accessorFn: (row) => 'Yorumlar',
        cell: (info) => info.getValue(),
        size: 80,
      },
      {
        id: 'e1',
        header: ' ',
        accessorFn: (row) => row,
        cell: (info) => (
          <div>
            <span>{info.getValue().OCG['1'].MBS}</span>
          </div>
        ),
        size: 30,
      },
      {
        id: 'd2',
        header: '1',
        accessorFn: (row) => row,
        cell: (info) => (
          <div
            className={
              isBetSelected(info.getValue().NID, info.getValue().OCG['1'].OC['0'].ID)
                ? 'selectable-active'
                : 'selectable'
            }
            onClick={() => toggleBet(info.getValue(), info.getValue().OCG['1'].OC['0'])}
          >
            <span>{info.getValue().OCG['1'].OC['0'].O}</span>
          </div>
        ),
      },
      {
        id: 'd3',
        header: 'x',
        accessorFn: (row) => row,
        cell: (info) => (
          <div
            className={
              isBetSelected(info.getValue().NID, info.getValue().OCG['1'].OC['1'].ID)
                ? 'selectable-active'
                : 'selectable'
            }
            onClick={() => toggleBet(info.getValue(), info.getValue().OCG['1'].OC['1'])}
          >
            <span>{info.getValue().OCG['1'].OC['1'].O}</span>
          </div>
        ),
      },
      {
        id: 'e4',
        header: '2',
        size: 30,
      },
      {
        id: 'd5',
        header: 'Alt',
        accessorFn: (row) => row,
        cell: (info) => (
          <div
            className={
              isBetSelected(info.getValue().NID, info.getValue().OCG['5'].OC['25'].ID)
                ? 'selectable-active'
                : 'selectable'
            }
            onClick={() => toggleBet(info.getValue(), info.getValue().OCG['5'].OC['25'])}
          >
            <span>{info.getValue().OCG['5'].OC['25'].O}</span>
          </div>
        ),
      },
      {
        id: 'd6',
        header: 'Üst',
        accessorFn: (row) => row,
        cell: (info) => (
          <div
            className={
              isBetSelected(info.getValue().NID, info.getValue().OCG['5'].OC['26'].ID)
                ? 'selectable-active'
                : 'selectable'
            }
            onClick={() => toggleBet(info.getValue(), info.getValue().OCG['5'].OC['26'])}
          >
            <span>{info.getValue().OCG['5'].OC['26'].O}</span>
          </div>
        ),
      },
      {
        id: 'e7',
        header: 'H1',
        size: 30,
      },
      {
        id: 'e8',
        header: '1',
        size: 30,
      },
      {
        id: 'e9',
        header: 'x',
        size: 30,
      },
      {
        id: 'e10',
        header: '2',
        size: 30,
      },
      {
        id: 'e11',
        header: 'H2',
        size: 30,
      },
      {
        id: 'd12',
        header: '1',
        accessorFn: (row) => row,
        cell: (info) => (
          <div
            className={
              isBetSelected(info.getValue().NID, info.getValue().OCG['2'].OC['3'].ID)
                ? 'selectable-active'
                : 'selectable'
            }
            onClick={() => toggleBet(info.getValue(), info.getValue().OCG['2'].OC['3'])}
          >
            <span>{info.getValue().OCG['2'].OC['3'].O}</span>
          </div>
        ),
      },
      {
        id: 'd13',
        header: 'x',
        accessorFn: (row) => row,
        cell: (info) => (
          <div
            className={
              isBetSelected(info.getValue().NID, info.getValue().OCG['2'].OC['4'].ID)
                ? 'selectable-active'
                : 'selectable'
            }
            onClick={() => toggleBet(info.getValue(), info.getValue().OCG['2'].OC['4'])}
          >
            <span>{info.getValue().OCG['2'].OC['4'].O}</span>
          </div>
        ),
      },
      {
        id: 'd14',
        header: 'x-2',
        accessorFn: (row) => row,
        cell: (info) => (
          <div
            className={
              isBetSelected(info.getValue().NID, info.getValue().OCG['2'].OC['5'].ID)
                ? 'selectable-active'
                : 'selectable'
            }
            onClick={() => toggleBet(info.getValue(), info.getValue().OCG['2'].OC['5'])}
          >
            <span>{info.getValue().OCG['2'].OC['5'].O}</span>
          </div>
        ),
      },
      {
        id: 'e15',
        header: 'Var',
        size: 30,
      },
      {
        id: 'e16',
        header: 'Yok',
        size: 30,
      },
      {
        id: 'e17',
        header: '+99',
        cell: (info) => '3',
        size: 30,
      },
    ],
    [data, basketItems],
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    defaultColumn: {
      size: document.documentElement.clientWidth > 768 ? 80 : undefined,
    },
  })

  const tableContainerRef = React.useRef(null)

  const { rows } = table.getRowModel()
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  })
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0

  return (
    <div
      ref={tableContainerRef}
      className="container"
      style={{
        width: document.documentElement.clientWidth - 2,
        height: document.documentElement.clientHeight - 2,
      }}
    >
      <table className="bet-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      width:
                        header.getSize() !== 150 || document.documentElement.clientWidth < 768
                          ? header.getSize()
                          : undefined,
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {paddingTop > 0 && (
            <tr>
              <td style={{ height: `${paddingTop}px` }} />
            </tr>
          )}
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index]
            return (
              <React.Fragment key={row.id}>
                <tr className={'info-row'}>
                  <td>
                    <span>{row.original.D}</span> <span>{row.original.DAY}</span>{' '}
                    <span>{row.original.LN}</span>
                  </td>
                  <td>Yorumlar</td>
                  <td></td>
                  <td>1</td>
                  <td>x</td>
                  <td>2</td>
                  <td>Alt</td>
                  <td>Üst</td>
                  <td>H1</td>
                  <td>1</td>
                  <td>x</td>
                  <td>2</td>
                  <td>H2</td>
                  <td>1-X</td>
                  <td>1-2</td>
                  <td>X-2</td>
                  <td>Var</td>
                  <td>Yok</td>
                  <td>+99</td>
                </tr>
                <tr>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    )
                  })}
                </tr>
              </React.Fragment>
            )
          })}
          {paddingBottom > 0 && (
            <tr>
              <td style={{ height: `${paddingBottom}px` }} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
