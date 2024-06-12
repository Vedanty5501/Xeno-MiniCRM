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
  export default LimitedEditionDrop