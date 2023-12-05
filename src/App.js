import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

function App() {
  const API_KEY="a2cf557849b9742e0f45fbc21aa0430a";
  const[location,setLocation]=useState('');
  const[result,setResult]=useState({});
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
  
  const searchWeather=async(e)=>{
    if(e.key==='Enter'){
      try{
        const data = await axios({
          method:'get',
          url:url
        })
        console.log(data);
        setResult(data);

      }catch(err){
        alert(err);
      }
    }
  }

  return (
    <AppWrap>
      <div className="appContentWrap">
        <input
          placeholder="도시명을 입력하세요"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
          type='text'
          onKeyDown={searchWeather}
        />
        {Object.keys(result).length !==0 &&(
        <ResultWrap>
          <div className="city">{result.data.name}</div>
          <div className="temperature">{(Math.round((result.data.main.temp-273.15)*10))/10}°gitC</div>
          <div className="sky">{result.data.weather[0].main}</div>
        </ResultWrap>)}
      </div>
      
    </AppWrap>
    
  );
}

export default App;
const AppWrap =styled.div`
  width:100vw;
  height:100vh;

  .appContentWrap{
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    position:absolute;
    padding:20px;
  }
  input{
    padding:15px;
    border: 3px black solid;
    border-radius:16px;
  }

`;
const ResultWrap=styled.div`
  margin-top:60px;
  padding:10px;

  border-radius:8px;
  .city{
    font-size:24px;
  }
  .temperature{
    font-size:60px;
    margin-top:8px;
  }
  .sky{
    font-size:20px;
    text-align:right;
    margin-top:8px;
  }
`;
