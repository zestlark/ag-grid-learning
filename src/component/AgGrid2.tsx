import { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react'
import React, { useState } from 'react'
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import 'ag-grid-enterprise'


// ModuleRegistry.registerModules([]);
// import 'ag-grid-enterprise'


interface IPostData {
    userId: number;
    id: number;
    title: string;
    completed: boolean
}

function AgGrid2() {
    const [rowData, setrowData] = useState<IPostData[]>([])
    const [mycolDefs, setmycolDefs] = useState<ColDef[]>([
        {
            field: 'userId', filter: true, editable: true,
            cellEditor: 'agRichSelectCellEditor',
            cellEditorParams: {
                values: [1, 2, 3, 4, 5],
            }

        }, {
            field: 'id', sortable: false,
            editable: true,

        }, { field: 'title', rowDrag: true, editable: true, }, { field: 'completed' },
    ])


    const fetchData = async () => {
        const rawData = await fetch('https://jsonplaceholder.typicode.com/todos')
        const data: IPostData[] = await rawData.json()
        setrowData(data)
        console.log(data);

        // console.log(Object.keys(data[0]));
        // setmycolDefs(Object.keys(data[0]))
    }

    return (
        <div className='ag-theme-quartz' style={{ height: '100vh' }}>
            <AgGridReact
                undoRedoCellEditing={true}
                undoRedoCellEditingLimit={2}
                rowDragManaged={true} pagination={true} onGridReady={fetchData} rowData={rowData} columnDefs={mycolDefs} />
        </div>)
}

export default AgGrid2