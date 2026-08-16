export const upload = async (file: File) => {
  return {
    success: true,
    message: "File uploaded successfully",
    data: {
      id: 1,
      url: "https://masgil.site/masgilbase/storage/files/image1.jpg",
      uploadedAt: "2026-08-14T18:13:34.000Z",
    },
    statusCode: 201,
  };
};

export const remove = async (id: string) => {
  return {
    success: true,
    message: "File removed successfully",
    statusCode: 200,
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
