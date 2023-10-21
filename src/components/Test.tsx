import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Names {
    name: {
      title: string;
      first: string;
      last: string;
    };
    email: string;
  }

const Test = () => {
    const [apiData, setApiData] = useState([]);
    const storedData = localStorage.getItem("apiData");
    const[disableButton,setDisableButton]=useState(false)

    const fetchData = async () => {
        setDisableButton(true)
        const response = await axios.get("https://randomuser.me/api")
        if (response?.status === 200) {
            
            localStorage.setItem("apiData", JSON.stringify(response?.data?.results))
            refreshFun()
        }
    }

    const refreshFun = () => {
        if (storedData) {
  try {
      const parsedData = JSON.parse(storedData);
      setApiData(parsedData);
      setDisableButton(false)
     
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
        } else {
            console.log("No data found in localStorage for 'apiData'.");
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="user-info-container">
           
            {apiData?.map((item: Names, index) => {
                
                return (
                    <div>
                    {/* // <p key={index+1}>{item?.name?.title} {item?.name?.first} { item?.name?.last}</p> */}
                    <h2>User Information</h2>
                    <p>Full Name: {item?.name?.title} {item?.name?.first} { item?.name?.last}</p>
                    <p>Email: {item?.email}</p>
                    </div>
                )
            })}
     <button className="user-info-button"disabled={disableButton} onClick={()=>fetchData()}>Refresh</button>
      </div>
    );
}


export default Test;