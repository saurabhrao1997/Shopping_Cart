
import {
 
    flexRender,
  
  } from '@tanstack/react-table'

export default function TableBody({table,extraFeature,featureFun}:any) {
  return (
 <>
  <tbody>
          {table.getRowModel().rows.map((row,index) => (
            <tr key={row.id} className='h-full border-b py-2 '>
                <td className='text-center   truncate'>{index+1}</td>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='text-center  truncate'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
           {extraFeature &&   <td className=''>{featureFun(row)}</td>}
            </tr>
          ))}
        </tbody>
 
 
 
 </>
  )
}
