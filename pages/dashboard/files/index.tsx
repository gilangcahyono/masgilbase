import Layout from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      <div className="w-full rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="font-semibold text-gray-900">Files</h2>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full divide-y-2 divide-gray-200">
            <thead className="ltr:text-left rtl:text-right">
              <tr className="*:font-medium *:text-gray-900">
                <th className="px-3 py-2 whitespace-nowrap">ID</th>
                <th className="px-3 py-2 whitespace-nowrap">Name</th>
                <th className="px-3 py-2 whitespace-nowrap">URL</th>
                <th className="px-3 py-2 whitespace-nowrap">Created At</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              <tr className="*:text-gray-900 *:first:font-medium">
                <td className="px-3 py-2 whitespace-nowrap ">
                  123e4567-e89b-12d3-a456-426614174000
                </td>
                <td className="px-3 py-2 whitespace-nowrap ">
                  aB7xQ2LmN9pR4tY8kJ3vW6cD1eF5hG0Z
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  https://png.pngtree.com/background/20250128/original/pngtree-universal-vibes-4k-phone-wallpaper-picture-image_15598639.jpg
                </td>
                <td className="px-3 py-2 whitespace-nowrap">2023-01-01</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
