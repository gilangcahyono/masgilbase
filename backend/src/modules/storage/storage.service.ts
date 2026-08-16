export const upload = async (file: Express.Multer.File) => {
  const host = "https://masgil.site/masgilbase";

  const data = {
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
      url: "https://masgil.site/masgilbase/storage/files/image1.jpg",
      uploadedAt: "2026-08-14T18:13:34.000Z",
      data: data,
    },
    statusCode: 201,
  };
};

export const remove = async (id: string) => {
  return {
    success: true,
    message: "File removed successfully",
    statusCode: 204,
  };
};

export const get = async (id: string) => {
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
