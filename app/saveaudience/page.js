'use client'
import "./styles.css"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import Link from 'next/link'


export default function saveAudience() {
  const [rules, setRules] = useState([]);
  const [data, setData] = useState([]);
  const router = useRouter();
  // function addrule(){
  //   const form = document.getElementById('ruledd');
  //   console.log(form);
  //   const formData = new FormData(form);
  //   for (const [name, value] of formData.entries()) {
  //     console.log(`${name}: ${value}`);
  //   }
  // }
  const [field, setField] = useState('');
  const [operator, setOperator] = useState('');
  const [value, setValue] = useState('');
  const [logic, setLogic] = useState('');



  const handleSaveAudience = () => {
    try{
      const query = encodeURIComponent(JSON.stringify(data));
      router.push('/campaigns?data='+query+'');
    }
    catch(e){
      console.log(e)
    }
    
  };
  const handlereset = (e) => {
    setField('');
    setOperator('');
    setValue('');
    setLogic('');
    setRules([]);
    setData([]);
  }




  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'field':
        setField(value);
        break;
      case 'operator':
        setOperator(value);
        break;
      case 'value':
        setValue(value);
        break;
      case 'logic':
        setLogic(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Field:', field);
    // console.log('Operator:', operator);
    // console.log('Value:', value);
    // console.log('Logic:', logic);

    var fieldval,operatorval,logicval,valueval;
    if(field=='Email'){
      fieldval='email'
    }
    else if(field=='Last Visit'){
      fieldval='Visit'
    }
    else if(field=='Total Amount Spend'){
      fieldval='BilledAmount'
    }
    else if(field=='Total Visits'){
      fieldval='NumberOfVisit'
    }
    else{
      fieldval=field
    }
    if(operator=='Greater Than'){
      operatorval='$gt'
    }
    else if(operator=='Less Than'){
      operatorval='$lt'
    }
    else if(operator=='Equal To'){
      operatorval='$eq'
    }
    else{
      operatorval=operator
    }

    if(isNaN(parseInt(value))){
      valueval = value
    }
    else{
      valueval = parseInt(value)
    }

    if(logic=='AND'){
      logicval='$and'
    }
    else if(logic=='OR'){
      logicval='$or'
    }else{
      logicval = undefined
    }

    
    let newRule={}
    newRule[fieldval]={}
    newRule[fieldval][operatorval] = valueval

    if(rules.length!=0 && (rules[0]['$and']==undefined || rules[0]['$or']==undefined)){
      if(rules[0]['$and']!=undefined){
        rules[0]['$and'].push(newRule)
      }
      if(rules[0]['$or']!=undefined){
        rules[0]['$or'].push(newRule)
      }
    }
    else{
      if(logicval==undefined){
        rules.push(newRule)
      }
      else{
        let logicrule={}
        logicrule[logicval] = new Array(newRule)
        rules.push(logicrule)
      }
    }

    console.log(rules)



    setField('');
    setOperator('');
    setValue('');
    setLogic('');
  };

  const runquery = async(e) => {
    e.preventDefault();
    if(rules.length>0){
      console.log(rules[0])
      try {
        const query = encodeURIComponent(JSON.stringify(rules[0]));
        const response = await fetch(`/api/customer?query=${query}`);
        console.log("response is :",response.json())
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const dataa = await response.json();
        document.getElementById("aud-size").value = dataa.length;
        console.log("Fetched data:", dataa,dataa.length);

        setRules([])
        setData(dataa)
      } catch (error) {
        console.error(error);
      }

    }
    else{
      console.alert("Rules empty --------------------")
    }


  }






  return (
    <div className="audience-criteria">
      <h2>Audience Criteria</h2>
      <div className="rule-container">
        <div className="rule-card">
          <form id="ruledd" className='Rule-Form'>
          <label>Field:</label>
          <select name="field" value={field} onChange={handleChange}>
            <option></option>
            <option>Email</option>
            <option>Name</option>
            <option>Age</option>
            <option>Last Visit</option>
            <option>Total Amount Spend</option>
            <option>Total Visits</option>
          </select>
          <label>Operator:</label>
          <select name="operator" value={operator} onChange={handleChange}>
            <option></option>
            <option>Greater Than</option>
            <option>Less Than</option>
            <option>Equal To</option>
          </select>
          <label>Value:</label>
          <input type="text" name="value" value={value} onChange={handleChange} />
          <label>Logic:</label>
          <input type="radio" name="logic" value="AND" checked={logic === 'AND'} onChange={handleChange}  /> AND
          <input style={{marginLeft: 20}} type="radio" name="logic" value="OR" checked={logic === 'OR'} onChange={handleChange}  /> OR
          <br></br>
          <button className="add-rule-btn" style={{marginTop: 20}} onClick={handleSubmit} >Add Rule</button>
          <button type="reset" className="add-rule-btn" style={{marginTop: 20, marginLeft: 40}} onClick={handlereset}>Reset</button>
          <button className="preview-btn" style={{marginTop: 20, marginLeft: 280}} onClick={runquery}>Preview Audience Size</button>
          <p className='audience-size' >This audience segment is estimated to reach <span id="size-aud"><input type="text" id="aud-size" defaultValue="-" style={{ width: '20px', height: '40px' }}/></span> customers.</p>
          </form>
        </div>
        
      </div>

      <table border={2} cellSpacing={0} cellPadding={5}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Age</th>
            <th>Last Visit</th>
            <th>Total Billed Amount ($)</th>
            <th>Number of Visits</th>
            
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.email}>
              <td>{item.email}</td>
              <td>{item.Name}</td>
              <td>{item.Age}</td>
              <td>{item.Visit}</td>
              <td>{item.BilledAmount}</td>
              <td>{item.NumberOfVisit}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <Link className='save-aud' href="/campaigns"> */}
        <button className="add-rule-btn" onClick={handleSaveAudience} >Save Audience</button>
        {/* </Link> */}
    </div>
  );
}
