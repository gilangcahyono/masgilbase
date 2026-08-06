import Layout from "@/components/Layout";
// import { useRouter } from "next/router";

const Index = () => {
  // const router = useRouter();
  // return router.push("/dashboard/files");
  return (
    <Layout>
      <div className="w-full rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="font-semibold text-gray-900">Storage</h2>

        <div className="mt-4"></div>
      </div>
    </Layout>
  );
};

export default Index;
