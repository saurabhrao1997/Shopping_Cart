
import {
 
    flexRender,
  
  } from '@tanstack/react-table'

export default function TableHader({table,extraFeature}:any) {
  return (
   <>
      <thead className=''>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className='my-4 border-b-2 px-2'>
              <th className='px-2'>Number</th>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='px-2 truncate'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
          {extraFeature &&  <th className='px-2 truncate'>Additional Feature</th>}
            </tr>
          ))}
        </thead>
   
   </>
  )
}
