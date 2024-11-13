import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import { SetFilterModule, SparklinesModule } from 'ag-grid-enterprise';
import { ColDef, ColGroupDef } from 'ag-grid-community';
ModuleRegistry.registerModules([ClientSideRowModelModule, SparklinesModule, SetFilterModule]);
// import 'ag-grid-enterprise'

import { useRef, useState } from 'react';
import { AgGridReact } from "ag-grid-react";


function AgGrid() {
    const randomPrice = () => {
        let arr = []
        for (let index = 0; index < 20; index++) {
            arr.push(Math.random())
        }
        return arr
    }
    const gridRef = useRef<any>()

    const theme = {
        alpine: 'ag-theme-alpine',
        aplineDark: 'ag-theme-alpine-dark',
        material: 'ag-theme-material',
        materialDark: 'g-theme-material-dark',
        balham: 'ag-theme-balham',
        balhamDark: 'ag-theme-balham-dark',
        quartz: 'ag-theme-quartz',
        quartzDark: 'ag-theme-quartz-dark'
    }

    const lowerCaseParam = (params: any) => {
        // const country = params.value;
        console.log(params.value);

        return ' (' + params.value + ' hi )';
    };


    const [rowData, setRowData] = useState([
        { make: "Toyota", model: "Corolla", price: randomPrice(), electric: false },
        { make: "Tesla", model: "Model Y", price: randomPrice(), electric: true },
        { make: "Ford", model: "F-Series", price: randomPrice(), electric: true },
        { make: "Tesla", model: "Model Y", price: randomPrice(), electric: true },
        { make: "Tesla", model: "Model Y", price: randomPrice(), electric: true },
        { make: "Tesla", model: "Model Y", price: randomPrice(), electric: true },
        { make: "Toyota", model: "Corolla", price: randomPrice(), electric: false },
        { make: "Tesla", model: "Model Y", price: randomPrice(), electric: true },
        { make: "Ford", model: "F-Series", price: randomPrice(), electric: true },
        { make: "Tesla", model: "Model Y", price: randomPrice(), electric: true },
        { make: "Tesla", model: "Model Y", price: randomPrice(), electric: true },
        { make: "Tesla", model: "Model Y", price: randomPrice(), electric: true },
        { make: "Toyota", model: "Corolla", price: randomPrice(), electric: false },
        { make: "Tesla", model: "Model Y", price: randomPrice(), electric: true },
        { make: "Ford", model: "F-Series", price: randomPrice(), electric: true },
        { make: "Tesla", model: "Model Y", price: randomPrice(), electric: true },
        { make: "Tesla", model: "Model Y", price: randomPrice(), electric: true },
        { make: "Tesla", model: "Model Y", price: randomPrice(), electric: true },
        { make: "Toyota", model: "Corolla", price: randomPrice(), electric: false },
        { make: "Tesla", model: "Model Y", price: randomPrice(), electric: true },
        { make: "Ford", model: "F-Series", price: randomPrice(), electric: true },
        { make: "Tesla", model: "Model Y", price: randomPrice(), electric: true },
        { make: "Tesla", model: "Model Y", price: randomPrice(), electric: true },
        { make: "Tesla", model: "Model Y", price: randomPrice(), electric: true },
        
    ]);


    const [colDefs, setColDefs] = useState<(ColDef | ColGroupDef)[]>([
        { field: "make", filter: "agSetColumnFilter"},
        { field: "model",sortable: false  },
        { field: "price", headerName: 'Price(Line)', cellRenderer: "agSparklineCellRenderer", },
        {
            field: "price",
            headerName: 'Price(bar)',
            cellRenderer: "agSparklineCellRenderer",
            cellRendererParams: {
                sparklineOptions: {
                    type: "bar",
                    // fill: "#5470c6",
                },
            }
        },

        {
            field: "electric",
            valueFormatter: lowerCaseParam,
            filter: true,
        },
        {
            headerName: "Name & Country",
            children: [
                { field: 'make' },
                { field: 'model' }
            ],
        },
    ]);

    const [colDefsNoGraph, setColDefsNoGraph] = useState<ColDef[]>([
        { field: "make" },
        { field: "model" },
        // {
        //     field: "electric",
        //     valueFormatter: lowerCaseParam,
        //     filter: true,
        //     // filterParams:{
        //     //     valueFormatter:countryValueFormatter,
        //     // }

        // }
    ]);

    const hideGraph = () => {
        gridRef.current.api.setGridOption("columnDefs", colDefsNoGraph);
    }

    const showGraph = () => {
        gridRef.current.api.setGridOption("columnDefs", colDefs);
    }



    return (
        <div
            className={theme.quartz}
            style={{ height: 1000 }}
        >
            <button onClick={hideGraph}>Hide Graph</button>
            <button onClick={showGraph}>Show Graph</button>

            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                rowStyle={{ background: '#00000011' }}
                rowHeight={100}
                pagination={true}
                columnDefs={colDefs}
            />
        </div>
    )
}

export default AgGrid