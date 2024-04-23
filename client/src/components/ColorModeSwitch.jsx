import { useState, useEffect } from "react";
import darkModeIcon from "../assets/icons/darkModeIcon.svg";
import lightModeIcon from "../assets/icons/lightModeIcon.svg";
import { useExpenses } from "./ExpensesContext";

function ColorModeSwitch() {
    const storedItemTheme = localStorage.getItem('theme');

    const { isDarkMode, setIsDarkMode } = useExpenses();
    
    useEffect(() => {
        if (storedItemTheme !== null) {
            localStorage.setItem('theme', storedItemTheme);
            if (storedItemTheme == "dark") {
                setIsDarkMode(false);
            } else {
                setIsDarkMode(true);
            }
        } else {
            setIsDarkMode(true);
        }
    }, []);

    useEffect(() => {
        if (isDarkMode === false) {
            document.querySelector('html').classList.add('dark')
            localStorage.setItem('theme', 'dark');
        } else {
            document.querySelector('html').classList.remove('dark')
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    return (
        <div onClick={() => { setIsDarkMode(!isDarkMode) }} className=" flex items-center ">
            <div className={isDarkMode ? "bg-[#1b68f1] rounded-full pl-8 px-2 py-1 border-none mr-3 select-none transition-all ease-linear" : "bg-white rounded-full  pr-8 px-2 py-1 border-none border mr-3 select-none transition-all ease-linear"}>
                <img src={isDarkMode ? lightModeIcon : darkModeIcon} className={isDarkMode ? "left-0 bg-white h-6 p-1 rounded-full" : "rigth-0 bg-[#2E4B57] rounded-full p-1 -rotate-45 h-6"}></img>
            </div>
            <p className="text-[#90bad]">{isDarkMode ? "Light Mode" : "Dark Mode"}</p>
        </div>
    )
}

export default ColorModeSwitch;