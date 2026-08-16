import { GetServerSideProps } from "next";

export default function Dashboard() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/dashboard/projects",
      permanent: true,
    },
  };
};
