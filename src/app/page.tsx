"use client"
import axios from "axios";
import { m } from "framer-motion";
import Image from "next/image";
import { platform } from "os";
import { useEffect, useState } from "react";

interface Customer {
  id? : number,
  name : string,
  platform : string,
}



export function CardCustomer({data,key} : {key : number, data : Customer}){
  return(
      <div key={key} style={{borderBottom : '1px solid #D4D4D4', display : 'flex', flexDirection : 'row', justifyContent : 'space-between',padding : '24px' }}>
          <div style={{display : 'flex', flexDirection : 'row', alignItems : 'center'}}>
              <Image src={'/avatar.png'} alt="avatar" width={64} height={64}/>
              <div style={{marginLeft : '8px', overflow : 'hidden'}}>
                  <p style={{fontSize : '16px', fontWeight : '600'}}>{data.name}</p>
                  <Badge platformName={data.platform}/>
              </div>
          </div>
      </div>
  )
}

export function CardCustomerSelected({data,key} : {key : number, data : Customer}){
  return(
      <div key={key} style={{backgroundColor : '#7F56D7',borderBottom : '1px solid #D4D4D4', display : 'flex', flexDirection : 'row', justifyContent : 'space-between',padding : '24px' }}>
          <div style={{display : 'flex', flexDirection : 'row', alignItems : 'center'}}>
              <Image src={'/avatar.png'} alt="avatar" width={64} height={64}/>
              <div style={{marginLeft : '8px', overflow : 'hidden'}}>
                  <p style={{fontSize : '16px', fontWeight : '600'}}>{data.name}</p>
                  <Badge platformName={data.platform}/>
              </div>
          </div>
      </div>
  )
}

export function Badge({platformName} : {platformName : string}){
  return(
      <div style={{display : 'flex',backgroundColor : '#D9D9D9', maxWidth : '100%', paddingLeft : '8px', paddingTop : '4px', paddingBottom : '4px', borderRadius : '8px'}}>
          <p style={{fontSize : '12px', color : '#7F56D7'}}>{platformName}</p>
      </div>
  )
}

export function BadgeChat(props : {sentiment: number}){
  var sentiment 
    if(props.sentiment > 66){
        sentiment = 'Positif'
      }else if(props.sentiment > 33){
        sentiment = 'Netral'
      }else if(props.sentiment > 0){
        sentiment = 'Negatif'
      }
      
    return(
        <div style={{borderRadius : '12px', paddingLeft : '8px', paddingRight : '8px', paddingTop : '4px', paddingBottom : '4px', backgroundColor  : 'white'}}>
            <p style={{fontSize : '10pt'}}>{sentiment}</p>
        </div>
    )
}

export function CustomerChat(props : {message : string, sentiment: number}){

  let splitIndex = props.message.indexOf(',');
let part1 = props.message.substring(0, splitIndex).trim();
let part2 = props.message.substring(splitIndex + 1).trim();

// Create an array from the separated parts
let resultArray = part2.split(',').map(item => item.trim());
    return(
        <div style={{padding : '12px', margin : '24px', minWidth : '250px',maxWidth : '60vh', backgroundColor : '#E9ECF5', height : 'max-content', borderRadius : '12px'}}>
            
            <p style={{fontSize : '14pt'}}>{part1}</p>

            <div style={{display : 'flex', flexDirection :'row', marginBottom : '8px', marginTop : '8px'}}>
                <BadgeChatType text="#Ringkasan_pertanyaan_pelanggan"/>
            </div>
            {resultArray.map((item, index) => {
              return(
                <BulletPoint text={item} key={index}/>

              )
            })}
            <div style={{display : 'flex', flexDirection :'row', justifyContent : 'flex-end'}}>
                <BadgeChat sentiment={props.sentiment}/>
            </div>
        </div>
    )
}

export function BadgeChatType(props : {text: string}){
    return(
        <div style={{borderRadius : '12px', paddingLeft : '8px', paddingRight : '8px', paddingTop : '4px', paddingBottom : '4px', backgroundColor  : 'white'}}>
            <p style={{fontSize : '10pt', color : '#7F56D7', fontStyle : 'italic'}}>{props.text}</p>
        </div>
    )
}

export function BulletPoint(props : {text : string}){
    return(
        <div style={{flexDirection : 'row', display : 'flex', alignItems : 'center'}}>
            <div style={{width : "4px", height : "4px", borderRadius : "20px", backgroundColor : 'black', marginRight : '8px'}}/>
            <p style={{color : 'black'}}>{props.text}</p>
        </div>
    )
}

export function AgentChat(props : {text : string}){
    return(
        <div style={{padding : '12px', margin : '24px',  minWidth : '250px',maxWidth : '60vh', backgroundColor : '#7F56D7', height : 'max-content', borderRadius : '12px'}}>
            {/* <div style={{display : 'flex', flexDirection :'row', marginBottom : '8px'}}>
                <BadgeChatType text="#Ringkasan_pertanyaan_pelanggan"/>
            </div>
            <BulletPoint/>
            <div style={{display : 'flex', flexDirection :'row', marginBottom : '8px', marginTop : '16px'}}>
                <BadgeChatType text="#Balasan_jawaban"/>
            </div>
            <BulletPoint/> */}
            <p style={{fontSize : '14pt', color : 'white'}}>{props.text}</p>
    
        </div>
    )
}

export function SidebarAddCustomer(props : {onPressBack : () => void, onPressAddCustomer : (name : string, platform : string) => void}){
  const [inputName, setInputName] = useState<string>('')
  const [inputPlatform, setInputPlatform] = useState<string>('Tokopedia')


  return (
      <div style={{width : '80vh', minHeight : '100vh', backgroundColor : "#FFFFFF",alignItems : 'flex-end' }}>
      <div style={{backgroundColor : '#7F56D7',flexDirection : 'row',height : '154px', display : 'flex', paddingRight : '24px',paddingLeft : '24px', alignItems : 'center', paddingTop : '64px'}}>
          <button onClick={props.onPressBack}>
              <Image src={'/arrow-left.svg'} alt="iconplus" width={36} height={36}/>
          </button>
          <p style={{fontSize : '24px', color : 'white', marginLeft : '16px'}}>Tambah Pelanggan</p>


      </div>


      <div style={{padding : '24px'}}>
          <div style={{marginBottom : '16px'}}>
          <p>Nama atau Username</p>
          <input onChange={(e) => setInputName(e.target.value)} style={{borderRadius : '8px', borderWidth : '1px', borderColor : '#D4D4D4', padding : '8px', width : '100%', height : '48p', marginTop : '8px'}}/>
          </div>

          <div style={{marginBottom : '16px'}}>
          <p>Platform</p>
              <select onChange={(e) => setInputPlatform(e.target.value)} id="countries" defaultValue={inputPlatform} style={{marginTop :'8px'}} className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="Instagram" >Instagram</option>
                  <option value="Email">Email</option>
                  <option value="Tokopedia">Tokopedia</option>
                  <option value="Shopee">Shopee</option>

              </select>            
          </div>

          <button onClick={() => props.onPressAddCustomer(inputName, inputPlatform)} style={{backgroundColor : '#7F56D7', color : 'white', borderRadius : '8px', padding : '8px', height : '48px',width : '100%', marginTop : '16px'}}>Tambah</button>
      </div>

     
  </div>
  )
}

export function SidebarChatCustomer(props: {data : Customer[], onSelectCustomer : (data : Customer) => void, selectedCustomer : Customer | undefined, onPressAddCustomer : () => void}){

  if(props.data === undefined || props.data === null){
    return null
  }
  return(
    <div style={{overflow : 'scroll',width : '80vh', minHeight : '100vh', backgroundColor : "#FFFFFF", borderWidth : 1, borderColor : '#D4D4D4'}}>
    <div style={{flexDirection : 'row',height : '86px', display : 'flex', justifyContent : 'space-between', paddingTop : '8px', paddingRight : '24px',paddingLeft : '24px', alignItems : 'center', borderWidth : '1px', borderColor : '#D4D4D4'}}>
        <p style={{fontSize : '24px'}}>Answer AI</p>
        <button onClick={props.onPressAddCustomer}>
            <Image src={'/iconPlus.svg'} alt="iconplus" width={48} height={48}/>
        </button>

    </div>
    {props.data.map((item, index) => {
      if(item.id === props.selectedCustomer?.id){
        return(
          <button onClick={() => props.onSelectCustomer(item)} style={{width : '100%'}} key={index}>
          <CardCustomerSelected key={item.id} data={item}/>
          </button>
        )
      }else{
        return(
          <button onClick={() => props.onSelectCustomer(item)} style={{width : '100%'}} key={index}>
          <CardCustomer key={item.id} data={item}/>
          </button>
        )
      }

    })}
  
   
  </div>
  )

}



export default function Home(){
    const [showAddCustomer, setShowAddCustomer] = useState(false)
    const [selectCustomer, setSelectCustomer] = useState<Customer>()
    const [dataCustomer, setDataCustomer] = useState<Customer[]>([]); // Updated to use state for dynamic data
    const [inputMessageCustomer, setInputMessageCustomer] = useState()
    const [inputContext, setInputContext] = useState()
    const [dataResponsePostCustomer, setDataResponsePostCustomer] = useState<Customer>()
    const [dataChat, setDataChat] = useState()
    
    var endpoint = 'https://55b9-114-10-29-118.ngrok-free.app'

    const fetchData = async () => {
      try {
          const response = await axios.get(`${endpoint}/message/agent/1`, {
              headers: {
                "ngrok-skip-browser-warning": "69420",
              }
          });
          setDataCustomer(response.data); // Assuming the response data is the array of customers
      } catch (error) {
          console.error('Error fetching data: ', error);
          // Handle error appropriately in your application
      }
  };


  const postData =  async (name : string, platform : string) => {
    setSelectCustomer(undefined)
    const postCustomer = `${endpoint}/customers`;
    const data = {
      name: name,
      platform: platform
    };
  
    try {
      const response  = await axios.post(postCustomer, data);
      setSelectCustomer(response.data);
      setDataCustomer([...dataCustomer, response.data])
      setShowAddCustomer(false)
      // Handle response here
    } catch (error) {
      console.error('Error posting data:', error);
      // Handle error here
    }
  };


    useEffect(() => {


      fetchData();
  }, []);     


  const sendingMessage = async (message : string, customerId: string, senderType : string, sentimentScore : number) => {
    const postMessage = `${endpoint}/message`;
    const data = {
      message: message,
      agentId : 1,
      customerId: customerId,
      senderType : senderType,
      sentimentScore : sentimentScore
    };

    console.log(data, 'sendingmessagedata')

  
    try {
      const response  = await  axios.post(postMessage, data);
      // Handle response here
    } catch (error) {
      console.error('Error posting data:', error);
      // Handle error here
    }
  }


  const sendingAnalyze = async (message : string, contextMessage : string) => {
    const postMessage = `${endpoint}/chat/generate`;
    const data = {
      customerChat: message,
      agentContext : contextMessage
    };

  
    try {
      const response  = await axios.post(postMessage, data);
      console.log(response,data, 'responsedatanbta')
      sendingMessage( `${inputMessageCustomer} , ${response.data.summarize}`, selectCustomer.id.toString(), 'Sender', response.data.sentiment_score).then(() => {
        sendingMessage(`${inputContext} \n\n ${response.data.response}` ,selectCustomer.id.toString(), 'Receiver', response.data.sentiment_score)
      })

      // Handle response here
    } catch (error) {
      console.error('Error posting data:', error);
      // Handle error here
    }finally{
      setDataChat([])
      setInputContext('')
      setInputMessageCustomer('')
      getMessage(selectCustomer.id)

    }
  }
  

  const getMessage = async (customerId : string) => {
    const postMessage = `${endpoint}/message/agent/1/customer/${customerId}`;
    try {
      const response  = await axios.get(postMessage, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        }
    });
      setDataChat(response.data)
      // Handle response here
    } catch (error) {
      console.error('Error posting data:', error);
      // Handle error here
    }
  }

  const onSelectCustomer = (data : Customer) => {
    setSelectCustomer(data)
    getMessage(data.id.toString())

  }
  



    return(
        <main className="flex flex-1 max-h-screen flex-row ">
 
            {
              showAddCustomer ? <SidebarAddCustomer onPressAddCustomer={(name, platform) => postData(name, platform)} onPressBack={() => setShowAddCustomer(false)}/> : <SidebarChatCustomer onPressAddCustomer={() => setShowAddCustomer(true)} data={dataCustomer} onSelectCustomer={onSelectCustomer} selectedCustomer={selectCustomer}/>

            }
              
            <div style={{overflow : 'scroll',width : '100%', maxHeight : '92vh', backgroundColor : "#E1E1ED", borderWidth : 1, borderColor : '#D4D4D4'}}>
              {/* {selectCustomer !== undefined && ( */}
              {selectCustomer !== undefined && (
                <>
                                  <div style={{position : 'absolute',width : '70.55%', display : 'flex',alignItems : 'center',height : '86px', backgroundColor : '#FFFFFF', paddingRight : '24px', paddingLeft : '24px', paddingTop : 16, paddingBottom : 16, flexDirection : 'row', justifyContent : 'space-between'}}>
                    <div style={{flexDirection : 'row', display : 'flex', alignItems : 'center'}}>
                        <Image src={'/avatar.png'} alt="avatar" width={56} height={56}/>
                        <p style={{fontSize : '20px', marginLeft : '16px'}}>{selectCustomer.name}</p>
                    </div>
          
                  </div>
            
           
                <div style={{ flexDirection : 'column', justifyContent : 'space-between',display : 'flex'}}>
                <div style={{ minHeight : '50vh', marginTop : '100px'}}>

                  { dataChat !== undefined && dataChat.map((item, index) => {
                    if(item.sender === 'Sender'){
                      return(
                        <CustomerChat key={index} message={item.message} sentiment={item.sentimentscore}/>

                      )

                    } else{
                      return(
                        <div key={index} style={{display : 'flex', flexDirection : 'row', justifyContent : 'flex-end'}}>
                        <AgentChat  text={item.message}/>
                        </div>
                      )
                    } 
     
                  })}
                  </div>

     
     
                    <div style={{backgroundColor : '#F4F4F4', width : '70.55%', minHeight : 'max-content', position : 'absolute', bottom : 0, padding : 16, display : 'flex',flexDirection : 'row', alignItems :'end', justifyContent : 'space-between'}}>
                        <div style={{display : 'flex', flexDirection : 'column'}}>
                            <p style={{fontSize : '12pt', marginBottom : '8px'}}>Pesan Pelanggan</p>
                            <span onInput={(e) => setInputMessageCustomer(e.currentTarget.textContent)} style={{  borderRadius : 8,borderWidth : 1,borderColor :'#A5A5A5',padding : '12px',backgroundColor : "white",display: 'inline-block', width: '62vh', overflow: 'hidden', resize: 'initial', minHeight: '48px', lineHeight: '20px'}} role="textbox" contentEditable></span>                       
                         </div>

                         <div style={{display : 'flex',flexDirection : 'column'}}>
                            <div style={{display : 'flex', flexDirection : 'row', marginBottom : '8px', alignItems : 'center'}}>
                            <p style={{fontSize : '12pt'}}>Konteks</p>
                            <p style={{fontSize : '10pt', color : 'grey', marginLeft : '4px'}}>(Opsional)</p>

                            </div>
                            <span onInput={(e) => setInputContext(e.currentTarget.textContent)} style={{  borderRadius : 8,borderWidth : 1,borderColor :'#A5A5A5',padding : '12px',backgroundColor : "white",display: 'inline-block', width: '62vh', overflow: 'hidden', resize: 'initial', minHeight: '48px', lineHeight: '20px', fontSize : '14pt'}} role="textbox" contentEditable></span>                              
                        </div>

                         <button onClick={() => sendingAnalyze(inputMessageCustomer, inputContext)}>
                            <Image src={'/iconSendButton.svg'} alt="iconsend" width={48} height={48}/>
                         </button>
                    </div>
                    
                </div>
                </>
              )}

              
            </div>
        </main>
    )
}