/**
 * You might find it useful to have some dummy data for your own testing.
 * Feel free to write this function if you find that feature desirable.
 *
 * When you come to office hours for help, we will ask you if you have written
 * this function and tested your project using it.
 */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState} from "react";
import {Grade, gradeColumn, item, itemColumn, tableHeader, talbeHead, weight} from "../types/api_types";

/**
 * This is the component where you should write the code for displaying the
 * the table of grades.
 *
 * You might need to change the signature of this function.
 *
 */
export const GradeTable = (props: any) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [items, setItems] = useState<item[]>([])
    const [itemData, SetItemData] = useState<item[]>([])
    const [gradeData, setGradeData] = useState<Grade[]>([]);
    const [className, setClassName] = useState<string>("");
    const [weights, setWeights] = useState<weight[]>([])

    useEffect(() => {
        setGradeData(props.grades)
        setClassName(props.className)
        setWeights(props.weights)
        setItems(props.items)
        // console.log(items)
    }, [props])

    function createItemData(
        ShipmentID: string,
        BoxesRcvd: string,
        ShippingPO: string,
        WarehouseID: string,
        Date: string
    ) : talbeHead {
        return {ShipmentID: ShipmentID,
            BoxesRcvd: BoxesRcvd,
            ShippingPO: ShippingPO,
            WarehouseID: WarehouseID,
            Date: Date}
    }

    const getItemRows = () => {
        let data: talbeHead[] = []
        items.map((item) => {
            data.push(createItemData(item.ShipmentID, item.BoxesRcvd, item.ShippingPO, item.WarehouseID, item.Date))
        })
        return data
    }

    const itemRows = getItemRows()

    const itemColumns: readonly itemColumn[] = [
        {id: 'ShipmentID', label: 'Shipment ID', minWidth: 170},
        {id: 'WarehouseID', label: 'Warehouse ID', minWidth: 170},
        {id: 'ShippingPO', label: 'Shipping PO', minWidth: 170, align: 'right'},
        {id: 'BoxesRcvd', label: 'Boxes Received', minWidth: 170, align: 'right'},
        {id: 'Date', label: 'Date', minWidth: 170, align: 'right'},
    ]

    function createGradeData(
        studentId: string,
        name: string,
        classId: string,
        grades: any,
    ): tableHeader {
        let grade: number = 0;
        const item = grades[0]
        let ratio = 1
        for (var k in item) {
            weights.map((item)=> {
                if (item.assignmentId === k) ratio = item.weight * 0.01
            })
            grade += Number(item[k]) * ratio
        }
        return {
            studentId: studentId, studentName: name, classId: classId, className: className,
            semester: "fall2022", finalGrade: grade.toFixed(1)
        }
    }

    const getGradeRows = () => {
        let data: tableHeader[] = []
        gradeData.map((item) => {
            data.push(createGradeData(item.studentId, item.name, item.classId, item.grades))
        })
        return data
    }

    const gradeRows = getGradeRows()

    const gradeColumns: readonly gradeColumn[] = [
        {id: 'studentId', label: 'Student ID', minWidth: 170},
        {id: 'studentName', label: 'Student Name', minWidth: 170},
        {id: 'classId', label: 'Class ID', minWidth: 170, align: 'right'},
        {id: 'className', label: 'Class Name', minWidth: 170, align: 'right'},
        {id: 'semester', label: 'Semester', minWidth: 170, align: 'right'},
        {id: 'finalGrade', label: 'Final Grade', minWidth: 170, align: 'right'}
    ]

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {itemColumns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {itemRows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.ShipmentID}>
                                        {itemColumns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={itemRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}