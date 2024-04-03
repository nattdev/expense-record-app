import { useState, useEffect } from "react";
import darkModeIcon from "../assets/icons/darkModeIcon.svg";
import lightModeIcon from "../assets/icons/lightModeIcon.svg";

function ColorModeSwitch() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode === false) {
            document.querySelector('html').classList.add('dark')
        } else {
            document.querySelector('html').classList.remove('dark')
        }
    }, [isDarkMode]);

    return (
        <div onClick={() => { setIsDarkMode(!isDarkMode) }} className=" flex items-center ">
            <div className={isDarkMode ? "bg-[#1b68f1] rounded-full pl-8 px-2 py-1 border-none mr-3 select-none transition-all ease-linear" : "bg-white rounded-full  pr-8 px-2 py-1 border-[#90bad] border mr-3 select-none transition-all ease-linear"}>
                <img src={isDarkMode ? lightModeIcon : darkModeIcon} className={isDarkMode ? "left-0 bg-white h-6 p-1 rounded-full" : "rigth-0 bg-gray-700 rounded-full p-1 -rotate-45 h-6"}></img>
            </div>
            <p className="text-[#90bad]">{isDarkMode ? "Light Mode" : "Dark Mode"}</p>
        </div>
    )
}

export default ColorModeSwitch;