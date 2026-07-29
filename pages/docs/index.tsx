import fs from "fs";
import path from "path";

export async function getServerSideProps() {
  const docsPath = path.join(process.cwd(), "docs");

  const app = fs.readFileSync(path.join(docsPath, "app.md"), "utf8");

  return {
    props: {
      app,
    },
  };
}

export default function Page({ app }: any) {
  const code = `
fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    username: 'emilys',
    password: 'emilyspass',
    expiresInMins: 30,
    }),
    credentials: 'include'
})
    .then(res => res.json())
    .then(console.log);`;

  return (
    <div>
      <pre>{code}</pre>
    </div>
  );
}
