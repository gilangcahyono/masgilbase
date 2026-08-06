import Layout from "@/components/Layout";
import UploadFiles from "./UploadFiles";
import GetAllFiles from "./GetAllFiles";
import GetSingleFile from "./GetSingleFile";
import DeleteFile from "./DeleteFile";

const Index = () => {
  return (
    <Layout>
      <UploadFiles />
      <GetAllFiles />
      <GetSingleFile />
      <DeleteFile />
    </Layout>
  );
};

export default Index;
