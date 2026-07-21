import '../../App.css';

function Footer(){

    return (
        <>
        <div className="flex flex-row items-center gap-4 h-[70px] justify-end header-footer">
            <p>La API key utilizada para recuperar los libros es la de <a href='https://openlibrary.org/'>Open Library</a></p>
            <img src="https://openlibrary.org/static/images/pantheon.png" alt="Logo" width="30" height="24"></img>
        </div>
        </>
    )
}

export default Footer