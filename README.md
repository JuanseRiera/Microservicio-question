# Microservicios Question

## Para correrlo

Para poder correr el proyecto es necesario:
* Correr los microservicios auth y catalog.
* Configurar las variables de entorno en un archivo que se deberá crear, cuyo nombre deberá ser ".env". (Ver .example.env).
* Correr el proyecto con Node 16 o mayor y con el comando npm start


---
## Indices

- [Get questions of article - Microservicio Questions](#1-get-questions-of-article---microservicio-questions)
- [Create question - Microservicio questions](#2-create-question---microservicio-questions)
- [Edit question - Microservicio Questions](#3-edit-question---microservicio-questions)
- [Delete question - Microservicio Quesions](#4-delete-question---microservicio-quesions)
- [Create response - Microservicio Questions](#5-create-response---microservicio-questions)
- [Edit response - Microservicio Questions](#6-edit-response---microservicio-questions)
- [Delete response - Microservicio Questions](#7-delete-response---microservicio-questions)

---

### 1. Get questions of article - Microservicio Questions

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://localhost:3005/v1/questions/${{idArticle}}
```

**_Response:_**

```js
{
    "questions": [
        {
            "_id": ${{idQuestion}},
            "initDate": "2021-11-18T15:16:29.168Z",
            "description": "Esta es una pregunta importante editada",
            "idArticle": ${{idArticle}},
            "idUser": ${{idUser}},
            "__v": 0,
            "response": {
                "_id": ${{idResponse}},
                "initDate": "2021-11-18T15:26:51.272Z",
                "question": ${{idQuestion}},
                "idUser": ${{idUser}},
                "description": "Esto es una respuesta importante editada",
                "__v": 0,
                "edited": "2021-11-18T15:27:35.079Z",
                "editedBy": ${{idUser}}
            }
        }
    ]
}
```

### 2. Create question - Microservicio questions

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:3005/v1/questions
```

**_Headers:_**

| Key           | Value          | Description |
| ------------- | -------------- | ----------- |
| Authorization | bearer {{jwt}} |             |

**_Body:_**

```js
{
    "idArticle": ${{idArticle}},
    "description":"Esta es una pregunta importante"
}
```

**_Response:_**

```js
{
    "message": "Se registró la pregunta correctamente",
    "question": {
        "initDate": "2021-11-18T15:54:56.066Z",
        "_id": ${{idQuestion}},
        "description": "Esta es una pregunta importante",
        "idArticle": ${{idArticle}},
        "idUser": ${{idUser}},
        "__v": 0
    }
}
```

### 3. Edit question - Microservicio Questions

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: http://localhost:3005/v1/questions/${{idQuestion}}
```

**_Headers:_**

| Key           | Value          | Description |
| ------------- | -------------- | ----------- |
| Authorization | bearer {{jwt}} |             |

**_Body:_**

```js
{
    "id": ${{idQuestion}},
    "description":"Esta es una pregunta importante editada"
}
```

**_Response:_**

```js
{
    "message": "Se editó la pregunta correctamente",
    "question": {
        "_id": ${{idQuestion}},
        "initDate": "2021-11-18T15:54:56.066Z",
        "description": "Esta es una pregunta importante editada",
        "idArticle": ${{idArticle}},
        "idUser": ${{idUser}},
        "__v": 0
    }
}
```

### 4. Delete question - Microservicio Quesions

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: http://localhost:3005/v1/questions/${{idQuestion}}
```

**_Headers:_**

| Key           | Value          | Description |
| ------------- | -------------- | ----------- |
| Authorization | bearer {{jwt}} |             |

**_Response:_**

```js
{
    "message": "Se eliminó la pregunta correctamente",
    "question": {
        "_id": ${{idQuestion}},
        "initDate": "2021-11-18T15:54:56.066Z",
        "description": "Esta es una pregunta importante editada",
        "idArticle": ${{idArticle}},
        "idUser": ${{idUser}},
        "__v": 0,
        "endDate": "2021-11-18T15:58:29.506Z"
    }
}
```

### 5. Create response - Microservicio Questions

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:3005/v1/responses
```

**_Headers:_**

| Key           | Value          | Description |
| ------------- | -------------- | ----------- |
| Authorization | bearer {{jwt}} |             |

**_Body:_**

```js
{
    "idQuestion": ${{idQuestion}},
    "description":"Esto es una respuesta importante"
}
```

**_Response:_**

```js
{
    "message": "Se registró la respuesta correctamente",
    "response": {
        "initDate": "2021-11-18T15:59:35.307Z",
        "_id": ${{idResponse}},
        "question": ${{idQuestion}},
        "idUser": ${{idUser}},
        "description": "Esto es una respuesta importante",
        "__v": 0
    },
    "question": {
        "_id": ${{idQuestion}},
        "initDate": "2021-11-18T15:54:56.066Z",
        "description": "Esta es una pregunta importante editada",
        "idArticle": ${{idArticle}},
        "idUser": ${{idUser}},
        "__v": 0,
        "endDate": "2021-11-18T15:58:29.506Z",
        "response": ${{idResponse}}
    }
}
```

### 6. Edit response - Microservicio Questions

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: http://localhost:3005/v1/responses/${{idResponse}}
```

**_Headers:_**

| Key           | Value          | Description |
| ------------- | -------------- | ----------- |
| Authorization | bearer {{jwt}} |             |

**_Body:_**

```js
{
    "id":${{idResponse}},
    "description":"Esto es una respuesta importante editada"
}
```

**_Response:_**

```js
{
    "message": "Se editó la respuesta correctamente",
    "response": {
        "_id": ${{idResponse}},
        "initDate": "2021-11-18T15:59:35.307Z",
        "question": ${{idQuestion}},
        "idUser": ${{idUser}},
        "description": "Esto es una respuesta importante editada",
        "__v": 0,
        "edited": "2021-11-18T16:00:58.171Z",
        "editedBy": ${{idUser}}
    }
}
```

### 7. Delete response - Microservicio Questions

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: http://localhost:3005/v1/responses/${{idResponse}}
```

**_Headers:_**

| Key           | Value          | Description |
| ------------- | -------------- | ----------- |
| Authorization | bearer {{jwt}} |             |

**_Response:_**

```js
{
    "message": "Se eliminó la respuesta correctamente",
    "response": {
        "_id": ${{idResponse}},
        "initDate": "2021-11-18T15:59:35.307Z",
        "question": ${{idQuestion}},
        "idUser": ${{idUser}},
        "description": "Esto es una respuesta importante editada",
        "__v": 0,
        "edited": "2021-11-18T16:00:58.171Z",
        "editedBy": ${{idUser}},
        "deletedBy": ${{idUser}},
        "endDate": "2021-11-18T16:01:56.920Z"
    },
    "question": {
        "_id": ${{idQuestion}},
        "initDate": "2021-11-18T15:54:56.066Z",
        "description": "Esta es una pregunta importante editada",
        "idArticle": ${{idArticle}},
        "idUser": ${{idUser}},
        "__v": 0,
        "endDate": "2021-11-18T15:58:29.506Z",
        "response": null
    }
}
```
