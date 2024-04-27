


import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'

function ImageDropZone({submitFunction}:any) {
  const [file,setFile] = useState([])
  console.log("preImages",file)
  const onDrop = useCallback(acceptedFiles => {
     
    submitFunction({target: {value: acceptedFiles,name:"image",files:acceptedFiles}})
    setFile(acceptedFiles.map((fileee) =>  ({...fileee,preview:URL.createObjectURL(fileee)})))
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <>
  
    <div {...getRootProps()} className='border-2 border-dashed px-4 py-10 '>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>

     <div className='flex flex-wrap gap-2'>

 
    {
      file && file.map(({preview})=>{
        return (
        <div>
          <img src={preview} className='w-20 h-10' alt="imdkjgkdj" />
        </div>
        )
      })
    }
        </div>

    </>


  )
}
export default ImageDropZone