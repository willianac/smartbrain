import "./RankList.css"

const RankList = ({onRouteChange, ranking}) => {
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
            <a className="rankButton" onClick={() => onRouteChange('homescreen')}>Homescreen</a>
        </div>
    )
}

export default RankList