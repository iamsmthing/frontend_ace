export const uploadToCloudinary = async (images: string[]) => {
  let uploadedUrls = [];
  try {
    for (const base64Image of images) {
      // Cloudinary unsigned upload
      const formData = new FormData();
      formData.append("file", base64Image); // Base64 image
      formData.append("upload_preset", process.env.NEXT_PUBLIC_PRESET_NAME!);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME!}/image/upload`, // Replace with your Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image.");
      }

      const data = await uploadResponse.json();
      uploadedUrls.push(data.secure_url);
    }

    console.log(uploadedUrls);
    return uploadedUrls[0];
  } catch (error) {
    console.error("Error uploading images:", error);
    return error;
  }
};
