import { Button, IconButton } from '@mui/material';
import './App.css';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import AdminService from "./Service";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { TimerSharp } from '@mui/icons-material';
import { Loading } from 'react-loading-dot';

class App extends React.Component {
  constructor(props) {
    super(props);
  
  this.state = {
    messages:[{"role":"assistant", "content":"hi! How can I help you?"}],
    query:"",
    mode:"white",
    loading:false
  }
  this.askAi = this.askAi.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.changeMode = this.changeMode.bind(this);
}
onKeyDownHandler = e => {
  
  if (e.keyCode === 13) {
    this.askAi();
  }
};

askAi(){
  
  
  var tmpmsg = this.state.messages
  tmpmsg.push({"role":"user", "content":this.state.query})
  var query  = this.state.query
  this.setState({messages:tmpmsg,query:"", loading:true},
  ()=>{
    document.getElementsByClassName("user")[document.getElementsByClassName("user").length-1].scrollIntoView({ behavior: "smooth", block: "end" })
      
    var requestBody = {};
    requestBody['role'] = "user";
    requestBody['content'] = query
    AdminService.ask(requestBody).then((res) => {
      debugger;
      var tmp = this.state.messages
      res.data.content = res.data.content.replaceAll("/n", "<br/>");
      tmp.push(res.data)
      this.setState({messages:tmp, query:"", loading:false},()=>{
        document.getElementsByClassName("assistant")[document.getElementsByClassName("assistant").length-1].scrollIntoView({ behavior: "smooth", block: "end" })
      })
    });
  })
}
handleChange(e){
  this.setState({query:e.target.value})
}
changeMode(){
if(this.state.mode=="white"){
  //document.body.classList.toggle("dark-mode");
  document.getElementsByClassName("outbox")[0].classList.toggle("dark-mode");
  this.setState({mode:"dark"})
}else{
  //document.body.classList.remove("dark-mode");
  document.getElementsByClassName("outbox")[0].classList.remove("dark-mode");
  this.setState({mode:"white"})
}
}
render(){

  return(
    <div className='outbox'>
      <div class="dot-flashing"></div>
      
    <div className='header' >
      <div style={{width: "90%", display: "inline-grid"}}><span>Chat Bot</span></div>
    <div style={{width: "10%",display: "inline-flex"}}>{this.state.mode}
    <IconButton sx={{ ml: 1, paddingTop: "0px"}} onClick={()=>this.changeMode()} color="inherit">
        {this.state.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      </div>
      </div>
    <div className={'conatiner '+this.state.mode}>
    {this.state.messages.map((data)=>(
      <div style={{display:"grid", width: "fit-content", marginLeft:data.role === "user"?"auto":"unset", marginRight:data.role === "user"?"0px":"unset"}}> 
      {/* <span className='pre-text'>{data.sender}</span> */}
      
      <div className={data.role}>
      <div className={data.role+'-pre '+this.state.mode} style={{height: "21px", width:"5px",marginBottom:"0px", marginTop:"auto", display: data.role === "assistant"?"block":"none"}}></div>
        <span dangerouslySetInnerHTML={{ __html: data.content}}></span>
      <div className={data.role+'-pre '+this.state.mode} style={{height: "21px",width: "5px",display: "block",marginRight: "0px",marginLeft: "auto",display: data.role === "user"?"block":"none"}}></div>
      </div>
      </div>
    ))
  }
      <div style={{display: this.state.loading === true?"grid":"none"}}>
      <div className="assistant-loading" style={{width:"90px"}}>
      <div className={'assistant-pre-loading '+this.state.mode} style={{height: "21px", width:"5px",marginBottom:"0px", marginTop:"auto"}}></div>
        <span className="loading-span"><Loading   size="10px" background="grey" style={{position:"relative", top:"9px"}}/></span>
      </div>
      </div>
  

    </div>
    
    <div style={{borderTop: "1px solid"}}>
  <input onKeyDown={(e)=>this.onKeyDownHandler(e)} value = {this.state.query} onChange={(e)=>{this.handleChange(e)}} className="inputQuery" type="text" placeholder="Enter Query"/>
  <Button  style={{color:"white", background:"grey", width:"12%", padding:"4px"}} variant="contained" endIcon={<SendIcon />} onClick={()=>this.askAi()}>
  Ask
</Button>
</div>
    </div>
  )
}
}
export default App;
