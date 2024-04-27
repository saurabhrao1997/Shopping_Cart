const cloudinary = require("cloudinary").v2
const fs = require("fs")





          
cloudinary.config({ 
  cloud_name: 'dyxjwfgra', 
  api_key: '121512395199285', 
  api_secret: '85srLbdMpDD_stX3DxfYox-1AgI' 
});

const uploadOnCloudinary = async(localFilePath)=>{
    try {
        const response = await cloudinary.UploadStream.upload(localFilePath,{
            resource_type:"auto"
        })
   console.log("file successfully uploaded on Cloudinary",response.url)
   return response

    } catch (error) {
        fs.unlinkSync(localFilePath)

        // remove locally save temporary file
        return null
    }
}

module.exports = uploadOnCloudinary