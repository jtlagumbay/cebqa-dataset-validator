// BlogPost.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TextCompare from './TextCompare';
import QuestionAnswer from './QuestionAnswer';
import Accordion from 'react-bootstrap/Accordion';
import { supabase } from '../utils/supabaseClient';
import { ToastContainer, toast } from 'react-toastify';


export default function Article (){
    const { id } = useParams(); // Extract the 'id' parameter from the route
    const [article, setArticle] = useState({
      "id": 0,
      "url": "",
      "title": "",
      "author": "",
      "date": "",
      "body": "",
      "pseudonymized_body": "",
      "pseudonymized_title": "",
      "updated_on":"",
      "updated_by":"",
      "assigned_to":"",
      "unusable": false
  });

  const [name, setName] = useState("");

  const [dataset, setDataset] = useState([])
  const [updatedDataset, setUpdatedDataset] = useState(dataset);

  const [isOpen, setIsOpen] = useState(false);
  const [btnEnable, setBtnEnable] = useState(true);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const handleDatasetChange = (updatedItem) => {
    console.log(updatedItem)
    setUpdatedDataset(prevDataset => {
      // Update the specific dataset item
      return prevDataset.map(item =>
        item.id == updatedItem.id ? updatedItem : item
      );
    });
  };


  // Fetch article information
  const fetchArticle = async () => {
    // Fetch Article Info
    const { data, error } = await supabase
      .from('articles') // Replace with your table name
      .select('*')
      .eq('id', id);

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setArticle(data[0])
      setName(data[0]["updated_by"])
    }
  };

      // Fetch article information
  const fetchQuestions = async () => {
    // Fetch Article Info
    const { data, error } = await supabase
      .from('questions') // Replace with your table name
      .select('*')
      .eq('article_id', id)
      .order('id', { ascending: true })

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      // console.log(data)
      setDataset(data)
      setUpdatedDataset(data)
    }
  };

  const updateArticle = async () => {
    const { data, error } = await supabase
      .from('articles') // Replace with your table name
      .update({ 
        updated_by: name,
        updated_on: new Date().toISOString()
       }) // Specify the column and new value
      .eq('id', id); // Match the row with the given id
  
    if (error) {
      console.error('Error updating data:', error);
    } else {
      console.log('Article updated successfully:', data);
    }
  };
  
  const bulkUpdateQuestions = async () => {

    try {
      const { data, error } = await supabase
        .from('questions')
        .upsert(updatedDataset, { onConflict: ['id'] }); // Ensure we don't create duplicates
  
      if (error) {
        toast.error('Error in bulk update: ' + error.message);
        console.error('Error in bulk update:', error);
      } else {
        toast.success('Bulk update successful!');
        console.log('Bulk update successful:', data);
        setTimeout(() => {
          window.location.reload(); // Reload the page after a 3-second delay
        }, 3000);
      }
    } catch (err) {
      toast.error('Error in bulk update: ' + err.message);
      console.error('Error in bulk update:', err);
    }
  };


  const saveChanges = async () => {

    if(name==""){
      toast.error("Add name.")
      setBtnEnable(true)
      return
    }

    setBtnEnable(false)

    await bulkUpdateQuestions()
    await updateArticle()
  }

  

    useEffect(() => {
      fetchArticle();
      fetchQuestions()
    }, []);

    useEffect(()=>{
      console.log(updatedDataset)
    }, [updatedDataset])

    return (
        <div className="mt-5">
            <ToastContainer />
            <p className = "mb-5">  Assigned to: <strong>{article.assigned_to || "No one assigned yet"}</strong></p>
            <h1>{article.pseudonymized_title}</h1>
            <p>Article ID: {article.id}</p>
            <p>Article Link: <a href={article.url} target="_blank">{article.url}</a></p>
            <p>
            Last updated: {
              new Date(new Date(article.updated_on).getTime() + 8 * 60 * 60 * 1000) // Add 8 hours in milliseconds
                .toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })
            }
          </p>
            <div>
              <button
                className="btn btn-primary mb-3"
                type="button"
                onClick={toggleCollapse}
                aria-expanded={isOpen}
                aria-controls="collapseTextCompare"
              >
                {isOpen ? 'Hide' : 'Show'} Article
              </button>
              <div
                className={`collapse ${isOpen ? 'show' : ''}`}
                id="collapseTextCompare"
              >
                <TextCompare
                  text1={article.body}
                  text2={article.pseudonymized_body}
                  title="Pseudonymized Article"
                />
              </div>
            </div>
            <br />
            <Accordion defaultActiveKey="0">
            {
                dataset.map((item, index) => (
                    <Accordion.Item 
                      eventKey={index}
                    >
                        <Accordion.Header>Question #{item.id}: {item.question}</Accordion.Header>
                        <Accordion.Body>
                        <QuestionAnswer
                            key={article.id}
                            article={article}
                            dataset={item}
                            handleDatasetChange={handleDatasetChange}
                        />
                        </Accordion.Body>
                    </Accordion.Item>
                ))
            }
            </Accordion>
          

          {/* Section to display unusable questions */}
        <h4 className="mt-5 text-danger">Unusable Questions</h4>
        <div>
            {
                updatedDataset.filter(item => item.unusable).length > 0 ? (
                  updatedDataset
                        .filter(item => item.unusable)
                        .map((item) => (
                            <p key={item.id}>
                                Question #{item.id}: {item.question}
                            </p>
                        ))
                ) : (
                    <p>No unusable questions found.</p>
                )
            }
        </div>
          <div className="mt-5">
          <p>Updated by:</p>
          <select
                  className="form-control mb-3 mt-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                >
                  <option value="" disabled>
                    Select your name
                  </option>
                  <option value="Jeric">Jeric</option>
                  <option value="Sheldon">Sheldon</option>
                  <option value="Arwin">Arwin</option>
                  <option value="Louise">Louise</option>
                  <option value="Levi">Levi</option>
                  <option value="Renier">Renier</option>
                  <option value="Ian">Ian</option>
                  <option value="Philippe">Philippe</option>
                  <option value="Clelia">Clelia</option>
                  <option value="Jilliane">Jilliane</option>
                  <option value="Adrian">Adrian</option>
                  <option value="Carl">Carl</option>
                  <option value="Jourdan">Jourdan</option>
                  <option value="Romella">Romella</option>
                  <option value="Jhoanna">Jhoanna</option>
            </select> 
            <button 
              className="btn btn-primary mb-3 mt-3"
              onClick={saveChanges}
              disabled={!btnEnable}
            >
                Update Questions
            </button>
            </div>

        </div>
    );
};
