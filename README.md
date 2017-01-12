NFQ AKADEMIJOS 5 GRUPĖS "A3" PROJEKTAS "Prieš ar po"
======
"Prieš ar po" - žaidimas skirtas pasitikrinti savo istorijos žinias.
Taisyklės: 
Pradžioje Jums bus pateiktas vienas istorinis įvykis. Pagalvokite kada jis įvyko ir pasiruoškite žaidimui. Prasidejus žaidimui lango apačioje paeiliui bus rodoma 10 istorinių įvykių ir Jums reikės atsakyti kada tai įvyko lyginant su viršuje rodomu įvykiu. Tam Jūs turite 30 sekundžių. Sėkmės!

## DEVELOPING
### To run project on your local machine:
- Clone repository to you local machine
- Navigate to project directory
- Run 'composer install'
- Create 'parameters.yml' file in 'app/config' and fill it with you local parameters
- Run 'sudo php bin/console doctrine:database:create'
- Run 'php bin/console doctrine:schema:update --force'
- Run 'php bin/console doctrine:fixtures:load'
- To start development server run: 'php bin/console server:start'

### Compiling SCSS and REACT JS files
- To compile SCSS and React files this project uses webpack
- Navigate to project folder and run 'npma install' to install all needed packages
- To start watching for changes run 'webpack'
- Webpack watches 'app/Recources/public' folder and compiles it to - 'web/assets' folder.