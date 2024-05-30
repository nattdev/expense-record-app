import GithubIcon from "../assets/icons/GithubIcon.svg";

function Footer() {
    return (
        <footer className="text-sm sm:text-base m-3 mt-6 font-normal flex dark:text-white">
            <p className="mr-3">Develop and Design by nattdev</p><a target="_blank" href="https://github.com/nattdev">
                <img src={GithubIcon}></img>
            </a>
        </footer>
    );
}

export default Footer;