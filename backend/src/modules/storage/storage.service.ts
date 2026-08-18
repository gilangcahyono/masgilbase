export const store = async (file: Express.Multer.File) => {
  const host = "https://masgil.site/masgilbase";

  const data = {
    originalname: file.originalname,
    filename: file.filename,
    mimetype: file.mimetype,
    size: file.size,
    url: `${host}/storage/files/${file.filename}`,
  };

  return {
    success: true,
    message: "File uploaded successfully",
    file: file,
    data: {
      id: 1,
      url: data.url,
      uploadedAt: new Date().toISOString(),
    },
    statusCode: 201,
  };
};

export const destroy = async (id: string) => {
  return {
    success: true,
    message: "File removed successfully",
    statusCode: 204,
  };
};

export const index = async (id: string) => {
  return {
    success: true,
    message: "File found successfully",
    data: {
      id: id,
      url: "https://masgil.site/masgilbase/storage/files/image1.jpg",
    },
    statusCode: 200,
  };
};
