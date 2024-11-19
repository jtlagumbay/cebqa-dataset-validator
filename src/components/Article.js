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
      "updated_on":""
  });
  const [dataset, setDataset] = useState([])
  const [updatedDataset, setUpdatedDataset] = useState(dataset);

  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const handleDatasetChange = (updatedItem) => {
    console.log(updatedDataset)
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
    }
  };

      // Fetch article information
  const fetchQuestions = async () => {
    // Fetch Article Info
    const { data, error } = await supabase
      .from('questions') // Replace with your table name
      .select('*')
      .eq('article_id', id);

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      // console.log(data)
      setDataset(data)
      setUpdatedDataset(data)
    }
  };

  // const updateQuestions = async (questions) => {
  //   try {
  //     // Loop over each question and perform an update
  //     for (let question of dataset) {
  //       const { data, error } = await supabase
  //         .from('questions') // Table name
  //         .update({
  //           context: question.context,
  //           answer: question.answer,
  //           context_start: question.context_start,
  //           context_end: question.context_end,
  //           answer_start: question.answer_start,
  //           answer_end: question.answer_end,
  //         })
  //         .eq('id', question.id); // Update where the question ID matches
  
  //       if (error) {
  //         console.error('Error updating question:', error);
  //       } else {
  //         console.log('Updated question:', data);
  //       }
  //     }
  //   } catch (err) {
  //     console.error('Error in updating questions:', err);
  //   }
  // };

  const bulkUpdateQuestions = async () => {
    console.log(updatedDataset)
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

  

    useEffect(() => {
      fetchArticle();
      fetchQuestions()
    }, []);

    useEffect(()=>{
      // console.log(updatedDataset)
    }, [updatedDataset])

    return (
        <div>
            <ToastContainer />
            <h1>{article.pseudonymized_title}</h1>
            <p>Article ID: {article.id}</p>
            <p>Article Link: <a href={article.url} target="_blank">{article.url}</a></p>

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
                    <Accordion.Item eventKey={index}>
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

          <button 
            className="btn btn-primary mb-3 mt-3"
            onClick={bulkUpdateQuestions}
          >
              Update Questions
          </button>
        </div>
    );
};
