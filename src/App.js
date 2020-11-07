import React, {useEffect} from 'react'
import './App.css'
import {EMode, STYLE_MODE_MAPPER, TEXT_MODE_MAPPER} from './constants'
import DarkFunImage from './images/dark.png'
import LightFunImage from './images/light.png'

function App() {

    /**
     * @description Controllo se il tema del dispositivo da cui naviga l'utente è
     * impostato su dark o meno
     **/
    function getUserPrefColor() {
        if (!window.matchMedia) return
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    /**
     * @description Costrutto per gestire l'init state
     **/
    const getColorModeInitState = () => {
        const isReturningUser = 'dark' in localStorage
        const savedMode = localStorage.getItem('darkMode')
        const userPrefDark = getUserPrefColor()

        // if color mode salvata => dark || light
        if (isReturningUser) return savedMode
        // if preferred color is dark => dark
        else if (userPrefDark) return true
        // altrimenti light
        else return false
    }

    /**
     * @description Hook per gestire dinamicamente lo stato della color mode
     **/
    const [darkMode, setDarkMode] = React.useState(getColorModeInitState)

    /**
     * @description Hook che mi salva sul local storage lo state della color mode
     * ogni volta che viene aggiornato
     **/
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
    }, [darkMode])

    return (
        <div className={darkMode ? STYLE_MODE_MAPPER[EMode.DARK_MODE] : STYLE_MODE_MAPPER[EMode.LIGHT_MODE]}>

            {/* NAVBAR COMPONENT */}
            <nav>
                <div className="toggle-container">
                    <span style={{color: darkMode ? 'grey' : 'yellow'}}>☀︎</span>
                    <span className="toggle">
                        <input
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                            id="checkbox"
                            className="checkbox"
                            type="checkbox"
                        />
                        <label htmlFor="checkbox"/>
                    </span>
                    <span style={{color: darkMode ? 'slateblue' : 'grey'}}>☾</span>
                </div>
            </nav>

            {/* MAIN CONTAINER */}
            <main style={{textAlign: 'center'}}>
                {/* TITLE */}
                <h1>{darkMode ? TEXT_MODE_MAPPER[EMode.DARK_MODE] : TEXT_MODE_MAPPER[EMode.LIGHT_MODE]}</h1>

                {/* INFOS */}
                <h2>Use the toogle to see magic</h2>

                {/* FUN IMAGE */}
                <img style={{width: '70%', marginTop: 10}} src={darkMode ? DarkFunImage : LightFunImage}/>

            </main>

        </div>
    )
}

export default App
