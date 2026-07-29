import React from "react";

const DeleteFile = () => {
  const reqCode = `fetch("https://masgil.site/masgilbase/files/f47ac10b-58cc-4372-a567-0e02b2c3d479", {
    method: "DELETE",
    headers: {
      Authorization: "Bearer /* YOUR_APIKEY_HERE */", // Pass API Key via Authorization header
    },
    credentials: "include", // Include cookies (e.g., accessToken) in the request
  })`;

  const resCode = {
    success: true,
    message: "File deleted successfully",
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 mb-3">
      <h2 className="font-semibold text-gray-900">Delete a file</h2>
      <pre className="border rounded-lg p-4 bg-gray-700 text-white my-3 overflow-auto">
        {reqCode}
      </pre>
      <button className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-4 focus-visible:ring-slate-200 focus-visible:outline-none">
        Hide Response
      </button>
      <pre className="border rounded-lg p-4 bg-gray-700 text-white my-3 overflow-auto">
        {JSON.stringify(resCode, null, 2)}
      </pre>
    </div>
  );
};

export default DeleteFile;
