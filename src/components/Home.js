// Home.js
import React, { useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { supabase } from '../utils/supabaseClient';
import { useNavigate, useParams } from "react-router-dom"; 


export default function Home(){
  const [articles, setArticles] = useState([]);
  const { name } = useParams(); 
  const navigate = useNavigate();
  const [rowCount, setRowCount] = useState(0); // Total rows count
  const [paginationModel, setPaginationModel] = useState(
    { page: 0, pageSize: 100 }
  )
  const [loading, setLoading] = useState(false); // Loading state for DataGrid

  const fetchArticles = async () => {
    window.scrollTo(0, 0);
    setLoading(true);
    const page = paginationModel.page
    const pageSize = paginationModel.pageSize

    const offset = page * pageSize;

    let query;

    if (name) {
      query = await supabase
      .from("articles")
      .select("*", { count: "exact" }) 
      .order("id", { ascending: true })
      .range(offset, offset + pageSize - 1) 
      .ilike("assigned_to", `%${name}%`)
    } else {
      query = await supabase
      .from("articles")
      .select("*", { count: "exact" }) 
      .order("id", { ascending: true })
      .range(offset, offset + pageSize - 1) 
    }
    
    const { data, count, error } = await query;

    if (error) {
      console.error("Error fetching articles:", error);
    } else {
      setArticles(data);
      setRowCount(count || 0)
      console.log(data)

    }

    setLoading(false);
  };

  const formatDate = (date) => {
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
    { field: "assigned_to", headerName: "Assigned to", width: 200, filterable: true },
    { field: "updated_by", headerName: "Updated By", width: 200, filterable: true  },
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
  }, [paginationModel]);



  return (<div className = "mb-5">
    <h1 className = "mt-5 mb-5">CebQA Dataset Validator</h1>
    <DataGrid
        rows={articles}
        loading={loading}
        columns={columns}
        pageSizeOptions={[100]}
        getRowId={(row) => row.id} // Ensure the `id` field is used as the unique identifier
        onRowClick={(params) => handleRowClick(params.row)} // Navigate to article on row click
        style={{ cursor: "pointer" }}
        rowCount={rowCount} // Total number of rows for pagination
        paginationMode="server" // Enable server-side pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
         />
  </div> )
};

