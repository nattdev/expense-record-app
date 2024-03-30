import githubIcon from "../assets/icons/github-icon.svg";

function Footer() {
    return (
        <footer className="text-sm sm:text-base m-3 mt-6 font-medium flex">
            <p>Develop and Design by nattdev</p><a target="_blank" href="https://github.com/nattdev"><img src={githubIcon} className="mx-3"></img></a>
        </footer>
    );
}

export default Footer;