import React from 'react'

 import {
    useReactTable,
     getCoreRowModel,
     getPaginationRowModel,
     getSortedRowModel
   } from '@tanstack/react-table';
import TableHader from './TableHader';
import TableBody from './TableBody';
export default function Table({data,columns,extraFeature =false,featureFun}:any) {


  
   
         const tableInstance = useReactTable({
               columns,
                 data,
                 getCoreRowModel: getCoreRowModel(),
                 getPaginationRowModel: getPaginationRowModel(),
                 getSortedRowModel: getSortedRowModel(), //order doesn't matter anymore!
                 // etc.
               });
        
  return (
<>
<table className='w-3/4 mx-auto'>
<TableHader table={tableInstance} extraFeature={extraFeature}/>
<TableBody table={tableInstance} extraFeature={extraFeature} featureFun={featureFun}/>


</table>




</>
  )
}
