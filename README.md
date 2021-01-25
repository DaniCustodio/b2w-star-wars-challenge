# b2w-star-wars-challenge

## Rotas

### [GET] - /

Lista todos os planetas

- Exemplo de resposta

```json
{
  "refCode": 1,
  "message": "success",
  "data": [
    {
      "_id": "600f2ec009d83300155c3f15",
      "name": "Tatooine",
      "terrain": "desert",
      "climate": "arid",
      "id": 1,
      "filmAppearances": "5",
      "createdDate": "2021-01-25T20:49:04.387Z",
      "__v": 0
    },
    {
      "_id": "600f30d309d83300155c3f16",
      "name": "Yavin IV",
      "climate": "temperate, tropical",
      "terrain": "jungle, rainforests",
      "id": 2,
      "filmAppearances": "1",
      "createdDate": "2021-01-25T20:57:55.368Z",
      "__v": 0
    }
  ]
}
```

### [GET] - /name/:name

Busca um planeta pelo nome

- Exemplo de requisição

  ```console
    https://b2w-star-wars.herokuapp.com/name/Tatooine/
  ```

- Exemplo de resposta

```json
{
  "refCode": 1,
  "message": "success",
  "data": {
    "_id": "600f2ec009d83300155c3f15",
    "name": "Tatooine",
    "terrain": "desert",
    "climate": "arid",
    "id": 1,
    "filmAppearances": "5",
    "createdDate": "2021-01-25T20:49:04.387Z",
    "__v": 0
  }
}
```

### [GET] - /:id

Busca um planeta pelo id

- Exemplo de requisição

```console
  https://b2w-star-wars.herokuapp.com/1
```

- Exemplo de resposta

```json
{
  "refCode": 1,
  "message": "success",
  "data": {
    "_id": "600f2ec009d83300155c3f15",
    "name": "Tatooine",
    "terrain": "desert",
    "climate": "arid",
    "id": 1,
    "filmAppearances": "5",
    "createdDate": "2021-01-25T20:49:04.387Z",
    "__v": 0
  }
}
```

### [POST] - /

Adiciona um planeta

- Exemplo de requisição

```json
{
  "name": "Endor",
  "climate": "temperate",
  "terrain": "forests, mountains, lakes",
},
```

- Exemplo de resposta

```json
{
  "refCode": 1,
  "message": "success"
}
```

### [DELETE] - /delete

Exclui um planeta

- Exemplo de requisição

```json
  {
    "name": "Dagobah"
  }
```

- Exemplo de resposta

```json
  {
    "refCode": 1,
    "message": "success"
  }
```
