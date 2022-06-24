function FormWithTitle({
    titleClassName,
    title,
    formClassName,
    name,
    onSubmit,
    submitBtnClassName,
    children,
    btnTitle,
}) {
    return (
        <>
            <h3 className={titleClassName}>{title}</h3>
            <form className={formClassName} name={name} onSubmit={onSubmit}>
                {children}
                <button className={submitBtnClassName} type="submit">
                    {btnTitle}
                </button>
            </form>
        </>
    );
}
export default FormWithTitle;
