// Home.js
import React, { useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from "react-router-dom"; // React Router for navigation

export default function Home(){
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  const fetchArticles = async () => {
    const { data, error } = await supabase.from("articles").select("*")
    .order('id', { ascending: true });

    if (error) {
      console.error("Error fetching articles:", error);
    } else {
      setArticles(data);
    }
  };

  const formatDate = (date) => {
    console.log(date)
    return new Date(new Date(date).getTime() + 8 * 60 * 60 * 1000) // Add 8 hours in milliseconds
              .toLocaleString('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })
  }

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 500 },
    { field: "updated_by", headerName: "Updated By", width: 200 },
    { field: "updated_on", headerName: "Updated At", width: 200,
      valueGetter: (params) => formatDate(params)
     },
  ];

    // Handle row click
    const handleRowClick = (params) => {
      window.open(`/article/${params.id}`, "_blank");
    };



    
  useEffect(() => {
    fetchArticles(); // Fetch articles on component mount
  }, []);



  return (<div className = "mb-5">
    <h1 className = "mt-5 mb-5">CebQA Dataset Validator</h1>
    <DataGrid
        rows={articles}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        getRowId={(row) => row.id} // Ensure the `id` field is used as the unique identifier
        onRowClick={(params) => handleRowClick(params.row)} // Navigate to article on row click
        style={{ cursor: "pointer" }}
      />
  </div> )
};

