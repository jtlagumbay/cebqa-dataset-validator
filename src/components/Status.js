import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { supabase } from '../utils/supabaseClient';

const Status = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  // Function to fetch data from Supabase
  const fetchData = async () => {
    try {
      // Fetch all articles from the 'articles' table
      const { data: articles, error } = await supabase
        .from("articles")
        .select("*")
        .order('id', { ascending: true });

      if (error) {
        console.error("Error fetching articles:", error);
      } else {
        console.log(articles)
        const userStats = {}; // To store finished/assigned stats for each user

        // Calculate finished and assigned tasks for each user
        articles.forEach((article) => {
          const user = article.assigned_to;

          if(!user) return;

          if (!userStats[user]) {
            userStats[user] = { finished: 0, assigned: 0 };
          }

          // Count assigned tasks
          userStats[user].assigned += 1;
          console.log(user, article.updated_by)
          // Count finished tasks (excluding unusable)
          if (article.updated_by == user) {
            userStats[user].finished += 1;
          }
        });

        // Convert the stats into an array of objects
        const statsArray = Object.keys(userStats).map((user) => ({
          id: user,
          name: user,
          finished: userStats[user].finished,
          assigned: userStats[user].assigned,
          progress: userStats[user].finished / userStats[user].assigned
        }));

        // setData(statsArray.sort((a, b) => b.progress - a.progress));
        setData(statsArray);
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);


  const columns = [
    { field: "name", headerName: "Name", flex: 1},
    { field: "finished", headerName: "Finished", flex: 1},
    { field: "assigned", headerName: "Assigned", flex: 1},
    { field: "progress", headerName: "Progress", flex: 1,
        valueGetter: (params) => {
            return params ? (params * 100).toFixed(2) + "%" : "0%"; // Format as percentage with 2 decimal places
          }
    }
  ];

  const handleRowClick = (param) => {
    navigate(`/${param.row.name}`);
  };

  return (
    <div className="mt-5">
      <h2>Task Progress Table</h2>
      <DataGrid
        rows={data}
        columns={columns}
        pageSizeOptions={[100]}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default Status;
