import cloudinary from '../config/cloudinary.js'

export const uploadImage = async (buffer, folder = 'pharmacy') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'auto' },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    )
    uploadStream.end(buffer)
  })
}

export const deleteImage = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId)
}
