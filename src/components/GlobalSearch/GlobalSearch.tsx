import { useCallback, useEffect, useRef, useState } from 'react'
import './GlobalSearch.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faThumbsUp as faSolidThumbsUp, faThumbsDown as faSolidThumbsDown } from "@fortawesome/free-solid-svg-icons"
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons"
import { INTENTS } from "../../constants"

function IntentTile({name, otherIntents}: {name: string, otherIntents: string[]}) {

  const [like, setLike] = useState<boolean>()
  const [intentOptions, setIntentOptions] = useState<string[]>()
  const [selectedIntent, setSelectedIntent] = useState<string>()

  useEffect(() => {
    if(like === false) setIntentOptions(otherIntents)
    else setIntentOptions(undefined)
  }, [like])

  return (
    <div className='IntentTile'>
      <h2> {name} </h2>
      <div className='opinionSection' >
        <span>
          <FontAwesomeIcon icon={like === true ? faSolidThumbsUp : faThumbsUp} onClick={() => setLike(true)} />
          <FontAwesomeIcon icon={like === false ? faSolidThumbsDown : faThumbsDown} onClick={() => setLike(false)} />
        </span>
        <p> Please give your opinion </p>
      </div>
      { intentOptions &&
        <div className="intentOptions">
          {intentOptions.map(intent => <>
            <label htmlFor={intent+"_"+name} className={`${selectedIntent === intent} ? "active" : ""`} >{intent}</label>
            <input type="radio" value={intent} name={name} id={intent+"_"+name} onChange={e => setSelectedIntent(e.target.value)} />
          </>)}
        </div>
      }
    </div>
  )
}

function GlobalSearch() {
  
  // Ref to reduce re-renders
  let {current: search} = useRef("")
  const [identifiedIntents, setIdentifiedIntents] = useState<string[]>([])

  // when enter is pressed
  const updateSearch = () => {
    setIdentifiedIntents(INTENTS.slice(0, 3))
  }

  const getOtherIntents = useCallback(() => INTENTS.filter(i => !identifiedIntents.includes(i)) , [identifiedIntents])

  return (
    <div className="GlobalSearch">
      <div>
        <input
        type="text" 
        placeholder='Enter your problem'
        onChange={(e) => search = e.currentTarget.value} 
        onKeyUp={e => e.key === "Enter" ? updateSearch() : undefined} 
        />
        <FontAwesomeIcon icon={faSearch} />
      </div>
      {
        identifiedIntents.length !== 0 && 
        <div className='intents'>
            {identifiedIntents.map(intent => <IntentTile key={intent} name={intent} otherIntents={getOtherIntents()} />)}
        </div>
      }
    </div>
  )
}

export default GlobalSearch
