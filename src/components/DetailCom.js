  
  function DetailCom({setData}){
      return (
          <div>
              <img src={setData.medium_cover_image} alt={setData.title}/>
              <h2>{setData.title}</h2>
              <p>{setData.description_intro}</p>
              <ul>
                {setData.genres.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
          </div>
      )
  }
  
  export default DetailCom;