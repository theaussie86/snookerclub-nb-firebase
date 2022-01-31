import { Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { formatDate } from '../../util/helpers';

const columns = [
    {
        id: 'datum',
        label: 'Datum',
        align: 'center',
        minWidth: 170,
        format: (value) => formatDate(value)
    },
    {
        id: 'player',
        label: 'Spieler',
        align: 'center',
        minWidth: 170
    }, {
        id: 'break',
        label: 'Break',
        align: 'center',
        minWidth: 170
    },

]

const Table = ({ columns, breaks, handleChangePage, handleChangeRowsPerPage }) => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    return <Paper style={{
        width: '100%',
        overflow: 'hidden'
    }}>
        <TableContainer style={{
            maxHeight: '90vh'
        }}>
            <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                    <TableRow>
                        {
                            columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, backgroundColor: 'unset' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {breaks.length && breaks
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(br => (
                            <TableRow key={br.id}>
                                {columns.map((column) => {
                                    const value = br[column.id]
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'object'
                                                ? column.format(value)
                                                : value
                                            }
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={breaks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage='Breaks pro Seite:'
            labelDisplayedRows={({ from, to, count, page }) => {
                return `${from}-${to} von ${count !== -1 ? count : `mehr als ${to}`}`
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />

    </Paper>;
};

export default Table;
