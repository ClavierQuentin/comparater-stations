
const homePage = {
    generate : () => {
        const main = document.querySelector('main');
        main.innerHTML = 
        `
            <div class="intro">
                <h1>Bienvenue</h1>
                <div>
                    <h2>Comparez facilement vos stations services préférées en deux étapes :</h2>
                    <ul>
                        <li>1) Choisissez vos critères entre le département, la ville et le type d'essence</li>
                        <li>2) Cliquez sur "Rechercher"</li>
                </div>
            </div>
        `
    }
}
export default homePage;