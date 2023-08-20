import Container from "@mui/material/Container";
import ExpandableData from "../components/ExpandableData";
import TableData from "../components/TableData";

const SecondPage: React.FC = () => {
  const data = [
    {
      department: "customer_service",
      sub_departments: ["support", "customer_success"],
    },
    {
      department: "design",
      sub_departments: ["graphic_design", "product_design", "web_design"],
    },
  ];
  return (
    <Container maxWidth="lg">
      <TableData />
      <ExpandableData data={data} />
    </Container>
  );
};

export default SecondPage;
