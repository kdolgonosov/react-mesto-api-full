function Header({ children, ...props }) {
    return (
        <header className={props.headerClassname ? props.headerClassname : 'header'}>
            <a
                className={props.headerLogoClassname ? props.headerLogoClassname : 'header__logo'}
                href="#"
            ></a>
            {children}
        </header>
    );
}
export default Header;
