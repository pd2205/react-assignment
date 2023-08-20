import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const TableData = () => {
  const [userDetails, setUserDetails] = useState<any>();
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userDetailsFromLocalStorage = localStorage.getItem("userDetails");
    if (!userDetailsFromLocalStorage) {
      navigate("/");
    } else {
      setUserDetails(JSON.parse(userDetailsFromLocalStorage));
    }
  }, [navigate]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 500 },
  ];
  return (
    <div>
      {" "}
      <Typography variant="h3" gutterBottom>
        Welcome to the Second Page
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Thank you for providing your details. Here's a summary of your
        information:
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Name: {userDetails?.name}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Phone Number: {userDetails?.phoneNumber}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Email: {userDetails?.email}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid rows={posts} columns={columns} />
      </div>
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 2 }}>
        Departments and Sub-Departments
      </Typography>
    </div>
  );
};

export default TableData;
