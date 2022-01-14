import { useParams } from "react-router";
import { useEffect, useState } from "react";
import DetailCom from "../components/DetailCom";

function Detail(){
    const {id} = useParams();
    const [loading, setLoading] =useState(true);
    const [datas, setDatas] = useState({});

    useEffect(() => {
        fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        .then(response => response.json())
        .then(json => {
            setDatas(json.data.movie);
            setLoading(false);
        })
    }, [id]);

    return(
        <div>
            {loading ? <h1>loading</h1> : <DetailCom key={datas.id} setData={datas} />}
        </div>
    )
    
}

export default Detail;