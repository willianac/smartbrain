import { Link } from "react-router-dom"
import "./RankList.css"

const RankList = ({ ranking }) => {
    return (
        <div className="rankConteiner">
            <div className="rankWrapper">
                {ranking.map((user) => {
                    return  <div className="rankChilds" key={user.name}> 
                                <h2>{user.name}</h2>
                                <h3>{user.entries}</h3>
                            </div>
                })}
            </div>
            <Link to='/smartbrain' className="rankButton">Homescreen</Link>
        </div>
    )
}

export default RankList