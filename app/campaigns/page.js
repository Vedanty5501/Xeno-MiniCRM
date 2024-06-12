'use client'

// const Campaigns = () => {

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const data = urlParams.get('data');
//     if (data) {
//       setParsedData(JSON.parse(decodeURIComponent(data)));
//     }
//   }, [searchParams]);

//   return (
//     <div>
//       <h1>Campaigns</h1>
//       <table border={2} cellSpacing={0} cellPadding={5}>
//         <thead>
//           <tr>
//             <th>Email</th>
//             <th>Name</th>
//             <th>Age</th>
//             <th>Last Visit</th>
//             <th>Total Billed Amount ($)</th>
//             <th>Number of Visits</th>
            
//           </tr>
//         </thead>
//         <tbody>
//           {parsedData.map((item) => (
//             <tr key={item.email}>
//               <td>{item.email}</td>
//               <td>{item.Name}</td>
//               <td>{item.Age}</td>
//               <td>{item.Visit}</td>
//               <td>{item.BilledAmount}</td>
//               <td>{item.NumberOfVisit}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Campaigns;








import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

const LimitedEditionDrop = () => (
  <div className="limited-edition-drop">
    <h1>Welcome to the Sneaker Drop!</h1>
    <p>Don't miss out on our exclusive release. Coming soon!</p>

    <style jsx>{`
      .limited-edition-drop {
        text-align: center;
        padding: 20px;
        width: 50%;
        background-color: #f5f5f5;
      }

      .limited-edition-drop h1 {
        font-family: 'Pacifico', cursive;
        font-size: 2em;
        margin-bottom: 10px;
      }

      .limited-edition-drop p {
        font-family: 'Arial', sans-serif;
        font-size: 1.2em;
        margin-bottom: 20px;
      }

      .notify-me {
        padding: 10px 20px;
        background-color: #ff6347;
        color: #fff;
        border: none;
        cursor: pointer;
        font-size: 1em;
      }

      .notify-me:hover {
        background-color: #ff4500;
      }
    `}</style>
  </div>
);

const BackToSchoolSale = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const searchParams = useSearchParams();
  const [parsedData, setParsedData] = useState([]);
  
  const router = useRouter();



  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');
    if (data) {
      setParsedData(JSON.parse(decodeURIComponent(data)));
    }
  }, [searchParams]);



  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  function sendMessage(){
    parsedData.map((item) => (
          message(item)
    ))
  }

  const message = async(person) => {
    let msg = "Hii"+person.Name+", here is 10% off on your next order"
    let submitData = {
      name:person.Name,
      email:person.email,
      message: msg,
      delivery: (Math.random() * (100 - 1) + 1) < 90 ? 'SENT' : 'FAILED'
    }
    const res = await fetch('/api/comms', {
      method: 'POST',
      body: JSON.stringify(submitData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push('/');
  }







  function calculateTimeLeft() {
    const difference = +new Date('2024-08-31') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  const timerComponents = [];

  if (timeLeft) {
    Object.keys(timeLeft).forEach(interval => {
      if (!timeLeft[interval]) {
        return;
      }

      timerComponents.push(
        <span key={interval}>
          {timeLeft[interval]} {interval}{" "}
        </span>
      );
    });
  }

  return (
    <div className="back-to-school-sale">
      <h1>Back-to-School Sneaker Sale</h1>
      <p>Get ready for the new school year with our stylish and comfortable sneakers!</p>
      <div className="countdown-timer">
        {timerComponents.length ? timerComponents : <span>Loading...</span>}
      </div>
      <button onClick={sendMessage} className="shop-now">Send Now</button>

      <style jsx>{`
        .back-to-school-sale {
          text-align: center;
          padding: 20px;
          width:;
          background-color: #e0f7fa;
        }

        .back-to-school-sale h1 {
          font-family: 'Pacifico', cursive;
          font-size: 2em;
          margin-bottom: 10px;
        }

        .back-to-school-sale p {
          font-family: 'Arial', sans-serif;
          font-size: 1.2em;
          margin-bottom: 20px;
        }

        .countdown-timer {
          font-size: 1.5em;
          margin-bottom: 20px;
        }

        .shop-now {
          padding: 10px 20px;
          background-color: #00796b;
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 1em;
        }

        .shop-now:hover {
          background-color: #004d40;
        }
      `}</style>
    </div>
  );
};

const SummerCollectionLaunch = () => {
  
  return (
    <div className="summer-collection-launch">
      <h1>Summer Collection Launch</h1>
      <p>Explore our new summer collection with lightweight, breathable sneakers!</p>
      

      <style jsx>{`
        .summer-collection-launch {
          text-align: center;
          padding: 20px;
          width:50%;
          background-color: #fff3e0;
        }

        .summer-collection-launch h1 {
          font-family: 'Pacifico', cursive;
          font-size: 2em;
          margin-bottom: 10px;
        }

        .summer-collection-launch p {
          font-family: 'Arial', sans-serif;
          font-size: 1.2em;
          margin-bottom: 20px;
        }

        .countdown-timer {
          font-size: 1.5em;
          margin-bottom: 20px;
        }

        .shop-now {
          padding: 10px 20px;
          background-color: #ff9800;
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 1em;
        }

        .shop-now:hover {
          background-color: #e65100;
        }
      `}</style>
    </div>
  );
};

const CampaignsPage = () => (
  <div>
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
    </Head>
    <style jsx>{
      `
        .campaigns{
          display:flex;
        }
      `
    }
    </style>
    <BackToSchoolSale />
    
    <h1 style={{paddingLeft:500,paddingTop:50}}> PAST CAMPAIGNS</h1>
    <div  className='campaigns'>

    <LimitedEditionDrop />
    <SummerCollectionLaunch />
    </div>
  </div>
);

export default CampaignsPage;
