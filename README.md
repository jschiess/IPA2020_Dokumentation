# Inventar-App

Diese applikation wurde entwickelt um den den Inventar der Abteilung Informatik erstllt. Es wurde im Rahmen einer IPA, von Josiah Schiess im Jahr 2020, entwickelt.

### Technologien
- UI
	- Vue
      - Vuetify
      - Vue-router
      - Vuex
      	- vuex-persistant-state
    - Axios
- API
	- Bcrypt
	- JWT
	- express
	- express-graphql
	- [GraphQL](https://github.com/facebook/graphql)
	- [objection-graphql](https://github.com/Vincit/objection-graphql)
	- knex
- Datenbank
	- knex
	- [Objection](https://vincit.github.io/objection.js/)

  

## Schnittstellen

## Knex datenbank



## ORM
In dem `./model` Order sind die einzelnen Modelle der Tabellen gespeichert. Diese werden im index importiert und modeliert. Die beziehungen sind unter der relationMappings Methode definiert. Für weitere beschreibunen zu der Beziehungen kann man die Dokumentation von objection.js anschauen.

### Graphinserts

// todo: add endpoint to graphinserts

## graphql schnittstellen

Graphql wurde mit dem objection-graphql package automatisch generiert. 
