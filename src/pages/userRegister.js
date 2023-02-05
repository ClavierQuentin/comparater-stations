const registerPage= {
    generate : () => {
        const main = document.querySelector('main');
        main.innerHTML = 
        ` 
            <form action="register.php" method="POST">
            <button type="submit" class="btn btn-success">Valider</button>
            </form>
        `
    }
}

export default registerPage;