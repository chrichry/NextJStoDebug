# Template T3 app + PostgreSQL

## Prérequis

- [NodeJS](https://nodejs.org/en)
- [Docker](https://www.docker.com/products/docker-desktop/)
- Yarn
```bash
npm install --global yarn
```
- [DBeaver](https://dbeaver.io/download/)
- VSCode Extension:
  > [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) <br/> 
  > [Prisma NextJS](https://marketplace.visualstudio.com/items?itemName=WillLuke.nextjs)<br/> 
  > [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)<br/> 
  > [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)<br/> 
  > [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Utilisation

La BDD est Dockerisée, il faut donc démarrer le container avant de démarrer l'environnement de développement avec yarn
```bash
    docker compose up -d
    yarn run dev
```

## Commandes utiles

- Prisma:
    ```bash
    #Initier le schéma de la DB
    npx prisma migrate dev --name init
    #Client léger de gestion de BDD de Prisma
    npx prisma studio
    #Démarrer Keycloak dans un container
    docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:22.0.1 start-dev
    ```

## Liens utiles

[Documentation de T3App](https://create.t3.gg/en/introduction)

### Environnement de développement
- Prisma Studio -> http://localhost:5555
- NextJS -> http://localhost:3000
- Panel Keycloak -> http://localhost:8080